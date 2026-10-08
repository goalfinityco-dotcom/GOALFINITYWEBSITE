import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Lenis from "lenis";

let lenisInstance = null;

export const scrollToId = (id) => {
  const el = document.getElementById(id);
  if (!el) return;
  if (lenisInstance) lenisInstance.scrollTo(el, { offset: -80 });
  else el.scrollIntoView({ behavior: "smooth" });
};

export const SmoothScroll = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    lenisInstance = lenis;
    let frame;
    const raf = (t) => { lenis.raf(t); frame = requestAnimationFrame(raf); };
    frame = requestAnimationFrame(raf);
    return () => { cancelAnimationFrame(frame); lenis.destroy(); lenisInstance = null; };
  }, []);

  useEffect(() => {
    if (lenisInstance) lenisInstance.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};
