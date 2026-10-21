import type { ReactNode } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { IcingRule } from "@/components/IcingRule";

// Nagłówek podstron: drewno formy z tytułem wyciśniętym w tle albo zdjęcie na całą szerokość z przyciemnieniem.
export function PageHero({
  carved, title, lead, crumb, photo, photoNote, children,
}: { carved?: string; title: ReactNode; lead?: ReactNode; crumb: string; photo?: ReactNode; photoNote?: string; children?: ReactNode }) {
  return (
    <section className={`relative isolate overflow-hidden pt-[78px] ${photo ? "bg-walnut" : "wood"}`}>
      {photo && (
        <>
          <div className="absolute inset-0 -z-10">{photo}</div>
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgb(42_25_15/0.92)_0%,rgb(42_25_15/0.72)_50%,rgb(42_25_15/0.35)_100%)]" />
        </>
      )}
      <div className="container-site relative py-14 md:py-20">
        <nav aria-label="Ścieżka">
          <ol className="flex items-center gap-1.5 text-sm text-sand">
            <li><Link href="/" className="hover:text-icing">Strona główna</Link></li>
            <li aria-hidden="true"><ChevronRight className="size-3.5" /></li>
            <li aria-current="page" className="text-icing">{crumb}</li>
          </ol>
        </nav>
        {carved && !photo && (
          <p className="carved pointer-events-none mt-4 select-none text-[clamp(3.4rem,11vw,9rem)] leading-[0.9]" aria-hidden="true">{carved}</p>
        )}
        <h1 className={`${carved && !photo ? "mt-2" : "mt-6"} max-w-4xl text-[clamp(2.3rem,5vw,4.2rem)]`}>{title}</h1>
        <IcingRule className="mt-5" />
        {lead && <p className="mt-5 max-w-2xl text-lg text-sand sm:text-xl">{lead}</p>}
        {children}
      </div>
      {photo && photoNote && <p className="absolute bottom-3 right-4 text-[13px] text-white/80 [text-shadow:0_1px_2px_rgb(0_0_0/0.8)]">{photoNote}</p>}
    </section>
  );
}
