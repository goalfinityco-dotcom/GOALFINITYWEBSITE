import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Building2, Clock, GraduationCap, Check } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/ui/accordion";
import { PageHero } from "../components/site/PageHero";
import { Reveal, Eyebrow } from "../components/site/Motion";
import { EnquirySection } from "../components/site/EnquirySection";
import { BookSessionButton } from "../components/site/BookSession";
import { scrollToId } from "../components/site/SmoothScroll";
import { Seo, faqJsonLd } from "../components/site/Seo";
import { PlacementStories } from "../components/home/PlacementStories";
import { CAREERS_PILLARS } from "../data/content";
import { CAREER_CITIES } from "../data/locations";

const cityFaq = (c) => [
  { q: `Do you work with international students in ${c.city}?`, a: `Yes. Goalfinity Careers supports F-1 international students and recent graduates on OPT and STEM OPT across ${c.area}. Sessions run online, scheduled in ${c.tz}.` },
  { q: `Can you help me find OPT jobs only in ${c.city}?`, a: `We target roles that match your skills, experience, domain and preferred locations, including ${c.city} and remote roles, as part of 80–100 quality job applications.` },
  { q: "Do you guarantee a job or a visa?", a: "No. Employers make hiring decisions and the relevant US authorities make visa decisions. We commit to the work: profile building, targeted applications, interview mentorship and guidance throughout your search." },
];

const Chips = ({ icon: Icon, title, items }) => (
  <div className="h-full rounded-[26px] border border-[#E3E8F2] bg-white p-6 sm:p-8">
    <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-[#0B3F9E]"><Icon className="h-4 w-4" />{title}</p>
    <div className="mt-5 flex flex-wrap gap-2">{items.map((i) => <span key={i} className="rounded-full bg-[#EAF3FF] px-3.5 py-1.5 text-sm text-[#0A1B3D]">{i}</span>)}</div>
  </div>
);

export default function CareerCity() {
  const { slug } = useParams();
  const c = CAREER_CITIES.find((x) => `opt-job-support-${x.slug}` === slug);
  if (!c) return <Navigate to="/careers" replace />;
  const faq = cityFaq(c);
  return (
    <main data-testid={`career-city-${c.slug}`} key={slug}>
      <Seo path={`/careers/${slug}`} image="/og/og-careers.jpg" imageAlt={`OPT job support in ${c.city}`} title={`OPT Job Support in ${c.city} for International Students | Goalfinity`} description={`OPT & STEM OPT job search help for international students in ${c.area}: ATS resume, 80–100 targeted applications and interview mentorship from Goalfinity Careers.`} jsonLd={faqJsonLd(faq)} />
      <PageHero tid="career-city-hero" eyebrow={`Goalfinity Careers · ${c.area}`} lines={["OPT job support", <span key="c">in <span className="text-[#2480F1]">{c.city}.</span></span>]} lead={c.intro} image={c.image} imageAlt={`International graduates job hunting in ${c.city}`}>
        <BookSessionButton vertical="careers" tid="city-book-session-btn" />
        <button onClick={() => scrollToId("enquire")} data-testid="city-enquire-btn" className="group inline-flex items-center gap-2 rounded-full border border-[#C9D6EC] bg-white px-7 py-4 text-[15px] font-semibold text-[#0A1B3D] hover:border-[#0B3F9E]">Send an enquiry <ArrowRight className="h-4 w-4" /></button>
      </PageHero>
      <section className="mx-auto grid max-w-[1360px] gap-5 px-5 py-20 sm:px-8 md:py-28 lg:grid-cols-3">
        <Reveal className="h-full"><Chips icon={GraduationCap} title={`Students we support near ${c.city}`} items={c.universities} /></Reveal>
        <Reveal delay={0.06} className="h-full"><Chips icon={Building2} title="Industries hiring in the area" items={c.industries} /></Reveal>
        <Reveal delay={0.12} className="h-full">
          <div className="h-full rounded-[26px] bg-[#0B3F9E] p-6 text-white sm:p-8">
            <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-[#F5A623]"><Clock className="h-4 w-4" />Sessions in your time zone</p>
            <p className="font-display mt-5 text-3xl font-semibold tracking-tight">{c.tz}</p>
            <p className="mt-3 text-[15px] text-white/80">Online mentoring, mock interviews and check-ins scheduled around your classes or current job.</p>
          </div>
        </Reveal>
      </section>
      <section className="mx-auto max-w-[1360px] px-5 pb-20 sm:px-8 md:pb-28">
        <Reveal><Eyebrow>How we help {c.city} job seekers</Eyebrow><h2 className="font-display mt-5 max-w-3xl text-4xl font-semibold leading-[1.02] tracking-tight sm:text-5xl">Four stages, one team behind your search.</h2></Reveal>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CAREERS_PILLARS.map((p, i) => (
            <Reveal key={p.no} delay={i * 0.06} className="h-full">
              <div className="h-full rounded-[24px] border border-[#E3E8F2] bg-white p-6">
                <span className="font-mono text-xs text-[#2480F1]">STAGE {p.no}</span>
                <h3 className="font-display mt-3 text-xl font-semibold tracking-tight">{p.title}</h3>
                <ul className="mt-4 space-y-2">{p.items.slice(0, 3).map((it) => <li key={it} className="flex gap-2 text-sm text-[#3B4A66]"><Check className="mt-0.5 h-4 w-4 shrink-0 text-[#2480F1]" />{it}</li>)}</ul>
              </div>
            </Reveal>
          ))}
        </div>
        <Link to="/careers" data-testid="city-all-services-link" className="mt-8 inline-flex items-center gap-1.5 font-semibold text-[#0B3F9E]"><span className="link-underline">See every Goalfinity Careers service</span><ArrowUpRight className="h-4 w-4" /></Link>
      </section>
      <section className="mx-auto max-w-[1000px] px-5 pb-10 sm:px-8">
        <Reveal><Eyebrow>Questions from {c.city}</Eyebrow></Reveal>
        <Accordion type="single" collapsible className="mt-6" data-testid="city-faq">
          {faq.map((f, i) => (
            <AccordionItem key={f.q} value={`f${i}`}>
              <AccordionTrigger data-testid={`city-faq-${i}`} className="font-display text-left text-lg font-semibold sm:text-xl">{f.q}</AccordionTrigger>
              <AccordionContent className="text-[15px] leading-relaxed text-[#3B4A66]">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
      <PlacementStories tid="city-stories-section" types={["careers"]} title={<>International students, <span className="text-[#2480F1]">now hired in the US.</span></>} lead="F-1 graduates on OPT and STEM OPT who landed roles with Goalfinity Careers." />
      <EnquirySection defaultVertical="careers" title={`Start your OPT job search in ${c.city}.`} />
    </main>
  );
}
