import Link from "next/link";
import { hoursTable, nav, site } from "@/content/site";
import { Logo } from "@/components/Header";
import { TrackedLink } from "@/components/TrackedLink";
import { Katarzynka } from "@/components/Katarzynka";

export function Footer() {
  return (
    <footer className="wood relative overflow-hidden text-icing">
      <div className="container-site grid gap-12 py-16 md:grid-cols-[1.3fr_1fr_1fr] md:py-20">
        <div>
          <Logo />
          <p className="mt-6 max-w-sm text-sand">Restauracja w gotyckiej starówce Torunia, przy murach Przedzamcza. Od {site.founded} roku.</p>
          <p className="mt-6 font-serif text-2xl text-gold-hi">{site.slogan}</p>
          <Katarzynka className="mt-6 w-16" />
        </div>
        <nav aria-label="Stopka">
          <h2 className="font-sans text-sm font-semibold text-gold-hi">Strony</h2>
          <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2 md:grid-cols-1">
            <li><Link href="/" className="hover:text-gold-hi">Strona główna</Link></li>
            {nav.map((n) => <li key={n.href}><Link href={n.href} className="hover:text-gold-hi">{n.label}</Link></li>)}
            <li><Link href="/rezerwacja" className="hover:text-gold-hi">Rezerwacja</Link></li>
          </ul>
        </nav>
        <div>
          <h2 className="font-sans text-sm font-semibold text-gold-hi">Kontakt</h2>
          <address className="mt-4 space-y-2 not-italic">
            <TrackedLink href={site.address.mapsUrl} event="click_directions" external className="block hover:text-gold-hi">{site.address.full}</TrackedLink>
            <TrackedLink href={site.phone.href} event="click_phone" place="footer" className="block text-xl font-bold hover:text-gold-hi">{site.phone.display}</TrackedLink>
            <TrackedLink href={`mailto:${site.email}`} event="click_email" className="block hover:text-gold-hi">{site.email}</TrackedLink>
          </address>
          <dl className="mt-6 space-y-1 text-sand">
            {hoursTable.map((h) => (
              <div key={h.days} className="flex justify-between gap-4"><dt>{h.days}</dt><dd className="tabular-nums">{h.time}</dd></div>
            ))}
          </dl>
          <p className="mt-6 flex gap-4 text-sand">
            <a href={site.instagram} target="_blank" rel="noopener" className="link-u hover:text-gold-hi">Instagram</a>
            <a href={site.facebook} target="_blank" rel="noopener" className="link-u hover:text-gold-hi">Facebook</a>
          </p>
        </div>
      </div>
      <div className="container-site flex flex-col gap-2 border-t border-gold/20 py-6 pb-28 text-sm text-sand/80 md:flex-row md:justify-between md:pb-6">
        <p>© {site.founded}–2026 Restauracja {site.name}</p>
        <p>Zdjęcia na stronie są poglądowe.</p>
      </div>
    </footer>
  );
}
