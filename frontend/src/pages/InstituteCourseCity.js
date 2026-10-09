import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Check, Globe2, MapPin } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/ui/accordion";
import { PageHero } from "../components/site/PageHero";
import { Reveal, Eyebrow } from "../components/site/Motion";
import { EnquirySection } from "../components/site/EnquirySection";
import { BookSessionButton } from "../components/site/BookSession";
import { InstituteLogo } from "../components/site/Brand";
import { scrollToId } from "../components/site/SmoothScroll";
import { Seo, faqJsonLd } from "../components/site/Seo";
import { CONTACT, PROGRAMS } from "../data/content";
import { PROGRAM_DETAILS } from "../data/programDetails";
import { INSTITUTE_COURSES_LOCAL, NEARBY_AREAS } from "../data/locations";

const courseFaq = (l, p) => [
  { q: `Where is the ${p.title} course in Ahmedabad held?`, a: `Classroom sessions are at Goalfinity Institute, ${CONTACT.india.lines.join(" ")} You can also join the same program online.` },
  { q: "How long is the course?", a: "It is a 6-month / 24-week program with structured learning, practical work, assessments, projects and career preparation." },
  { q: "What are the fees?", a: "Fees depend on the mode (classroom or online) and batch. Send an enquiry or book a counselling session and we will share the current fee structure." },
  { q: "Do you guarantee a job?", a: "No. Employers make hiring decisions. We commit to dedicated placement assistance: career advisor support, resume and portfolio work, mock interviews, application strategy and recruiter outreach guidance." },
];

export default function InstituteCourseCity() {
  const { slug } = useParams();
  const l = INSTITUTE_COURSES_LOCAL.find((x) => x.slug === slug);
  const p = l && PROGRAMS.find((x) => x.slug === l.program);
  if (!l || !p) return <Navigate to="/institute" replace />;
  const d = PROGRAM_DETAILS[p.slug];
  const faq = courseFaq(l, p);
  return (
    <main data-testid={`course-city-${p.key}`} key={slug}>
      <Seo path={`/institute/${slug}`} image="/og/og-institute.jpg" imageAlt={`${l.keyword} at Goalfinity Institute`} title={`${l.keyword} | Classroom & Online | Goalfinity`} description={`${l.keyword} at Goalfinity Institute, Science City Road: 6-month program with projects, mentors and placement assistance. Classroom or online batches.`} jsonLd={faqJsonLd(faq)} />
      <PageHero tid="course-city-hero" logo={<InstituteLogo className="h-24 sm:h-28" />} tone="green" accent="#1E9A4A" eyebrow={`Goalfinity Institute · ${p.tag} · Ahmedabad & Online`} lines={[l.h1[0], <span key="b" className="text-[#1E9A4A]">{l.h1[1]}</span>]} lead={l.intro} image={d.image} imageAlt={l.keyword}>
        <BookSessionButton vertical="institute" tid="course-city-book-session-btn" />
        <button onClick={() => scrollToId("enquire")} data-testid="course-city-fees-btn" className="group inline-flex items-center gap-2 rounded-full border border-[#CFE9D8] bg-white px-7 py-4 text-[15px] font-semibold text-[#0F1F5C] hover:border-[#1E9A4A]">Enquire for fees <ArrowRight className="h-4 w-4" /></button>
      </PageHero>
      <section className="mx-auto grid max-w-[1360px] gap-5 px-5 py-20 sm:px-8 md:grid-cols-2 md:py-28">
        <Reveal>
          <div data-testid="course-city-location" className="h-full rounded-[28px] bg-[#0F1F5C] p-7 text-white sm:p-9">
            <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-[#7FD9A0]"><MapPin className="h-4 w-4" />Classroom in Ahmedabad</p>
            <p className="font-display mt-5 text-2xl font-semibold leading-snug tracking-tight">{CONTACT.india.lines.join(" ")}</p>
            <p className="mt-4 text-[15px] text-white/80">Easy to reach from {NEARBY_AREAS.join(", ")}.</p>
            <a href={`tel:${CONTACT.india.tel}`} className="mt-6 inline-block font-semibold text-[#7FD9A0]">{CONTACT.india.phone}</a>
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="h-full rounded-[28px] border border-[#CFE9D8] bg-white p-7 sm:p-9">
            <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-[#1E9A4A]"><Globe2 className="h-4 w-4" />Can't come to class?</p>
            <p className="font-display mt-5 text-2xl font-semibold tracking-tight text-[#0F1F5C]">Join the same program online.</p>
            <p className="mt-3 text-[15px] text-[#3B4A66]">Live online batches with the same mentors and projects, including a US-friendly batch for international students.</p>
          </div>
        </Reveal>
      </section>
      <section className="bg-[#F1F9F4] py-20 md:py-28">
        <div className="mx-auto max-w-[1360px] px-5 sm:px-8">
          <Reveal><Eyebrow tone="green">What you'll learn</Eyebrow><h2 className="font-display mt-5 max-w-3xl text-4xl font-semibold leading-[1.02] tracking-tight text-[#0F1F5C] sm:text-5xl">24 weeks, 5 phases, one portfolio.</h2></Reveal>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            {d.phases.map((ph, i) => (
              <Reveal key={ph.title} delay={i * 0.05} className="h-full">
                <div className="h-full rounded-[22px] border border-[#CFE9D8] bg-white p-5">
                  <span className="font-mono text-xs text-[#1E9A4A]">{ph.weeks}</span>
                  <h3 className="font-display mt-2 text-lg font-semibold tracking-tight text-[#0F1F5C]">{ph.title}</h3>
                  <ul className="mt-3 space-y-1.5">{ph.topics.slice(0, 3).map((t) => <li key={t} className="flex gap-2 text-sm text-[#3B4A66]"><Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#1E9A4A]" />{t}</li>)}</ul>
                </div>
              </Reveal>
            ))}
          </div>
          <Link to={`/institute/programs/${p.slug}`} data-testid="course-city-full-syllabus" className="mt-8 inline-flex items-center gap-1.5 font-semibold text-[#1E9A4A]"><span className="link-underline">Full syllabus, batches & career outcomes</span><ArrowUpRight className="h-4 w-4" /></Link>
        </div>
      </section>
      <section className="mx-auto max-w-[1000px] px-5 pb-10 pt-20 sm:px-8">
        <Reveal><Eyebrow tone="green">Questions</Eyebrow></Reveal>
        <Accordion type="single" collapsible className="mt-6" data-testid="course-city-faq">
          {faq.map((f, i) => (
            <AccordionItem key={f.q} value={`f${i}`}>
              <AccordionTrigger data-testid={`course-city-faq-${i}`} className="font-display text-left text-lg font-semibold text-[#0F1F5C] sm:text-xl">{f.q}</AccordionTrigger>
              <AccordionContent className="text-[15px] leading-relaxed text-[#3B4A66]">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
      <EnquirySection defaultVertical="institute" defaultInterest={p.title} title={`Enquire about the ${l.keyword}.`} />
    </main>
  );
}
