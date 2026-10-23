import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Photo } from "@/components/Photo";
import { EventForm } from "@/components/EventForm";
import { photos } from "@/content/photos";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Wydarzenia i kolacje dla grup",
  description: "Urodziny, kolacje firmowe i oferta wigilijna w restauracji Piernicova w Toruniu. Wyślij zapytanie — odpiszemy z propozycją menu.",
  alternates: { canonical: "/wydarzenia" },
};

export default function WydarzeniaPage() {
  return (
    <>
      <PageHero
        crumb="Wydarzenia"
        title="Kolacja dla grupy"
        lead="Urodziny, rocznica, kolacja firmowa, okres świąteczny. Napisz, ile osób i kiedy — odpiszemy z propozycją menu i warunkami."
        photo={<Photo slot={photos.window} className="size-full" priority caption={false} />}
        photoNote="Zdjęcie poglądowe"
      />
      <section aria-labelledby="zap-t" className="wood py-14 md:py-16">
        <div className="container-site grid items-start gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <h2 id="zap-t" className="text-[clamp(2rem,4vw,3.2rem)]">Zapytanie o termin</h2>
            <ul className="mt-8 space-y-5 text-sand">
              <li><span className="block font-serif text-2xl text-icing">Oferta wigilijna</span>Na sezon świąteczny restauracja przygotowuje osobną ofertę — zapytaj o nią w formularzu.</li>
              <li><span className="block font-serif text-2xl text-icing">Menu dla grupy</span>Przygotujemy propozycję na podstawie obecnej karty i liczby gości.</li>
              <li><span className="block font-serif text-2xl text-icing">Wolisz porozmawiać?</span><a href={site.phone.href} className="link-u text-icing">{site.phone.display}</a> lub <a href={`mailto:${site.email}`} className="link-u text-icing">{site.email}</a></li>
            </ul>
          </div>
          <EventForm />
        </div>
      </section>
    </>
  );
}
