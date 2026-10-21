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

// Zdjęcia dań (poglądowe do czasu sesji w restauracji). Klucz = nazwa dania z menu.ts.
export const dishPhotos: Record<string, PhotoSlot> = {
  "Śledź po toruńsku": { file: "dish-sledz.webp", alt: "Śledź po toruńsku z musem ziemniaczanym, musztardą piernikową i marynowanym jabłkiem", ready: true, generated: true },
  "Kaczka rose": { file: "dish-kaczka.webp", alt: "Kaczka rose z puree z dyni i sosem z gruszki, piernika i porto", ready: true, generated: true },
  "Tiramisu po toruńsku": { file: "dish-tiramisu.webp", alt: "Tiramisu po toruńsku z katarzynkami", ready: true, generated: true },
  "Pierożki z gęsiną": { file: "dish-pierozki.webp", alt: "Pierożki z gęsiną z puree z wędzonej dyni i sosem śliwkowym", ready: true, generated: true },
  "Tatar z polędwicy wołowej": { file: "dish-tatar.webp", alt: "Tatar z polędwicy wołowej z borowikami i majonezem z lubczykiem", ready: true, generated: true },
  "Jesienna grzybowa na zakwasie": { file: "dish-grzybowa.webp", alt: "Krem z grzybów leśnych z łazankami i chipsami z kiszonej kapusty", ready: true, generated: true },
  "Policzki wołowe": { file: "dish-policzki.webp", alt: "Policzki wołowe z puree chrzanowym i burakami", ready: true, generated: true },
};
