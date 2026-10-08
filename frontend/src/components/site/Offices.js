import { useEffect, useState } from "react";
import { MapPin, Phone } from "lucide-react";
import { CONTACT } from "../../data/content";
import { Reveal, Eyebrow } from "./Motion";

const useClock = (tz) => {
  const fmt = () => new Intl.DateTimeFormat("en-US", { timeZone: tz, hour: "numeric", minute: "2-digit" }).format(new Date());
  const [t, setT] = useState(fmt);
  useEffect(() => {
    const id = setInterval(() => setT(fmt()), 30000);
    return () => clearInterval(id);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return t;
};

const OfficeCard = ({ o, id, tone }) => {
  const time = useClock(o.tz);
  const accent = tone === "green" ? "#1E9A4A" : "#2480F1";
  return (
    <div data-testid={`office-card-${id}`} className="group relative flex h-full flex-col overflow-hidden rounded-[28px] border border-[#E3E8F2] bg-white p-7 transition-[transform,box-shadow] duration-500 hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgba(11,63,158,0.35)] sm:p-9">
      <div className="flex items-start justify-between gap-4">
        <Eyebrow tone={tone}>{o.label}</Eyebrow>
        <span data-testid={`office-time-${id}`} className="font-mono text-xs text-[#3B4A66]">Local time {time}</span>
      </div>
      <h3 className="font-display mt-6 text-3xl font-semibold tracking-tight sm:text-4xl">{o.city}</h3>
      <p className="mt-2 text-sm text-[#3B4A66]">{o.serves}</p>
      <div className="mt-8 space-y-3 text-[15px]">
        <p className="flex gap-3"><MapPin className="mt-0.5 h-5 w-5 shrink-0" style={{ color: accent }} />{o.lines.join(" ")}</p>
        <a href={`tel:${o.tel}`} data-testid={`office-call-${id}`} className="flex items-center gap-3 font-semibold"><Phone className="h-5 w-5" style={{ color: accent }} /><span className="link-underline">{o.phone}</span></a>
      </div>
      <span className="pointer-events-none absolute -bottom-16 -right-16 h-48 w-48 rounded-full opacity-10 transition-transform duration-700 group-hover:scale-125" style={{ background: accent }} />
    </div>
  );
};

export const Offices = () => (
  <section data-testid="offices-section" className="mx-auto max-w-[1360px] px-5 py-20 sm:px-8 md:py-28">
    <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-6">
      <div>
        <Eyebrow>Two offices · One team</Eyebrow>
        <h2 className="font-display mt-4 max-w-2xl text-3xl font-semibold tracking-tight sm:text-5xl">Wherever you are, someone is awake to help.</h2>
      </div>
      <a href={`mailto:${CONTACT.email}`} data-testid="offices-email-link" className="link-underline text-lg font-semibold text-[#0B3F9E]">{CONTACT.email}</a>
    </Reveal>
    <div className="grid gap-6 md:grid-cols-2">
      <Reveal><OfficeCard o={CONTACT.usa} id="usa" tone="blue" /></Reveal>
      <Reveal delay={0.1}><OfficeCard o={CONTACT.india} id="india" tone="green" /></Reveal>
    </div>
  </section>
);
