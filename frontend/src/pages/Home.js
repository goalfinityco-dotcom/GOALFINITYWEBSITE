import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { MaskLines, Eyebrow } from "../components/site/Motion";
import { AboutGroup, VisionMission } from "../components/group/AboutGroup";
import { FounderDesk } from "../components/group/FounderDesk";
import { ChooseJourney } from "../components/group/ChooseJourney";
import { scrollToId } from "../components/site/SmoothScroll";
import { GROUP } from "../data/group";
import { Seo } from "../components/site/Seo";

export default function Home() {
  const { hash } = useLocation();
  useEffect(() => {
    if (!hash) return undefined;
    const t = setTimeout(() => scrollToId(hash.slice(1)), 400);
    return () => clearTimeout(t);
  }, [hash]);

  return (
    <main data-testid="home-page" className="pt-32 sm:pt-40">
      <Seo path="/" title="Goalfinity Group | Vision, Mission & Founder Mithil Shah" description="Goalfinity Group brings education and career development together. Read our vision, mission and a message from founder Mithil Shah, with 17+ years in EdTech." />
      <div className="mx-auto grid max-w-[1360px] items-center gap-10 px-5 sm:px-8 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <Eyebrow>Goalfinity Group · {GROUP.pillars}</Eyebrow>
          <h1 className="font-display mt-6 text-[12vw] font-bold leading-[0.95] tracking-[-0.035em] sm:text-7xl lg:text-[92px]">
            <MaskLines lines={["About us,", <span key="v" className="text-[#C98A00]">vision & founder.</span>]} />
          </h1>
        </div>
        <div className="lg:col-span-4">
          <div data-testid="about-hero-image" className="arch relative mx-auto aspect-[4/5] w-full max-w-[340px] overflow-hidden bg-[#DCE9FB] shadow-[0_40px_80px_-40px_rgba(11,63,158,0.5)]">
            <img src="/media/grad-two.jpg" alt="Goalfinity students celebrating their goals" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B3F9E]/40 via-transparent to-transparent" />
          </div>
        </div>
      </div>
      <AboutGroup />
      <VisionMission />
      <FounderDesk full />
      <ChooseJourney />
    </main>
  );
}
