// Karta — piernicova.pl/karta-menu-pl, jesień 2026, odczyt 2026-10-21. Ceny w PLN.
// "tags" to składniki sezonu do filtra (tylko gdy występują w opisie dania).
export type Tag = "piernik" | "dynia" | "grzyby" | "gruszka" | "sliwka" | "ryba" | "wege";
export type Dish = { name: string; price: number; parts: string[]; tags: Tag[] };
export type Course = { id: string; title: string; dishes: Dish[] };

export const tagLabels: Record<Tag, { label: string; color: string }> = {
  piernik: { label: "piernik", color: "#a85f2c" },
  dynia: { label: "dynia", color: "#e2782c" },
  grzyby: { label: "grzyby", color: "#8a6a4a" },
  gruszka: { label: "gruszka", color: "#b7c06c" },
  sliwka: { label: "śliwka", color: "#6b2a3a" },
  ryba: { label: "ryby i owoce morza", color: "#5d7f93" },
  wege: { label: "bez mięsa", color: "#6f8f4e" },
};

export const menu: Course[] = [
  {
    id: "przystawki",
    title: "Przystawki",
    dishes: [
      { name: "Śledź po toruńsku", price: 56, tags: ["piernik", "ryba"], parts: ["przyprawy korzenne", "mus z ziemniaków i kwaśnej śmietany", "musztarda piernikowa", "ziemniaki z ogniska", "marynowane jabłka", "liście nasturcji"] },
      { name: "Krewetki", price: 67, tags: ["ryba"], parts: ["smażone krewetki 8/12", "seler naciowy & sambal", "rukola z solą morską", "sos maślany z pietruszką"] },
      { name: "Pieczona papryka", price: 59, tags: [], parts: ["„tatar” z wędzonej papryki", "hummus z ciecierzycy", "świeże zioła", "mus z kiszonego ogórka", "majonez dashi", "emulsja z orzechów laskowych"] },
      { name: "Vitello tonnato", price: 68, tags: [], parts: ["plastry wolno gotowanej cielęciny", "sos z tuńczyka, kaparów i anchovies", "salsa z suszonych pomidorów", "rukola z solą morską", "świeże pieczywo"] },
      { name: "Tatar z polędwicy wołowej", price: 62, tags: ["grzyby"], parts: ["marynowana szalotka & ogórek & borowiki", "domowy majonez z lubczykiem", "musztarda francuska", "piklowane cebulki perłowe", "masło truflowe", "świeże pieczywo"] },
    ],
  },
  {
    id: "salatki",
    title: "Sałatki",
    dishes: [
      { name: "Jesienna sałatka z burratą", price: 56, tags: ["dynia"], parts: ["pieczona i marynowana dynia", "prosciutto", "burrata", "sałata radicchio & frisée", "prażone kasztany", "dressing pomarańczowo-balsamiczny"] },
      { name: "Sałatka z kozim serem", price: 59, tags: ["gruszka", "wege"], parts: ["zapiekany ser kozi Bûche de Chèvre", "świeże sałaty", "marynowana gruszka", "karmelizowane orzechy laskowe", "prażone ziarna", "dressing z malin i octu winnego"] },
    ],
  },
  {
    id: "zupy",
    title: "Zupy",
    dishes: [
      { name: "Jesienna grzybowa na zakwasie", price: 39, tags: ["grzyby"], parts: ["krem z grzybów leśnych", "podgrzybki & borowiki", "łazanki z kapustą i grzybami", "chipsy z kiszonej kapusty"] },
      { name: "Polska chrzanowa", price: 39, tags: [], parts: ["wywar na wędzonce", "puree ziemniaczane", "panierowana biała kiełbasa", "kwaśna śmietana"] },
      { name: "Zupa rybna", price: 39, tags: ["ryba"], parts: ["wywar z białych ryb & chilli", "smażona dorada", "„ceviche” z dorsza z limonką", "sałatka z kopru włoskiego", "kawior z pstrąga", "olej ziołowy"] },
    ],
  },
  {
    id: "dania",
    title: "Dania główne",
    dishes: [
      { name: "Dorsz", price: 89, tags: ["ryba"], parts: ["filet z dorsza atlantyckiego", "młode ziemniaki & duszony por w emulsji szafranowej", "puree z pieczonej pietruszki", "sos z wędzonego boczku"] },
      { name: "Dorada", price: 85, tags: ["ryba"], parts: ["filet z dorady na maśle", "risotto szafranowe z krewetkami i mascarpone", "dzikie brokuły", "sos z czterech serów", "olej szczypiorkowy"] },
      { name: "Pierożki z gęsiną", price: 72, tags: ["dynia", "grzyby", "sliwka"], parts: ["domowe ciasto", "farsz z pieczonej gęsi z grzybami", "puree z wędzonej dyni", "marynowana dynia w occie", "prażone orzechy laskowe", "Pecorino", "sos z wędzonej śliwki strzeleckiej"] },
      { name: "Stek z pieczonej dyni z pomarańczami i gruszkami", price: 67, tags: ["dynia", "gruszka", "grzyby", "wege"], parts: ["mus z kasztanów", "puree ziemniaczane z tymiankiem", "marynowane buraki chioggia", "prażony jarmuż", "boczniak mikołajkowy", "wegański sos demi-glace"] },
      { name: "Policzki wołowe", price: 94, tags: ["grzyby"], parts: ["puree ziemniaczane z chrzanem", "buraki z czerwonym octem winnym", "chrust ziemniaczany", "demi-glace z grzybami trompette de la mort"] },
      { name: "Gęsie pipki", price: 69, tags: ["sliwka", "grzyby"], parts: ["duszone gęsie żołądki", "puree ziemniaczane z truflami", "karmelizowana cebula", "śliwka z domowej spiżarni", "orzechy laskowe w miodzie", "pieczarka portobello"] },
      { name: "Kaczka rose", price: 82, tags: ["piernik", "gruszka", "dynia"], parts: ["pierś z kaczki sous-vide", "pieczony suflet ziemniaczany z tymiankiem", "karmelizowane marchewki i mini pory", "puree z dyni i czerwonych pomarańczy", "sos z gruszki, piernika i porto"] },
    ],
  },
  {
    id: "steki",
    title: "Selekcja mięs szefa kuchni",
    dishes: [
      { name: "Stek z polskiej polędwicy wołowej", price: 146, tags: ["grzyby"], parts: ["domowe kluseczki z nadzieniem serowo-pieprzowym", "boczniak mikołajkowy na maśle", "puree z białych warzyw", "figa", "sos béarnaise & sos pieprzowy"] },
      { name: "Stek z antrykotu wołowego", price: 146, tags: ["grzyby"], parts: ["domowe kluseczki z nadzieniem serowo-pieprzowym", "boczniak mikołajkowy na maśle", "puree z białych warzyw", "figa", "sos béarnaise & sos pieprzowy"] },
    ],
  },
  {
    id: "desery",
    title: "Desery",
    dishes: [
      { name: "Crème brûlée z wiśniami", price: 39, tags: ["wege"], parts: ["klasyczny deser z karmelizowanym cukrem", "wiśnie w syropie", "sorbet z czarnej porzeczki"] },
      { name: "Domowe brownie", price: 39, tags: ["sliwka", "wege"], parts: ["domowe ciasto czekoladowe", "krem waniliowy", "mus z wędzonej śliwki", "sos z białej czekolady i owoców leśnych", "lody śliwkowe"] },
      { name: "Tiramisu po toruńsku", price: 38, tags: ["piernik", "wege"], parts: ["aksamitny krem", "katarzynki", "likier kawowy z Amaretto"] },
    ],
  },
];

export const menuSource = "Karta jesienna, stan na 21.10.2026. Alergeny — zapytaj obsługę.";
export const featured = ["Śledź po toruńsku", "Kaczka rose", "Tiramisu po toruńsku"];
export const allDishes = menu.flatMap((c) => c.dishes.map((d) => ({ ...d, course: c.title })));
