import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Photo } from "@/components/Photo";
import { Reveal } from "@/components/Reveal";
import { DishPhoto } from "@/components/DishPhoto";
import { photos } from "@/content/photos";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Kuchnia i szef Bartłomiej Witkowski",
  description: "Otwarta kuchnia Piernicovej i szef Bartłomiej Witkowski — czapki Gault&Millau, Top Chef Polska. Restauracja w przewodniku MICHELIN Polska 2026.",
  alternates: { canonical: "/kuchnia" },
};

const timeline = [
  { year: "2019", text: "Piernicova otwiera się na toruńskiej starówce, przy Przedzamczu." },
  { year: "—", text: "Wyróżnienia: Poland 100 Best Restaurants i Polskie Skarby Kulinarne." },
  { year: "2026", text: "Restauracja w pierwszym ogólnopolskim przewodniku MICHELIN (kuchnia regionalna i polska)." },
];

export default function KuchniaPage() {
  return (
    <>
      <PageHero
        crumb="Kuchnia"
        title="Kuchnia na widoku"
        lead={`Polskie smaki z międzynarodowym akcentem szefa ${site.chefGen}. Na piętrze stoliki stoją przy otwartej kuchni.`}
        photo={<Photo slot={photos.kitchenPass} className="size-full" priority caption={false} />}
        photoNote="Zdjęcie poglądowe"
      />

      <section aria-labelledby="szef-t" className="on-light bg-icing py-24 text-ink md:py-28">
        <div className="container-site grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          {/* Do czasu sesji: zamiast pustej ramki z inicjałami — danie, z którego szef jest znany. */}
          {photos.chef.ready ? (
            <Photo slot={photos.chef} className="aspect-[4/5] rounded-[26px]" caption={false} />
          ) : (
            <figure>
              <DishPhoto name="Śledź po toruńsku" className="aspect-[4/5] rounded-[26px]" sizes="(min-width:1024px) 40vw, 100vw" />
              <figcaption className="mt-3 text-[15px] text-muted">Śledź po toruńsku z musztardą piernikową — danie z karty szefa.</figcaption>
            </figure>
          )}
          <div>
            <p className="font-semibold text-dough-ink">Szef kuchni</p>
            <h2 id="szef-t" className="mt-2 text-[clamp(2.2rem,4.4vw,3.8rem)]">{site.chef}</h2>
            <ul className="mt-8 space-y-4 text-lg">
              <li className="flex gap-3"><span className="mt-3 size-2 shrink-0 rounded-full bg-gold" aria-hidden="true" />Doświadczenie zdobywał w restauracjach i na szkoleniach w Polsce i za granicą.</li>
              <li className="flex gap-3"><span className="mt-3 size-2 shrink-0 rounded-full bg-gold" aria-hidden="true" />Laureat konkursów kulinarnych, zdobywca czapek w przewodniku Gault&amp;Millau Polska.</li>
              <li className="flex gap-3"><span className="mt-3 size-2 shrink-0 rounded-full bg-gold" aria-hidden="true" />Uczestnik programu Top Chef Polska.</li>
              <li className="flex gap-3"><span className="mt-3 size-2 shrink-0 rounded-full bg-gold" aria-hidden="true" />Gotuje kuchnię polską z autorskim, międzynarodowym akcentem — w karcie m.in. śledź po toruńsku z musztardą piernikową.</li>
            </ul>
            <Link href="/menu" className="btn btn-ink mt-10">Zobacz kartę</Link>
          </div>
        </div>
      </section>

      <section aria-labelledby="os-t" className="wood py-24 md:py-28">
        <div className="container-site">
          <h2 id="os-t" className="text-[clamp(2rem,4vw,3.2rem)]">Od 2019 roku przy murach</h2>
          <ol className="mt-12 grid gap-5 md:grid-cols-3">
            {timeline.map((t, i) => (
              <Reveal as="li" key={i} delay={i * 0.08} className="mold rounded-[22px] p-7">
                <p className="font-serif text-5xl text-gold-hi">{t.year}</p>
                <p className="mt-4 text-sand">{t.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="sala-t" className="relative isolate flex min-h-[70svh] items-end overflow-hidden">
        <div className="absolute inset-0 -z-10"><Photo slot={photos.interior} className="size-full" caption={false} /></div>
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(0deg,rgb(42_25_15/0.92)_0%,rgb(42_25_15/0.5)_50%,rgb(42_25_15/0.15)_100%)]" />
        <div className="container-site pb-16 pt-32 md:pb-20">
          <h2 id="sala-t" className="max-w-2xl text-[clamp(2rem,4.4vw,3.6rem)]">Surowa cegła, meble w kolorze węgla</h2>
          <p className="mt-4 max-w-xl text-lg text-sand">Parter jest jasny i przestronny, piętro kameralne. Na zewnątrz taras z widokiem na dawne mury obronne.</p>
          <Link href="/rezerwacja" className="btn btn-icing mt-8">Zarezerwuj stolik</Link>
        </div>
        {photos.interior.ready && <p className="absolute bottom-3 right-4 text-[13px] text-white/80">Zdjęcie poglądowe</p>}
      </section>
    </>
  );
}
