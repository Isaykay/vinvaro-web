import type { Metadata } from "next";
import { getContent } from "@/lib/content";
import { localize, locales, ogLocale, type Lang } from "@/lib/i18n";
import { alternates } from "@/lib/i18n-server";

type PageMetadataInput = {
  lang: Lang;
  /** Internal (Dutch) path, e.g. "/platform". */
  path: string;
  title: string;
  description: string;
  noindex?: boolean;
};

/** Search engines show about 155 characters; cut at a sentence end when possible, otherwise at a word. */
export function clipDescription(text: string, max = 158) {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const sentence = cut.lastIndexOf(". ");
  if (sentence > max * 0.6) return cut.slice(0, sentence + 1);
  return `${cut.slice(0, cut.lastIndexOf(" ")).replace(/[,;:]$/, "")}…`;
}

/** Full page metadata: canonical + hreflang, Open Graph, Twitter card and robots. */
export function pageMetadata({ lang, path, title, description: fullDescription, noindex }: PageMetadataInput): Metadata {
  const { site } = getContent(lang);
  const description = clipDescription(fullDescription);
  const absolute = title.includes(site.name) || title.length + site.name.length + 3 > 62;
  const fullTitle = absolute ? title : `${title} | ${site.name}`;
  const image = { url: "/og-default.png", width: 1200, height: 630, alt: fullTitle, type: "image/png" };

  return {
    title: absolute ? { absolute: title } : title,
    description,
    alternates: alternates(lang, path),
    openGraph: {
      type: "website",
      url: localize(lang, path),
      siteName: site.name,
      locale: ogLocale[lang],
      alternateLocale: locales.filter((l) => l !== lang).map((l) => ogLocale[l]),
      title: fullTitle,
      description,
      images: [image],
    },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: [image] },
    robots: noindex
      ? { index: false, follow: true, googleBot: { index: false, follow: true } }
      : { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
  };
}
