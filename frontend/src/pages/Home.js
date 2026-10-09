import { HomeHero } from "../components/home/HomeHero";
import { CareersBento } from "../components/home/CareersBento";
import { InstituteShowcase } from "../components/home/InstituteShowcase";
import { OnlineBridge } from "../components/home/OnlineBridge";
import { PlacementStories } from "../components/home/PlacementStories";
import { AboutGroup, VisionMission, WhyGoalfinity } from "../components/group/AboutGroup";
import { FounderDesk } from "../components/group/FounderDesk";
import { ChooseJourney } from "../components/group/ChooseJourney";
import { Marquee } from "../components/site/Marquee";
import { Offices } from "../components/site/Offices";
import { EnquirySection } from "../components/site/EnquirySection";
import { Seo } from "../components/site/Seo";

export default function Home() {
  return (
    <main data-testid="home-page">
      <Seo path="/" title="Goalfinity Group | US Career Services & Ahmedabad Institute" description="Goalfinity Group: career guidance and job-search support for international students in the USA, plus career programs in Ahmedabad and online." />
      <HomeHero />
      <div className="mt-20 sm:mt-24"><Marquee /></div>
      <AboutGroup />
      <VisionMission />
      <WhyGoalfinity />
      <CareersBento />
      <InstituteShowcase />
      <OnlineBridge />
      <PlacementStories />
      <FounderDesk />
      <ChooseJourney />
      <Offices />
      <EnquirySection defaultVertical="careers" />
    </main>
  );
}
