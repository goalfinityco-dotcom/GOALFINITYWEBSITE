import { Link } from "react-router-dom";

export const StarMark = ({ className = "h-4 w-4", color = "#F5A623" }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <path d="M12 1.8l3 6.3 6.9.9-5 4.8 1.2 6.8L12 17.3l-6.1 3.3 1.2-6.8-5-4.8 6.9-.9z" fill={color} />
  </svg>
);

export const CareersLogo = ({ className = "h-9" }) => (
  <img src="/brand/careers-logo.png" alt="Goalfinity Careers" className={`${className} w-auto select-none`} draggable="false" />
);

export const InstituteLogo = ({ className = "h-20" }) => (
  <img src="/brand/institute-logo.png" alt="Goalfinity Institute of Professional Studies" className={`${className} w-auto select-none`} draggable="false" />
);

export const HeaderBrand = () => (
  <Link to="/" data-testid="header-logo-link" className="flex items-center gap-3 shrink-0">
    <CareersLogo className="h-8 sm:h-9" />
  </Link>
);
