# Brief: Restauracja Piernicova, Toruń — полный сайт (фронтенд)

Дата сбора: 2026-10-21. В базе design-kb нет (`search.py --text piernicova / Przedzamcze / Witkowski` → 0 из 135).

Источники:
- [S1] https://piernicova.pl/ (главная), /karta-menu-pl/ (осенняя карта), /voucher/ — прочитано 2026-10-21.
- [S2] https://guide.michelin.com/pl/en/pomerania/torun_2398786/restaurant/piernicova — карточка MICHELIN, прочитано 2026-10-21.
- [S3] notesfrompoland.com (2026-05-28) — статья о первом польском гиде MICHELIN.

## Факты
| # | Факт | Источник |
|---|---|---|
| 1 | Restauracja Piernicova, основана в 2019 г., в готическом Старом городе Торуня | S1 |
| 2 | ul. Przedzamcze 6B, 87-100 Toruń; тел. 880 323 890; restauracja@piernicova.pl | S1, S2 |
| 3 | Часы: pn 15–22, wt–czw 13–22, pt–sb 13–23, nd 13–21 | S1 |
| 4 | Шеф Bartłomiej Witkowski: «czapki» Gault&Millau Polska, участник Top Chef Polska; логотип «Piernicova by Witkowski» | S1 |
| 5 | Награды: Poland 100 Best Restaurants, Polskie Skarby Kulinarne | S1 |
| 6 | **В гиде MICHELIN Polska 2026** (кухня «regionalna, polska», €€) | S2 |
| 7 | Bib Gourmand — **UNVERIFIED**: так пишет S3, на странице MICHELIN (текст) отличие не видно | S3 |
| 8 | Интерьер: открытая кухня — сердце ресторана; грубый кирпич, мебель цвета угля; лёгкий первый этаж, наверху столики видом на открытую кухню; терраса с видом на бывшие городские стены (mury obronne) | S1, S2 |
| 9 | Кухня: польская с авторским международным акцентом; пиво/вина — selekcja win i szampanów, karta win PDF | S1 |
| 10 | Карта (осень 2026, цены PLN): śledź po toruńsku 56; tatar z polędwicy 62; jesienna grzybowa na zakwasie 39; polska chrzanowa 39; pierożki z gęsiną 72; kaczka rose (sos z gruszki, piernika i porto) 82; policzki wołowe 94; stek z polędwicy / antrykotu 146; tiramisu po toruńsku (katarzynki) 38 … — полностью в `src/content/menu.ts` | S1 |
| 11 | Пряник в самом меню: musztarda piernikowa, sos z piernika, katarzynki | S1 |
| 12 | Ваучеры — покупка по e-mail | S1 |
| 13 | Бронь сейчас: zjedz.my/booking/3680. **На новом сайте — своя форма-заявка** (решение владельца студии), подтверждение звонком | S1 |
| 14 | Сезонные предложения (на сайте всплывает «Oferta wigilijna») | S1 |
| 15 | Слоган в подвале: «Eat like a local!» | S1 |

## Не использовать / уточнить у клиента
- Фото ресторана с сайта — не наши; генерируем «poglądowe» по промптам. Шефа не генерируем — нужен настоящий портрет.
- Bib Gourmand — до подтверждения пишем только «w przewodniku MICHELIN 2026».
- Содержание «Oferta wigilijna», меню банкетов, правила брони (на сколько вперёд, группы, залог) — `[NEED]`.
- Аллергены по блюдам — на сайте нет → «zapytaj obsługę».

## Pre-build (CLAUDE.md §5)
**PROJECT TYPE:** многостраничный сайт ресторана fine-casual, фронтенд.
**BUSINESS GOAL:** брони столиков, ваучеры, заявки на мероприятия.
**PRIMARY CONVERSION:** заявка на бронь (своя форма: дата, время, число гостей, зал/терраса, повод) → подтверждение по телефону. Вторично: звонок, ваучер.
**TARGET USERS:** туристы Старого города (PL/EN), местные пары и семьи на повод, группы/компании.
**TOP USER INTENTS:** что за кухня и цены; открыто ли сейчас; забронировать; где (Старый город, у стен); подарок-ваучер.
**REQUIRED PAGES:** `/` · `/menu` · `/kuchnia` (шеф и открытая кухня) · `/wino` · `/rezerwacja` · `/wydarzenia` (группы, поводы, сезонные предложения) · `/voucher` · `/kontakt` · 404.
**RECOMMENDED STACK:** Next.js 16 + React 19 + TS + Tailwind 4 + Motion + RHF + Zod (как dental-template).
**OPTIONAL:** Resend для заявок; EN-версия — следующим этапом (next-intl), сейчас PL.
**REJECTED:** CMS (меню меняется сезонно, но редко — правит студия; при частых правках → Sanity); БД; виджет zjedz.my (владелец выбрал свою форму).
**SEO:** metadata, JSON-LD `Restaurant` (servesCuisine, priceRange, hasMenu, acceptsReservations, openingHours), `Menu` с позициями, sitemap, robots, OG.
**ANALYTICS:** `reservation_start`, `reservation_submit`, `click_phone`, `click_email`, `click_directions`, `voucher_request`, `menu_view`.
**CMS / I18N:** нет / позже (EN).
**RISKS:** заявка ≠ гарантированная бронь (честно говорим «potwierdzimy telefonicznie»); сгенерированные фото блюд могут не совпадать с реальной подачей → подпись; сезонная карта устаревает.
**COMPLEXITY:** средняя.
