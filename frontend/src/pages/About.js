import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { MaskLines, Eyebrow } from "../components/site/Motion";
import { GroupLogo } from "../components/site/Brand";
import { AboutGroup, VisionMission, WhyGoalfinity } from "../components/group/AboutGroup";
import { FounderDesk } from "../components/group/FounderDesk";
import { ChooseJourney } from "../components/group/ChooseJourney";
import { scrollToId } from "../components/site/SmoothScroll";
import { GROUP } from "../data/group";
import { Seo } from "../components/site/Seo";

export default function About() {
  const { hash } = useLocation();
  useEffect(() => {
    if (!hash) return undefined;
    const t = setTimeout(() => scrollToId(hash.slice(1)), 400);
    return () => clearTimeout(t);
  }, [hash]);

  return (
    <main data-testid="about-page" className="pt-32 sm:pt-40">
      <Seo path="/about" title="About Goalfinity Group | Vision, Mission & Founder Mithil Shah" description="Goalfinity Group brings education and career development together. Read our vision, mission and a message from founder Mithil Shah, with 17+ years in EdTech." />
      <div className="mx-auto grid max-w-[1360px] items-center gap-10 px-5 sm:px-8 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <Eyebrow>Goalfinity Group · {GROUP.pillars}</Eyebrow>
          <h1 className="font-display mt-6 text-[12vw] font-bold leading-[0.95] tracking-[-0.035em] sm:text-7xl lg:text-[92px]">
            <MaskLines lines={["About us,", <span key="v" className="text-[#C98A00]">vision & founder.</span>]} />
          </h1>
        </div>
        <div className="lg:col-span-4"><GroupLogo className="mx-auto h-48 sm:h-56" /></div>
      </div>
      <AboutGroup />
      <VisionMission />
      <WhyGoalfinity />
      <FounderDesk full />
      <ChooseJourney />
    </main>
  );
}
