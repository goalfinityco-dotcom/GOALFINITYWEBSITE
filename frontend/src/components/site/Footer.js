import { Link } from "react-router-dom";
import { Facebook, Instagram, Linkedin, Lock, Mail } from "lucide-react";
import { CONTACT, SOCIALS } from "../../data/content";
import { CareersLogo, InstituteLogo, GroupLogo } from "./Brand";

const Social = ({ href, label, id, children }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} data-testid={`footer-social-${id}`} className="group inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm text-white/85 transition-[background-color,color] duration-300 hover:bg-white hover:text-[#0A1B3D]">
    {children}<span>{label}</span>
  </a>
);

const Office = ({ o, id }) => (
  <div data-testid={`footer-office-${id}`}>
    <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#F5A623]">{o.label}</p>
    <p className="mt-3 text-[15px] leading-relaxed text-white/80">{o.lines.join(" ")}</p>
    <a href={`tel:${o.tel}`} className="link-underline mt-2 inline-block text-[15px] font-semibold text-white">{o.phone}</a>
  </div>
);

export const Footer = () => (
  <footer data-testid="site-footer" className="relative overflow-hidden bg-[#0A1B3D] text-white">
    <div className="mx-auto max-w-[1360px] px-5 pb-10 pt-20 sm:px-8">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="inline-flex flex-wrap items-center gap-5 rounded-3xl bg-white px-6 py-4">
            <GroupLogo className="h-16" />
            <span className="h-10 w-px bg-[#E3E8F2]" />
            <CareersLogo className="h-8" />
            <span className="h-10 w-px bg-[#E3E8F2]" />
            <InstituteLogo className="h-12" />
          </div>
          <p className="mt-8 max-w-md text-[15px] leading-relaxed text-white/75">Goalfinity Group brings together education and career development: Goalfinity Careers supports international students into US jobs, and Goalfinity Institute builds career-ready professionals in Ahmedabad and online.</p>
          <a href={`mailto:${CONTACT.email}`} data-testid="footer-email-link" className="mt-6 inline-flex items-center gap-2 text-lg font-semibold"><Mail className="h-5 w-5 text-[#F5A623]" /><span className="link-underline">{CONTACT.email}</span></a>
        </div>
        <div className="grid gap-10 sm:grid-cols-2 lg:col-span-5">
          <Office o={CONTACT.usa} id="usa" />
          <Office o={CONTACT.india} id="india" />
        </div>
        <div className="lg:col-span-2">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/60">Explore</p>
          <ul className="mt-3 space-y-2 text-[15px]">
            <li><Link to="/about" data-testid="footer-about-link" className="link-underline">About & Founder</Link></li>
            <li><Link to="/careers" data-testid="footer-careers-link" className="link-underline">Goalfinity Careers</Link></li>
            <li><Link to="/institute" data-testid="footer-institute-link" className="link-underline">Goalfinity Institute</Link></li>
            <li><Link to="/contact" data-testid="footer-contact-link" className="link-underline">Contact & enquiry</Link></li>
          </ul>
        </div>
      </div>
      <div className="mt-14 flex flex-wrap gap-3">
        <Social href={SOCIALS.instagram} label="Instagram" id="instagram"><Instagram className="h-4 w-4" /></Social>
        <Social href={SOCIALS.facebook} label="Facebook" id="facebook"><Facebook className="h-4 w-4" /></Social>
        <Social href={SOCIALS.linkedinCareers} label="LinkedIn · Careers" id="linkedin-careers"><Linkedin className="h-4 w-4" /></Social>
        <Social href={SOCIALS.linkedinInstitute} label="LinkedIn · Institute" id="linkedin-institute"><Linkedin className="h-4 w-4" /></Social>
      </div>
      <p aria-hidden="true" className="font-display pointer-events-none mt-14 select-none text-[19vw] font-extrabold leading-[0.8] tracking-[-0.05em] text-white/[0.06] lg:text-[16vw]">GOALFINITY</p>
      <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6 text-sm text-white/60">
        <p>© {new Date().getFullYear()} Goalfinity Group · {CONTACT.website}</p>
        <Link to="/admin" data-testid="footer-admin-link" className="inline-flex items-center gap-1.5 hover:text-white"><Lock className="h-3.5 w-3.5" /> Team login</Link>
      </div>
    </div>
  </footer>
);
