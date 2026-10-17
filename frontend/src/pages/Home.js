import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { HomeHero } from "../components/home/HomeHero";
import { AboutGroup, VisionMission } from "../components/group/AboutGroup";
import { FounderDesk } from "../components/group/FounderDesk";
import { ChooseJourney } from "../components/group/ChooseJourney";
import { scrollToId } from "../components/site/SmoothScroll";
import { Marquee } from "../components/site/Marquee";
import { Seo } from "../components/site/Seo";

export default function Home() {
  const { hash } = useLocation();
  useEffect(() => {
    if (!hash) return undefined;
    const t = setTimeout(() => scrollToId(hash.slice(1)), 400);
    return () => clearTimeout(t);
  }, [hash]);

  return (
    <main data-testid="home-page">
      <Seo path="/" title="Goalfinity Group | Vision, Mission & Founder Mithil Shah" description="Goalfinity Group brings education and career development together. Read our vision, mission and a message from founder Mithil Shah, with 17+ years in EdTech." />
      <HomeHero />
      <div className="mt-20 sm:mt-24"><Marquee /></div>
      <AboutGroup />
      <VisionMission />
      <FounderDesk full />
      <ChooseJourney />
    </main>
  );
}
