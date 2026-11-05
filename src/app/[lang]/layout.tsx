import type { Metadata, Viewport } from "next";
import { Geist_Mono, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { LangProvider } from "@/components/lang-provider";
import { JsonLd, organizationLd } from "@/components/json-ld";
import { getContent } from "@/lib/content";
import { htmlLang, locales, ogLocale } from "@/lib/i18n";
import { getLang } from "@/lib/i18n-server";
import { pageMetadata } from "@/lib/seo";
import "../globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export const viewport: Viewport = { themeColor: "#f8fafc" };

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLang();
  const { site } = getContent(lang);
  const defaults = pageMetadata({ lang, path: "/", title: `${site.name}: ${site.category}`, description: site.description });
  return {
    metadataBase: new URL(site.url),
    title: { default: `${site.name}: ${site.category}`, template: `%s | ${site.name}` },
    description: site.description,
    applicationName: site.name,
    creator: site.name,
    publisher: site.name,
    category: lang === "nl" ? "Software voor autobedrijven" : "Automotive software",
    keywords:
      lang === "nl"
        ? ["dealer management systeem", "DMS autobedrijf", "CRM autobedrijf", "voorraadbeheer auto's", "intake aflevering", "RDW kenteken", "mobile.de", "AutoScout24", "WhatsApp inbox"]
        : ["dealer management system", "automotive CRM", "car dealer software", "vehicle inventory", "intake and delivery", "mobile.de", "AutoScout24", "WhatsApp inbox"],
    formatDetection: { telephone: false, email: false, address: false },
    openGraph: { ...defaults.openGraph, url: undefined, locale: ogLocale[lang] },
    twitter: defaults.twitter,
    appleWebApp: { title: site.name, capable: true, statusBarStyle: "default" },
  };
}

export default async function RootLayout({ children }: LayoutProps<"/[lang]">) {
  const lang = await getLang();
  const { nav, site } = getContent(lang);
  return (
    <html lang={htmlLang[lang]} className={`${inter.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        <JsonLd data={organizationLd(lang)} />
        <LangProvider lang={lang}>
          <Header nav={nav} appUrl={site.appUrl} />
          <main className="flex-1">{children}</main>
          <Footer />
        </LangProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
