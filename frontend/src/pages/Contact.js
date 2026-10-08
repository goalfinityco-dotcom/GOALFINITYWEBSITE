import { Offices } from "../components/site/Offices";
import { EnquirySection } from "../components/site/EnquirySection";
import { MaskLines, Eyebrow } from "../components/site/Motion";

export default function Contact() {
  return (
    <main data-testid="contact-page" className="pt-32 sm:pt-40">
      <div className="mx-auto max-w-[1360px] px-5 sm:px-8">
        <Eyebrow>Contact Goalfinity</Eyebrow>
        <h1 className="font-display mt-6 text-[12vw] font-bold leading-[0.95] tracking-[-0.035em] sm:text-7xl lg:text-[96px]">
          <MaskLines lines={["Let's talk about", <span key="b" className="text-[#2480F1]">your next step.</span>]} />
        </h1>
      </div>
      <EnquirySection id="enquire" defaultVertical="unsure" title="Send us an enquiry." />
      <Offices />
    </main>
  );
}
