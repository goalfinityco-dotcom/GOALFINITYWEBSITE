import { Link, useLocation } from "react-router-dom";

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

export const GroupLogo = ({ className = "h-40" }) => (
  <img src="/brand/group-logo.png" alt="Goalfinity Group — Infinite Possibilities. Real Goals." className={`${className} w-auto select-none`} draggable="false" />
);

export const GroupLockup = ({ className = "" }) => (
  <span className={`flex items-center gap-2.5 ${className}`}>
    <img src="/brand/group-mark.png" alt="" className="h-9 w-auto sm:h-10" draggable="false" />
    <img src="/brand/group-wordmark.png" alt="Goalfinity Group" className="h-6 w-auto sm:h-7" draggable="false" />
  </span>
);

export const HeaderBrand = () => {
  const { pathname } = useLocation();
  const logo = pathname.startsWith("/careers") ? <CareersLogo className="h-8 sm:h-9" />
    : pathname.startsWith("/institute") ? <InstituteLogo className="h-11 sm:h-12" />
    : <GroupLockup />;
  return <Link to="/" data-testid="header-logo-link" className="flex shrink-0 items-center">{logo}</Link>;
};
