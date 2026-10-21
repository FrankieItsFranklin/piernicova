import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { MenuBrowser } from "@/components/MenuBrowser";
import { menuSource } from "@/content/menu";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Karta — menu jesienne z cenami",
  description: "Karta restauracji Piernicova w Toruniu: śledź po toruńsku, kaczka rose z sosem z piernika, pierożki z gęsiną, steki, tiramisu po toruńsku. Ceny w złotych.",
  alternates: { canonical: "/menu" },
};

export default function MenuPage() {
  return (
    <>
      <PageHero
        crumb="Karta"
        carved="Karta"
        title="Karta na jesień"
        lead="Kuchnia polska z autorskim akcentem. Wybierz składnik sezonu, a podświetlimy dania, w których go znajdziesz."
      />
      <section aria-label="Karta dań" className="bg-icing pb-24 text-ink">
        <div className="container-site">
          <MenuBrowser />
          <p className="mt-10 text-muted">{menuSource}</p>
        </div>
      </section>
      <section aria-labelledby="wino-t" className="wood py-20 md:py-24">
        <div className="container-site flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <h2 id="wino-t" className="text-[clamp(2rem,4vw,3.2rem)]">Wino i szampan</h2>
            <p className="mt-4 max-w-xl text-sand">Selekcja win i szampanów do karty. Obsługa pomoże dobrać butelkę lub kieliszek do dania.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href={site.wineListUrl} target="_blank" rel="noopener" className="btn btn-icing">Karta win (PDF)</a>
            <Link href="/rezerwacja" className="btn btn-gold">Zarezerwuj stolik</Link>
          </div>
        </div>
      </section>
    </>
  );
}
