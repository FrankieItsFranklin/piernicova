import type { ReactNode } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

// Nagłówek podstron: drewno formy albo zdjęcie na całą szerokość z przyciemnieniem.
// `compact` — na stronach z formularzem: niższy nagłówek, a formularz (children) w tej samej sekcji,
// żeby bon / voucher był widoczny od razu, bez szwu między dwiema deskami.
export function PageHero({
  title, lead, crumb, photo, photoNote, compact = false, children,
}: { title: ReactNode; lead?: ReactNode; crumb: string; photo?: ReactNode; photoNote?: string; compact?: boolean; children?: ReactNode }) {
  return (
    <section className={`relative isolate overflow-hidden pt-[78px] ${photo ? "bg-walnut" : "wood"}`}>
      {photo && (
        <>
          <div className="absolute inset-0 -z-10">{photo}</div>
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgb(42_25_15/0.92)_0%,rgb(42_25_15/0.72)_50%,rgb(42_25_15/0.35)_100%)]" />
        </>
      )}
      <div className={`container-site relative ${compact ? "pb-20 pt-8 md:pb-24 md:pt-10" : "py-14 md:py-20"}`}>
        <nav aria-label="Ścieżka">
          <ol className="flex items-center gap-1.5 text-sm text-sand">
            <li><Link href="/" className="hover:text-icing">Strona główna</Link></li>
            <li aria-hidden="true"><ChevronRight className="size-3.5" /></li>
            <li aria-current="page" className="text-icing">{crumb}</li>
          </ol>
        </nav>
        <h1 className={`${compact ? "mt-4 text-[clamp(2.1rem,4vw,3.4rem)]" : "mt-6 text-[clamp(2.3rem,5vw,4.2rem)]"} max-w-4xl`}>{title}</h1>
        {lead && <p className={`${compact ? "mt-3" : "mt-5"} max-w-2xl text-lg text-sand sm:text-xl`}>{lead}</p>}
        {children}
      </div>
      {photo && photoNote && <p className="absolute bottom-3 right-4 text-[13px] text-white/80 [text-shadow:0_1px_2px_rgb(0_0_0/0.8)]">{photoNote}</p>}
    </section>
  );
}
