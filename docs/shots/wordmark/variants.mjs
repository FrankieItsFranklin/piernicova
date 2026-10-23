export const FONTS = 'https://fonts.googleapis.com/css2?family=Yellowtail&display=swap';
const size = 'clamp(3.4rem,9.6vw,8.8rem)';
export const variants = {
  // A — litery jak pierniki z lukrową obwódką (jak znak)
  a: `<svg viewBox="0 0 760 175" style="width:min(100%,760px);height:auto;display:block;overflow:visible" aria-hidden="true">
    <defs><linearGradient id="wa" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c27a3e"/><stop offset=".55" stop-color="#9a5327"/><stop offset="1" stop-color="#7b3f1b"/></linearGradient>
    <filter id="wash"><feDropShadow dx="0" dy="6" stdDeviation="6" flood-color="#120802" flood-opacity=".6"/></filter></defs>
    <text x="8" y="140" font-family="var(--font-gloock), Georgia, serif" font-size="150" fill="url(#wa)" stroke="#f6ecdc" stroke-width="7" stroke-linejoin="round" paint-order="stroke fill" filter="url(#wash)">Piernicova</text>
    <text x="8" y="140" font-family="var(--font-gloock), Georgia, serif" font-size="150" fill="none" stroke="#3f1c07" stroke-opacity=".35" stroke-width="1.2">Piernicova</text></svg>`,
  // B — złocony relief (historyczne złocone pierniki toruńskie)
  b: `<p style="font-family:var(--font-serif);font-size:${size};line-height:.9;margin:0;background:linear-gradient(180deg,#fbe9b0 0%,#e2bd6c 38%,#a87d2c 62%,#f0d48a 78%,#b88a3a 100%);-webkit-background-clip:text;background-clip:text;color:transparent;filter:drop-shadow(0 -1px 0 rgba(255,246,214,.6)) drop-shadow(0 2px 0 #5a3c12) drop-shadow(0 10px 14px rgba(0,0,0,.65))" aria-hidden="true">Piernicova</p>`,
  // C — kartusz formy piernikowej: nazwa wyrzeźbiona w desce z wyciętymi narożnikami
  c: `<div style="display:inline-block;padding:clamp(18px,2.4vw,34px) clamp(30px,4vw,64px) clamp(22px,2.8vw,40px);background:linear-gradient(170deg,#5a3923,#3b2416);box-shadow:inset 0 0 0 10px rgb(0 0 0/.22),inset 0 0 0 12px rgb(255 214 170/.14),inset 0 0 0 22px rgb(0 0 0/.12),inset 0 2px 30px rgb(0 0 0/.5);-webkit-mask:radial-gradient(circle at 0 0,#0000 34px,#000 35px) 0 0/51% 51% no-repeat,radial-gradient(circle at 100% 0,#0000 34px,#000 35px) 100% 0/51% 51% no-repeat,radial-gradient(circle at 0 100%,#0000 34px,#000 35px) 0 100%/51% 51% no-repeat,radial-gradient(circle at 100% 100%,#0000 34px,#000 35px) 100% 100%/51% 51% no-repeat" aria-hidden="true">
    <p class="carved" style="font-size:clamp(3rem,8.4vw,7.6rem);line-height:.95;margin:0">Piernicova</p>
    <p style="margin:.4rem 0 0;text-align:center;font-family:var(--font-serif);font-size:clamp(1rem,1.6vw,1.4rem);letter-spacing:.3em;color:#3a2314;text-shadow:-1px -1px 0 rgb(0 0 0/.6),1px 1px 0 rgb(255 214 170/.18)">TORUŃ · 2019</p></div>`,
  // D — cukier puder przez szablon na drewnianym blacie
  d: `<svg width="0" height="0" style="position:absolute"><filter id="dust" x="-5%" y="-10%" width="110%" height="130%"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="4" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="5" result="d"/><feTurbulence type="fractalNoise" baseFrequency="1.6" numOctaves="1" seed="9" result="m"/><feColorMatrix in="m" type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 -2.2 1.7" result="speck"/><feComposite in="d" in2="speck" operator="in" result="g"/><feGaussianBlur in="g" stdDeviation=".35"/></filter></svg>
    <p style="font-family:var(--font-serif);font-size:${size};line-height:.9;margin:0;color:#f6ecdc;filter:url(#dust) drop-shadow(0 0 6px rgb(246 236 220/.18))" aria-hidden="true">Piernicova</p>`,
  // E — wypisane lukrem (szprycą), rysuje się raz przy wejściu
  e: `<p style="font-family:Yellowtail,cursive;font-size:clamp(3.8rem,10.5vw,9.6rem);line-height:1;margin:0 0 -.1em;color:#f6ecdc;text-shadow:0 1px 0 #fff,0 2px 0 #e9dcc6,0 3px 0 #d6c4a8,0 4px 0 #b9a383,0 10px 14px rgb(0 0 0/.55);transform:rotate(-3deg);transform-origin:left bottom" aria-hidden="true">Piernicova</p>`,
};
