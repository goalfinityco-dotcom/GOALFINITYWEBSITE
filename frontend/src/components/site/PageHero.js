import { motion } from "framer-motion";
import { MaskLines, Eyebrow } from "./Motion";

const EASE = [0.16, 1, 0.3, 1];

export const PageHero = ({ eyebrow, tone = "blue", lines, lead, image, imageAlt, children, accent = "#2480F1", tid, logo }) => (
  <section data-testid={tid} className="relative overflow-hidden pt-32 sm:pt-40">
    <div className="grid-lines pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black_25%,transparent_70%)]" />
    <div className="relative mx-auto max-w-[1360px] px-5 sm:px-8">
      {logo && <motion.div data-testid="page-hero-logo" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE }} className="mb-8">{logo}</motion.div>}
      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE }}><Eyebrow tone={tone}>{eyebrow}</Eyebrow></motion.div>
      <h1 className="font-display mt-6 text-[12.5vw] font-bold leading-[0.95] tracking-[-0.035em] sm:text-7xl lg:text-[96px]">
        <MaskLines lines={lines} delay={0.1} />
      </h1>
      <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:items-end">
        <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: EASE, delay: 0.5 }} className="max-w-xl text-[17px] leading-relaxed text-[#3B4A66] sm:text-lg lg:col-span-7">{lead}</motion.p>
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: EASE, delay: 0.65 }} className="flex flex-wrap gap-3 lg:col-span-5 lg:justify-end">{children}</motion.div>
      </div>
      <motion.div initial={{ clipPath: "inset(12% 12% 12% 12% round 40px)" }} animate={{ clipPath: "inset(0% 0% 0% 0% round 32px)" }} transition={{ duration: 1.4, ease: EASE, delay: 0.35 }} className="relative mt-14 aspect-[16/10] overflow-hidden sm:aspect-[21/9]">
        <img src={image} alt={imageAlt} className="h-full w-full object-cover" />
        <div className="absolute inset-0" style={{ background: `linear-gradient(120deg, ${accent}55, transparent 55%)` }} />
      </motion.div>
    </div>
  </section>
);
