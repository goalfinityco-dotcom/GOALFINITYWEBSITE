# Goalfinity Website — PRD

## Original problem statement
I am attaching two documents relative to two business verticals. 1st is goalfinity career services and other is goalfinity institute. For goalfinity careers my customers are USA international students; for goalfinity institute my customers are indian students in ahmedabad. Both of my customers must not feel that this website is not meant for them, i want both of them to connect well, i can also offer my courses to international students in online mode which is in goalfinity institute. Website: www.goalfinity.co; Instagram, two LinkedIns, Facebook; US address 117 South Lexington Street, Ste 100 Harrisonville, MO 64701 (+16462123340); India address 204-SF, Parishram Elegant, Science City Road, near Sola Overbridge, Ahmedabad 380060 (+91 99098 52323); Email Info@goalfinity.co. Act as professional UI/UX & product designer; both businesses highlighted on landing, Goalfinity Careers primary, Institute below; consistent with logo colours.

User choices: enquiry form saved to admin inbox + emailed to Info@goalfinity.co, WhatsApp & call buttons; Home + separate Careers & Institute pages; no prices ("Enquire for fees"); light, premium corporate style in logo colours.

## Architecture
- Frontend: React (CRA/craco), framer-motion, lenis smooth scroll, Tailwind. Pages: / , /careers, /institute, /contact, /admin/login, /admin
- Backend: FastAPI + MongoDB (enquiries, users, login_attempts). JWT cookie auth (single seeded admin). Emergent-managed Resend email (emailer.py) — each enquiry emailed to ENQUIRY_NOTIFY_EMAIL in a background task; email_status stored per enquiry.
- Brand assets extracted from brochures: /public/brand/careers-logo.png, institute-logo.png; favicon.svg mark.

## Personas
- F-1 international students in the USA (OPT / STEM OPT) → Goalfinity Careers
- Students in Ahmedabad (classroom) and international students (online) → Goalfinity Institute
- Goalfinity team → admin inbox

## Implemented (2026-10-08)
- Home: kinetic masked hero (Careers-first) with 3D tilt arch photo, parallax, rotating badge, 80–100 metric card; two path cards (Careers primary, Institute); slow marquee; Careers 4-stage bento; Institute showcase (3 parts, flagship guarantee, programs); online bridge for international students; two offices with live local time; enquiry section
- Careers page: full 4-stage service lists from brochure, who it's for, enquiry
- Institute page: classroom/online modes, 3 programs (from goalfinity.co), 30 numbered features, journey, FAQ, enquiry
- Contact page, floating WhatsApp/Call menu (USA + India), footer with socials + both logos
- Admin login + inbox (filter by vertical, status update, delete, email status)
- Placement stories wall (SAMPLE data, data/stories.js): home = all, Careers page = careers only, Institute page = institute + online
- Program detail pages /institute/programs/:slug (syllabus 5 phases, tools, batch schedule, outcomes, enquiry pre-filled with program) — SAMPLE syllabus/schedule in data/programDetails.js
- 2026-10-09: More cities — Atlanta, Seattle, Los Angeles, Phoenix (careers) and Gandhinagar, Vadodara course pages (online or Ahmedabad classroom; 9 course pages generated from COURSE_BASE x COURSE_CITIES)
- 2026-10-09: City landing pages — /careers/opt-job-support-{dallas,houston,new-york,new-jersey,chicago,boston,bay-area} and /institute/{data-science,investment-banking,digital-marketing}-course-ahmedabad (data/locations.js), each with own title/canonical/FAQPage, footer link hub, sitemap + llms.txt updated
- 2026-10-09: SEO — static head (title, description, canonical https://www.goalfinity.co, OG/Twitter, Organization JSON-LD with Careers + Institute sub-orgs, noscript), per-route meta via components/site/Seo.js (FAQPage on Careers/Institute, Course on programs, noindex on admin), share images public/og/*.jpg, robots.txt, sitemap.xml, llms.txt
- 2026-10-09: Goalfinity Group parent brand — group logo in home hero/header/footer/favicon; header logo switches per page (Careers / Institute); About, Vision, Mission, Why Goalfinity, Founder's Desk (Mithil Shah, photo), Choose Your Journey logo cards (content from client PDFs, data/group.js); /about page with full founder message; "Book a session" dialog on Careers & Institute pages (saved as enquiry kind=session with preferred date/time/mode, emailed, shown in admin)

## Backlog
- P1: Testimonials / placement stories (need real content from client)
- P1: Program detail pages per course
- P2: Admin CSV export, search; password reset

## Next tasks
- Collect real testimonials, photos of Ahmedabad centre & team
