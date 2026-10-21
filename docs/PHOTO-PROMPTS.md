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

---

# Фото блюд (7 слотов, `dish-*.webp`, 4:5 или 4:3, ≥ 2000 px)

Стоят внутри карточек на главной (карта + секция «Piernik nie tylko na deser») и миниатюрами в /menu. Каждый файл → `dishPhotos` в `src/content/photos.ts`, `ready: true`.

## Общий стиль блюд
```
Photorealistic fine-dining food photograph for a Polish restaurant in Toruń. One plated dish on a dark matte ceramic plate, on a dark walnut table, warm low side light from a window, deep brown and gold tones, soft shadows, shallow depth of field, a little negative space around the plate. Editorial, natural, not glossy advertising. No text, no logos, no hands, no cutlery clutter. Vertical 4:5.
```

1. `dish-sledz.webp` — Śledź po toruńsku:
```
[styl] Pickled herring fillets with warm spices, a quenelle of potato and sour cream mousse, a dot of dark gingerbread mustard, small charred fire-roasted baby potatoes, cubes of marinated apple, a few nasturtium leaves.
```
2. `dish-kaczka.webp` — Kaczka rose:
```
[styl] Sliced pink duck breast fanned on the plate, a small golden potato soufflé, glazed baby carrots and mini leeks, a swoosh of bright orange pumpkin and blood-orange purée, glossy dark pear-gingerbread-port sauce.
```
3. `dish-tiramisu.webp` — Tiramisu po toruńsku:
```
[styl] A neat square of tiramisu with velvety cream on a dark plate, dusted with cocoa, with two small Toruń gingerbread cookies "katarzynki" (six joined round lobes, glossy brown glaze) beside it.
```
4. `dish-pierozki.webp` — Pierożki z gęsiną:
```
[styl] Five handmade pierogi filled with roasted goose and mushrooms, smoked pumpkin purée, pickled pumpkin cubes, toasted hazelnuts, shaved Pecorino, a dark smoked plum sauce.
```
5. `dish-tatar.webp` — Tatar z polędwicy:
```
[styl] Beef tartare shaped in a round, topped with pickled pearl onions, chopped shallot, cucumber and porcini, a dot of lovage mayonnaise, a little truffle butter and a slice of fresh bread on the side.
```
6. `dish-grzybowa.webp` — Jesienna grzybowa:
```
[styl] A shallow bowl of creamy wild mushroom soup with sliced porcini and bay boletes, a small mound of łazanki pasta with cabbage, crisp sauerkraut chips on top.
```
7. `dish-policzki.webp` — Policzki wołowe:
```
[styl] Braised beef cheeks glossy with dark mushroom demi-glace, a mound of horseradish mashed potato, red-wine-vinegar beetroot, a crisp potato nest on top.
```
