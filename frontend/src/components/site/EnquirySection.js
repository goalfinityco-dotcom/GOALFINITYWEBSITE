import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Reveal, Eyebrow } from "./Motion";
import { EnquiryForm } from "./EnquiryForm";
import { CONTACT } from "../../data/content";

export const EnquirySection = ({ defaultVertical = "careers", defaultInterest = "", title = "Let's start your journey.", id = "enquire" }) => (
  <section id={id} data-testid="enquiry-section" className="relative mx-auto max-w-[1360px] px-5 py-20 sm:px-8 md:py-28">
    <div className="grid gap-10 rounded-[36px] border border-[#E3E8F2] bg-white p-6 sm:p-10 lg:grid-cols-12 lg:gap-14 lg:p-14">
      <Reveal className="lg:col-span-5">
        <Eyebrow tone="amber">Enquire for fees</Eyebrow>
        <h2 className="font-display mt-5 text-4xl font-semibold leading-[1.02] tracking-tight sm:text-5xl">{title}</h2>
        <p className="mt-5 max-w-md text-[17px] leading-relaxed text-[#3B4A66]">Tell us where you are and what you want next. A Goalfinity advisor (USA) or Student Counselor (Ahmedabad) will reply with a plan and the fee structure that fits you.</p>
        <div className="mt-8 space-y-3 text-[15px]">
          <p><span className="font-semibold">USA</span> · <a className="link-underline" href={`tel:${CONTACT.usa.tel}`}>{CONTACT.usa.phone}</a></p>
          <p><span className="font-semibold">India</span> · <a className="link-underline" href={`tel:${CONTACT.india.tel}`}>{CONTACT.india.phone}</a></p>
          <p><a className="link-underline font-semibold text-[#0B3F9E]" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></p>
        </div>
        <Link to="/contact" data-testid="enquiry-section-contact-link" className="mt-8 inline-flex items-center gap-1 text-sm font-semibold text-[#0A1B3D]">All contact options <ArrowUpRight className="h-4 w-4" /></Link>
      </Reveal>
      <Reveal delay={0.1} className="lg:col-span-7">
        <EnquiryForm defaultVertical={defaultVertical} defaultInterest={defaultInterest} />
      </Reveal>
    </div>
  </section>
);
