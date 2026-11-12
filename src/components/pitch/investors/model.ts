import { getContent } from "@/lib/content";
import type { Lang } from "@/lib/i18n";
import { segments } from "./data";

/** Monthly subscription revenue for one dealer from the live price list, without usage above the bundles. */
export function monthlyRevenueCents(lang: Lang, vehicles: number, marketplaces: number, feed = true) {
  const { pricing } = getContent(lang);
  const unit = (key: string) => pricing.items.find((i) => i.key === key)?.unitPriceCents ?? 0;
  return pricing.basePriceCents + vehicles * unit("stock_vehicles") + marketplaces * unit("marketplaces") + (feed ? unit("website_feed") : 0);
}

/** Average monthly revenue per dealer across the segment mix in data.ts. */
export function blendedMonthlyCents(lang: Lang) {
  return Math.round(segments.reduce((sum, s) => sum + s.share * monthlyRevenueCents(lang, s.vehicles, s.marketplaces), 0));
}

export function euro(lang: Lang, cents: number, compact = false) {
  return new Intl.NumberFormat(lang === "nl" ? "nl-NL" : "en-GB", {
    style: "currency",
    currency: "EUR",
    notation: compact ? "compact" : "standard",
    maximumFractionDigits: compact ? 1 : 0,
  }).format(cents / 100);
}
