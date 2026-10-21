"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion";

// Linia lukru pod nagłówkiem: "wyciskana" z rękawa cukierniczego przy wejściu w ekran.
export function IcingRule({ className = "", color = "#fbf6ee" }: { className?: string; color?: string }) {
  const reduce = useReducedMotionSafe();
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  return (
    <svg ref={ref} viewBox="0 0 220 18" className={`h-[18px] w-[220px] ${className}`} aria-hidden="true" focusable="false">
      <motion.path
        d="M4 9 q13 -10 26 0 t26 0 t26 0 t26 0 t26 0 t26 0 t26 0 t26 0"
        fill="none"
        stroke={color}
        strokeWidth="3.5"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: inView || reduce ? 1 : 0 }}
        transition={reduce ? { duration: 0 } : { duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
      />
    </svg>
  );
}
