import os
import hmac
import logging
from collections import Counter
from datetime import datetime, timezone, timedelta
from html import escape

from fastapi import APIRouter, BackgroundTasks, HTTPException, Request

from emailer import send_email

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/api/cron")

STATIC = {"/": "Home", "/about": "About", "/careers": "Careers page", "/institute": "Institute page", "/contact": "Contact page"}
VERTICALS = {"careers": "Goalfinity Careers", "institute": "Goalfinity Institute", "unsure": "Not sure yet"}
PROGRAMS = {"ai-engineer-data-science": "AI Engineer & Data Science", "investment-banking-financial-analytics": "Investment Banking & Financial Analytics", "digital-marketing-content-ai": "Digital Marketing, Content Creation & AI"}


def _title(slug: str) -> str:
    return " ".join(w.capitalize() for w in slug.split("-"))


def page_label(path):
    if not path:
        return "Unknown page"
    if path in STATIC:
        return STATIC[path]
    if path.startswith("/careers/opt-job-support-"):
        return f"OPT job support · {_title(path.rsplit('opt-job-support-', 1)[1])}"
    if path.startswith("/institute/programs/"):
        slug = path.rsplit("/", 1)[1]
        return f"Program · {PROGRAMS.get(slug, _title(slug))}"
    if path.startswith("/institute/") and "-course-" in path:
        course, city = path.rsplit("/", 1)[1].split("-course-", 1)
        return f"{_title(course)} course in {_title(city)}"
    return path


def _rows(counter: Counter, labeler) -> str:
    if not counter:
        return '<tr><td style="padding:8px 12px;color:#64748b;font-size:14px">None</td><td></td></tr>'
    return "".join(
        f'<tr><td style="padding:8px 12px;color:#0f172a;font-size:14px;border-top:1px solid #e3e8f2">{escape(labeler(k))}</td>'
        f'<td style="padding:8px 12px;color:#0b3f9e;font-size:14px;font-weight:bold;text-align:right;border-top:1px solid #e3e8f2">{n}</td></tr>'
        for k, n in counter.most_common())


def _table(title: str, body: str) -> str:
    return (f'<tr><td style="padding:20px 12px 6px;font-size:13px;letter-spacing:1px;text-transform:uppercase;color:#c98a00;font-weight:bold">{escape(title)}</td></tr>'
            f'<tr><td><table role="presentation" width="100%" style="border-collapse:collapse">{body}</table></td></tr>')


def build_digest(items: list, start: datetime, end: datetime):
    by_vertical = Counter(e.get("vertical") for e in items)
    by_page = Counter(e.get("source_page") or "" for e in items)
    sessions = sum(1 for e in items if e.get("kind") == "session")
    period = f"{start.strftime('%d %b')} – {end.strftime('%d %b %Y')}"
    subject = f"Goalfinity weekly enquiries: {len(items)} new ({period})"
    latest = "".join(
        f'<tr><td style="padding:8px 12px;font-size:14px;color:#0f172a;border-top:1px solid #e3e8f2">{escape(e.get("name", ""))}</td>'
        f'<td style="padding:8px 12px;font-size:13px;color:#475569;border-top:1px solid #e3e8f2">{escape(VERTICALS.get(e.get("vertical"), str(e.get("vertical"))))}'
        f'{" · session" if e.get("kind") == "session" else ""}<br>{escape(page_label(e.get("source_page")))}</td></tr>'
        for e in items[:10]) or '<tr><td style="padding:8px 12px;color:#64748b;font-size:14px">No new enquiries this week.</td></tr>'
    admin_url = f"{os.environ['SITE_URL'].rstrip('/')}/admin"
    html = (
        '<table role="presentation" width="100%" style="font-family:Arial,sans-serif;background:#f4f6fb;padding:24px"><tr><td>'
        '<table role="presentation" width="600" style="background:#ffffff;border-radius:12px;padding:12px">'
        f'<tr><td style="padding:12px;font-size:20px;font-weight:bold;color:#0b3f9e">Weekly enquiry summary</td></tr>'
        f'<tr><td style="padding:0 12px;font-size:14px;color:#475569">{escape(period)}</td></tr>'
        f'<tr><td style="padding:16px 12px"><span style="font-size:40px;font-weight:bold;color:#0a1b3d">{len(items)}</span>'
        f'<span style="font-size:14px;color:#475569"> new enquiries, including {sessions} session booking{"s" if sessions != 1 else ""}</span></td></tr>'
        + _table("By vertical", _rows(by_vertical, lambda k: VERTICALS.get(k, str(k))))
        + _table("By page", _rows(by_page, page_label))
        + _table("Latest enquiries", latest)
        + f'<tr><td style="padding:20px 12px;font-size:14px"><a href="{escape(admin_url)}" style="color:#0b3f9e;font-weight:bold">Open the admin inbox</a></td></tr>'
        '</table></td></tr></table>')
    return subject, html, {"total": len(items), "sessions": sessions, "by_vertical": dict(by_vertical), "by_page": dict(by_page)}


def make_router(db):
    async def run_digest(run_id: str):
        end = datetime.now(timezone.utc)
        start = end - timedelta(days=7)
        items = await db.enquiries.find({"created_at": {"$gte": start.isoformat()}}).sort("created_at", -1).to_list(5000)
        subject, html, stats = build_digest(items, start, end)
        try:
            await send_email(to=os.environ["ENQUIRY_NOTIFY_EMAIL"], subject=subject, html=html)
            status = "sent"
        except Exception as e:
            logger.error(f"Weekly digest email failed: {e}")
            status = "failed"
        await db.cron_runs.update_one({"run_id": run_id}, {"$set": {"status": status, "stats": stats, "finished_at": end.isoformat()}})

    @router.post("/weekly-digest")
    async def weekly_digest(request: Request, tasks: BackgroundTasks):
        # Cron endpoints must ack 2xx immediately; enqueue/background the actual work.
        auth = request.headers.get("Authorization", "")
        if not auth.startswith("Bearer ") or not hmac.compare_digest(auth[7:], os.environ["WEBHOOK_CRON_SECRET"]):
            raise HTTPException(401, "Unauthorized")
        try:
            body = await request.json()
        except Exception:
            raise HTTPException(400, "Invalid body")
        if not isinstance(body, dict):
            raise HTTPException(400, "Invalid body")
        run_id = request.headers.get("X-Webhook-Id") or body.get("run_id")
        if not run_id:
            raise HTTPException(400, "Missing run id")
        res = await db.cron_runs.update_one(
            {"run_id": run_id},
            {"$setOnInsert": {"run_id": run_id, "job": "weekly-digest", "status": "queued", "created_at": datetime.now(timezone.utc).isoformat()}},
            upsert=True)
        if res.upserted_id is None:
            return {"ok": True, "duplicate": True}
        tasks.add_task(run_digest, run_id)
        return {"ok": True}

    return router
