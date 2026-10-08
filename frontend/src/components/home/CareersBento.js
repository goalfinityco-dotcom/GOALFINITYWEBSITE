import { Link } from "react-router-dom";
import { ArrowUpRight, Check } from "lucide-react";
import { Reveal, Eyebrow } from "../site/Motion";
import { CAREERS_PILLARS } from "../../data/content";

const Items = ({ items, light }) => (
  <ul className="mt-5 grid gap-2">
    {items.slice(0, 4).map((i) => (
      <li key={i} className={`flex items-start gap-2 text-[14px] ${light ? "text-white/85" : "text-[#3B4A66]"}`}>
        <Check className={`mt-0.5 h-4 w-4 shrink-0 ${light ? "text-[#F5A623]" : "text-[#2480F1]"}`} />{i}
      </li>
    ))}
  </ul>
);

const Head = ({ p, light }) => (
  <>
    <span className={`font-mono text-xs tracking-[0.2em] ${light ? "text-[#F5A623]" : "text-[#2480F1]"}`}>STAGE {p.no}</span>
    <h3 className={`font-display mt-3 text-2xl font-semibold tracking-tight sm:text-[28px] ${light ? "text-white" : "text-[#0A1B3D]"}`}>{p.title}</h3>
    <p className={`mt-2 text-[15px] leading-relaxed ${light ? "text-white/80" : "text-[#3B4A66]"}`}>{p.lead}</p>
  </>
);

const ImageCard = ({ p, span, tid }) => (
  <Reveal className={span}>
    <article data-testid={tid} className="group grid h-full overflow-hidden rounded-[30px] border border-[#E3E8F2] bg-white sm:grid-cols-2">
      <div className="p-7 sm:p-8"><Head p={p} /><Items items={p.items} /></div>
      <div className="relative min-h-[240px] overflow-hidden sm:[clip-path:inset(14px_14px_14px_0_round_22px)]">
        <img src={p.image} alt={p.title} className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105" />
      </div>
    </article>
  </Reveal>
);

const SolidCard = ({ p, span, tid, big }) => (
  <Reveal className={span}>
    <article data-testid={tid} className="relative flex h-full flex-col justify-between overflow-hidden rounded-[30px] bg-[#0A1B3D] p-7 text-white sm:p-8">
      <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[#2480F1]/25 blur-2xl" />
      <div className="relative"><Head p={p} light /><Items items={p.items} light /></div>
      {big && <p className="font-display relative mt-8 text-7xl font-bold leading-none tracking-tight text-[#2480F1] sm:text-8xl">{big}</p>}
    </article>
  </Reveal>
);

export const CareersBento = () => (
  <section id="careers" data-testid="home-careers-section" className="mx-auto max-w-[1360px] px-5 py-20 sm:px-8 md:py-28">
    <Reveal className="grid gap-6 lg:grid-cols-12 lg:items-end">
      <div className="lg:col-span-7">
        <Eyebrow>Goalfinity Careers · 4-stage support</Eyebrow>
        <h2 className="font-display mt-5 text-4xl font-semibold leading-[1.02] tracking-tight sm:text-6xl">From profile to placement — <span className="text-[#2480F1]">and beyond.</span></h2>
      </div>
      <div className="lg:col-span-5">
        <p className="text-[17px] leading-relaxed text-[#3B4A66]">Built for F-1 international students on OPT and STEM OPT. One team owns your search end to end, so you can focus on clearing interviews.</p>
        <Link to="/careers" data-testid="careers-bento-view-all" className="mt-5 inline-flex items-center gap-1.5 font-semibold text-[#0B3F9E]"><span className="link-underline">See every service</span><ArrowUpRight className="h-4 w-4" /></Link>
      </div>
    </Reveal>
    <div className="mt-12 grid gap-5 lg:grid-cols-12">
      <ImageCard p={CAREERS_PILLARS[0]} span="lg:col-span-8" tid="careers-stage-01" />
      <SolidCard p={CAREERS_PILLARS[1]} span="lg:col-span-4" tid="careers-stage-02" big="80–100" />
      <SolidCard p={CAREERS_PILLARS[3]} span="lg:col-span-4" tid="careers-stage-04" big="1 yr*" />
      <ImageCard p={CAREERS_PILLARS[2]} span="lg:col-span-8" tid="careers-stage-03" />
    </div>
    <p className="mt-4 text-xs text-[#3B4A66]">*Re-employment support if a job is lost within the applicable 1-year service period.</p>
  </section>
);
