// Fakty restauracji — piernicova.pl i karta MICHELIN, odczyt 2026-10-21 (docs/BRIEF.md).
export const site = {
  name: "Piernicova",
  byline: "by Witkowski",
  city: "Toruń",
  founded: 2019,
  url: "https://piernicova.pl",
  address: {
    street: "ul. Przedzamcze 6B",
    postal: "87-100",
    city: "Toruń",
    full: "ul. Przedzamcze 6B, 87-100 Toruń",
    lat: 53.010125,
    lon: 18.61069,
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Piernicova%2C%20Przedzamcze%206B%2C%20Toru%C5%84",
  },
  phone: { display: "880 323 890", href: "tel:+48880323890" },
  email: "restauracja@piernicova.pl",
  instagram: "https://www.instagram.com/restauracja_piernicova/",
  facebook: "https://www.facebook.com/restauracjapiernicova",
  wineListUrl: "https://piernicova.pl/wp-content/uploads/2026/07/Karta-win-.pdf",
  chef: "Bartłomiej Witkowski",
  chefGen: "Bartłomieja Witkowskiego",
  awards: [
    { label: "Przewodnik MICHELIN Polska 2026", note: "kuchnia regionalna i polska" },
    { label: "Poland 100 Best Restaurants", note: "plebiscyt" },
    { label: "Polskie Skarby Kulinarne", note: "konkurs" },
    { label: "Gault&Millau Polska", note: "czapki dla szefa kuchni" },
  ],
  slogan: "Eat like a local!",
} as const;

// Godziny otwarcia; 0 = niedziela … 6 = sobota
export const hours: Record<number, { open: number; close: number }> = {
  1: { open: 15, close: 22 },
  2: { open: 13, close: 22 },
  3: { open: 13, close: 22 },
  4: { open: 13, close: 22 },
  5: { open: 13, close: 23 },
  6: { open: 13, close: 23 },
  0: { open: 13, close: 21 },
};

export const hoursTable = [
  { days: "Poniedziałek", time: "15:00–22:00" },
  { days: "Wtorek – czwartek", time: "13:00–22:00" },
  { days: "Piątek – sobota", time: "13:00–23:00" },
  { days: "Niedziela", time: "13:00–21:00" },
] as const;

export const nav = [
  { href: "/menu", label: "Karta" },
  { href: "/kuchnia", label: "Kuchnia" },
  { href: "/wydarzenia", label: "Wydarzenia" },
  { href: "/voucher", label: "Voucher" },
  { href: "/kontakt", label: "Kontakt" },
] as const;

export const seating = [
  { id: "kuchnia", label: "Przy otwartej kuchni", hint: "piętro" },
  { id: "parter", label: "Parter", hint: "jasna sala" },
  { id: "taras", label: "Taras", hint: "widok na mury" },
  { id: "obojetnie", label: "Bez znaczenia", hint: "" },
] as const;
