import { CAREER_CITIES, INSTITUTE_COURSES_LOCAL } from "../data/locations";
import { PROGRAMS } from "../data/content";

const STATIC = { "/": "Home", "/about": "About", "/careers": "Careers page", "/institute": "Institute page", "/contact": "Contact page" };

export const pageLabel = (path) => {
  if (!path) return "Unknown";
  if (STATIC[path]) return STATIC[path];
  const city = CAREER_CITIES.find((c) => path === `/careers/opt-job-support-${c.slug}`);
  if (city) return `OPT job support · ${city.city}`;
  const course = INSTITUTE_COURSES_LOCAL.find((l) => path === `/institute/${l.slug}`);
  if (course) return course.keyword;
  const prog = PROGRAMS.find((p) => path === `/institute/programs/${p.slug}`);
  if (prog) return `Program · ${prog.title}`;
  return path;
};
