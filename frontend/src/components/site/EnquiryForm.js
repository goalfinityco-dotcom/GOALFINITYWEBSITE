import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { http, formatApiError } from "../../lib/api";
import { CAREERS_INTERESTS, INSTITUTE_INTERESTS } from "../../data/content";
import { NextSteps } from "./ThankYou";
import { validateEnquiry } from "../../lib/validate";

const VERTICALS = [
  { id: "careers", label: "Goalfinity Careers", sub: "I'm in the USA (F-1 / OPT / STEM OPT)", ring: "ring-[#2480F1] bg-[#EAF3FF]", dot: "bg-[#2480F1]" },
  { id: "institute", label: "Goalfinity Institute", sub: "Classroom or online", ring: "ring-[#1E9A4A] bg-[#EAF7EF]", dot: "bg-[#1E9A4A]" },
  { id: "unsure", label: "Not sure yet", sub: "Help me choose the right path", ring: "ring-[#F5A623] bg-[#FFF6E5]", dot: "bg-[#F5A623]" },
];
const LOCATIONS = ["USA", "India", "Other country"];
const field = "w-full rounded-2xl border border-[#D9E1EE] bg-white px-4 py-3.5 text-[15px] text-[#0A1B3D] placeholder:text-[#6B7890] outline-none transition-[border-color,box-shadow] duration-200 focus:border-[#2480F1] focus:shadow-[0_0_0_4px_rgba(36,128,241,0.15)]";

const Success = ({ onReset, vertical, name }) => (
  <motion.div data-testid="enquiry-success" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="flex min-h-[420px] flex-col items-start justify-center gap-4 p-2">
    <CheckCircle2 className="h-12 w-12 text-[#1E9A4A]" />
    <h3 className="font-display text-3xl font-semibold tracking-tight">Thank you{name ? `, ${name}` : ""}. We've got it.</h3>
    <NextSteps vertical={vertical} />
    <button data-testid="enquiry-reset-btn" onClick={onReset} className="mt-2 text-sm font-semibold text-[#0B3F9E] underline underline-offset-4">Send another enquiry</button>
  </motion.div>
);

export const EnquiryForm = ({ defaultVertical = "careers", defaultInterest = "" }) => {
  const init = { name: "", email: "", phone: "", vertical: defaultVertical, interest: defaultInterest, location: defaultVertical === "careers" ? "USA" : "India", message: "" };
  const [form, setForm] = useState(init);
  const [state, setState] = useState({ loading: false, error: "", done: false });
  const [errors, setErrors] = useState({});
  const set = (k) => (e) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    setErrors((er) => (er[k] ? { ...er, [k]: undefined } : er));
  };
  const err = (k) => errors[k] && <p data-testid={`enquiry-${k}-error`} className="mt-1.5 px-1 text-xs text-red-600">{errors[k]}</p>;
  const bad = (k) => (errors[k] ? " !border-red-400" : "");
  const interests = form.vertical === "institute" ? INSTITUTE_INTERESTS : form.vertical === "careers" ? CAREERS_INTERESTS : [...CAREERS_INTERESTS.slice(0, 1), ...INSTITUTE_INTERESTS.slice(0, 3)];

  const submit = async (e) => {
    e.preventDefault();
    const found = validateEnquiry(form);
    setErrors(found);
    if (Object.keys(found).length) {
      setState({ loading: false, error: "Please fix the highlighted fields.", done: false });
      return;
    }
    setState({ loading: true, error: "", done: false });
    try {
      await http.post("/enquiries", { ...form, name: form.name.trim(), email: form.email.trim(), phone: form.phone.trim(), interest: form.interest || null, message: form.message || null, source_page: window.location.pathname });
      setState({ loading: false, error: "", done: true });
    } catch (err) {
      setState({ loading: false, error: formatApiError(err.response?.data?.detail) || err.message, done: false });
    }
  };

  if (state.done) return <Success vertical={form.vertical} name={form.name.trim().split(" ")[0]} onReset={() => { setForm(init); setState({ loading: false, error: "", done: false }); }} />;

  return (
    <form data-testid="enquiry-form" noValidate onSubmit={submit} className="space-y-5">
      <div className="grid gap-3 sm:grid-cols-3">
        {VERTICALS.map((v) => (
          <button type="button" key={v.id} data-testid={`enquiry-vertical-${v.id}`} onClick={() => setForm((f) => ({ ...f, vertical: v.id, interest: "" }))} className={`rounded-2xl border border-[#D9E1EE] p-4 text-left transition-[box-shadow,background-color] duration-300 ${form.vertical === v.id ? `ring-2 ${v.ring}` : "bg-white hover:bg-[#F7F9FC]"}`}>
            <span className="flex items-center gap-2 text-sm font-semibold text-[#0A1B3D]"><span className={`h-2 w-2 rounded-full ${v.dot}`} />{v.label}</span>
            <span className="mt-1 block text-xs leading-snug text-[#3B4A66]">{v.sub}</span>
          </button>
        ))}
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div><input required maxLength={120} data-testid="enquiry-name-input" className={field + bad("name")} placeholder="Full name" value={form.name} onChange={set("name")} />{err("name")}</div>
        <div><input required type="email" maxLength={160} data-testid="enquiry-email-input" className={field + bad("email")} placeholder="Email address" value={form.email} onChange={set("email")} />{err("email")}</div>
        <div><input required type="tel" maxLength={30} data-testid="enquiry-phone-input" className={field + bad("phone")} placeholder="Phone / WhatsApp (with country code)" value={form.phone} onChange={set("phone")} />{err("phone")}</div>
        <select data-testid="enquiry-location-select" className={field} value={form.location} onChange={set("location")}>
          {LOCATIONS.map((l) => <option key={l} value={l}>I'm based in: {l}</option>)}
        </select>
      </div>
      <select data-testid="enquiry-interest-select" className={field} value={form.interest} onChange={set("interest")}>
        <option value="">What are you interested in? (optional)</option>
        {interests.map((i) => <option key={i} value={i}>{i}</option>)}
      </select>
      <textarea data-testid="enquiry-message-input" rows={4} maxLength={2000} className={`${field} resize-none${bad("message")}`} placeholder="Tell us about your goals, degree, visa status or the course you want (optional)" value={form.message} onChange={set("message")} />
      {err("message")}
      {state.error && <p data-testid="enquiry-error" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{state.error}</p>}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm text-[#3B4A66]">No fixed price list. We share fees after understanding your goals.</p>
        <button disabled={state.loading} data-testid="enquiry-submit-btn" className="group inline-flex items-center gap-3 rounded-full bg-[#0A1B3D] px-7 py-4 text-[15px] font-semibold text-white transition-[background-color,transform] duration-300 hover:-translate-y-0.5 hover:bg-[#0B3F9E] disabled:opacity-60">
          {state.loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          Send enquiry
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      </div>
    </form>
  );
};
