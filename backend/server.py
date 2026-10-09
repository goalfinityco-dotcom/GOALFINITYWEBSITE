from pathlib import Path
from dotenv import load_dotenv

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

import os
import re
import logging
from datetime import datetime, timezone, timedelta
from typing import Annotated, Literal, Optional

import bcrypt
import jwt
from bson import ObjectId
from fastapi import FastAPI, APIRouter, HTTPException, Request, Response, BackgroundTasks, Depends
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, BeforeValidator, ConfigDict, Field, field_validator
from starlette.middleware.cors import CORSMiddleware

from emailer import send_email, enquiry_email
from digest import make_router as make_digest_router

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

client = AsyncIOMotorClient(os.environ['MONGO_URL'])
db = client[os.environ['DB_NAME']]

app = FastAPI()
api = APIRouter(prefix="/api")

JWT_ALGORITHM = "HS256"
EMAIL_RE = re.compile(r"^[^@\s]+@[^@\s]+\.[^@\s]+$")

PyObjectId = Annotated[str, BeforeValidator(lambda v: str(v) if isinstance(v, ObjectId) else v)]


class BaseDocument(BaseModel):
    model_config = ConfigDict(populate_by_name=True)
    id: Optional[PyObjectId] = Field(default=None, alias="_id")

    @classmethod
    def from_mongo(cls, doc: dict):
        return cls.model_validate(doc)

    def to_mongo(self) -> dict:
        data = self.model_dump(by_alias=True, exclude_none=False)
        data.pop("_id", None)
        return data


class EnquiryIn(BaseModel):
    name: str = Field(min_length=2, max_length=120)
    email: str = Field(max_length=160)
    phone: str = Field(min_length=6, max_length=30)
    vertical: Literal["careers", "institute", "unsure"]
    interest: Optional[str] = Field(default=None, max_length=120)
    location: Optional[str] = Field(default=None, max_length=60)
    message: Optional[str] = Field(default=None, max_length=2000)
    kind: Literal["enquiry", "session"] = "enquiry"
    preferred_date: Optional[str] = Field(default=None, max_length=20)
    preferred_time: Optional[str] = Field(default=None, max_length=60)
    session_mode: Optional[str] = Field(default=None, max_length=40)
    source_page: Optional[str] = Field(default=None, max_length=200)

    @field_validator("email")
    @classmethod
    def check_email(cls, v):
        v = v.strip().lower()
        if not EMAIL_RE.match(v):
            raise ValueError("Please enter a valid email address")
        return v


class Enquiry(BaseDocument):
    name: str
    email: str
    phone: str
    vertical: str
    interest: Optional[str] = None
    location: Optional[str] = None
    message: Optional[str] = None
    kind: str = "enquiry"
    preferred_date: Optional[str] = None
    preferred_time: Optional[str] = None
    session_mode: Optional[str] = None
    source_page: Optional[str] = None
    status: str = "new"
    email_status: str = "pending"
    ip: Optional[str] = Field(default=None, exclude=True)
    created_at: str


class StatusIn(BaseModel):
    status: Literal["new", "contacted", "enrolled", "archived"]


class LoginIn(BaseModel):
    email: str
    password: str


def hash_password(p: str) -> str:
    return bcrypt.hashpw(p.encode(), bcrypt.gensalt()).decode()


def verify_password(p: str, h: str) -> bool:
    return bcrypt.checkpw(p.encode(), h.encode())


def make_token(user_id: str, email: str, kind: str, delta: timedelta) -> str:
    payload = {"sub": user_id, "email": email, "type": kind, "exp": datetime.now(timezone.utc) + delta}
    return jwt.encode(payload, os.environ["JWT_SECRET"], algorithm=JWT_ALGORITHM)


def set_auth_cookies(resp: Response, user_id: str, email: str):
    resp.set_cookie("access_token", make_token(user_id, email, "access", timedelta(hours=8)),
                    httponly=True, secure=True, samesite="none", max_age=28800, path="/")
    resp.set_cookie("refresh_token", make_token(user_id, email, "refresh", timedelta(days=7)),
                    httponly=True, secure=True, samesite="none", max_age=604800, path="/")


