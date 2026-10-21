"use client";

import type { ReactNode } from "react";
import { track, type TrackEvent } from "@/lib/track";

export function TrackedLink({
  href, event, children, className, external, place,
}: { href: string; event: TrackEvent; children: ReactNode; className?: string; external?: boolean; place?: string }) {
  return (
    <a
      href={href}
      className={className}
      onClick={() => track(event, place ? { place } : {})}
      {...(external ? { target: "_blank", rel: "noopener" } : {})}
    >
      {children}
    </a>
  );
}
