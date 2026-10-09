import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Globe2, School } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/ui/accordion";
import { PageHero } from "../components/site/PageHero";
import { Reveal, Eyebrow } from "../components/site/Motion";
import { EnquirySection } from "../components/site/EnquirySection";
import { PlacementStories } from "../components/home/PlacementStories";
import { scrollToId } from "../components/site/SmoothScroll";
import { BookSessionButton } from "../components/site/BookSession";
import { INSTITUTE_PARTS, PROGRAMS, JOURNEY, INSTITUTE_FAQ } from "../data/content";
import { Seo, faqJsonLd } from "../components/site/Seo";

const MODES = [
  { icon: School, t: "Classroom · Ahmedabad", d: "Classroom coaching and lab infrastructure at Parishram Elegant, Science City Road, near Sola Overbridge.", img: "/media/lab.jpg" },
  { icon: Globe2, t: "Online · Worldwide", d: "The same programs and mentors, live online — open to international students in the USA and beyond.", img: "/media/online.jpg" },
];

let counter = 0;
const numbered = INSTITUTE_PARTS.map((p) => ({ ...p, items: p.items.map((t) => ({ t, n: ++counter })) }));

const Programs = () => (
  <div className="mt-10 grid gap-5 lg:grid-cols-3">
    {PROGRAMS.map((p, i) => (
      <Reveal key={p.key} delay={i * 0.08} className="h-full">
        <div data-testid={`institute-program-${p.key}`} className="group flex h-full flex-col rounded-[28px] border border-[#CFE9D8] bg-white p-7 transition-[transform,box-shadow] duration-500 hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgba(30,154,74,0.45)]">
          <div className="flex items-center justify-between"><span className="rounded-full bg-[#EAF7EF] px-3 py-1 text-xs font-semibold text-[#146B34]">{p.tag}</span><span className="font-mono text-xs text-[#3B4A66]">6 months · 24 weeks</span></div>
          <h3 className="font-display mt-6 text-2xl font-semibold tracking-tight text-[#0F1F5C] sm:text-[28px]">{p.title}</h3>
          <p className="mt-3 flex-1 text-[15px] leading-relaxed text-[#3B4A66]">{p.desc}</p>
          <p className="mt-5 border-t border-[#E3E8F2] pt-4 text-sm text-[#0F1F5C]">{p.includes}</p>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <Link to={`/institute/programs/${p.slug}`} data-testid={`institute-program-${p.key}-details-link`} className="inline-flex items-center gap-2 rounded-full bg-[#0F1F5C] px-5 py-3 text-sm font-semibold text-white transition-[background-color] duration-300 hover:bg-[#1E9A4A]">Syllabus & schedule <ArrowUpRight className="h-4 w-4" /></Link>
            <button onClick={() => scrollToId("enquire")} data-testid={`institute-program-${p.key}-fees-btn`} className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1E9A4A]">Enquire for fees <ArrowRight className="h-4 w-4" /></button>
          </div>
        </div>
      </Reveal>
    ))}
  </div>
);

