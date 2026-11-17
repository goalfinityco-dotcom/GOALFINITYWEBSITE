import { ArrowRight, Check, GraduationCap, Plane, BadgeCheck, Briefcase, Send, Code, FileText, MessagesSquare, HandCoins, ClipboardCheck, UserCheck, Network, Github } from "lucide-react";
import { PageHero } from "../components/site/PageHero";
import { Reveal, Eyebrow } from "../components/site/Motion";
import { EnquirySection } from "../components/site/EnquirySection";
import { Marquee } from "../components/site/Marquee";
import { PlacementStories } from "../components/home/PlacementStories";
import { scrollToId } from "../components/site/SmoothScroll";
import { BookSessionButton } from "../components/site/BookSession";
import { CAREERS_PILLARS, CAREERS_FAQ } from "../data/content";
import { Seo, faqJsonLd } from "../components/site/Seo";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/ui/accordion";

const SERVICES = [
  { icon: Send, t: "100 Targeted Job Applications Daily" },
  { icon: Plane, t: "OPT & STEM OPT Career Guidance" },
  { icon: Code, t: "Dedicated Technical Mentorship" },
  { icon: FileText, t: "Resume Building & LinkedIn Optimization" },
  { icon: MessagesSquare, t: "Live Interview Preparation & Support" },
  { icon: HandCoins, t: "Salary Negotiation Assistance" },
  { icon: ClipboardCheck, t: "Mock Interviews & Technical Assessments" },
  { icon: UserCheck, t: "Dedicated Career Success Manager" },
  { icon: Network, t: "Employer & Recruiter Networking" },
  { icon: BadgeCheck, t: "End-to-End Job Placement Assistance" },
  { icon: Github, t: "GitHub & Portfolio Building" },
];

const FOR_WHO = [
  { icon: GraduationCap, t: "F-1 students & recent grads", d: "Finishing a Master's or Bachelor's in the US and starting the job hunt." },
  { icon: Plane, t: "On OPT", d: "Your unemployment clock is running and every week counts." },
  { icon: BadgeCheck, t: "On STEM OPT", d: "Extending your stay and need the right role and employer requirements." },
  { icon: Briefcase, t: "Between jobs", d: "Lost a role and need to get back to work quickly." },
];

const Pillar = ({ p, i }) => (
  <Reveal>
    <article data-testid={`careers-pillar-${p.no}`} className="grid gap-8 border-t border-[#E3E8F2] py-14 lg:grid-cols-12 lg:gap-12">
      <div className="lg:col-span-5">
        <div className="lg:sticky lg:top-28">
          <span className="font-display block text-8xl font-bold leading-none tracking-tight text-[#2480F1]/15 sm:text-9xl">{p.no}</span>
          <h3 className="font-display -mt-6 text-3xl font-semibold tracking-tight sm:text-4xl">{p.title}</h3>
          <p className="mt-3 max-w-md text-[16px] leading-relaxed text-[#3B4A66]">{p.lead}</p>
          <div className={`mt-6 aspect-[4/3] overflow-hidden rounded-[24px] ${i % 2 ? "[clip-path:polygon(0_0,100%_0,100%_100%,14%_100%,0_86%)]" : "[clip-path:polygon(0_0,86%_0,100%_14%,100%_100%,0_100%)]"}`}>
            <img src={p.image} alt={p.title} className="h-full w-full object-cover" />
          </div>
        </div>
      </div>
      <ul className="grid content-start gap-3 sm:grid-cols-2 lg:col-span-7">
        {p.items.map((it) => (
          <li key={it} className="flex items-start gap-3 rounded-2xl border border-[#E3E8F2] bg-white p-4 text-[15px] font-medium transition-[border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-[#2480F1]">
            <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#EAF3FF]"><Check className="h-3.5 w-3.5 text-[#0B3F9E]" /></span>{it}
          </li>
        ))}
      </ul>
    </article>
  </Reveal>
);

