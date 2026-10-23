"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { nav, site } from "@/content/site";
import { OpenNow } from "@/components/OpenNow";
import { Katarzynka } from "@/components/Katarzynka";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion";
import { track } from "@/lib/track";

export function Logo() {
  return (
    <span className="flex items-center gap-3">
      <Katarzynka className="w-12 shrink-0 sm:w-14" />
      <span className="flex flex-col leading-none">
        <span className="font-serif text-[1.75rem] tracking-[0.02em] text-icing">Piernicova</span>
        <span className="mt-1 text-[13px] font-semibold tracking-[0.06em] text-gold-hi">{site.byline} · {site.city}</span>
      </span>
    </span>
  );
}

export function Header() {
  const pathname = usePathname();
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotionSafe();
  const btn = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const on = () => setSolid(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") { setOpen(false); btn.current?.focus(); } };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKey); };
  }, [open]);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow] duration-300 ${solid || open ? "bg-walnut/95 shadow-[0_1px_0_rgb(201_162_74/0.25)] backdrop-blur-md" : ""}`}>
      <div className="container-site flex h-[78px] items-center gap-6">
        <Link href="/" aria-label="Piernicova — strona główna" className="shrink-0"><Logo /></Link>
        <nav aria-label="Główna" className="ml-auto hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.map((n) => {
              const active = pathname === n.href;
              return (
                <li key={n.href}>
                  <Link href={n.href} aria-current={active ? "page" : undefined} className="relative whitespace-nowrap rounded-lg px-3 py-2 font-medium text-icing/90 transition-colors hover:text-icing">
                    {n.label}
                    {active && <motion.span layoutId="nav-mark" className="absolute inset-x-3 -bottom-0.5 h-[2px] rounded-full bg-gold" />}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="ml-auto flex items-center gap-3 lg:ml-3">
          <Link href="/rezerwacja" className="btn btn-icing !min-h-11 !px-5 hidden whitespace-nowrap sm:inline-flex" onClick={() => track("reservation_start", { place: "header" })}>
            Zarezerwuj
          </Link>
          <button
            ref={btn}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Zamknij menu" : "Otwórz menu"}
            className="grid size-11 place-items-center rounded-xl text-icing ring-1 ring-gold/50 lg:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="wood fixed inset-0 top-[78px] z-40 overflow-y-auto lg:hidden"
          >
            <nav aria-label="Menu mobilne" className="container-site flex min-h-full flex-col py-8">
              <ul>
                {[{ href: "/", label: "Strona główna" }, ...nav, { href: "/rezerwacja", label: "Rezerwacja" }].map((n, i) => (
                  <motion.li key={n.href} initial={reduce ? false : { opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.04 * i, duration: 0.35 }}>
                    <Link href={n.href} onClick={() => setOpen(false)} aria-current={pathname === n.href ? "page" : undefined} className="flex items-center justify-between border-b border-gold/20 py-4 font-serif text-3xl text-icing">
                      {n.label}
                      {pathname === n.href && <span className="h-0.5 w-8 rounded-full bg-gold" aria-hidden="true" />}
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-auto space-y-3 pt-10 text-sand">
                <OpenNow />
                <p>{site.address.full}</p>
                <a href={site.phone.href} className="block text-xl font-bold text-icing" onClick={() => track("click_phone", { place: "menu" })}>{site.phone.display}</a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
