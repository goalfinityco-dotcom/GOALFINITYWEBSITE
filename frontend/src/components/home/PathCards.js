import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight, GraduationCap, Globe2, MapPin, Briefcase } from "lucide-react";
import { StarMark } from "../site/Brand";

const EASE = [0.16, 1, 0.3, 1];

const Chip = ({ icon: Icon, children, light }) => (
  <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium ${light ? "bg-white/15 text-white" : "bg-[#EAF7EF] text-[#146B34]"}`}>
    <Icon className="h-3.5 w-3.5" />{children}
  </span>
);

export const PathCards = () => (
  <div className="mt-16 sm:mt-20">
    <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#3B4A66]">Two paths · One goal — pick yours</p>
    <div className="mt-4 grid gap-4 lg:grid-cols-12">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: EASE, delay: 0.9 }} className="lg:col-span-7">
        <Link to="/careers" data-testid="path-card-careers" className="group relative flex h-full flex-col justify-between overflow-hidden rounded-[30px] bg-[#0B3F9E] p-7 text-white sm:p-9">
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full border-[28px] border-[#2480F1]/40 transition-transform duration-700 group-hover:scale-110" />
          <StarMark className="absolute right-10 top-8 h-7 w-7 transition-transform duration-700 group-hover:rotate-[72deg]" />
          <div className="relative">
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#F5A623]">01 · Primary · USA</span>
            <h3 className="font-display mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">Goalfinity Careers</h3>
            <p className="mt-3 max-w-lg text-[15px] leading-relaxed text-white/85">For international students in the USA: end-to-end job search support, from ATS resume to offer letter and re-employment.</p>
          </div>
          <div className="relative mt-8 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2"><Chip light icon={Briefcase}>OPT / STEM OPT</Chip><Chip light icon={MapPin}>Harrisonville, MO</Chip></div>
            <span className="grid h-12 w-12 place-items-center rounded-full bg-white text-[#0B3F9E] transition-transform duration-500 group-hover:rotate-45"><ArrowUpRight className="h-5 w-5" /></span>
          </div>
        </Link>
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: EASE, delay: 1.02 }} className="lg:col-span-5">
        <Link to="/institute" data-testid="path-card-institute" className="group relative flex h-full flex-col justify-between overflow-hidden rounded-[30px] border border-[#CFE9D8] bg-white p-7 sm:p-9">
          <div className="absolute -bottom-20 -right-20 h-56 w-56 rounded-full bg-[#EAF7EF] transition-transform duration-700 group-hover:scale-125" />
          <div className="relative">
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#1E9A4A]">02 · Classroom & Online</span>
            <h3 className="font-display mt-4 text-3xl font-semibold tracking-tight text-[#0F1F5C] sm:text-4xl">Goalfinity Institute</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-[#3B4A66]">Learn in classroom or online, from anywhere: 6-month career programs with dedicated placement assistance.</p>
          </div>
          <div className="relative mt-8 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2"><Chip icon={GraduationCap}>Classroom</Chip><Chip icon={Globe2}>Online mode</Chip></div>
            <span className="grid h-12 w-12 place-items-center rounded-full bg-[#1E9A4A] text-white transition-transform duration-500 group-hover:rotate-45"><ArrowUpRight className="h-5 w-5" /></span>
          </div>
        </Link>
      </motion.div>
    </div>
  </div>
);
