import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { HeaderBrand } from "./Brand";

const NAV = [
  { to: "/", label: "Home", id: "home" },
  { to: "/careers", label: "Careers · USA", id: "careers", dot: "bg-[#2480F1]" },
  { to: "/institute", label: "Institute", id: "institute", dot: "bg-[#1E9A4A]" },
  { to: "/contact", label: "Contact", id: "contact" },
];

const NavItem = ({ item, onClick }) => (
  <NavLink
    to={item.to}
    end
    onClick={onClick}
    data-testid={`nav-${item.id}-link`}
    className={({ isActive }) => `group inline-flex items-center gap-2 rounded-full px-4 py-2 text-[15px] font-medium transition-colors duration-300 ${isActive ? "bg-[#0A1B3D] text-white" : "text-[#0A1B3D] hover:bg-[#EAF3FF]"}`}
  >
    {item.dot && <span className={`h-1.5 w-1.5 rounded-full ${item.dot}`} />}
    {item.label}
  </NavLink>
);

export const Header = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <header data-testid="site-header" className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,padding] duration-500 ${scrolled ? "bg-white/80 py-2.5 shadow-[0_1px_0_#E3E8F2] backdrop-blur-xl" : "bg-transparent py-4"}`}>
      <div className="mx-auto flex max-w-[1360px] items-center justify-between gap-4 px-5 sm:px-8">
        <HeaderBrand />
        <nav className="hidden items-center gap-1 lg:flex">{NAV.map((n) => <NavItem key={n.id} item={n} />)}</nav>
        <div className="flex items-center gap-2">
          <Link to="/contact" data-testid="header-enquire-btn" className="group hidden items-center gap-2 rounded-full bg-[#0B3F9E] px-5 py-2.5 text-sm font-semibold text-white transition-[background-color,transform] duration-300 hover:-translate-y-0.5 hover:bg-[#2480F1] sm:inline-flex">
            Enquire now <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
          </Link>
          <button data-testid="mobile-menu-toggle" aria-label="Menu" onClick={() => setOpen((v) => !v)} className="grid h-11 w-11 place-items-center rounded-full border border-[#E3E8F2] bg-white lg:hidden">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div data-testid="mobile-menu" initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="mx-4 mt-3 rounded-3xl border border-[#E3E8F2] bg-white p-3 shadow-xl lg:hidden">
            <div className="flex flex-col gap-1">{NAV.map((n) => <NavItem key={n.id} item={n} />)}</div>
            <Link to="/contact" data-testid="mobile-enquire-btn" className="mt-2 flex items-center justify-center gap-2 rounded-full bg-[#0B3F9E] px-5 py-3 text-sm font-semibold text-white">Enquire now <ArrowUpRight className="h-4 w-4" /></Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
