import { useId } from "react";

// Toruńska katarzynka: płaski piernik z sześciu wyraźnych, połączonych kółek w dwóch rzędach,
// lekko wygięty w łuk (środkowa para niżej). Głębokie wcięcia na brzegu, krótkie żłobienia
// w miejscu wcięć i delikatny połysk glazury na każdym kółku.
const R = 22;
const lobes = [
  { x: 34, y: 34 }, { x: 72, y: 39 }, { x: 110, y: 34 },
  { x: 34, y: 66 }, { x: 72, y: 71 }, { x: 110, y: 66 },
];
// wcięcia: między sąsiednimi kółkami w rzędzie (góra/dół) i między rzędami (lewo/prawo)
const notches = [
  { x1: 53, y1: 18, x2: 53, y2: 28 }, { x1: 91, y1: 18, x2: 91, y2: 28 },
  { x1: 53, y1: 82, x2: 53, y2: 92 }, { x1: 91, y1: 82, x2: 91, y2: 92 },
  { x1: 12, y1: 50, x2: 22, y2: 50 }, { x1: 122, y1: 50, x2: 132, y2: 50 },
];

export function Katarzynka({ className = "", title, gloss = true }: { className?: string; title?: string; gloss?: boolean }) {
  const uid = useId().replace(/:/g, "");
  const dough = `kd-${uid}`, shadow = `ksh-${uid}`, tid = `kt-${uid}`;
  return (
    <svg viewBox="0 0 144 106" className={className} role={title ? "img" : undefined} aria-hidden={title ? undefined : true} aria-labelledby={title ? tid : undefined}>
      {title && <title id={tid}>{title}</title>}
      <defs>
        <radialGradient id={dough} gradientUnits="userSpaceOnUse" cx="72" cy="36" r="84">
          <stop offset="0" stopColor="#b5703a" />
          <stop offset=".6" stopColor="#8c4a1d" />
          <stop offset="1" stopColor="#5e2d0e" />
        </radialGradient>
        <filter id={shadow} x="-15%" y="-15%" width="130%" height="140%">
          <feDropShadow dx="0" dy="3" stdDeviation="2.4" floodColor="#1a0d05" floodOpacity=".5" />
        </filter>
      </defs>

      <g filter={`url(#${shadow})`} fill={`url(#${dough})`}>
        {lobes.map((c, i) => <circle key={i} cx={c.x} cy={c.y} r={R} />)}
        {/* środek między kółkami */}
        <path d="M34 34 L72 39 L110 34 L110 66 L72 71 L34 66 Z" />
      </g>

      {/* krótkie żłobienia w miejscu wcięć */}
      <g stroke="#3f1c07" strokeOpacity=".5" strokeWidth="1.8" strokeLinecap="round">
        {notches.map((n, i) => <line key={i} {...n} />)}
      </g>

      {/* połysk glazury: jasny łuk w górnej części każdego kółka */}
      {gloss && (
        <g fill="none" stroke="#ffe6c2" strokeOpacity=".45" strokeWidth="2.6" strokeLinecap="round">
          {lobes.map((c, i) => (
            <path key={i} d={`M${c.x - 13} ${c.y - 8} Q${c.x - 4} ${c.y - 17} ${c.x + 8} ${c.y - 13}`} />
          ))}
        </g>
      )}
    </svg>
  );
}
