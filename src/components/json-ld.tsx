import { getContent } from "@/lib/content";
import { htmlLang, localize, type Lang } from "@/lib/i18n";

type Thing = Record<string, unknown>;

const SCHEMA = "https://schema.org";

/** Renders structured data as a server-side `<script type="application/ld+json">`. */
export function JsonLd({ data }: { data: Thing | Thing[] }) {
  const payload = Array.isArray(data) ? { "@context": SCHEMA, "@graph": data } : { "@context": SCHEMA, ...data };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(payload).replace(/</g, "\\u003c") }} />;
}

const siteUrl = () => getContent("nl").site.url;

/** Absolute public URL for an internal (Dutch) path. */
export function absoluteUrl(lang: Lang, path: string) {
  const local = localize(lang, path);
  return `${siteUrl()}${local === "/" ? "" : local}`;
}

export const ids = {
  organization: () => `${siteUrl()}/#organization`,
  software: () => `${siteUrl()}/#software`,
};

export function organizationLd(lang: Lang): Thing {
  const { site } = getContent(lang);
  return {
    "@type": "Organization",
    "@id": ids.organization(),
    name: site.name,
    url: site.url,
    logo: `${site.url}/pwa-512.png`,
    description: site.description,
    slogan: site.tagline,
    email: site.email,
    sameAs: site.socials.map((s) => s.href),
  };
}

export function softwareApplicationLd(lang: Lang): Thing {
  const { site } = getContent(lang);
  return {
    "@type": "SoftwareApplication",
    "@id": ids.software(),
    name: site.name,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web, iOS, Android",
    description: site.description,
    url: absoluteUrl(lang, "/"),
    inLanguage: htmlLang[lang],
    publisher: { "@id": ids.organization() },
  };
}

export function breadcrumbLd(lang: Lang, crumbs: { name: string; path: string }[]): Thing {
  return {
    "@type": "BreadcrumbList",
    itemListElement: [{ name: getContent(lang).site.name, path: "/" }, ...crumbs].map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: absoluteUrl(lang, c.path),
    })),
  };
}

export function faqLd(items: { q: string; a: string }[], lang: Lang): Thing {
  return {
    "@type": "FAQPage",
    inLanguage: htmlLang[lang],
    mainEntity: items.map((i) => ({ "@type": "Question", name: i.q, acceptedAnswer: { "@type": "Answer", text: i.a } })),
  };
}