const Features = () => (
  <div className="mt-12 space-y-14">
    {numbered.map((part) => (
      <Reveal key={part.no}>
        <div className="grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-4"><span className="font-mono text-xs uppercase tracking-[0.2em] text-[#1E9A4A]">{part.no}</span><h3 className="font-display mt-2 text-3xl font-semibold tracking-tight text-[#0F1F5C]">{part.title}</h3></div>
          <ul className="grid gap-3 sm:grid-cols-2 lg:col-span-8">
            {part.items.map((it) => (
              <li key={it.n} className={`flex items-center gap-3 rounded-2xl border p-4 text-[15px] font-medium ${it.t.includes("Flagship") ? "border-[#1E9A4A] bg-[#0F1F5C] text-white" : "border-[#E3E8F2] bg-white text-[#0F1F5C]"}`}>
                <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-lg text-xs font-bold ${it.t.includes("Flagship") ? "bg-[#1E9A4A] text-white" : "bg-[#EAF7EF] text-[#146B34]"}`}>{it.n}</span>{it.t}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    ))}
  </div>
);

export default function Institute() {
  return (
    <main data-testid="institute-page">
      <Seo path="/institute" image="/og/og-institute.jpg" imageAlt="Goalfinity Institute of Professional Studies, Ahmedabad" title="Career Courses in Ahmedabad & Online | Goalfinity Institute" description="Goalfinity Institute in Ahmedabad: 6-month programs in AI & Data Science, Investment Banking and Digital Marketing, in classroom or online, with placement assistance." jsonLd={faqJsonLd(INSTITUTE_FAQ)} />
      <PageHero tid="institute-hero" tone="green" accent="#1E9A4A" eyebrow="Goalfinity Institute of Professional Studies · Ahmedabad & Online" lines={["Skill up.", "Stand out.", <span key="s" className="text-[#1E9A4A]">Succeed.</span>]} lead="One vision. Many paths. Endless impact. Industry programs in IT, business, banking and professional education — with classroom coaching in Ahmedabad, an online mode for international students and dedicated placement assistance." image="/media/lecture.jpg" imageAlt="Students in a lecture hall">
        <BookSessionButton vertical="institute" tid="institute-book-session-btn" />
        <button onClick={() => scrollToId("enquire")} data-testid="institute-hero-enquire-btn" className="group inline-flex items-center gap-2 rounded-full border border-[#CFE9D8] bg-white px-7 py-4 text-[15px] font-semibold text-[#0F1F5C] transition-[border-color] duration-300 hover:border-[#1E9A4A]">Enquire for fees <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" /></button>
      </PageHero>
      <section className="mx-auto grid max-w-[1360px] gap-5 px-5 py-20 sm:px-8 md:grid-cols-2 md:py-28">
        {MODES.map((m, i) => (
          <Reveal key={m.t} delay={i * 0.08}>
            <div data-testid={`institute-mode-${i}`} className="group relative h-[380px] overflow-hidden rounded-[30px]">
              <img src={m.img} alt={m.t} className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F1F5C] via-[#0F1F5C]/50 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-7 text-white"><m.icon className="h-7 w-7 text-[#7FD9A0]" /><h3 className="font-display mt-3 text-3xl font-semibold tracking-tight">{m.t}</h3><p className="mt-2 max-w-md text-[15px] text-white/85">{m.d}</p></div>
            </div>
          </Reveal>
        ))}
      </section>
      <section className="bg-[#F1F9F4] py-20 md:py-28">
        <div className="mx-auto max-w-[1360px] px-5 sm:px-8">
          <Reveal><Eyebrow tone="green">Professional programs</Eyebrow><h2 className="font-display mt-5 max-w-3xl text-4xl font-semibold leading-[1.02] tracking-tight text-[#0F1F5C] sm:text-6xl">Choose what you want to become.</h2></Reveal>
          <Programs />
          <Reveal className="mt-16 flex flex-wrap items-center gap-3">
            {JOURNEY.map((j, i) => <span key={j} className="flex items-center gap-3"><span className="font-display text-2xl font-semibold text-[#0F1F5C] sm:text-4xl">{j}</span>{i < JOURNEY.length - 1 && <ArrowRight className="h-5 w-5 text-[#1E9A4A]" />}</span>)}
          </Reveal>
        </div>
      </section>
      <section className="mx-auto max-w-[1360px] px-5 py-20 sm:px-8 md:py-28">
        <Reveal><Eyebrow tone="green">Program highlights · 30 features</Eyebrow><h2 className="font-display mt-5 max-w-3xl text-4xl font-semibold leading-[1.02] tracking-tight text-[#0F1F5C] sm:text-6xl">Learn, get hired and grow — in one program.</h2></Reveal>
        <Features />
      </section>
      <section className="mx-auto max-w-[1000px] px-5 pb-10 sm:px-8">
        <Reveal><Eyebrow tone="green">Questions</Eyebrow></Reveal>
        <Accordion type="single" collapsible className="mt-6" data-testid="institute-faq">
          {INSTITUTE_FAQ.map((f, i) => (
            <AccordionItem key={f.q} value={`f${i}`}>
              <AccordionTrigger data-testid={`institute-faq-${i}`} className="font-display text-left text-lg font-semibold text-[#0F1F5C] sm:text-xl">{f.q}</AccordionTrigger>
              <AccordionContent className="text-[15px] leading-relaxed text-[#3B4A66]">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
      <PlacementStories tid="institute-stories-section" types={["institute", "online"]} title={<>Learners in Ahmedabad and online, <span className="text-[#1E9A4A]">now career-ready.</span></>} lead="Classroom and online students who completed a Goalfinity Institute program and moved into the roles they trained for." />
      <EnquirySection defaultVertical="institute" title="Ready to build your career with Goalfinity?" />
    </main>
  );
}
