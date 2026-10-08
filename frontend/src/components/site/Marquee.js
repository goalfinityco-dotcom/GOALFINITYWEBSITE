import { StarMark } from "./Brand";

const ITEMS = [
  "OPT & STEM OPT guidance",
  "80–100 quality job applications",
  "Live interview mentorship",
  "Classroom coaching in Ahmedabad",
  "Online mode, anywhere in the world",
  "100% Job Placement / Career Guarantee Program",
  "IT · Business · Banking · Professional Education",
];

export const Marquee = () => (
  <section data-testid="editorial-marquee" aria-label="Highlights" className="marquee-wrap relative overflow-hidden border-y border-[#E3E8F2] bg-white py-6 sm:py-8">
    <div className="marquee-track">
      {[0, 1].map((k) => (
        <div key={k} className="flex shrink-0 items-center" aria-hidden={k === 1}>
          {ITEMS.map((t, i) => (
            <span key={t} className="flex items-center">
              <span className={`font-display whitespace-nowrap px-6 text-3xl font-semibold tracking-tight sm:px-10 sm:text-5xl ${i % 2 ? "text-stroke" : "text-[#0A1B3D]"}`}>{t}</span>
              <StarMark className="h-6 w-6 shrink-0 sm:h-8 sm:w-8" color={i % 3 === 2 ? "#1E9A4A" : "#F5A623"} />
            </span>
          ))}
        </div>
      ))}
    </div>
  </section>
);
