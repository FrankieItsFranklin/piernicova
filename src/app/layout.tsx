import type { Metadata, Viewport } from "next";
import { Gloock, Hanken_Grotesk, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileBar } from "@/components/MobileBar";
import { site } from "@/content/site";
import { menu } from "@/content/menu";

const gloock = Gloock({ weight: "400", subsets: ["latin", "latin-ext"], variable: "--font-gloock", display: "swap" });
const hanken = Hanken_Grotesk({ subsets: ["latin", "latin-ext"], variable: "--font-hanken", display: "swap" });
const plex = IBM_Plex_Mono({ weight: ["400", "500", "600"], subsets: ["latin", "latin-ext"], variable: "--font-plex-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "Piernicova — restauracja w Toruniu, kuchnia polska z piernikowym akcentem", template: "%s · Piernicova Toruń" },
  description:
    "Restauracja Piernicova na toruńskiej starówce, ul. Przedzamcze 6B. Kuchnia polska szefa Bartłomieja Witkowskiego, otwarta kuchnia, taras przy murach. W przewodniku MICHELIN 2026. Rezerwacja: 880 323 890.",
  openGraph: { type: "website", locale: "pl_PL", siteName: "Piernicova" },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = { themeColor: "#2a190f" };

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: "Restauracja Piernicova",
  url: site.url,
  telephone: "+48880323890",
  email: site.email,
  foundingDate: String(site.founded),
  servesCuisine: ["Polska", "Regionalna"],
  priceRange: "€€",
  acceptsReservations: true,
  address: { "@type": "PostalAddress", streetAddress: "ul. Przedzamcze 6B", postalCode: "87-100", addressLocality: "Toruń", addressCountry: "PL" },
  geo: { "@type": "GeoCoordinates", latitude: site.address.lat, longitude: site.address.lon },
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Monday", opens: "15:00", closes: "22:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Tuesday", "Wednesday", "Thursday"], opens: "13:00", closes: "22:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Friday", "Saturday"], opens: "13:00", closes: "23:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Sunday", opens: "13:00", closes: "21:00" },
  ],
  hasMenu: {
    "@type": "Menu",
    name: "Karta jesienna",
    url: `${site.url}/menu`,
    hasMenuSection: menu.map((c) => ({
      "@type": "MenuSection",
      name: c.title,
      hasMenuItem: c.dishes.map((d) => ({ "@type": "MenuItem", name: d.name, description: d.parts.join(", "), offers: { "@type": "Offer", price: d.price, priceCurrency: "PLN" } })),
    })),
  },
  sameAs: [site.instagram, site.facebook],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pl" className={`${gloock.variable} ${hanken.variable} ${plex.variable}`}>
      <body className="font-sans">
        <a href="#tresc" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[60] focus:rounded-lg focus:bg-icing focus:px-4 focus:py-2 focus:text-ink">Przejdź do treści</a>
        <Header />
        <main id="tresc">{children}</main>
        <Footer />
        <MobileBar />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
