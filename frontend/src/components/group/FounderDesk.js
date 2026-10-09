import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Quote } from "lucide-react";
import { Reveal, Eyebrow } from "../site/Motion";
import { FOUNDER } from "../../data/group";

const Portrait = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  return (
    <div ref={ref} className="relative">
      <div className="arch relative aspect-[4/5] overflow-hidden bg-[#DCE9FB] shadow-[0_50px_100px_-40px_rgba(11,63,158,0.5)]">
        <motion.img style={{ y, scale: 1.12 }} src={FOUNDER.image} alt={`${FOUNDER.name}, ${FOUNDER.title}`} className="h-full w-full object-cover object-top" />
      </div>
      <div className="absolute -bottom-6 left-1/2 w-[86%] -translate-x-1/2 rounded-3xl border border-white/70 bg-white/90 p-5 text-center shadow-xl backdrop-blur-xl">
        <p className="font-display text-2xl font-semibold tracking-tight">{FOUNDER.name}</p>
        <p className="text-sm text-[#3B4A66]">{FOUNDER.title}</p>
      </div>
    </div>
  );
};

export const FounderDesk = ({ full = false }) => {
  const paras = full ? FOUNDER.message : FOUNDER.message.slice(0, 3);
  return (
    <section id="founder" data-testid="founder-section" className="relative overflow-hidden bg-[#F4F7FD] py-20 md:py-28">
      <div className="mx-auto grid max-w-[1360px] gap-16 px-5 sm:px-8 lg:grid-cols-12 lg:gap-14">
        <Reveal className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <Portrait />
            <div className="mt-14 grid grid-cols-2 gap-3">
              {FOUNDER.stats.map((s, i) => (
                <div key={s.v} data-testid={`founder-stat-${i}`} className="rounded-2xl border border-[#E3E8F2] bg-white p-5">
                  <p className="font-display text-4xl font-bold tracking-tight text-[#0B3F9E]">{s.v}</p>
                  <p className="mt-1 text-sm leading-snug text-[#3B4A66]">{s.l}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.1} className="lg:col-span-7">
          <Eyebrow tone="amber">Founder's Desk</Eyebrow>
          <h2 className="font-display mt-5 text-4xl font-semibold leading-[1.02] tracking-tight sm:text-6xl">A message from the founder.</h2>
          <div className="mt-8 space-y-5 text-[17px] leading-relaxed text-[#3B4A66]">{paras.map((p) => <p key={p.slice(0, 24)}>{p}</p>)}</div>
          <figure className="relative mt-10 rounded-[28px] bg-[#0B3F9E] p-8 text-white sm:p-10">
            <Quote className="h-8 w-8 text-[#F5A623]" />
            <blockquote className="font-display mt-4 text-2xl font-medium leading-snug tracking-tight sm:text-3xl">"{FOUNDER.quote}"</blockquote>
            <figcaption className="mt-6 text-sm text-white/80">Warm regards, <span className="font-semibold text-white">{FOUNDER.name}</span> · {FOUNDER.title}</figcaption>
          </figure>
          {!full && <Link to="/about#founder" data-testid="founder-read-more" className="mt-8 inline-flex items-center gap-1.5 font-semibold text-[#0B3F9E]"><span className="link-underline">Read the full message</span><ArrowUpRight className="h-4 w-4" /></Link>}
        </Reveal>
      </div>
    </section>
  );
};
