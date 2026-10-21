# Piernicova — strona restauracji (frontend)

Restauracja Piernicova, ul. Przedzamcze 6B, Toruń (prawdziwy klient; fakty z piernicova.pl i karty MICHELIN, odczyt 2026-10-21 — `docs/BRIEF.md`).

Next.js 16 (App Router, Cache Components) · React 19 · TypeScript · Tailwind 4 · Motion · React Hook Form + Zod. Wszystkie strony statyczne.

## Uruchomienie
```bash
corepack pnpm@9.15.9 install
corepack pnpm@9.15.9 dev
corepack pnpm@9.15.9 build && corepack pnpm@9.15.9 start
```

## Gdzie co jest
- `src/content/` — treść jako dane: `site.ts` (adres, godziny, nagrody, sale), `menu.ts` (cała karta jesienna z cenami i tagami składników), `photos.ts` (manifest zdjęć).
- `src/components/BookingTicket.tsx` — rezerwacja jako bon na mosiężnej szynie (2 kroki + pieczątka).
- `src/components/MenuBrowser.tsx` — karta z filtrem składników sezonu.
- `src/components/VoucherDesigner.tsx` — voucher z podglądem na żywo.
- `src/app/actions/requests.ts` — jedna server action dla rezerwacji, wydarzeń i voucherów (walidacja Zod, Resend gdy są klucze; bez nich tryb demo).
- `docs/` — `BRIEF.md`, `NOTES.md` (decyzje, poprawki, wyniki sprawdzeń, pytania do restauracji), `PHOTO-PROMPTS.md`, `directions/` (kierunki A–D), `shots/`.

## Do uzupełnienia
Zdjęcia według `docs/PHOTO-PROMPTS.md` (+ `ready: true`), portret szefa, logo, klucze Resend, analityka (`window.dataLayer`), zasady rezerwacji i nominały voucherów — lista w `docs/NOTES.md`.
