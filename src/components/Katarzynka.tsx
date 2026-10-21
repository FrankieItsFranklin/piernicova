// Toruńska katarzynka z lukrem — znak marki w kodzie (bez zdjęcia). Kształt: sześć połączonych łuków.
export function Katarzynka({ className = "", icing = true, title }: { className?: string; icing?: boolean; title?: string }) {
  const id = title ? "kat-title" : undefined;
  return (
    <svg viewBox="0 0 120 100" className={className} role={title ? "img" : undefined} aria-hidden={title ? undefined : true} aria-labelledby={id}>
      {title && <title id={id}>{title}</title>}
      <defs>
        <radialGradient id="kat-dough" cx=".38" cy=".3" r=".85">
          <stop offset="0" stopColor="#d9965a" />
          <stop offset=".55" stopColor="#a85f2c" />
          <stop offset="1" stopColor="#5e3013" />
        </radialGradient>
      </defs>
      <path d="M60 14 C70 4 86 6 88 20 C100 18 112 30 104 42 C116 49 113 66 99 68 C101 82 86 89 76 80 C70 92 50 92 44 80 C34 89 19 82 21 68 C7 66 4 49 16 42 C8 30 20 18 32 20 C34 6 50 4 60 14 Z" fill="url(#kat-dough)" />
      {icing && (
        <>
          <path className="kat-icing" d="M60 20 C68 12 81 14 83 25 C93 24 102 33 96 42 C105 48 103 62 92 64 C94 75 82 81 74 74 C69 84 51 84 46 74 C38 81 26 75 28 64 C17 62 15 48 24 42 C18 33 27 24 37 25 C39 14 52 12 60 20 Z" fill="none" stroke="#fbf6ee" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M44 44 q8 -10 16 0 q8 -10 16 0 M42 56 q9 8 18 0 q9 8 18 0" fill="none" stroke="#fbf6ee" strokeWidth="2" strokeLinecap="round" />
          <path d="M56 50 l4 -5 l4 5 l-4 5 z" fill="#c9a24a" />
        </>
      )}
    </svg>
  );
}
