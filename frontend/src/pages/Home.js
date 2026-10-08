import { HomeHero } from "../components/home/HomeHero";
import { CareersBento } from "../components/home/CareersBento";
import { InstituteShowcase } from "../components/home/InstituteShowcase";
import { OnlineBridge } from "../components/home/OnlineBridge";
import { PlacementStories } from "../components/home/PlacementStories";
import { Marquee } from "../components/site/Marquee";
import { Offices } from "../components/site/Offices";
import { EnquirySection } from "../components/site/EnquirySection";

export default function Home() {
  return (
    <main data-testid="home-page">
      <HomeHero />
      <div className="mt-20 sm:mt-24"><Marquee /></div>
      <CareersBento />
      <InstituteShowcase />
      <OnlineBridge />
      <PlacementStories />
      <Offices />
      <EnquirySection defaultVertical="careers" />
    </main>
  );
}
