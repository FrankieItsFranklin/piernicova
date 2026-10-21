"use client";

import { useEffect, useState } from "react";
import { openState } from "@/lib/hours";

export function OpenNow({ className = "" }: { className?: string }) {
  const [state, setState] = useState<{ open: boolean; label: string } | null>(null);
  useEffect(() => {
    const tick = () => setState(openState());
    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, []);
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`} aria-live="polite">
      <span className={`size-2.5 rounded-full ${state?.open ? "bg-[#7bd389] shadow-[0_0_0_4px_rgb(123_211_137/0.18)]" : "bg-gold/70"}`} aria-hidden="true" />
      {state ? state.label : "Codziennie od 13:00, w poniedziałki od 15:00"}
    </span>
  );
}
