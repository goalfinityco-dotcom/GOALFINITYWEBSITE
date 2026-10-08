import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowUpRight, Send } from "lucide-react";
import { MaskLines, Tilt, Eyebrow } from "../site/Motion";
import { StarMark } from "../site/Brand";
import { scrollToId } from "../site/SmoothScroll";
import { PathCards } from "./PathCards";

const EASE = [0.16, 1, 0.3, 1];
const fade = (d) => ({ initial: { opacity: 0, y: 18 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.9, ease: EASE, delay: d } });

const RotatingBadge = () => (
  <div className="absolute -left-8 top-10 z-20 hidden h-32 w-32 sm:block" style={{ transform: "translateZ(60px)" }}>
    <svg viewBox="0 0 120 120" className="spin-slow absolute inset-0 h-full w-full">
      <defs><path id="circ" d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" /></defs>
      <circle cx="60" cy="60" r="58" fill="white" />
      <text fill="#0B3F9E" fontSize="9" fontFamily="JetBrains Mono" letterSpacing="1.6"><textPath href="#circ">FROM PROFILE TO PLACEMENT · AND BEYOND ·</textPath></text>
    </svg>
    <StarMark className="absolute left-1/2 top-1/2 h-9 w-9 -translate-x-1/2 -translate-y-1/2" />
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
          <div className="arch relative aspect-[4/5] overflow-hidden bg-[#DCE9FB] shadow-[0_50px_100px_-40px_rgba(11,63,158,0.55)]">
            <motion.img style={{ y, scale: 1.15 }} src="/media/grad-hero.jpg" alt="International graduate ready for a US career" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B3F9E]/45 via-transparent to-transparent" />
          </div>
          <RotatingBadge />
          <div data-testid="hero-metric-card" className="absolute -bottom-6 right-3 z-20 w-52 rounded-3xl border border-white/60 bg-white/80 p-5 shadow-2xl backdrop-blur-xl sm:-right-8 sm:w-56" style={{ transform: "translateZ(80px)" }}>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#0B3F9E]">Applications</p>
            <p className="font-display mt-1 text-5xl font-bold tracking-tight text-[#0A1B3D]">80–100</p>
            <p className="mt-1 text-sm leading-snug text-[#3B4A66]">quality applications, matched to your skills & goals</p>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[#EAF3FF]"><motion.div initial={{ width: "0%" }} animate={{ width: "86%" }} transition={{ duration: 2, ease: EASE, delay: 1 }} className="h-full rounded-full bg-gradient-to-r from-[#0B3F9E] to-[#2480F1]" /></div>
          </div>
        </div>
      </Tilt>
    </motion.div>
  );
};

export const HomeHero = () => (
  <section data-testid="home-hero" className="relative overflow-hidden pt-28 sm:pt-32">
    <div className="grid-lines pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)]" />
    <div className="relative mx-auto max-w-[1360px] px-5 sm:px-8">
      <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-7">
          <motion.div {...fade(0)}><Eyebrow>Goalfinity Careers · For international students in the USA</Eyebrow></motion.div>
          <h1 data-testid="home-hero-title" className="font-display mt-6 text-[13vw] font-bold leading-[0.95] tracking-[-0.035em] text-[#0A1B3D] sm:text-7xl lg:text-[84px] xl:text-[96px]">
            <MaskLines lines={["Your career,", <span key="l2">fully <span className="text-[#2480F1]">supported.</span></span>]} delay={0.15} />
          </h1>
          <motion.p {...fade(0.55)} className="mt-7 max-w-xl text-[17px] leading-relaxed text-[#3B4A66] sm:text-lg">
            From profile to placement — and beyond. Resume, LinkedIn, 80–100 targeted applications, live interview mentorship and OPT / STEM OPT guidance for F-1 students across the US.
          </motion.p>
          <motion.div {...fade(0.7)} className="mt-9 flex flex-wrap gap-3">
            <Link to="/careers" data-testid="hero-explore-careers-btn" className="group inline-flex items-center gap-3 rounded-full bg-[#0B3F9E] px-7 py-4 text-[15px] font-semibold text-white shadow-[0_16px_40px_-14px_rgba(11,63,158,0.8)] transition-[background-color,transform] duration-300 hover:-translate-y-0.5 hover:bg-[#2480F1]">
              Explore Goalfinity Careers <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <button onClick={() => scrollToId("enquire")} data-testid="hero-enquire-btn" className="group inline-flex items-center gap-2 rounded-full border border-[#C9D6EC] bg-white px-7 py-4 text-[15px] font-semibold text-[#0A1B3D] transition-[border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-[#0B3F9E]">
              Free consultation <Send className="h-4 w-4" />
            </button>
          </motion.div>
          <motion.a {...fade(0.85)} href="#institute" onClick={(e) => { e.preventDefault(); scrollToId("institute"); }} data-testid="hero-institute-hint" className="mt-8 inline-flex items-center gap-2 text-sm text-[#3B4A66]">
            <span className="h-2 w-2 rounded-full bg-[#1E9A4A]" /> In Ahmedabad? Meet <span className="font-semibold text-[#1E9A4A]">Goalfinity Institute</span> <ArrowUpRight className="h-4 w-4 text-[#1E9A4A]" />
          </motion.a>
        </div>
        <div className="pb-8 lg:col-span-5"><HeroVisual /></div>
      </div>
      <PathCards />
    </div>
  </section>
);
