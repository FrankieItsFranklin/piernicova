"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion";

// Jedno, spokojne wejście treści przy przewinięciu. Używane oszczędnie (nagłówki sekcji, siatki).
export function Reveal({ children, delay = 0, className, as = "div" }: { children: ReactNode; delay?: number; className?: string; as?: "div" | "li" }) {
  // Te same propsy na serwerze i w przeglądarce; przy reduced-motion animacja trwa 0 s
  // (usunięcie propsów zostawiało element z opacity 0 z HTML-a serwera).
  const reduce = useReducedMotionSafe();
  const C = as === "li" ? motion.li : motion.div;
  return (
    <C
      className={className}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={reduce ? { duration: 0 } : { duration: 0.6, delay, ease: [0.25, 1, 0.5, 1] }}
    >
      {children}
    </C>
  );
}
