import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { BookingTicket } from "@/components/BookingTicket";
import { OpenNow } from "@/components/OpenNow";
import { MoldCard } from "@/components/Dish";
import { IcingRule } from "@/components/IcingRule";
import { Reveal } from "@/components/Reveal";
import { Photo } from "@/components/Photo";
import { Katarzynka } from "@/components/Katarzynka";
import { allDishes, featured } from "@/content/menu";
import { photos } from "@/content/photos";
import { site, seating } from "@/content/site";

const piernikDishes = allDishes.filter((d) => d.tags.includes("piernik"));
const featuredDishes = featured.map((n) => allDishes.find((d) => d.name === n)!);

export default function Home() {
  return (
    <>
      {/* 1. Forma piernikowa + bon */}
      <section aria-labelledby="h1" className="wood relative overflow-hidden pt-[78px]">
        <div className="absolute inset-0 bg-[radial-gradient(55%_60%_at_80%_55%,rgb(236_211_138/0.1),transparent_70%)]" aria-hidden="true" />
        <div className="container-site relative grid items-start gap-12 pb-20 pt-10 md:pt-14 lg:grid-cols-[1.1fr_minmax(330px,440px)] lg:gap-20 lg:pb-28">
          <div>
            <p className="font-semibold tracking-[0.02em] text-gold-hi">Toruń, gotycka starówka · od {site.founded}</p>
            <p className="carved mt-3 select-none text-[clamp(3.4rem,9.6vw,8.8rem)] leading-[0.9]" aria-hidden="true">Piernicova</p>
            <h1 id="h1" className="mt-5 max-w-[20ch] text-[clamp(1.9rem,3.4vw,3rem)]">Kuchnia polska z piernikowym akcentem, przy murach Przedzamcza</h1>
            <p className="mt-5 max-w-xl text-sand">
              Śledź po toruńsku z musztardą piernikową, kaczka z sosem z gruszki, piernika i porto, tiramisu z katarzynkami. Na piętrze siadasz przy otwartej kuchni szefa {site.chefGen}.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href="/menu" className="btn btn-gold">Zobacz kartę</Link>
              <Link href="/wydarzenia" className="link-u px-2 font-semibold text-sand hover:text-icing">Kolacja dla grupy</Link>
            </div>
            <p className="mt-6 text-sand"><OpenNow /> <span className="text-sand/80">· {site.address.street}</span></p>
            <ul className="mt-7 flex max-w-xl flex-wrap gap-x-5 gap-y-1.5 border-t border-gold/35 pt-5 text-[15px] text-sand" aria-label="Wyróżnienia">
              {site.awards.map((a) => <li key={a.label}>{a.label}</li>)}
            </ul>
          </div>
          <BookingTicket />
        </div>
      </section>

      {/* 2. Karta */}
      <section aria-labelledby="karta-t" className="on-light bg-icing py-24 text-ink md:py-28">
        <div className="container-site">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <h2 id="karta-t" className="text-[clamp(2.1rem,4.2vw,3.6rem)]">Karta na jesień</h2>
              <IcingRule className="mt-4" color="#a85f2c" />
              <p className="mt-4 max-w-xl text-muted">Kilka pozycji z obecnej karty. Składniki tak, jak pisze je kuchnia — rozdzielone ukośnikiem.</p>
            </div>
            <Link href="/menu" className="btn btn-ink self-start md:self-auto">Cała karta</Link>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {featuredDishes.map((d, i) => (
              <Reveal key={d.name} delay={i * 0.08}><MoldCard dish={d} course={d.course} /></Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Piernik w karcie */}
      <section aria-labelledby="piernik-t" className="wood relative overflow-hidden py-24 md:py-28">
        <div className="container-site grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <Katarzynka className="mx-auto w-full max-w-[340px] drop-shadow-[0_30px_40px_rgb(0_0_0/0.55)]" title="Toruńska katarzynka z lukrem" />
          <div>
            <h2 id="piernik-t" className="text-[clamp(2.1rem,4.2vw,3.6rem)]">Piernik nie tylko na deser</h2>
            <IcingRule className="mt-4" />
            <p className="mt-5 max-w-xl text-sand">Toruński piernik pojawia się w karcie w {piernikDishes.length} daniach — od przystawki po deser.</p>
            <ul className="mt-8 divide-y divide-gold/20 border-y border-gold/20">
              {piernikDishes.map((d) => (
                <li key={d.name} className="flex items-baseline justify-between gap-6 py-4">
                  <span>
                    <span className="block font-serif text-2xl">{d.name}</span>
                    <span className="text-[15px] text-sand">{d.parts.find((p) => /piernik|katarzynk/.test(p))}</span>
                  </span>
                  <span className="font-extrabold text-gold-hi tabular-nums">{d.price} zł</span>
                </li>
              ))}
            </ul>
            <Link href="/menu?skladnik=piernik" className="link-u mt-6 inline-block font-semibold text-gold-hi">Pokaż w karcie</Link>
          </div>
        </div>
      </section>

      {/* 4. Otwarta kuchnia — zdjęcie na całą szerokość */}
      <section aria-labelledby="kuchnia-t" className="relative isolate flex min-h-[78svh] items-end overflow-hidden">
        <div className="absolute inset-0 -z-10"><Photo slot={photos.kitchen} className="size-full" sizes="100vw" caption={false} /></div>
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(0deg,rgb(42_25_15/0.92)_0%,rgb(42_25_15/0.55)_45%,rgb(42_25_15/0.15)_100%)]" />
        <div className="container-site pb-16 pt-32 md:pb-24">
          <h2 id="kuchnia-t" className="max-w-3xl text-[clamp(2.2rem,5vw,4.2rem)]">Na piętrze kuchnia jest na widoku</h2>
          <p className="mt-5 max-w-xl text-lg text-sand">Otwarta kuchnia to serce Piernicovej: przy stolikach na piętrze widzisz, jak zespół szefa {site.chefGen} przygotowuje dania.</p>
          <Link href="/kuchnia" className="btn btn-icing mt-8">O kuchni i szefie <ArrowUpRight className="size-4" aria-hidden="true" /></Link>
        </div>
        {photos.kitchen.ready && <p className="absolute bottom-3 right-4 text-[13px] text-white/80">Zdjęcie poglądowe</p>}
      </section>

      {/* 5. Gdzie usiąść */}
      <section aria-labelledby="sale-t" className="on-light bg-icing py-24 text-ink md:py-28">
        <div className="container-site">
          <h2 id="sale-t" className="text-[clamp(2.1rem,4.2vw,3.6rem)]">Gdzie usiąść</h2>
          <IcingRule className="mt-4" color="#a85f2c" />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              { t: "Przy otwartej kuchni", d: "Piętro, kameralnie, stoliki zwrócone w stronę kuchni.", id: "kuchnia" },
              { t: "Parter", d: "Jaśniej i przestronniej. Surowa cegła, meble w kolorze węgla drzewnego.", id: "parter" },
              { t: "Taras", d: "Z widokiem na dawne mury obronne starówki.", id: "taras" },
            ].map((s, i) => (
              <Reveal key={s.id} delay={i * 0.08} className="rounded-[22px] border border-line bg-paper p-7">
                <p className="font-mono text-[13px] text-muted">{seating.find((x) => x.id === s.id)?.hint}</p>
                <h3 className="mt-2 text-[1.7rem]">{s.t}</h3>
                <p className="mt-2 text-muted">{s.d}</p>
              </Reveal>
            ))}
          </div>
          <p className="mt-6 text-muted">Miejsce wybierzesz w bonie rezerwacji — postaramy się je zapewnić.</p>
        </div>
      </section>

      {/* 6. Okazje */}
      <section aria-labelledby="okazje-t" className="wood py-24 md:py-28">
        <div className="container-site grid gap-5 md:grid-cols-2">
          <Link href="/wydarzenia" className="mold group block rounded-[26px] p-8 transition-transform hover:-translate-y-1 sm:p-10">
            <h2 id="okazje-t" className="text-[clamp(1.9rem,3.4vw,2.8rem)]">Kolacja dla grupy</h2>
            <p className="mt-3 max-w-md text-sand">Urodziny, kolacja firmowa, oferta wigilijna. Napisz, ile osób i kiedy — odpiszemy z propozycją menu.</p>
            <span className="mt-6 inline-flex items-center gap-2 font-semibold text-gold-hi">Zapytaj o termin <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" /></span>
          </Link>
          <Link href="/voucher" className="mold group relative block overflow-hidden rounded-[26px] p-8 transition-transform hover:-translate-y-1 sm:p-10">
            <Katarzynka className="absolute -right-8 -top-8 w-44 opacity-80" />
            <h2 className="text-[clamp(1.9rem,3.4vw,2.8rem)]">Voucher na prezent</h2>
            <p className="mt-3 max-w-md text-sand">Wpisz imię obdarowanej osoby i kwotę — zobaczysz voucher od razu.</p>
            <span className="mt-6 inline-flex items-center gap-2 font-semibold text-gold-hi">Zaprojektuj voucher <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" /></span>
          </Link>
        </div>
      </section>
    </>
  );
}
