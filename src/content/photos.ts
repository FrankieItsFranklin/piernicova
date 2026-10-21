// Manifest zdjęć (public/photos/<file>). Dopóki ready = false, slot rysuje drewno formy zamiast zdjęcia.
// Prompty: docs/PHOTO-PROMPTS.md. Generowane zdjęcia mają podpis „zdjęcie poglądowe”.
export type PhotoSlot = { file: string; alt: string; ready: boolean; generated: boolean };

export const photos = {
  kitchen: { file: "kitchen.webp", alt: "Otwarta kuchnia przy ceglanej ścianie, kucharze przy wydawce, na pierwszym planie stolik ze świecą", ready: true, generated: true },
  kitchenPass: { file: "kitchen-pass.webp", alt: "Kucharz układa danie na wydawce pod mosiężnymi lampami, przed nim nakryty stolik", ready: true, generated: true },
  interior: { file: "interior.webp", alt: "Sala z surową cegłą i ciemnymi meblami, obok otwarta kuchnia", ready: true, generated: true },
  window: { file: "window.webp", alt: "Nakryte stoły przy otwartej kuchni, za oknem dachy starówki", ready: true, generated: true },
  terrace: { file: "terrace.webp", alt: "Taras z widokiem na gotyckie mury obronne Torunia", ready: false, generated: true },
  duck: { file: "duck.webp", alt: "Kaczka rose z puree z dyni i sosem z gruszki, piernika i porto", ready: false, generated: true },
} satisfies Record<string, PhotoSlot>;
