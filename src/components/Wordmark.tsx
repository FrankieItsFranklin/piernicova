"use client";

import { useEffect, useRef } from "react";
import { WORDMARK } from "@/components/wordmark-path";

const { w: W, h: H, glyphs } = WORDMARK;
const SC = 2; // rozdzielczość mapy wlewania (public/wordmark-flow.png) względem viewBox
const POUR = 2.2; // s — całe wlewanie
const EDGE = 0.035; // miękkość czoła strugi (ułamek całego czasu)
const CREAM = [255, 250, 242]; // płynny lukier

// Nazwa w pierwszym ekranie: w drewnie widać pustą, wyciśniętą formę liter; lukier wlewa się do niej z lewego
// brzegu i płynie kanałami liter (mapa czasu dopłynięcia: docs/wordmark/run-flow.mjs), a potem tężeje jak krem.
// Wlewanie rusza dopiero po załadowaniu strony, żeby nic go nie przycinało. Bez JS (noscript) i przy
// prefers-reduced-motion napis jest od razu gotowy.
export function Wordmark({ className = "" }: { className?: string }) {
  const wrap = useRef<HTMLSpanElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const el = wrap.current, cv = canvas.current;
    if (!el || !cv) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.dataset.state = "set";
      return;
    }
    let raf = 0, cancelled = false;
    const img = new Image();
    img.src = "/wordmark-flow.png";

    const start = async () => {
      await img.decode();
      if (cancelled) return;
      const ctx = cv.getContext("2d");
      if (!ctx) { el.dataset.state = "set"; return; }
      const tmp = document.createElement("canvas");
      tmp.width = cv.width; tmp.height = cv.height;
      const tctx = tmp.getContext("2d", { willReadFrequently: true })!;
      tctx.drawImage(img, 0, 0);
      const src = tctx.getImageData(0, 0, cv.width, cv.height).data;
      // tylko piksele liter: indeks i czas dopłynięcia 0..1
      const idx: number[] = [], when: number[] = [];
      for (let i = 0; i < src.length / 4; i++) if (src[i * 4 + 3] > 0) { idx.push(i); when.push(src[i * 4] / 254); }
      const frame = ctx.createImageData(cv.width, cv.height), px = frame.data;
      for (const i of idx) { px[i * 4] = CREAM[0]; px[i * 4 + 1] = CREAM[1]; px[i * 4 + 2] = CREAM[2]; }

      el.dataset.state = "pouring";
      const t0 = performance.now();
      const tick = (now: number) => {
        const p = (now - t0) / 1000 / POUR; // 0..1
        const front = p * (1 + EDGE);
        for (let k = 0; k < idx.length; k++) {
          const a = (front - when[k]) / EDGE;
          px[idx[k] * 4 + 3] = a <= 0 ? 0 : a >= 1 ? 255 : a * 255;
        }
        ctx.putImageData(frame, 0, 0);
        if (p < 1) raf = requestAnimationFrame(tick);
        else el.dataset.state = "set";
      };
      raf = requestAnimationFrame(tick);
    };

    const go = () => { start().catch(() => { el.dataset.state = "set"; }); };
    if (document.readyState === "complete") go();
    else window.addEventListener("load", go, { once: true });
    return () => { cancelled = true; cancelAnimationFrame(raf); window.removeEventListener("load", go); };
  }, []);

  const letters = glyphs.map((d, i) => <path key={i} d={d} />);
  return (
    <span ref={wrap} data-state="mold" className={`wordmark relative ${className}`} style={{ aspectRatio: `${W} / ${H}` }} aria-hidden="true">
      <noscript>
        <style>{`.wordmark .wm-set{opacity:1}`}</style>
      </noscript>
      <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 size-full overflow-visible">
        <defs>
          {/* forma: ciemniejsze dno z cieniem przy górnej krawędzi i jasnym brzegiem przy dolnej — litery wciśnięte w drewno */}
          <filter id="wm-mold" x="-5%" y="-10%" width="110%" height="130%">
            <feComponentTransfer in="SourceAlpha" result="hole"><feFuncA type="table" tableValues="1 0" /></feComponentTransfer>
            <feGaussianBlur in="hole" stdDeviation="2.2" result="hb" />
            <feOffset in="hb" dy="3" result="ho" />
            <feFlood floodColor="#0d0603" floodOpacity="0.9" />
            <feComposite in2="ho" operator="in" />
            <feComposite in2="SourceAlpha" operator="in" result="inner" />
            <feOffset in="SourceAlpha" dy="1.2" result="lo" />
            <feComposite in="lo" in2="SourceAlpha" operator="out" result="lip" />
            <feFlood floodColor="#ffd6aa" floodOpacity="0.18" />
            <feComposite in2="lip" operator="in" result="lipc" />
            <feMerge><feMergeNode in="SourceGraphic" /><feMergeNode in="inner" /><feMergeNode in="lipc" /></feMerge>
          </filter>
        </defs>
        <g fill="#26150b" filter="url(#wm-mold)">{letters}</g>
      </svg>
      <canvas ref={canvas} width={W * SC} height={H * SC} className="absolute inset-0 size-full" />
      <svg viewBox={`0 0 ${W} ${H}`} className="wm-set absolute inset-0 size-full overflow-visible">
        <defs>
          {/* zastygły lukier: warstwy jaśniejszego i ciemniejszego kremu pod spodem + miękki cień */}
          <filter id="wm-icing" x="-5%" y="-10%" width="110%" height="145%">
            <feDropShadow dx="0" dy="1" stdDeviation="0" floodColor="#ffffff" />
            <feDropShadow dx="0" dy="1.5" stdDeviation="0" floodColor="#e9dcc6" />
            <feDropShadow dx="0" dy="1.5" stdDeviation="0" floodColor="#c9b495" />
            <feDropShadow dx="0" dy="7" stdDeviation="6" floodColor="#000000" floodOpacity="0.5" />
          </filter>
        </defs>
        <g fill="var(--color-icing)" filter="url(#wm-icing)">{letters}</g>
      </svg>
    </span>
  );
}
