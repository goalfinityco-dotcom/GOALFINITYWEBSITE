import { Quote } from "lucide-react";
import { Reveal, Eyebrow } from "../site/Motion";
import { STORIES } from "../../data/stories";

const TONES = {
  careers: { chip: "bg-[#EAF3FF] text-[#0B3F9E]", avatar: "bg-[#0B3F9E]", label: "Careers · USA" },
  institute: { chip: "bg-[#EAF7EF] text-[#146B34]", avatar: "bg-[#1E9A4A]", label: "Institute · Ahmedabad" },
  online: { chip: "bg-[#FFF6E5] text-[#8A5300]", avatar: "bg-[#0F1F5C]", label: "Institute · Online" },
};

const initials = (n) => n.split(" ").map((p) => p[0]).join("").slice(0, 2);

const StoryCard = ({ s, idx }) => {
  const t = TONES[s.type];
  return (
    <article data-testid={`story-card-${idx}`} className="mx-2.5 flex w-[300px] shrink-0 flex-col rounded-[26px] border border-[#E3E8F2] bg-white p-6 sm:w-[360px]">
      <div className="flex items-center justify-between">
        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${t.chip}`}>{t.label}</span>
        <Quote className="h-5 w-5 text-[#F5A623]" />
      </div>
      <p className="mt-4 flex-1 text-[15px] leading-relaxed text-[#0A1B3D]">"{s.quote}"</p>
      <div className="mt-5 flex items-center gap-3 border-t border-[#E3E8F2] pt-4">
        <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-full text-sm font-bold text-white ${t.avatar}`}>{initials(s.name)}</span>
        <div className="min-w-0 leading-tight">
          <p className="truncate font-semibold">{s.name}</p>
          <p className="text-xs leading-snug text-[#3B4A66]">{s.origin}</p>
        </div>
      </div>
      <p className="mt-4 rounded-2xl bg-[#F7F9FC] px-4 py-3 text-sm"><span className="text-[#3B4A66]">Hired as</span> <span className="font-semibold">{s.role}</span> <span className="text-[#3B4A66]">at</span> <span className="font-semibold text-[#0B3F9E]">{s.company}</span></p>
    </article>
  );
};

const Row = ({ items, reverse, offset }) => (
  <div className="marquee-wrap overflow-hidden py-2.5">
    <div className={`marquee-track items-stretch ${reverse ? "marquee-reverse" : ""}`} style={{ animationDuration: "80s" }}>
      {[0, 1].map((k) => (
        <div key={k} className="flex items-stretch" aria-hidden={k === 1}>
          {items.map((s, i) => <StoryCard key={s.name} s={s} idx={k === 0 ? offset + i : `dup-${offset + i}`} />)}
        </div>
      ))}
    </div>
  </div>
);

export const PlacementStories = () => {
  const half = Math.ceil(STORIES.length / 2);
  return (
    <section data-testid="placement-stories-section" className="relative py-20 md:py-28">
      <Reveal className="mx-auto mb-12 grid max-w-[1360px] gap-6 px-5 sm:px-8 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <Eyebrow tone="amber">Placement stories</Eyebrow>
          <h2 className="font-display mt-5 text-4xl font-semibold leading-[1.02] tracking-tight sm:text-6xl">From classrooms and campuses <span className="text-[#2480F1]">to offer letters.</span></h2>
        </div>
        <p className="text-[17px] leading-relaxed text-[#3B4A66] lg:col-span-5">International students across the US and learners in Ahmedabad and online, now working in roles they trained and prepared for with Goalfinity.</p>
      </Reveal>
      <div className="[mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
        <Row items={STORIES.slice(0, half)} offset={0} />
        <Row items={STORIES.slice(half)} offset={half} reverse />
      </div>
    </section>
  );
};
