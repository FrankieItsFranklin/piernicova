import { useId } from "react";
import { ICING, OUTER } from "@/components/katarzynka-paths";

// Znak Piernicovej: katarzynka z góry — falisty brzeg (trzy łuki u góry i u dołu, dwa po bokach),
// lukrowa linia równo odsunięta od brzegu i złoty kwiatek z sześciu kropel w środku.
// Kontury liczone skryptem (union elips + offset), żeby linia lukru miała stałą grubość także we wcięciach.
const C = { x: 74, y: 51.5 };
const petal = "M0 -4.2C2.3 -6.4 3.5 -8.6 3.5 -11.2A3.5 3.5 0 0 0 -3.5 -11.2C-3.5 -8.6 -2.3 -6.4 0 -4.2Z";

export function Katarzynka({ className = "", title, gloss = true }: { className?: string; title?: string; gloss?: boolean }) {
  const uid = useId().replace(/:/g, "");
  const dough = `kd-${uid}`, shadow = `ksh-${uid}`, tid = `kt-${uid}`;
  return (
    <svg viewBox="0 0 148 103" className={className} role={title ? "img" : undefined} aria-hidden={title ? undefined : true} aria-labelledby={title ? tid : undefined}>
      {title && <title id={tid}>{title}</title>}
      <defs>
        <radialGradient id={dough} gradientUnits="userSpaceOnUse" cx="74" cy="48" r="80">
          <stop offset="0" stopColor="#a35b2b" />
          <stop offset=".7" stopColor="#9a5327" />
          <stop offset="1" stopColor="#c4844a" />
        </radialGradient>
        <filter id={shadow} x="-10%" y="-10%" width="120%" height="130%">
          <feDropShadow dx="0" dy="2.5" stdDeviation="2" floodColor="#140a03" floodOpacity=".55" />
        </filter>
      </defs>

      <path d={OUTER} fill={`url(#${dough})`} filter={`url(#${shadow})`} />
      {/* jaśniejszy, wypieczony brzeg */}
      <path d={OUTER} fill="none" stroke="#d29a5e" strokeOpacity=".55" strokeWidth="1.4" />
      {/* lukier */}
      <path d={ICING} fill="none" stroke="#f6ecdc" strokeWidth="2.6" strokeLinejoin="round" />

      {gloss && (
        <g fill="#e2bd6c" stroke="#b88a3a" strokeWidth=".5">
          {[0, 60, 120, 180, 240, 300].map((r) => (
            <path key={r} d={petal} transform={`translate(${C.x} ${C.y}) rotate(${r})`} />
          ))}
          <circle cx={C.x} cy={C.y} r="2.9" />
        </g>
      )}
    </svg>
  );
}
