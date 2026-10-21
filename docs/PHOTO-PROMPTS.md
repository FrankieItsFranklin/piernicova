# Промпты для фото Piernicova

Куда класть: `public/photos/<file>`, затем в `src/content/photos.ts` поставить `ready: true`.
Формат WebP/JPG, длинная сторона ≥ 2400 px. Без лиц в камеру, без текста, логотипов и вывесок.
На сайте все сгенерированные фото подписаны «Zdjęcie poglądowe». **Шефа не генерируем** — нужен настоящий портрет.
Все фото стоят на всю ширину с затемнением (правило студии), текст поверх — слева или снизу, поэтому в кадре нужен спокойный тёмный участок.

Интерьер по описанию MICHELIN: грубый кирпич, мебель цвета угля, светлый первый этаж, наверху столики у открытой кухни, терраса у старых городских стен.

## Общий стиль (в начало каждого промпта)
```
Photorealistic editorial photograph for a fine-casual Polish restaurant in the Gothic old town of Toruń, Poland. Warm evening light, rough old red-brick walls, charcoal-black furniture, brass details, warm wood. Rich browns, deep walnut tones, warm gold highlights — like gingerbread and carved wooden gingerbread moulds. Shot on a full-frame camera, 35mm, f/2.8, natural textures, no CGI look. No readable text, no logos, no faces looking at the camera.
```

## 1. `kitchen.webp` — главная и «Kuchnia» (16:9, 2560×1440)
```
[стиль] Upstairs dining room with an open kitchen: the pass with brass heat lamps, two cooks in dark aprons plating dishes (seen from the side, faces not in focus), copper and steel pans, rough red-brick wall behind. Foreground: the edge of a charcoal table with a glass of red wine, softly out of focus. The lower third and left side darker and calm, for text overlay. 16:9.
```

## 2. `kitchen-tall.webp` — «Kuchnia», телефон (9:16)
```
[стиль] Same open kitchen as a vertical 9:16 photo: the pass and cooks in the lower half, brick wall and warm lamps above, the upper third darker and calm for text.
```

## 3. `interior.webp` — «Kuchnia», зал (16:9)
```
[стиль] Ground-floor dining room of a restaurant in a historic Gothic townhouse: rough red-brick walls, charcoal-black chairs and tables, warm pendant lights, tables set for dinner, airy and calm, no people. Lower third darker for text. 16:9.
```

## 4. `terrace.webp` — «Kontakt» (16:9)
```
[стиль] Evening terrace of a small restaurant next to the medieval red-brick defensive walls of Toruń old town, cobbled street, a few charcoal tables with candles, warm string of lights, no people, blue-hour sky. Left half darker for text. 16:9.
```

## 5. `table.webp` — «Wydarzenia» (16:9)
```
[стиль] A long table set for a group dinner of about 12 people in a brick-walled restaurant room: white plates, wine glasses, linen napkins, small candles, a few small gingerbread cookies (katarzynki — Toruń gingerbread with white icing) as table favours, no people. Left half darker for text. 16:9.
```

## 6. `duck.webp` — блюдо (резерв, 4:3)
```
[стиль] Overhead-angled plate: sliced pink duck breast, a small potato soufflé, glazed baby carrots and mini leeks, orange pumpkin purée, glossy dark pear-gingerbread-port sauce, on a dark ceramic plate on a walnut table. 4:3.
```
Реальная подача в ресторане может отличаться — блюдо на сайте подписано как poglądowe; лучше заменить фото из ресторана.
