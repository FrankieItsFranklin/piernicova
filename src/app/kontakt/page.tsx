import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Photo } from "@/components/Photo";
import { OpenNow } from "@/components/OpenNow";
import { TrackedLink } from "@/components/TrackedLink";
import { photos } from "@/content/photos";
import { hoursTable, site } from "@/content/site";

export const metadata: Metadata = {
  title: "Kontakt i dojazd — ul. Przedzamcze 6B, Toruń",
  description: "Restauracja Piernicova, ul. Przedzamcze 6B, 87-100 Toruń, na starówce przy dawnych murach obronnych. Tel. 880 323 890, restauracja@piernicova.pl.",
  alternates: { canonical: "/kontakt" },
};

const d = 0.004;
const bbox = [site.address.lon - d * 1.6, site.address.lat - d, site.address.lon + d * 1.6, site.address.lat + d].map((n) => n.toFixed(5)).join("%2C");

export default function KontaktPage() {
  return (
    <>
      <PageHero
        crumb="Kontakt"
        title="Przedzamcze 6B, Toruń"
        lead="Na gotyckiej starówce, brukowanymi uliczkami wzdłuż dawnych murów obronnych."
        {...(photos.terrace.ready ? { photo: <Photo slot={photos.terrace} className="size-full" priority caption={false} />, photoNote: "Zdjęcie poglądowe" } : {})}
      >
        <p className="mt-6 text-sand"><OpenNow /></p>
      </PageHero>
      <section aria-label="Dane kontaktowe" className="on-light bg-icing py-20 text-ink md:py-24">
        <div className="container-site grid gap-6 lg:grid-cols-3">
          <div className="rounded-[22px] border border-line bg-paper p-7">
            <h2 className="font-sans text-sm font-semibold text-muted">Telefon i e-mail</h2>
            <TrackedLink href={site.phone.href} event="click_phone" place="kontakt" className="mt-2 block text-3xl font-bold hover:text-dough-ink">{site.phone.display}</TrackedLink>
            <TrackedLink href={`mailto:${site.email}`} event="click_email" className="mt-2 block break-all hover:text-dough-ink">{site.email}</TrackedLink>
          </div>
          <div className="rounded-[22px] border border-line bg-paper p-7">
            <h2 className="font-sans text-sm font-semibold text-muted">Adres</h2>
            <p className="mt-2 text-2xl font-bold">{site.address.street}</p>
            <p className="text-muted">{site.address.postal} {site.address.city}</p>
            <TrackedLink href={site.address.mapsUrl} event="click_directions" external className="link-u mt-3 inline-block font-semibold text-dough-ink">Wyznacz trasę</TrackedLink>
          </div>
          <div className="rounded-[22px] border border-line bg-paper p-7">
            <h2 className="font-sans text-sm font-semibold text-muted">Godziny</h2>
            <dl className="mt-2 space-y-1.5">
              {hoursTable.map((h) => <div key={h.days} className="flex justify-between gap-4"><dt>{h.days}</dt><dd className="font-bold tabular-nums">{h.time}</dd></div>)}
            </dl>
          </div>
          <div className="overflow-hidden rounded-[22px] border border-line lg:col-span-2">
            <iframe title="Mapa: Piernicova, ul. Przedzamcze 6B, Toruń" className="h-[380px] w-full" loading="lazy"
              src={`https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${site.address.lat}%2C${site.address.lon}`} />
          </div>
          <div className="mold rounded-[22px] p-7 text-icing">
            <h2 className="text-3xl">Stolik na dziś?</h2>
            <p className="mt-3 text-sand">Najszybciej telefonicznie. Na później — wypełnij bon.</p>
            <Link href="/rezerwacja" className="btn btn-icing mt-6">Zarezerwuj stolik</Link>
            <p className="mt-6 flex gap-4 text-sand">
              <a href={site.instagram} target="_blank" rel="noopener" className="link-u">Instagram</a>
              <a href={site.facebook} target="_blank" rel="noopener" className="link-u">Facebook</a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
