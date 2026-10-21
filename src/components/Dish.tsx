import type { Dish as DishT } from "@/content/menu";
import { tagLabels } from "@/content/menu";

// Opis dania tak jak w karcie Piernicovej: składniki rozdzielone ukośnikami (złote „/”).
export function Parts({ parts }: { parts: string[] }) {
  return (
    <>
      {parts.map((p, i) => (
        <span key={p}>
          {i > 0 && <span className="slash" aria-hidden="true">/</span>}
          {i > 0 && <span className="sr-only">, </span>}
          {p}
        </span>
      ))}
    </>
  );
}

// Karta dania jako deska formy piernikowej.
export function MoldCard({ dish, course }: { dish: DishT; course?: string }) {
  return (
    <article className="mold flex h-full flex-col rounded-[22px] p-7 text-icing">
      {course && <p className="text-sm font-semibold text-gold-hi">{course}</p>}
      <h3 className="mt-2 text-[1.7rem]">{dish.name}</h3>
      <p className="mt-3 flex-1 text-[15.5px] leading-relaxed text-sand"><Parts parts={dish.parts} /></p>
      <p className="mt-5 text-lg font-extrabold text-gold-hi tabular-nums">{dish.price} zł</p>
    </article>
  );
}

// Wiersz karty na papierze (strona Menu).
export function DishRow({ dish, highlight }: { dish: DishT; highlight?: boolean }) {
  return (
    <li className={`grid grid-cols-[1fr_auto] gap-x-6 gap-y-1.5 border-b border-line py-5 transition-opacity duration-300 ${highlight === false ? "opacity-35" : ""}`}>
      <h3 className="text-[1.45rem] text-ink">{dish.name}</h3>
      <span className="row-start-1 col-start-2 self-baseline text-lg font-extrabold text-ink tabular-nums">{dish.price} zł</span>
      <p className="col-span-2 text-[15.5px] leading-relaxed text-muted sm:col-span-1"><Parts parts={dish.parts} /></p>
      {dish.tags.length > 0 && (
        <ul className="col-span-2 flex flex-wrap gap-1.5" aria-label="Składniki sezonu">
          {dish.tags.map((t) => (
            <li key={t} className="inline-flex items-center gap-1.5 rounded-full bg-cream-2 px-2.5 py-0.5 text-[13px] text-ink">
              <i className="size-2.5 rounded-full" style={{ background: tagLabels[t].color }} aria-hidden="true" />
              {tagLabels[t].label}
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}