async def get_current_user(request: Request) -> dict:
    token = request.cookies.get("access_token")
    auth = request.headers.get("Authorization", "")
    if not token and auth.startswith("Bearer "):
        token = auth[7:]
    if not token:
        raise HTTPException(401, "Not authenticated")
    try:
        payload = jwt.decode(token, os.environ["JWT_SECRET"], algorithms=[JWT_ALGORITHM])
    except jwt.ExpiredSignatureError:
        raise HTTPException(401, "Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(401, "Invalid token")
    if payload.get("type") != "access":
        raise HTTPException(401, "Invalid token type")
    user = await db.users.find_one({"_id": ObjectId(payload["sub"])})
    if not user or user.get("role") != "admin":
        raise HTTPException(401, "User not found")
    return {"id": str(user["_id"]), "email": user["email"], "name": user.get("name"), "role": user["role"]}


@api.get("/")
async def root():
    return {"message": "Goalfinity API"}


@api.post("/auth/login")
async def login(body: LoginIn, request: Request, response: Response):
    email = body.email.strip().lower()
    ident = f"{request.client.host if request.client else 'x'}:{email}"
    att = await db.login_attempts.find_one({"identifier": ident})
    now = datetime.now(timezone.utc)
    if att and att.get("count", 0) >= 5 and att.get("locked_until") and att["locked_until"].replace(tzinfo=timezone.utc) > now:
        raise HTTPException(429, "Too many attempts. Try again in 15 minutes.")
    user = await db.users.find_one({"email": email})
    if not user or not verify_password(body.password, user["password_hash"]):
        count = (att.get("count", 0) if att else 0) + 1
        update = {"count": count, "locked_until": now + timedelta(minutes=15) if count >= 5 else None}
        await db.login_attempts.update_one({"identifier": ident}, {"$set": update}, upsert=True)
        raise HTTPException(401, "Invalid email or password")
    await db.login_attempts.delete_many({"identifier": ident})
    set_auth_cookies(response, str(user["_id"]), email)
    return {"id": str(user["_id"]), "email": email, "name": user.get("name"), "role": user["role"]}


@api.post("/auth/logout")
async def logout(response: Response):
    response.delete_cookie("access_token", path="/", secure=True, samesite="none")
    response.delete_cookie("refresh_token", path="/", secure=True, samesite="none")
    return {"ok": True}


@api.get("/auth/me")
async def me(user=Depends(get_current_user)):
    return user


@api.post("/auth/refresh")
async def refresh(request: Request, response: Response):
    token = request.cookies.get("refresh_token")
    if not token:
        raise HTTPException(401, "No refresh token")
    try:
        payload = jwt.decode(token, os.environ["JWT_SECRET"], algorithms=[JWT_ALGORITHM])
    except jwt.InvalidTokenError:
        raise HTTPException(401, "Invalid refresh token")
    if payload.get("type") != "refresh":
        raise HTTPException(401, "Invalid token type")
    set_auth_cookies(response, payload["sub"], payload.get("email", ""))
    return {"ok": True}


async def notify_enquiry(enquiry_id: ObjectId, doc: dict):
    try:
        subject, html = enquiry_email(doc)
        await send_email(to=os.environ["ENQUIRY_NOTIFY_EMAIL"], subject=subject, html=html)
        status = "sent"
    except Exception as e:
        logger.error(f"Enquiry email failed: {e}")
        status = "failed"
    await db.enquiries.update_one({"_id": enquiry_id}, {"$set": {"email_status": status}})


@api.post("/enquiries")
async def create_enquiry(body: EnquiryIn, request: Request, tasks: BackgroundTasks):
    ip = request.headers.get("x-forwarded-for", "").split(",")[0].strip() or (request.client.host if request.client else "")
    since = (datetime.now(timezone.utc) - timedelta(minutes=10)).isoformat()
    if await db.enquiries.count_documents({"ip": ip, "created_at": {"$gte": since}}) >= 5:
        raise HTTPException(429, "Too many enquiries. Please call or WhatsApp us instead.")
    enquiry = Enquiry(**body.model_dump(), created_at=datetime.now(timezone.utc).isoformat())
    doc = enquiry.to_mongo()
    doc["ip"] = ip
    res = await db.enquiries.insert_one(doc)
    tasks.add_task(notify_enquiry, res.inserted_id, doc)
    return {"ok": True, "id": str(res.inserted_id)}


@api.get("/enquiries")
async def list_enquiries(vertical: Optional[str] = None, status: Optional[str] = None, user=Depends(get_current_user)):
    q = {}
    if vertical:
        q["vertical"] = vertical
    if status:
        q["status"] = status
    docs = await db.enquiries.find(q).sort("created_at", -1).to_list(1000)
    return [Enquiry.from_mongo(d).model_dump() for d in docs]


@api.patch("/enquiries/{enquiry_id}")
async def update_enquiry(enquiry_id: str, body: StatusIn, user=Depends(get_current_user)):
    if not ObjectId.is_valid(enquiry_id):
        raise HTTPException(404, "Not found")
    res = await db.enquiries.update_one({"_id": ObjectId(enquiry_id)}, {"$set": {"status": body.status}})
    if not res.matched_count:
        raise HTTPException(404, "Not found")
    return {"ok": True}


@api.delete("/enquiries/{enquiry_id}")
async def delete_enquiry(enquiry_id: str, user=Depends(get_current_user)):
    if not ObjectId.is_valid(enquiry_id):
        raise HTTPException(404, "Not found")
    await db.enquiries.delete_one({"_id": ObjectId(enquiry_id)})
    return {"ok": True}


@app.on_event("startup")
async def startup():
    await db.users.create_index("email", unique=True)
    await db.login_attempts.create_index("identifier")
    await db.enquiries.create_index("created_at")
    await db.cron_runs.create_index("run_id", unique=True)
    email, pw = os.environ["ADMIN_EMAIL"].lower(), os.environ["ADMIN_PASSWORD"]
    existing = await db.users.find_one({"email": email})
    if existing is None:
        await db.users.insert_one({"email": email, "password_hash": hash_password(pw), "name": "Admin",
                                   "role": "admin", "created_at": datetime.now(timezone.utc).isoformat()})
    elif not verify_password(pw, existing["password_hash"]):
        await db.users.update_one({"email": email}, {"$set": {"password_hash": hash_password(pw)}})


app.include_router(api)
app.include_router(make_digest_router(db))
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ['CORS_ORIGINS'].split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
