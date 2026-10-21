import type { MetadataRoute } from "next";
import { nav, site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ href: "/" }, ...nav, { href: "/rezerwacja" }].map((n) => ({
    url: new URL(n.href, site.url).toString(),
    changeFrequency: "monthly",
    priority: n.href === "/" ? 1 : 0.7,
  }));
}
