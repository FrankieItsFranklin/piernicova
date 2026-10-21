"use client";

import { useSyncExternalStore } from "react";

// Jak useReducedMotion z motion/react, ale bez rozjazdu przy hydratacji:
// podczas hydratacji zwraca wartość serwera (false), potem rzeczywiste ustawienie systemu.
const query = "(prefers-reduced-motion: reduce)";

function subscribe(cb: () => void) {
  const mq = window.matchMedia(query);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

export function useReducedMotionSafe() {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  );
}
