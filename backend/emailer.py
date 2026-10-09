import os
import re
import ipaddress
import logging
import httpx
from html import escape
from html.parser import HTMLParser
from urllib.parse import urlparse

logger = logging.getLogger(__name__)

EMAIL_BASE_URL = "https://integrations.emergentagent.com"
EMAIL_KEY = os.environ["EMERGENT_EMAIL_KEY"]
EMAIL_FROM_NAME = os.environ["EMAIL_FROM_NAME"]
NOTIFY_TO = os.environ["ENQUIRY_NOTIFY_EMAIL"]

_SHORTENERS = ("bit.ly", "tinyurl.com", "t.co", "is.gd", "cutt.ly", "goo.gl", "rebrand.ly")
_CRED_ASK = ("reply with your password", "reply with the code", "send your password", "cvv",
             "send us your password", "enter your password below", "confirm your card number",
             "your full card number", "seed phrase", "recovery phrase", "verify your card",
             "social security number", "confirm your bank details")
_HOSTISH = re.compile(r"\b(?:https?://)?((?:[a-z0-9-]+\.)+[a-z]{2,})", re.I)


def _host_ok(host: str) -> bool:
    if not host or "xn--" in host:
        return False
    try:
        ipaddress.ip_address(host)
        return False
    except ValueError:
        pass
    return not any(host == s or host.endswith("." + s) for s in _SHORTENERS)


def _same_site(shown: str, real: str) -> bool:
    return shown == real or real.endswith("." + shown) or shown.endswith("." + real)


class _EmailScan(HTMLParser):
    def __init__(self):
        super().__init__()
        self.tags, self.urls, self.anchors = set(), [], []
        self._href, self._text = None, []

    def handle_starttag(self, tag, attrs):
        self.tags.add(tag.lower())
        self.urls += [v for k, v in attrs if k.lower() in ("href", "src") and v]
        if tag.lower() == "a":
            self._href = dict((k.lower(), v) for k, v in attrs).get("href")
            self._text = []

    def handle_data(self, data):
        if self._href is not None:
            self._text.append(data)

    def handle_endtag(self, tag):
        if tag.lower() == "a" and self._href is not None:
            self.anchors.append((self._href, "".join(self._text)))
            self._href, self._text = None, []


def _assert_safe_email(subject: str, html: str) -> None:
    scan = _EmailScan()
    scan.feed(html)
    if scan.tags & {"form", "input", "textarea", "select"}:
        raise ValueError("No forms or input fields in email (G2)")
    body = f"{subject}\n{html}".lower()
    for p in _CRED_ASK:
        if p in body:
            raise ValueError(f"Email asks the recipient for credentials: {p!r} (G2)")
    for url in scan.urls:
        low = url.strip().lower()
        if low.startswith(("mailto:", "tel:", "cid:", "#")):
            continue
        if not low.startswith("https://"):
            raise ValueError(f"Email links/assets must be absolute https: {url!r} (G3)")
        host = urlparse(low).hostname or ""
        if not _host_ok(host) or urlparse(low).username is not None:
            raise ValueError(f"Shortened, numeric-host or credential-bearing URL: {url!r} (G3)")
    for href, text in scan.anchors:
        real = urlparse(href.strip().lower()).hostname or ""
        if not real:
            continue
        for m in _HOSTISH.finditer(text):
            if not _same_site(m.group(1).lower(), real):
                raise ValueError(f"Anchor text {m.group(1)!r} != real link host {real!r} (G3)")


async def send_email(*, to: str, subject: str, html: str) -> str:
    _assert_safe_email(subject, html)
    payload = {"to": [to], "subject": subject, "html": html, "from_name": EMAIL_FROM_NAME}
    async with httpx.AsyncClient(timeout=30) as client:
        resp = await client.post(f"{EMAIL_BASE_URL}/api/v1/email/send",
                                 headers={"X-Email-Key": EMAIL_KEY}, json=payload)
    if resp.status_code >= 400:
        try:
            info = resp.json()
        except ValueError:
            info = {}
        logger.warning(f"Email send refused ({resp.status_code}) {info.get('code', '')}: {info.get('message', resp.text)}")
        raise RuntimeError(info.get("code") or f"http_{resp.status_code}")
    return resp.json().get("id")


VERTICAL_LABEL = {"careers": "Goalfinity Careers (USA)", "institute": "Goalfinity Institute (Ahmedabad / Online)", "unsure": "Not sure yet"}


def enquiry_email(e: dict) -> tuple[str, str]:
    vertical = VERTICAL_LABEL.get(e["vertical"], e["vertical"])
    is_session = e.get("kind") == "session"
    subject = f"{'Session booking request' if is_session else 'New website enquiry'} - {vertical}"
    rows = [("Name", e["name"]), ("Email", e["email"]), ("Phone / WhatsApp", e["phone"]),
            ("Interested in", vertical), ("Programme / service", e.get("interest") or "-"),
            ("Based in", e.get("location") or "-"), ("Message", e.get("message") or "-")]
    if is_session:
        rows = [("Request type", "Book a session"), ("Preferred date", e.get("preferred_date") or "-"),
                ("Preferred time", e.get("preferred_time") or "-"), ("Session mode", e.get("session_mode") or "-")] + rows
    cells = "".join(
        f'<tr><td style="padding:8px 12px;color:#475569;font-size:13px;width:160px;vertical-align:top">{escape(k)}</td>'
        f'<td style="padding:8px 12px;color:#0f172a;font-size:14px">{escape(str(v))}</td></tr>' for k, v in rows)
    html = (f'<table role="presentation" width="100%" style="font-family:Arial,sans-serif;background:#f4f6fb;padding:24px">'
            f'<tr><td><table role="presentation" width="600" style="background:#ffffff;border-radius:12px;padding:8px">'
            f'<tr><td colspan="2" style="padding:16px 12px;font-size:18px;font-weight:bold;color:#0b3f9e">{"New session booking request" if is_session else "New enquiry"} from the Goalfinity website</td></tr>'
            f'{cells}'
            f'<tr><td colspan="2" style="padding:16px 12px;font-size:12px;color:#64748b">Sent by {escape(EMAIL_FROM_NAME)} website. '
            f'Reply directly to <a href="mailto:{escape(e["email"])}">{escape(e["email"])}</a> or view it in the admin inbox.</td></tr>'
            f'</table></td></tr></table>')
    return subject, html
