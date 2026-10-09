import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";
import { MaskLines, Tilt, Eyebrow } from "../site/Motion";
import { StarMark } from "../site/Brand";
import { scrollToId } from "../site/SmoothScroll";
import { PathCards } from "./PathCards";
import { GROUP, FOUNDER } from "../../data/group";

const EASE = [0.16, 1, 0.3, 1];
const fade = (d) => ({ initial: { opacity: 0, y: 18 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.9, ease: EASE, delay: d } });

const RotatingBadge = () => (
  <div className="absolute -left-6 -top-6 z-20 hidden h-28 w-28 sm:block" style={{ transform: "translateZ(60px)" }}>
    <svg viewBox="0 0 120 120" className="spin-slow absolute inset-0 h-full w-full">
      <defs><path id="circ" d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" /></defs>
      <circle cx="60" cy="60" r="58" fill="#0B3F9E" />
      <text fill="#ffffff" fontSize="9.5" fontFamily="JetBrains Mono" letterSpacing="1.4"><textPath href="#circ">INFINITE POSSIBILITIES · REAL GOALS ·</textPath></text>
    </svg>
    <StarMark className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2" />
  </div>
);

const Stat = ({ s, className, tid }) => (
  <div data-testid={tid} className={`absolute z-20 hidden rounded-2xl border border-white/70 bg-white/85 px-4 py-3 shadow-xl backdrop-blur-xl sm:block ${className}`} style={{ transform: "translateZ(80px)" }}>
    <p className="font-display text-3xl font-bold tracking-tight text-[#0B3F9E]">{s.v}</p>
    <p className="max-w-[150px] text-xs leading-snug text-[#3B4A66]">{s.l}</p>
  </div>
);

const HeroVisual = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  return (
  <motion.div ref={ref} initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.3, ease: EASE, delay: 0.2 }} className="relative mx-auto w-full max-w-[460px]">
    <div className="spotlight absolute -inset-16 -z-10" />
    <Tilt>
      <div className="relative" style={{ transformStyle: "preserve-3d" }}>
        <div data-testid="hero-student-image" className="arch relative aspect-[4/5] overflow-hidden bg-[#DCE9FB] shadow-[0_50px_100px_-40px_rgba(11,63,158,0.55)]">
          <motion.img style={{ y, scale: 1.15 }} src="/media/grad-hero.jpg" alt="International graduate ready for a US career" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B3F9E]/45 via-transparent to-transparent" />
        </div>
        <RotatingBadge />
        <Stat s={FOUNDER.stats[0]} tid="hero-stat-years" className="-bottom-6 left-4 sm:-left-8" />
        <Stat s={FOUNDER.stats[1]} tid="hero-stat-students" className="-bottom-6 right-4 sm:-right-8" />
      </div>
    </Tilt>
    <div className="mt-4 grid grid-cols-2 gap-3 sm:hidden">
      {FOUNDER.stats.map((s) => (
        <div key={s.v} data-testid="hero-stat-mobile" className="rounded-2xl border border-[#E3E8F2] bg-white px-4 py-3">
          <p className="font-display text-2xl font-bold tracking-tight text-[#0B3F9E]">{s.v}</p>
          <p className="text-xs leading-snug text-[#3B4A66]">{s.l}</p>
        </div>
      ))}
    </div>
  </motion.div>
  );
};

export const HomeHero = () => (
  <section data-testid="home-hero" className="relative overflow-hidden pt-28 sm:pt-32">
    <div className="grid-lines pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)]" />
    <div className="relative mx-auto max-w-[1360px] px-5 sm:px-8">
      <div className="grid items-center gap-16 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-7">
          <motion.div {...fade(0)}><Eyebrow>Goalfinity Group · {GROUP.pillars}</Eyebrow></motion.div>
          <h1 data-testid="home-hero-title" className="font-display mt-6 text-[12.5vw] font-bold leading-[0.95] tracking-[-0.035em] text-[#0A1B3D] sm:text-7xl lg:text-[80px] xl:text-[92px]">
            <MaskLines lines={[GROUP.tagline[0], <span key="c" className="text-[#C98A00]">{GROUP.tagline[1]}</span>, GROUP.tagline[2]]} delay={0.15} />
          </h1>
          <motion.p {...fade(0.6)} className="mt-7 max-w-xl text-[17px] leading-relaxed text-[#3B4A66] sm:text-lg">
            One group, two clear paths. Goalfinity Careers supports international students in the USA into the right jobs, and Goalfinity Institute builds career-ready skills in Ahmedabad and online.
          </motion.p>
          <motion.div {...fade(0.75)} className="mt-9 flex flex-wrap gap-3">
            <button onClick={() => scrollToId("journey")} data-testid="hero-choose-journey-btn" className="group inline-flex items-center gap-3 rounded-full bg-[#0B3F9E] px-7 py-4 text-[15px] font-semibold text-white shadow-[0_16px_40px_-14px_rgba(11,63,158,0.8)] transition-[background-color,transform] duration-300 hover:-translate-y-0.5 hover:bg-[#2480F1]">
              Choose your journey <ArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
            </button>
            <button onClick={() => scrollToId("founder")} data-testid="hero-founder-btn" className="group inline-flex items-center gap-2 rounded-full border border-[#C9D6EC] bg-white px-7 py-4 text-[15px] font-semibold text-[#0A1B3D] transition-[border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-[#0B3F9E]">
              Meet the founder <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </motion.div>
        </div>
        <div className="pb-8 lg:col-span-5"><HeroVisual /></div>
      </div>
      <PathCards />
    </div>
  </section>
);
