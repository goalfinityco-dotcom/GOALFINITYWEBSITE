import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, Phone, X } from "lucide-react";
import { CONTACT } from "../../data/content";

const WA_TEXT = encodeURIComponent("Hi Goalfinity, I'd like to know more.");

const ACTIONS = [
  { id: "wa-usa", label: "WhatsApp · USA", sub: CONTACT.usa.phone, href: `https://wa.me/${CONTACT.usa.tel.slice(1)}?text=${WA_TEXT}`, icon: MessageCircle, tone: "bg-[#25D366]" },
  { id: "wa-india", label: "WhatsApp · India", sub: CONTACT.india.phone, href: `https://wa.me/${CONTACT.india.tel.slice(1)}?text=${WA_TEXT}`, icon: MessageCircle, tone: "bg-[#25D366]" },
  { id: "call-usa", label: "Call USA office", sub: CONTACT.usa.phone, href: `tel:${CONTACT.usa.tel}`, icon: Phone, tone: "bg-[#0B3F9E]" },
  { id: "call-india", label: "Call India office", sub: CONTACT.india.phone, href: `tel:${CONTACT.india.tel}`, icon: Phone, tone: "bg-[#1E9A4A]" },
];

export const FloatingContact = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div data-testid="floating-contact-menu" initial={{ opacity: 0, y: 12, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 12, scale: 0.96 }} transition={{ duration: 0.25 }} className="w-64 rounded-3xl border border-[#E3E8F2] bg-white/95 p-2 shadow-2xl backdrop-blur-xl">
            {ACTIONS.map((a) => (
              <a key={a.id} href={a.href} target={a.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" data-testid={`floating-${a.id}`} className="flex items-center gap-3 rounded-2xl px-3 py-2.5 transition-colors duration-200 hover:bg-[#F7F9FC]">
                <span className={`grid h-9 w-9 place-items-center rounded-full text-white ${a.tone}`}><a.icon className="h-4 w-4" /></span>
                <span className="leading-tight"><span className="block text-sm font-semibold text-[#0A1B3D]">{a.label}</span><span className="text-xs text-[#3B4A66]">{a.sub}</span></span>
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <button data-testid="floating-contact-toggle" aria-label="Contact us" onClick={() => setOpen((v) => !v)} className="relative grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_12px_30px_-8px_rgba(37,211,102,0.7)] transition-transform duration-300 hover:scale-105">
        {!open && <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-30" />}
        {open ? <X className="relative h-6 w-6" /> : <MessageCircle className="relative h-6 w-6" />}
      </button>
    </div>
  );
};
