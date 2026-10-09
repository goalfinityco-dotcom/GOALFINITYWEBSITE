import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Reveal, Eyebrow } from "../site/Motion";
import { GROUP } from "../../data/group";

const TONE = {
  careers: { ring: "hover:border-[#2480F1]", btn: "bg-[#0B3F9E] group-hover:bg-[#2480F1]", motto: "text-[#0B3F9E]", glow: "bg-[#EAF3FF]" },
  institute: { ring: "hover:border-[#1E9A4A]", btn: "bg-[#1E9A4A] group-hover:bg-[#0F1F5C]", motto: "text-[#1E9A4A]", glow: "bg-[#EAF7EF]" },
};

export const ChooseJourney = () => (
  <section id="journey" data-testid="choose-journey-section" className="mx-auto max-w-[1360px] px-5 py-20 sm:px-8 md:py-28">
    <Reveal className="mx-auto max-w-3xl text-center">
      <Eyebrow tone="amber" className="justify-center">Choose your journey</Eyebrow>
      <h2 className="font-display mt-5 text-4xl font-bold uppercase leading-[0.98] tracking-tight sm:text-6xl">{GROUP.ambition.title}</h2>
      <div className="mt-6 space-y-2 text-[17px] leading-relaxed text-[#3B4A66]">{GROUP.ambition.lines.map((l) => <p key={l}>{l}</p>)}</div>
      <p className="font-display mt-5 text-lg font-semibold text-[#C98A00]">{GROUP.ambition.close}</p>
    </Reveal>
    <div className="mt-14 grid gap-5 md:grid-cols-2">
      {GROUP.journeys.map((j, i) => {
        const t = TONE[j.id];
        return (
          <Reveal key={j.id} delay={i * 0.1} className="h-full">
            <Link to={j.to} data-testid={`journey-card-${j.id}`} className={`group relative flex h-full flex-col items-center overflow-hidden rounded-[36px] border-2 border-[#E3E8F2] bg-white px-8 pb-10 pt-12 text-center transition-[border-color,transform,box-shadow] duration-500 hover:-translate-y-1.5 hover:shadow-[0_40px_80px_-40px_rgba(11,63,158,0.4)] ${t.ring}`}>
              <span className={`absolute -bottom-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full ${t.glow} transition-transform duration-700 group-hover:scale-150`} />
              <div className="relative grid h-36 place-items-center transition-transform duration-700 group-hover:scale-105">
                <img src={j.logo} alt={j.name} className={`w-auto ${j.id === "careers" ? "h-16 sm:h-20" : "h-32 sm:h-36"}`} />
              </div>
              <h3 className="font-display relative mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-[#0A1B3D]">{j.name}</h3>
              <p className={`font-display relative mt-3 text-3xl font-bold tracking-tight sm:text-4xl ${t.motto}`}>{j.motto}</p>
              <p className="relative mt-2 text-[15px] text-[#3B4A66]">{j.sub}</p>
              <span className={`relative mt-8 inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-white transition-colors duration-300 ${t.btn}`}>{j.cta} <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" /></span>
            </Link>
          </Reveal>
        );
      })}
    </div>
  </section>
);
