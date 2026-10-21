"use client";

import { useState, useSyncExternalStore } from "react";
import { motion } from "motion/react";
import { menu, tagLabels, type Tag } from "@/content/menu";
import { DishRow } from "@/components/Dish";
import { track } from "@/lib/track";

const filterTags: Tag[] = ["piernik", "dynia", "grzyby", "gruszka", "sliwka", "ryba", "wege"];
const noop = () => () => {};
function readUrlTag(): Tag | null {
  const q = new URLSearchParams(window.location.search).get("skladnik") as Tag | null;
  return q && filterTags.includes(q) ? q : null;
}

// Karta z filtrem po składnikach sezonu: wybrany składnik podświetla dania, reszta przygasa (nie znika — widać całą kartę).
export function MenuBrowser() {
  // link z innej strony: /menu?skladnik=piernik (na serwerze brak — strona jest statyczna)
  const urlTag = useSyncExternalStore(noop, readUrlTag, () => null);
  // undefined = gość jeszcze nie klikał, wtedy obowiązuje składnik z adresu
  const [picked, setTag] = useState<Tag | null | undefined>(undefined);
  const tag = picked === undefined ? urlTag : picked;
  const count = tag ? menu.flatMap((c) => c.dishes).filter((d) => d.tags.includes(tag)).length : null;

  return (
    <div className="on-light">
      <div className="sticky top-[78px] z-20 -mx-4 border-b border-line bg-icing/95 px-4 py-3 backdrop-blur-md sm:mx-0 sm:px-0">
        <nav aria-label="Działy karty" className="flex gap-1 overflow-x-auto [scrollbar-width:none]">
          {menu.map((c) => (
            <a key={c.id} href={`#${c.id}`} className="shrink-0 rounded-full px-3.5 py-2 text-[15px] font-semibold text-ink/80 hover:bg-cream-2 hover:text-ink">{c.title}</a>
          ))}
        </nav>
        <div className="mt-2 flex items-center gap-2 overflow-x-auto pb-1 [scrollbar-width:none] md:flex-wrap md:overflow-visible" role="group" aria-label="Pokaż dania ze składnikiem">
          {filterTags.map((t) => {
            const on = tag === t;
            return (
              <button
                key={t}
                type="button"
                aria-pressed={on}
                onClick={() => { const nt = on ? null : t; setTag(nt); if (nt) track("menu_filter", { tag: nt }); }}
                className={`relative inline-flex shrink-0 items-center gap-2 rounded-full border-[1.5px] px-3 py-1.5 text-[14px] font-medium transition-colors ${on ? "border-ink text-icing" : "border-line bg-white text-ink hover:border-muted"}`}
              >
                {on && <motion.span layoutId="filter-pill" className="absolute inset-0 rounded-full bg-ink" transition={{ type: "spring", stiffness: 420, damping: 34 }} />}
                <i className="relative size-3 rounded-full" style={{ background: tagLabels[t].color }} aria-hidden="true" />
                <span className="relative">{tagLabels[t].label}</span>
              </button>
            );
          })}
          <p className="ml-1 shrink-0 text-sm text-muted" aria-live="polite">{count !== null ? `${count} ${count === 1 ? "danie" : count < 5 ? "dania" : "dań"} z tym składnikiem` : "Wybierz składnik sezonu"}</p>
        </div>
      </div>

      {menu.map((c) => (
        <section key={c.id} id={c.id} aria-labelledby={`${c.id}-t`} className="scroll-mt-48 pt-12">
          <h2 id={`${c.id}-t`} className="text-[clamp(1.9rem,3.4vw,2.8rem)] text-ink">{c.title}</h2>
          <ul className="mt-2">
            {c.dishes.map((d) => <DishRow key={d.name} dish={d} highlight={tag ? d.tags.includes(tag) : undefined} />)}
          </ul>
        </section>
      ))}
    </div>
  );
}