export default function Careers() {
  return (
    <main data-testid="careers-page">
      <Seo path="/careers" image="/og/og-careers.jpg" imageAlt="Goalfinity Careers: career services for international students in the USA" title="OPT & STEM OPT Job Search Support in the USA | Goalfinity" description="Goalfinity Careers helps international students in the USA with ATS resumes, 80–100 targeted job applications, interview mentorship and OPT / STEM OPT guidance." jsonLd={faqJsonLd(CAREERS_FAQ)} />
      <PageHero tid="careers-hero" eyebrow="Goalfinity Careers · USA" lines={["Land the role.", <span key="b">We stay <span className="text-[#2480F1]">beside you.</span></span>]} lead="Turn your qualifications into a compelling professional profile with personalized career support built for international students in the USA. From ATS-optimized resumes and LinkedIn positioning to targeted job-search strategies, technical interview preparation, and OPT/STEM OPT employment guidance, we help you take a more focused and confident approach to your career journey." image="/media/corporate.jpg" imageAlt="Professionals collaborating in a US office">
        <BookSessionButton vertical="careers" tid="careers-book-session-btn" />
        <button onClick={() => scrollToId("enquire")} data-testid="careers-hero-enquire-btn" className="group inline-flex items-center gap-2 rounded-full border border-[#C9D6EC] bg-white px-7 py-4 text-[15px] font-semibold text-[#0A1B3D] transition-[border-color] duration-300 hover:border-[#0B3F9E]">Send an enquiry <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" /></button>
      </PageHero>
      <section className="mx-auto max-w-[1360px] px-5 py-20 sm:px-8 md:py-28">
        <Reveal><Eyebrow>Who it's for</Eyebrow></Reveal>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FOR_WHO.map((f, i) => (
            <Reveal key={f.t} delay={i * 0.06} className="h-full">
              <div data-testid={`careers-for-${i}`} className="h-full rounded-[24px] border border-[#E3E8F2] bg-white p-6">
                <f.icon className="h-7 w-7 text-[#2480F1]" />
                <h4 className="font-display mt-5 text-xl font-semibold tracking-tight">{f.t}</h4>
                <p className="mt-2 text-[15px] leading-relaxed text-[#3B4A66]">{f.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
      <Marquee />
      <section className="mx-auto max-w-[1360px] px-5 py-20 sm:px-8 md:py-28" data-testid="careers-services-section">
        <Reveal><Eyebrow>What's included</Eyebrow><h2 className="font-display mt-5 max-w-3xl text-4xl font-semibold leading-[1.02] tracking-tight sm:text-6xl">Support that goes all the way to the offer.</h2></Reveal>
        <Reveal>
          <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s) => (
              <li key={s.t} className="flex items-center gap-3 rounded-2xl border border-[#E3E8F2] bg-white p-4 text-[15px] font-medium text-[#0A1B3D]"><span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#EAF1FD] text-[#0B3F9E]"><s.icon className="h-[18px] w-[18px]" /></span>{s.t}</li>
            ))}
          </ul>
        </Reveal>
      </section>
      <section className="mx-auto max-w-[1360px] px-5 py-20 sm:px-8 md:py-28">
        <Reveal className="mb-6"><Eyebrow>Your career, fully supported · 4 stages</Eyebrow>
          <h2 className="font-display mt-5 max-w-3xl text-4xl font-semibold leading-[1.02] tracking-tight sm:text-6xl">Everything we do, stage by stage.</h2>
        </Reveal>
        {CAREERS_PILLARS.map((p, i) => <Pillar key={p.no} p={p} i={i} />)}
        <p className="border-t border-[#E3E8F2] pt-6 text-sm text-[#3B4A66]">*Re-employment support applies if the job is lost within the applicable 1-year service period. Additional support is available as an add-on.</p>
      </section>
      <section className="mx-auto max-w-[1000px] px-5 pb-10 sm:px-8">
        <Reveal><Eyebrow>Questions</Eyebrow><h2 className="font-display mt-5 text-3xl font-semibold tracking-tight sm:text-5xl">Honest answers, before you start.</h2></Reveal>
        <Accordion type="single" collapsible className="mt-6" data-testid="careers-faq">
          {CAREERS_FAQ.map((f, i) => (
            <AccordionItem key={f.q} value={`f${i}`}>
              <AccordionTrigger data-testid={`careers-faq-${i}`} className="font-display text-left text-lg font-semibold text-[#0A1B3D] sm:text-xl">{f.q}</AccordionTrigger>
              <AccordionContent className="text-[15px] leading-relaxed text-[#3B4A66]">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
      <PlacementStories tid="careers-stories-section" types={["careers"]} title={<>International students, <span className="text-[#2480F1]">now hired in the US.</span></>} lead="F-1 graduates on OPT and STEM OPT who landed roles across the US with Goalfinity Careers." />
      <EnquirySection defaultVertical="careers" title="Let's start your US career journey." />
    </main>
  );
}
