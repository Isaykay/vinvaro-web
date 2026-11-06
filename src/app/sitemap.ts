import type { MetadataRoute } from "next";
import { getContent } from "@/lib/content";
import { locales, localize } from "@/lib/i18n";

const SITE_UPDATED = "2026-11-05";

export default function sitemap(): MetadataRoute.Sitemap {
  const { site, platform, segments } = getContent("nl");
  const url = (lang: (typeof locales)[number], path: string) => {
    const local = localize(lang, path);
    return `${site.url}${local === "/" ? "" : local}`;
  };
  const pages: { path: string; priority: number }[] = [
    { path: "/", priority: 1 },
    { path: "/platform", priority: 0.9 },
    ...platform.map((p) => ({ path: `/platform/${p.slug}`, priority: 0.8 })),
    ...segments.map((s) => ({ path: `/voor-autobedrijven/${s.slug}`, priority: 0.7 })),
    { path: "/integraties", priority: 0.7 },
    { path: "/prijzen", priority: 0.8 },
    { path: "/demo", priority: 0.7 },
    { path: "/contact", priority: 0.6 },
    { path: "/privacy", priority: 0.3 },
    { path: "/voorwaarden", priority: 0.3 },
  ];
  return pages.flatMap(({ path, priority }) => {
    const languages = { "nl-NL": url("nl", path), en: url("en", path), "x-default": url("nl", path) };
    return locales.map((lang) => ({
      url: url(lang, path),
      lastModified: new Date(SITE_UPDATED),
      changeFrequency: "monthly" as const,
      priority: lang === "nl" ? priority : Math.round(priority * 9) / 10,
      alternates: { languages },
    }));
  });
}
