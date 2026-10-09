import { MessageCircle } from "lucide-react";
import { CONTACT } from "../../data/content";

const STEPS = {
  careers: ["We review your resume, skills and OPT / STEM OPT timeline.", "A Goalfinity Careers advisor contacts you within one business day.", "We share the right support plan and fee structure for you."],
  institute: ["We look at your background and the program you're interested in.", "A Student Counselor contacts you within one business day.", "We share batch timings (classroom or online) and the fee structure."],
  unsure: ["We review what you've shared with us.", "Our team contacts you within one business day.", "We recommend the right path: Careers or Institute."],
};

const WA_TEXT = encodeURIComponent("Hi Goalfinity, I just sent an enquiry on your website.");

export const NextSteps = ({ vertical = "unsure" }) => (
  <div data-testid="thank-you-next-steps" className="w-full">
    <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#C98A00]">What happens next</p>
    <ol className="mt-3 space-y-2">
      {(STEPS[vertical] || STEPS.unsure).map((s, i) => (
        <li key={s} className="flex gap-3 text-[15px] text-[#0A1B3D]"><span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#FFF6E0] text-xs font-bold text-[#C98A00]">{i + 1}</span>{s}</li>
      ))}
    </ol>
    <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.2em] text-[#3B4A66]">Need us sooner?</p>
    <div className="mt-3 flex flex-wrap gap-2">
      <a href={`https://wa.me/${CONTACT.usa.tel.slice(1)}?text=${WA_TEXT}`} target="_blank" rel="noopener noreferrer" data-testid="thank-you-wa-usa" className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-2.5 text-sm font-semibold text-white"><MessageCircle className="h-4 w-4" /> WhatsApp USA · {CONTACT.usa.phone}</a>
      <a href={`https://wa.me/${CONTACT.india.tel.slice(1)}?text=${WA_TEXT}`} target="_blank" rel="noopener noreferrer" data-testid="thank-you-wa-india" className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-2.5 text-sm font-semibold text-white"><MessageCircle className="h-4 w-4" /> WhatsApp India · {CONTACT.india.phone}</a>
    </div>
  </div>
);
