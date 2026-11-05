export const locales = ["nl", "en"] as const;
export type Lang = (typeof locales)[number];
export const defaultLang: Lang = "nl";

export const hasLang = (value: string): value is Lang => (locales as readonly string[]).includes(value);

export const htmlLang: Record<Lang, string> = { nl: "nl-NL", en: "en" };
export const ogLocale: Record<Lang, string> = { nl: "nl_NL", en: "en_GB" };
export const numberLocale: Record<Lang, string> = { nl: "nl-NL", en: "en-GB" };

/**
 * Dutch (internal) path prefixes and their English public equivalents.
 * Longest prefixes first; matching is per path segment.
 */
const englishPaths: [nl: string, en: string][] = [
  ["/platform/voorraad", "/platform/inventory"],
  ["/platform/intake-en-aflevering", "/platform/intake-and-delivery"],
  ["/platform/team-app", "/platform/staff-app"],
  ["/platform/crm-en-verkoop", "/platform/crm-and-sales"],
  ["/platform/agenda", "/platform/calendar"],
  ["/platform/contracten-en-facturen", "/platform/contracts-and-invoices"],
  ["/platform/publiceren", "/platform/publishing"],
  ["/voor-autobedrijven/merkonafhankelijke-dealers", "/for-dealers/independent-dealers"],
  ["/voor-autobedrijven/meerdere-vestigingen", "/for-dealers/multi-site"],
  ["/voor-autobedrijven/specialisten", "/for-dealers/specialists"],
  ["/voor-autobedrijven", "/for-dealers"],
  ["/integraties", "/integrations"],
  ["/bedankt", "/thank-you"],
];

/** Paths handled by redirects in next.config; they are never prefixed. */
const unlocalized = ["/api", "/inloggen", "/login"];

function swapPrefix(path: string, from: 0 | 1) {
  const to = from === 0 ? 1 : 0;
  for (const pair of englishPaths) {
    const prefix = pair[from];
    if (path === prefix || path.startsWith(`${prefix}/`)) return pair[to] + path.slice(prefix.length);
  }
  return path;
}

export const toEnglishPath = (path: string) => swapPrefix(path, 0);
export const toDutchPath = (path: string) => swapPrefix(path, 1);

/** Turns an internal (Dutch) href into the public URL for `lang`. */
export function localize(lang: Lang, href: string) {
  if (lang === defaultLang || !href.startsWith("/") || href.startsWith("//")) return href;
  const cut = href.search(/[?#]/);
  const path = cut === -1 ? href : href.slice(0, cut);
  const rest = cut === -1 ? "" : href.slice(cut);
  if (unlocalized.some((p) => path === p || path.startsWith(`${p}/`))) return href;
  const english = toEnglishPath(path);
  return `/en${english === "/" ? "" : english}${rest}`;
}

/** Splits a public pathname into its language and internal (Dutch) path. */
export function parsePath(pathname: string): { lang: Lang; path: string } {
  if (pathname === "/en" || pathname.startsWith("/en/")) {
    return { lang: "en", path: toDutchPath(pathname.slice(3) || "/") };
  }
  // Prerendered pages see the internal rewrite target (/nl/...) instead of the public URL.
  if (pathname === "/nl" || pathname.startsWith("/nl/")) {
    return { lang: "nl", path: pathname.slice(3) || "/" };
  }
  return { lang: "nl", path: pathname };
}

/** Public URL of the current page in another language. */
export const switchLang = (pathname: string, to: Lang) => localize(to, parsePath(pathname).path);

/** Per-file translations; `en` must have exactly the same shape as `nl`. */
export function defineCopy<T>(copy: { nl: T; en: NoInfer<T> }): Record<Lang, T> {
  return copy;
}
