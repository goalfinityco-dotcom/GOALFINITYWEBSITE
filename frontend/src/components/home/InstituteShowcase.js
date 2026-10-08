import { Link } from "react-router-dom";
import { ArrowUpRight, Globe2, School } from "lucide-react";
import { Reveal, Eyebrow } from "../site/Motion";
import { InstituteLogo } from "../site/Brand";
import { INSTITUTE_PARTS, PROGRAMS } from "../../data/content";

const PartCard = ({ part, i }) => (
  <Reveal delay={i * 0.08} className="h-full">
    <div data-testid={`institute-part-${i + 1}`} className="flex h-full flex-col rounded-[26px] border border-[#CFE9D8] bg-white p-6 transition-[transform,box-shadow] duration-500 hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgba(30,154,74,0.45)]">
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#1E9A4A]">{part.no}</span>
        <span className="font-display text-4xl font-bold text-[#0F1F5C]/10">{String(part.items.length).padStart(2, "0")}</span>
      </div>
      <h3 className="font-display mt-3 text-2xl font-semibold tracking-tight text-[#0F1F5C]">{part.title}</h3>
      <ul className="mt-4 space-y-1.5 text-[14px] text-[#3B4A66]">{part.items.slice(0, 4).map((x) => <li key={x}>— {x}</li>)}</ul>
    </div>
  </Reveal>
);

const ProgramRow = ({ p, i }) => (
  <Reveal delay={i * 0.06}>
    <Link to={`/institute/programs/${p.slug}`} data-testid={`home-program-${p.key}`} className="group flex items-center justify-between gap-6 border-t border-[#CFE9D8] py-6">
      <div className="flex items-baseline gap-5">
        <span className="font-mono text-xs text-[#1E9A4A]">0{i + 1}</span>
        <div>
          <h4 className="font-display text-xl font-semibold tracking-tight text-[#0F1F5C] transition-colors duration-300 group-hover:text-[#1E9A4A] sm:text-3xl">{p.title}</h4>
          <p className="mt-1 text-sm text-[#3B4A66]">{p.tag} · 6 months / 24 weeks</p>
        </div>
      </div>
      <ArrowUpRight className="h-6 w-6 shrink-0 text-[#1E9A4A] transition-transform duration-500 group-hover:rotate-45" />
    </Link>
  </Reveal>
);

export const InstituteShowcase = () => (
  <section id="institute" data-testid="home-institute-section" className="relative overflow-hidden bg-[#F1F9F4] py-20 md:py-28">
    <div className="mx-auto max-w-[1360px] px-5 sm:px-8">
      <div className="grid gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-7">
          <Eyebrow tone="green">Goalfinity Institute of Professional Studies · Ahmedabad</Eyebrow>
          <h2 className="font-display mt-5 text-5xl font-bold leading-[0.98] tracking-[-0.03em] text-[#0F1F5C] sm:text-7xl">Skill up.<br />Stand out.<br /><span className="text-[#1E9A4A]">Succeed.</span></h2>
          <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-[#3B4A66]">Everything you need to learn, get hired and grow — in one program. Classroom coaching and lab infrastructure in Ahmedabad, with an online mode for students anywhere in the world.</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-[#0F1F5C]"><School className="h-4 w-4 text-[#1E9A4A]" /> Classroom · Science City Road</span>
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-[#0F1F5C]"><Globe2 className="h-4 w-4 text-[#1E9A4A]" /> Online · Worldwide</span>
          </div>
        </Reveal>
        <Reveal delay={0.1} className="relative lg:col-span-5">
          <div className="relative aspect-[5/4] overflow-hidden rounded-[30px] [clip-path:polygon(0_0,100%_0,100%_82%,82%_100%,0_100%)]">
            <img src="/media/lecture.jpg" alt="Students learning in a classroom" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-tr from-[#0F1F5C]/40 to-transparent" />
          </div>
          <div className="absolute -bottom-6 left-6 rounded-3xl bg-white p-4 shadow-xl"><InstituteLogo className="h-20 sm:h-24" /></div>
        </Reveal>
      </div>
      <div className="mt-20 grid gap-5 md:grid-cols-3">{INSTITUTE_PARTS.map((p, i) => <PartCard key={p.no} part={p} i={i} />)}</div>
      <Reveal className="mt-6 flex flex-col items-start justify-between gap-5 rounded-[26px] bg-[#0F1F5C] p-7 text-white sm:flex-row sm:items-center sm:p-9">
        <div>
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#7FD9A0]">Flagship</span>
          <p className="font-display mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">100% Job Placement / Career Guarantee Program</p>
        </div>
        <Link to="/institute" data-testid="institute-flagship-link" className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#1E9A4A] px-6 py-3.5 text-sm font-semibold transition-[background-color] duration-300 hover:bg-[#23B157]">Explore the Institute <ArrowUpRight className="h-4 w-4" /></Link>
      </Reveal>
      <div className="mt-20">
        <Reveal><p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#1E9A4A]">Professional programs</p></Reveal>
        <div className="mt-4 border-b border-[#CFE9D8]">{PROGRAMS.map((p, i) => <ProgramRow key={p.key} p={p} i={i} />)}</div>
      </div>
    </div>
  </section>
);
