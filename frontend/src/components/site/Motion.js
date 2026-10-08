import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1];

export const MaskLines = ({ lines, delay = 0, className = "", lineClassName = "" }) => (
  <span className={className}>
    {lines.map((line, i) => (
      <span key={i} className="block overflow-hidden pb-[0.12em] -mb-[0.12em]">
        <motion.span
          className={`block ${lineClassName}`}
          initial={{ y: "108%" }}
          animate={{ y: "0%" }}
          transition={{ duration: 1.1, ease: EASE, delay: delay + i * 0.12 }}
        >
          {line}
        </motion.span>
      </span>
    ))}
  </span>
);

export const Reveal = ({ children, delay = 0, y = 28, className = "", ...rest }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.15 }}
    transition={{ duration: 0.9, ease: EASE, delay }}
    {...rest}
  >
    {children}
  </motion.div>
);

export const Tilt = ({ children, className = "", max = 8 }) => {
  const ref = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [max, -max]), { stiffness: 120, damping: 14 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-max, max]), { stiffness: 120, damping: 14 });
  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const reset = () => { mx.set(0); my.set(0); };
  return (
    <div style={{ perspective: 1200 }} className={className}>
      <motion.div ref={ref} onMouseMove={onMove} onMouseLeave={reset} style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }} className="h-full w-full">
        {children}
      </motion.div>
    </div>
  );
};

export const Eyebrow = ({ children, tone = "blue", className = "" }) => {
  const color = tone === "green" ? "text-[#1E9A4A]" : tone === "amber" ? "text-[#B86E00]" : "text-[#0B3F9E]";
  const dot = tone === "green" ? "bg-[#1E9A4A]" : tone === "amber" ? "bg-[#F5A623]" : "bg-[#2480F1]";
  return (
    <span className={`inline-flex items-center gap-2 font-mono text-[11px] sm:text-xs uppercase tracking-[0.22em] ${color} ${className}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
      {children}
    </span>
  );
};
