// node docs/wordmark/run-flow.mjs → public/wordmark-flow.png
// Mapa wlewania lukru: dla każdego piksela liter — kiedy dopłynie do niego lukier wlany z lewego brzegu,
// płynąc wewnątrz formy (odległość geodezyjna, Dijkstra 8-sąsiedztwo). Krok poza literą kosztuje OUT razy
// więcej — lukier trzyma się kanałów liter, a do kropek nad „i” i oderwanych kawałków przeskakuje najkrótszą drogą.
// Chrome (headless) tylko rasteryzuje kontury z wordmark-path.ts; liczenie i zapis PNG w Node.
// PNG: kanał R = czas 0..254, alfa 255 wewnątrz liter, rozdzielczość 2× viewBox.
import { spawn } from 'node:child_process';
import { mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os'; import { join, dirname } from 'node:path'; import { fileURLToPath } from 'node:url';
import { deflateSync } from 'node:zlib';
const SC = 2, OUT = 4;
const here = dirname(fileURLToPath(import.meta.url)), root = join(here, '..', '..');
const src = readFileSync(join(root, 'src/components/wordmark-path.ts'), 'utf8');
const W = +src.match(/w: (\d+)/)[1], H = +src.match(/h: (\d+)/)[1], glyphs = [...src.matchAll(/"(M[^"]+)"/g)].map(m => m[1]);
const w = W * SC, h = H * SC, N = w * h;

// 1. raster liter
const chrome = spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', ['--headless=new', '--remote-debugging-port=0', `--user-data-dir=${mkdtempSync(join(tmpdir(), 'w-'))}`, 'about:blank'], { stdio: ['ignore', 'ignore', 'pipe'] });
const wsUrl = await new Promise(r => { let b = ''; chrome.stderr.on('data', d => { b += d; const m = b.match(/DevTools listening on (ws:\/\/\S+)/); if (m) r(m[1]); }); });
const port = new URL(wsUrl).port; const pg = (await (await fetch(`http://127.0.0.1:${port}/json/list`)).json()).find(t => t.type === 'page');
const ws = new WebSocket(pg.webSocketDebuggerUrl); await new Promise(r => ws.addEventListener('open', r, { once: true }));
let id = 0; const pend = new Map(); ws.addEventListener('message', e => { const m = JSON.parse(e.data); if (m.id && pend.has(m.id)) { pend.get(m.id)(m); pend.delete(m.id); } });
const send = (method, params = {}) => new Promise(r => { const n = ++id; pend.set(n, r); ws.send(JSON.stringify({ id: n, method, params })); });
const r = await send('Runtime.evaluate', { returnByValue: true, expression: `(()=>{const c=document.createElement('canvas');c.width=${w};c.height=${h};const x=c.getContext('2d');x.scale(${SC},${SC});
  for(const d of ${JSON.stringify(glyphs)}) x.fill(new Path2D(d)); const a=x.getImageData(0,0,${w},${h}).data; let s='';
  for(let i=0;i<${N};i++) s+=a[i*4+3]>40?'1':'0'; return s;})()` });
chrome.kill();
const mask = r.result.result.value; const inside = new Uint8Array(N); for (let i = 0; i < N; i++) inside[i] = mask.charCodeAt(i) === 49 ? 1 : 0;

// 2. Dijkstra (kopiec binarny na typed arrays)
const dist = new Float64Array(N).fill(Infinity);
let hk = new Float64Array(1 << 20), hv = new Int32Array(1 << 20), hn = 0;
const push = (i, d) => { if (hn >= hk.length) { const k2 = new Float64Array(hk.length * 2); k2.set(hk); hk = k2; const v2 = new Int32Array(hv.length * 2); v2.set(hv); hv = v2; }
  let k = hn++; while (k > 0) { const p = (k - 1) >> 1; if (hk[p] <= d) break; hk[k] = hk[p]; hv[k] = hv[p]; k = p; } hk[k] = d; hv[k] = i; };
const pop = () => { const i = hv[0], d = hk[0]; hn--; const ld = hk[hn], li = hv[hn]; let k = 0;
  for (;;) { const l = 2 * k + 1; if (l >= hn) break; let m = l; if (l + 1 < hn && hk[l + 1] < hk[l]) m = l + 1; if (hk[m] >= ld) break; hk[k] = hk[m]; hv[k] = hv[m]; k = m; }
  hk[k] = ld; hv[k] = li; popd = d; return i; };
let popd = 0;
let minx = w; for (let i = 0; i < N; i++) if (inside[i]) minx = Math.min(minx, i % w);
for (let y = 0; y < h; y++) for (let x = minx; x < minx + 2; x++) { const i = y * w + x; if (inside[i]) { dist[i] = 0; push(i, 0); } }
const NB = [[1, 0, 1], [-1, 0, 1], [0, 1, 1], [0, -1, 1], [1, 1, Math.SQRT2], [1, -1, Math.SQRT2], [-1, 1, Math.SQRT2], [-1, -1, Math.SQRT2]];
while (hn) { const i = pop(), d = popd; if (d > dist[i]) continue; const x = i % w, y = (i / w) | 0;
  for (const [dx, dy, c] of NB) { const nx = x + dx, ny = y + dy; if (nx < 0 || ny < 0 || nx >= w || ny >= h) continue; const j = ny * w + nx;
    const nd = d + c * (inside[j] ? 1 : OUT); if (nd < dist[j]) { dist[j] = nd; push(j, nd); } } }
let max = 0; for (let i = 0; i < N; i++) if (inside[i]) max = Math.max(max, dist[i]);

// 3. PNG RGBA bez bibliotek
const raw = Buffer.alloc((w * 4 + 1) * h);
for (let y = 0; y < h; y++) { raw[y * (w * 4 + 1)] = 0; for (let x = 0; x < w; x++) { const i = y * w + x, o = y * (w * 4 + 1) + 1 + x * 4;
  if (inside[i]) { raw[o] = Math.round(dist[i] / max * 254); raw[o + 3] = 255; } } }
const crcT = new Int32Array(256).map((_, n) => { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1; return c; });
const crc = b => { let c = -1; for (const x of b) c = crcT[(c ^ x) & 255] ^ (c >>> 8); return (c ^ -1) >>> 0; };
const chunk = (t, d) => { const l = Buffer.alloc(4); l.writeUInt32BE(d.length); const td = Buffer.concat([Buffer.from(t), d]); const c = Buffer.alloc(4); c.writeUInt32BE(crc(td)); return Buffer.concat([l, td, c]); };
const ihdr = Buffer.alloc(13); ihdr.writeUInt32BE(w, 0); ihdr.writeUInt32BE(h, 4); ihdr[8] = 8; ihdr[9] = 6;
writeFileSync(join(root, 'public/wordmark-flow.png'), Buffer.concat([Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]), chunk('IHDR', ihdr), chunk('IDAT', deflateSync(raw, { level: 9 })), chunk('IEND', Buffer.alloc(0))]));
console.log('public/wordmark-flow.png', w, 'x', h, 'max geodesic', (max / SC).toFixed(1));
