import { Link } from "react-router-dom";
import { CAREER_CITIES, INSTITUTE_COURSES_LOCAL } from "../../data/locations";

export const LocalLinks = () => (
  <div data-testid="footer-local-links" className="mt-14 grid gap-8 border-t border-white/10 pt-10 md:grid-cols-2">
    <div>
      <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#F5A623]">OPT job support near you</p>
      <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-white/80">
        {CAREER_CITIES.map((c) => <li key={c.slug}><Link to={`/careers/opt-job-support-${c.slug}`} data-testid={`footer-city-${c.slug}`} className="link-underline">OPT job support {c.city}</Link></li>)}
      </ul>
    </div>
    <div>
      <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#7FD9A0]">Courses in Gujarat & online</p>
      <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-white/80">
        {INSTITUTE_COURSES_LOCAL.map((l) => <li key={l.slug}><Link to={`/institute/${l.slug}`} data-testid={`footer-course-${l.slug}`} className="link-underline">{l.keyword}</Link></li>)}
      </ul>
    </div>
  </div>
);
