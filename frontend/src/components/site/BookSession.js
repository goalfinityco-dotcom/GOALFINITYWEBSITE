import { useState } from "react";
import { CalendarCheck, CheckCircle2, Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { http, formatApiError } from "../../lib/api";
import { CAREERS_INTERESTS, INSTITUTE_INTERESTS } from "../../data/content";
import { NextSteps } from "./ThankYou";

const CFG = {
  careers: { tz: "US Central Time (CT)", slots: ["9:00 – 11:00 AM CT", "11:00 AM – 1:00 PM CT", "2:00 – 4:00 PM CT", "4:00 – 6:00 PM CT"], modes: ["Video call", "Phone call"], topics: CAREERS_INTERESTS, location: "USA", btn: "bg-[#0B3F9E] hover:bg-[#2480F1]" },
  institute: { tz: "India Standard Time (IST)", slots: ["10:00 AM – 12:00 PM IST", "12:00 – 2:00 PM IST", "3:00 – 5:00 PM IST", "5:00 – 7:00 PM IST", "7:30 – 9:30 PM IST (online, US-friendly)"], modes: ["In-person · Ahmedabad", "Video call", "Phone call"], topics: INSTITUTE_INTERESTS, location: "India", btn: "bg-[#1E9A4A] hover:bg-[#0F1F5C]" },
};
const field = "w-full rounded-2xl border border-[#D9E1EE] bg-white px-4 py-3 text-[15px] text-[#0A1B3D] placeholder:text-[#6B7890] outline-none focus:border-[#2480F1]";
const today = () => new Date().toISOString().slice(0, 10);

const SessionForm = ({ vertical, onDone }) => {
  const c = CFG[vertical];
  const [f, setF] = useState({ name: "", email: "", phone: "", preferred_date: "", preferred_time: c.slots[0], session_mode: c.modes[0], interest: "", message: "" });
  const [state, setState] = useState({ loading: false, error: "" });
  const set = (k) => (e) => setF((x) => ({ ...x, [k]: e.target.value }));
  const submit = async (e) => {
    e.preventDefault();
    setState({ loading: true, error: "" });
    try {
      await http.post("/enquiries", { ...f, kind: "session", vertical, location: c.location, interest: f.interest || null, message: f.message || null, source_page: window.location.pathname });
      onDone();
    } catch (err) {
      setState({ loading: false, error: formatApiError(err.response?.data?.detail) || err.message });
    }
  };
  return (
    <form onSubmit={submit} data-testid="book-session-form" className="grid gap-3 sm:grid-cols-2">
      <input required minLength={2} data-testid="session-name-input" className={field} placeholder="Full name" value={f.name} onChange={set("name")} />
      <input required type="email" data-testid="session-email-input" className={field} placeholder="Email address" value={f.email} onChange={set("email")} />
      <input required minLength={6} data-testid="session-phone-input" className={`${field} sm:col-span-2`} placeholder="Phone / WhatsApp (with country code)" value={f.phone} onChange={set("phone")} />
      <input required type="date" min={today()} data-testid="session-date-input" className={field} value={f.preferred_date} onChange={set("preferred_date")} />
      <select data-testid="session-time-select" className={field} value={f.preferred_time} onChange={set("preferred_time")}>{c.slots.map((s) => <option key={s}>{s}</option>)}</select>
      <select data-testid="session-mode-select" className={field} value={f.session_mode} onChange={set("session_mode")}>{c.modes.map((s) => <option key={s}>{s}</option>)}</select>
      <select data-testid="session-topic-select" className={field} value={f.interest} onChange={set("interest")}><option value="">Topic (optional)</option>{c.topics.map((s) => <option key={s}>{s}</option>)}</select>
      <textarea rows={3} data-testid="session-notes-input" className={`${field} resize-none sm:col-span-2`} placeholder="Anything we should know before the session? (optional)" value={f.message} onChange={set("message")} />
      <p className="text-xs text-[#3B4A66] sm:col-span-2">Times shown in {c.tz}. We'll confirm the exact slot by email or WhatsApp.</p>
      {state.error && <p data-testid="session-error" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700 sm:col-span-2">{state.error}</p>}
      <button disabled={state.loading} data-testid="session-submit-btn" className={`flex items-center justify-center gap-2 rounded-full py-4 font-semibold text-white transition-colors duration-300 disabled:opacity-60 sm:col-span-2 ${c.btn}`}>
        {state.loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <CalendarCheck className="h-4 w-4" />} Request session
      </button>
    </form>
  );
};

export const BookSessionButton = ({ vertical, tid, className = "" }) => {
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState(false);
  const c = CFG[vertical];
  return (
    <Dialog open={open} onOpenChange={(o) => { setOpen(o); if (!o) setDone(false); }}>
      <DialogTrigger asChild>
        <button data-testid={tid} className={`group inline-flex items-center gap-2 rounded-full px-7 py-4 text-[15px] font-semibold text-white transition-[background-color,transform] duration-300 hover:-translate-y-0.5 ${c.btn} ${className}`}>
          <CalendarCheck className="h-4 w-4" /> Book a session
        </button>
      </DialogTrigger>
      <DialogContent data-lenis-prevent data-testid="book-session-dialog" className="max-h-[90vh] overflow-y-auto rounded-[28px] sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl font-semibold tracking-tight">{vertical === "careers" ? "Book a career session" : "Book a counselling session"}</DialogTitle>
          <DialogDescription>{vertical === "careers" ? "Free 1:1 consultation with a Goalfinity Careers advisor about your US job search." : "Meet a Goalfinity Institute Student Counselor in Ahmedabad or online."}</DialogDescription>
        </DialogHeader>
        {done ? (
          <div data-testid="session-success" className="flex flex-col items-start gap-3 py-6">
            <CheckCircle2 className="h-10 w-10 text-[#1E9A4A]" />
            <p className="font-display text-xl font-semibold">Session requested.</p>
            <p className="text-[15px] text-[#3B4A66]">Thank you! We'll confirm your exact slot within one business day.</p>
            <NextSteps vertical={vertical} />
          </div>
        ) : <SessionForm vertical={vertical} onDone={() => setDone(true)} />}
      </DialogContent>
    </Dialog>
  );
};
