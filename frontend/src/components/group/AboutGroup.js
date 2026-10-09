import { Eye, Target, Check, ShieldCheck, Handshake, BookOpenCheck, Globe2 } from "lucide-react";
import { Reveal, Eyebrow } from "../site/Motion";
import { GROUP } from "../../data/group";

const WHY_ICONS = [ShieldCheck, Handshake, BookOpenCheck, Globe2];

export const AboutGroup = () => (
  <section id="about" data-testid="about-section" className="mx-auto max-w-[1360px] px-5 py-20 sm:px-8 md:py-28">
    <div className="grid gap-10 lg:grid-cols-12">
      <Reveal className="lg:col-span-5">
        <Eyebrow>About Goalfinity Group</Eyebrow>
        <h2 className="font-display mt-5 text-4xl font-semibold leading-[1.02] tracking-tight sm:text-6xl">From ambition <span className="text-[#C98A00]">to achievement.</span></h2>
        <p className="mt-6 border-l-2 border-[#F5A623] pl-5 text-lg font-medium leading-relaxed text-[#0A1B3D]">{GROUP.aboutClose}</p>
      </Reveal>
      <Reveal delay={0.1} className="space-y-5 text-[17px] leading-relaxed text-[#3B4A66] lg:col-span-7">
        {GROUP.about.map((p) => <p key={p.slice(0, 20)}>{p}</p>)}
      </Reveal>
    </div>
  </section>
);

export const VisionMission = () => (
  <section id="vision" data-testid="vision-mission-section" className="mx-auto max-w-[1360px] px-5 pb-20 sm:px-8 md:pb-28">
    <div className="grid gap-5 lg:grid-cols-12">
      <Reveal className="lg:col-span-5">
        <div data-testid="vision-card" className="relative flex h-full flex-col overflow-hidden rounded-[32px] bg-[#0B3F9E] p-8 text-white sm:p-10">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full border-[26px] border-[#F5A623]/30" />
          <Eye className="relative h-8 w-8 text-[#F5A623]" />
          <span className="relative mt-6 font-mono text-[11px] uppercase tracking-[0.22em] text-[#F5A623]">Our Vision</span>
          <p className="font-display relative mt-4 text-2xl font-medium leading-snug tracking-tight sm:text-[28px]">{GROUP.vision}</p>
        </div>
      </Reveal>
      <Reveal delay={0.1} className="lg:col-span-7">
        <div data-testid="mission-card" className="h-full rounded-[32px] border border-[#E3E8F2] bg-white p-8 sm:p-10">
          <Target className="h-8 w-8 text-[#0B3F9E]" />
          <span className="mt-6 block font-mono text-[11px] uppercase tracking-[0.22em] text-[#0B3F9E]">Our Mission</span>
          <p className="font-display mt-4 text-2xl font-medium leading-snug tracking-tight text-[#0A1B3D]">{GROUP.missionLead}</p>
          <ul className="mt-6 space-y-3">
            {GROUP.mission.map((m) => <li key={m} className="flex items-start gap-3 text-[15px] leading-relaxed text-[#3B4A66]"><span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#FFF6E0]"><Check className="h-3.5 w-3.5 text-[#C98A00]" /></span>{m}</li>)}
          </ul>
        </div>
      </Reveal>
    </div>
  </section>
);

export const WhyGoalfinity = () => (
  <section data-testid="why-section" className="mx-auto max-w-[1360px] px-5 pb-20 sm:px-8 md:pb-28">
    <Reveal><Eyebrow tone="amber">Why Goalfinity?</Eyebrow><h2 className="font-display mt-5 max-w-3xl text-4xl font-semibold leading-[1.02] tracking-tight sm:text-5xl">Built on trust, ethics and commitments we keep.</h2></Reveal>
    <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {GROUP.why.map((w, i) => {
        const Icon = WHY_ICONS[i];
        return (
          <Reveal key={w.t} delay={i * 0.06} className="h-full">
            <div data-testid={`why-card-${i}`} className="group h-full rounded-[26px] border border-[#E3E8F2] bg-white p-6 transition-[transform,box-shadow] duration-500 hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgba(11,63,158,0.35)]">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#EAF3FF] transition-colors duration-300 group-hover:bg-[#0B3F9E]"><Icon className="h-6 w-6 text-[#0B3F9E] transition-colors duration-300 group-hover:text-white" /></span>
              <h3 className="font-display mt-6 text-xl font-semibold tracking-tight">{w.t}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-[#3B4A66]">{w.d}</p>
            </div>
          </Reveal>
        );
      })}
    </div>
  </section>
);
