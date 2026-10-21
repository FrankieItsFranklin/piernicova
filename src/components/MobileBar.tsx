"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone } from "lucide-react";
import { site } from "@/content/site";
import { track } from "@/lib/track";

// Telefon: "Zadzwoń" + "Zarezerwuj" zawsze pod kciukiem (ukryte na stronie rezerwacji).
export function MobileBar() {
  const pathname = usePathname();
  if (pathname === "/rezerwacja") return null;
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-gold/30 bg-walnut/95 px-3 pb-[max(env(safe-area-inset-bottom),10px)] pt-2.5 backdrop-blur-md md:hidden">
      <div className="grid grid-cols-2 gap-2.5">
        <a href={site.phone.href} onClick={() => track("click_phone", { place: "mobile_bar" })} className="btn btn-gold !min-h-12 !px-3">
          <Phone className="size-4" aria-hidden="true" /> Zadzwoń
        </a>
        <Link href="/rezerwacja" onClick={() => track("reservation_start", { place: "mobile_bar" })} className="btn btn-icing !min-h-12 !px-3">
          Zarezerwuj
        </Link>
      </div>
    </div>
  );
}
