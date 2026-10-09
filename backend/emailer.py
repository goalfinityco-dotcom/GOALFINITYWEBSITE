import os
import re
import asyncio
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


async def send_email(*, to: str, subject: str, html: str, retries: int = 3) -> str:
    _assert_safe_email(subject, html)
    payload = {"to": [to], "subject": subject, "html": html, "from_name": EMAIL_FROM_NAME}
    for attempt in range(retries + 1):
        async with httpx.AsyncClient(timeout=30) as client:
            resp = await client.post(f"{EMAIL_BASE_URL}/api/v1/email/send",
                                     headers={"X-Email-Key": EMAIL_KEY}, json=payload)
        if resp.status_code < 400:
            return resp.json().get("id")
        try:
            info = resp.json()
        except ValueError:
            info = {}
        code = info.get("code") or f"http_{resp.status_code}"
        if (code == "rate_limited" or resp.status_code == 429) and attempt < retries:
            await asyncio.sleep(20 * (attempt + 1))
            continue
        logger.warning(f"Email send refused ({resp.status_code}) {code}: {info.get('message', resp.text)}")
        raise RuntimeError(code)


VERTICAL_LABEL = {"careers": "Goalfinity Careers (USA)", "institute": "Goalfinity Institute (Classroom / Online)", "unsure": "Not sure yet"}


def enquiry_email(e: dict) -> tuple[str, str]:
    vertical = VERTICAL_LABEL.get(e["vertical"], e["vertical"])
    is_session = e.get("kind") == "session"
    subject = f"{'Session booking request' if is_session else 'New website enquiry'} - {vertical}"
    rows = [("Name", e["name"]), ("Email", e["email"]), ("Phone / WhatsApp", e["phone"]),
            ("Interested in", vertical), ("Programme / service", e.get("interest") or "-"),
            ("Based in", e.get("location") or "-"), ("Message", e.get("message") or "-"),
            ("Sent from page", e.get("source_page") or "-")]
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


_NAME_SAFE = re.compile(r"[^A-Za-z\u00C0-\u024F\u0900-\u097F\u0A80-\u0AFF .'-]")

REPLY_COPY = {
    "careers": ("Goalfinity Careers", "A Goalfinity Careers advisor will review your details and contact you within one business day to understand your profile, visa timeline and target roles.",
                ["We review your resume, skills and OPT / STEM OPT timeline.", "An advisor calls or messages you to discuss your goals.", "We share the right support plan and fee structure for you."]),
    "institute": ("Goalfinity Institute", "A Goalfinity Institute Student Counselor will contact you within one business day to help you choose the right program and batch.",
                  ["We look at your background and the program you're interested in.", "A counselor calls or messages you to answer your questions.", "We share batch timings (classroom or online) and the fee structure."]),
    "unsure": ("Goalfinity", "Our team will contact you within one business day to understand your goals and suggest the right path, Goalfinity Careers or Goalfinity Institute.",
               ["We review what you've shared with us.", "A team member calls or messages you to understand your goals.", "We recommend the right next step for you."]),
}


def student_reply_email(e: dict) -> tuple[str, str]:
    brand, lead, steps = REPLY_COPY.get(e.get("vertical"), REPLY_COPY["unsure"])
    first = _NAME_SAFE.sub("", re.sub(r"<[^>]*>", "", (e.get("name") or "")).strip().split(" ")[0])[:30] or "there"
    is_session = e.get("kind") == "session"
    subject = f"We've received your {'session request' if is_session else 'enquiry'} - {brand}"
    session_line = ""
    if is_session:
        session_line = (f'<tr><td style="padding:4px 12px 12px;font-size:14px;color:#0f172a">Requested slot: <b>{escape(e.get("preferred_date") or "")}, {escape(e.get("preferred_time") or "")}</b>'
                        f' ({escape(e.get("session_mode") or "")}). We will confirm the exact time with you.</td></tr>')
    step_rows = "".join(f'<tr><td style="padding:6px 12px;font-size:14px;color:#0f172a"><b style="color:#c98a00">{i}.</b> {escape(s)}</td></tr>' for i, s in enumerate(steps, 1))
    html = (
        '<table role="presentation" width="100%" style="font-family:Arial,sans-serif;background:#f4f6fb;padding:24px"><tr><td>'
        '<table role="presentation" width="600" style="background:#ffffff;border-radius:12px;padding:12px">'
        f'<tr><td style="padding:12px;font-size:20px;font-weight:bold;color:#0b3f9e">Thank you, {escape(first)}!</td></tr>'
        f'<tr><td style="padding:0 12px 12px;font-size:15px;line-height:22px;color:#334155">{escape(lead)}</td></tr>'
        f'{session_line}'
        '<tr><td style="padding:12px 12px 4px;font-size:13px;letter-spacing:1px;text-transform:uppercase;color:#c98a00;font-weight:bold">What happens next</td></tr>'
        f'{step_rows}'
        '<tr><td style="padding:16px 12px 4px;font-size:13px;letter-spacing:1px;text-transform:uppercase;color:#c98a00;font-weight:bold">Need us sooner? WhatsApp or call</td></tr>'
        '<tr><td style="padding:6px 12px;font-size:14px;color:#0f172a">USA: <a href="https://wa.me/16462123340" style="color:#0b3f9e;font-weight:bold">WhatsApp +1 646 212 3340</a></td></tr>'
        '<tr><td style="padding:6px 12px;font-size:14px;color:#0f172a">India: <a href="https://wa.me/919909852323" style="color:#1e9a4a;font-weight:bold">WhatsApp +91 99098 52323</a></td></tr>'
        '<tr><td style="padding:6px 12px;font-size:14px;color:#0f172a">Email: <a href="mailto:Info@goalfinity.co" style="color:#0b3f9e">Info@goalfinity.co</a></td></tr>'
        '<tr><td style="padding:20px 12px 8px;font-size:14px;color:#334155">Warm regards,<br><b>Team Goalfinity</b><br>Your Goals. Our Commitment. Your Future.</td></tr>'
        '<tr><td style="padding:8px 12px;font-size:12px;color:#64748b">You received this because you contacted us through <a href="https://www.goalfinity.co" style="color:#64748b">www.goalfinity.co</a>. If this wasn\'t you, you can ignore this email.</td></tr>'
        '</table></td></tr></table>')
    return subject, html

