import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { BookingTicket } from "@/components/BookingTicket";
import { OpenNow } from "@/components/OpenNow";
import { TrackedLink } from "@/components/TrackedLink";
import { hoursTable, site } from "@/content/site";

export const metadata: Metadata = {
  title: "Rezerwacja stolika",
  description: "Zarezerwuj stolik w restauracji Piernicova w Toruniu — przy otwartej kuchni, na parterze lub na tarasie. Potwierdzamy telefonicznie. Tel. 880 323 890.",
  alternates: { canonical: "/rezerwacja" },
};

export default function RezerwacjaPage() {
  return (
    <>
      <PageHero crumb="Rezerwacja" carved="Stolik" title="Rezerwacja stolika" lead="Wypełnij bon — oddzwonimy, żeby potwierdzić stolik." />
      <section aria-label="Formularz rezerwacji" className="wood wood-glow pb-24">
        <div className="container-site grid items-start gap-14 lg:grid-cols-[minmax(330px,460px)_1fr] lg:gap-20">
          <BookingTicket id="bon-strona" />
          <div className="pt-10">
            <h2 className="text-[clamp(1.8rem,3vw,2.4rem)]">Dobrze wiedzieć</h2>
            <dl className="mt-6 divide-y divide-gold/20 border-y border-gold/20">
              <div className="py-4"><dt className="font-semibold text-gold-hi">Teraz</dt><dd className="mt-1 text-sand"><OpenNow /></dd></div>
              <div className="py-4"><dt className="font-semibold text-gold-hi">Godziny</dt>
                <dd className="mt-1 text-sand">{hoursTable.map((h) => <span key={h.days} className="block">{h.days}: <span className="tabular-nums">{h.time}</span></span>)}</dd>
              </div>
              <div className="py-4"><dt className="font-semibold text-gold-hi">Rezerwacja jest prośbą</dt><dd className="mt-1 text-sand">Stolik potwierdzamy telefonicznie. Jeśli zależy Ci na dziś wieczór, szybciej będzie zadzwonić.</dd></div>
              <div className="py-4"><dt className="font-semibold text-gold-hi">Alergie i okazje</dt><dd className="mt-1 text-sand">Napisz w uwagach — przekażemy kuchni i obsłudze.</dd></div>
              <div className="py-4"><dt className="font-semibold text-gold-hi">Grupy</dt><dd className="mt-1 text-sand">Większe przyjęcia i kolacje firmowe: <Link href="/wydarzenia" className="link-u text-icing">zapytanie o wydarzenie</Link>.</dd></div>
            </dl>
            <TrackedLink href={site.phone.href} event="click_phone" place="rezerwacja" className="btn btn-icing mt-8">Zadzwoń: {site.phone.display}</TrackedLink>
          </div>
        </div>
      </section>
    </>
  );
}
