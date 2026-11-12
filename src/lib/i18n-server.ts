import { notFound } from "next/navigation";
import { lang as rootLang } from "next/root-params";
import { hasLang, localize, type Lang } from "@/lib/i18n";

/** Current language in Server Components and generateMetadata. */
export async function getLang(): Promise<Lang> {
  const value = await rootLang();
  if (!value || !hasLang(value)) notFound();
  return value;
}

/** Canonical and hreflang alternates for an internal (Dutch) path. */
export function alternates(lang: Lang, path: string) {
  return {
    canonical: localize(lang, path),
    languages: { "nl-NL": path, en: localize("en", path), "x-default": path },
  };
}
