import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Reveal, Eyebrow } from "../site/Motion";

export const OnlineBridge = () => (
  <section data-testid="online-bridge-section" className="mx-auto max-w-[1360px] px-5 pt-20 sm:px-8 md:pt-28">
    <Reveal>
      <div className="grid overflow-hidden rounded-[36px] bg-gradient-to-br from-[#0B3F9E] via-[#0F1F5C] to-[#0F1F5C] text-white lg:grid-cols-2">
        <div className="relative p-8 sm:p-12 lg:p-14">
          <Eyebrow tone="amber" className="!text-[#F5A623]">For international students</Eyebrow>
          <h2 className="font-display mt-5 text-4xl font-semibold leading-[1.02] tracking-tight sm:text-5xl">Already in the US? Learn with the Institute — online.</h2>
          <p className="mt-5 max-w-lg text-[17px] leading-relaxed text-white/80">Pair Goalfinity Careers job support with an Institute program in AI & Data Science, Investment Banking or Digital Marketing, taught live online. Build the skills, then let us take them to market.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/institute" data-testid="bridge-institute-btn" className="group inline-flex items-center gap-2 rounded-full bg-[#1E9A4A] px-6 py-3.5 text-sm font-semibold transition-[background-color] duration-300 hover:bg-[#23B157]">Online programs <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" /></Link>
            <Link to="/careers" data-testid="bridge-careers-btn" className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3.5 text-sm font-semibold transition-[background-color] duration-300 hover:bg-white/10">Career support in the USA</Link>
          </div>
        </div>
        <div className="relative min-h-[300px]">
          <img src="/media/online.jpg" alt="Student attending a live online session" className="absolute inset-0 h-full w-full object-cover lg:[clip-path:inset(24px_24px_24px_0_round_28px)]" />
        </div>
      </div>
    </Reveal>
  </section>
);
