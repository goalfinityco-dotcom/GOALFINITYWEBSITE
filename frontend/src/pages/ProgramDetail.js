import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowRight, ArrowUpRight, CalendarClock, Check } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/ui/accordion";
import { PageHero } from "../components/site/PageHero";
import { Reveal, Eyebrow } from "../components/site/Motion";
import { EnquirySection } from "../components/site/EnquirySection";
import { scrollToId } from "../components/site/SmoothScroll";
import { PROGRAMS } from "../data/content";
import { PROGRAM_DETAILS, SCHEDULES } from "../data/programDetails";

const FeesButton = ({ tid, dark }) => (
  <button onClick={() => scrollToId("enquire")} data-testid={tid} className={`group inline-flex items-center gap-2 rounded-full px-7 py-4 text-[15px] font-semibold transition-[background-color] duration-300 ${dark ? "bg-[#1E9A4A] text-white hover:bg-[#23B157]" : "bg-[#1E9A4A] text-white hover:bg-[#0F1F5C]"}`}>
    Enquire for fees <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
  </button>
);

const Syllabus = ({ d }) => (
  <section className="mx-auto grid max-w-[1360px] gap-10 px-5 py-20 sm:px-8 md:py-28 lg:grid-cols-12">
    <Reveal className="lg:col-span-4">
      <div className="lg:sticky lg:top-28">
        <Eyebrow tone="green">Syllabus · 5 phases</Eyebrow>
        <h2 className="font-display mt-5 text-4xl font-semibold leading-[1.02] tracking-tight text-[#0F1F5C] sm:text-5xl">What you'll learn, week by week.</h2>
        <div className="mt-8 flex flex-wrap gap-2">{d.tools.map((t) => <span key={t} className="rounded-full border border-[#CFE9D8] bg-white px-3 py-1.5 text-sm text-[#0F1F5C]">{t}</span>)}</div>
      </div>
    </Reveal>
    <Reveal delay={0.1} className="lg:col-span-8">
      <Accordion type="multiple" defaultValue={["p0"]} data-testid="program-syllabus">
        {d.phases.map((p, i) => (
          <AccordionItem key={p.title} value={`p${i}`} className="border-[#CFE9D8]">
            <AccordionTrigger data-testid={`syllabus-phase-${i}`} className="py-6 text-left hover:no-underline">
              <span className="flex items-baseline gap-5"><span className="font-mono text-xs text-[#1E9A4A]">0{i + 1}</span><span><span className="font-display block text-xl font-semibold tracking-tight text-[#0F1F5C] sm:text-2xl">{p.title}</span><span className="mt-1 block text-sm font-normal text-[#3B4A66]">{p.weeks}</span></span></span>
            </AccordionTrigger>
            <AccordionContent>
              <ul className="grid gap-2 pb-2 sm:grid-cols-2">{p.topics.map((t) => <li key={t} className="flex items-start gap-2 text-[15px] text-[#0A1B3D]"><Check className="mt-0.5 h-4 w-4 shrink-0 text-[#1E9A4A]" />{t}</li>)}</ul>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Reveal>
  </section>
);

const Schedule = () => (
  <section className="bg-[#F1F9F4] py-20 md:py-28">
    <div className="mx-auto max-w-[1360px] px-5 sm:px-8">
      <Reveal className="flex flex-wrap items-end justify-between gap-6">
        <div><Eyebrow tone="green">Schedule · Batches</Eyebrow><h2 className="font-display mt-5 text-4xl font-semibold leading-[1.02] tracking-tight text-[#0F1F5C] sm:text-5xl">Pick the batch that fits your day.</h2></div>
        <p className="max-w-sm text-[15px] text-[#3B4A66]">New batches start regularly. Enquire for the next start date and seat availability.</p>
      </Reveal>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {SCHEDULES.map((s, i) => (
          <Reveal key={s.batch} delay={i * 0.06} className="h-full">
            <div data-testid={`schedule-batch-${i}`} className={`flex h-full flex-col rounded-[24px] p-6 ${s.mode.startsWith("Online") ? "bg-[#0F1F5C] text-white" : "border border-[#CFE9D8] bg-white"}`}>
              <span className={`font-mono text-[11px] uppercase tracking-[0.2em] ${s.mode.startsWith("Online") ? "text-[#7FD9A0]" : "text-[#1E9A4A]"}`}>{s.mode}</span>
              <h3 className="font-display mt-4 text-2xl font-semibold tracking-tight">{s.batch}</h3>
              <p className="mt-4 flex items-start gap-2 text-[15px]"><CalendarClock className="mt-0.5 h-4 w-4 shrink-0" />{s.days}</p>
              <p className={`mt-1 pl-6 text-sm ${s.mode.startsWith("Online") ? "text-white/80" : "text-[#3B4A66]"}`}>{s.time}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

const Outcomes = ({ d, slug }) => (
  <section className="mx-auto max-w-[1360px] px-5 py-20 sm:px-8 md:py-28">
    <Reveal className="rounded-[32px] bg-[#0F1F5C] p-8 text-white sm:p-12">
      <Eyebrow className="!text-[#7FD9A0]" tone="green">Career outcomes</Eyebrow>
      <h2 className="font-display mt-5 max-w-2xl text-3xl font-semibold tracking-tight sm:text-5xl">Roles you can target after the program.</h2>
      <div className="mt-8 flex flex-wrap gap-3">{d.roles.map((r) => <span key={r} className="rounded-full bg-white/10 px-4 py-2 text-[15px]">{r}</span>)}</div>
      <div className="mt-10 flex flex-wrap items-center gap-4 border-t border-white/15 pt-8">
        <FeesButton tid="program-outcomes-fees-btn" dark />
        <p className="text-sm text-white/80">Includes the 100% Job Placement / Career Guarantee Program (Flagship).</p>
      </div>
    </Reveal>
    <div className="mt-14 grid gap-4 md:grid-cols-2">
      {PROGRAMS.filter((p) => p.slug !== slug).map((p) => (
        <Link key={p.slug} to={`/institute/programs/${p.slug}`} data-testid={`other-program-${p.key}`} className="group flex items-center justify-between gap-4 rounded-[24px] border border-[#CFE9D8] bg-white p-6">
          <span><span className="font-mono text-xs text-[#1E9A4A]">Other program · {p.tag}</span><span className="font-display mt-1 block text-xl font-semibold tracking-tight text-[#0F1F5C]">{p.title}</span></span>
          <ArrowUpRight className="h-5 w-5 shrink-0 text-[#1E9A4A] transition-transform duration-500 group-hover:rotate-45" />
        </Link>
      ))}
    </div>
  </section>
);

export default function ProgramDetail() {
  const { slug } = useParams();
  const program = PROGRAMS.find((p) => p.slug === slug);
  const d = PROGRAM_DETAILS[slug];
  if (!program || !d) return <Navigate to="/institute" replace />;

  return (
    <main data-testid={`program-page-${program.key}`} key={slug}>
      <PageHero tid="program-hero" tone="green" accent="#1E9A4A" eyebrow={`Goalfinity Institute · ${program.tag} · 6 months / 24 weeks`} lines={d.lines} lead={d.lead} image={d.image} imageAlt={program.title}>
        <FeesButton tid="program-hero-fees-btn" />
      </PageHero>
      <section className="mx-auto max-w-[1360px] px-5 pt-10 sm:px-8">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {d.facts.map((f) => <div key={f} data-testid="program-fact" className="rounded-2xl border border-[#CFE9D8] bg-white px-5 py-4 font-display text-lg font-semibold text-[#0F1F5C]">{f}</div>)}
        </div>
      </section>
      <Syllabus d={d} />
      <Schedule />
      <Outcomes d={d} slug={slug} />
      <EnquirySection defaultVertical="institute" defaultInterest={program.title} title={`Enquire for ${program.title} fees.`} />
    </main>
  );
}
