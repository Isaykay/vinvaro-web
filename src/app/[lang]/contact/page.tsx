import type { Metadata } from "next";
import Link from "@/components/link";
import { ArrowRight, CalendarDays, LogIn, Mail, MapPin, Phone } from "lucide-react";
import { getContent } from "@/lib/content";
import { defineCopy, htmlLang } from "@/lib/i18n";
import { getLang } from "@/lib/i18n-server";
import { pageMetadata } from "@/lib/seo";
import { JsonLd, absoluteUrl, breadcrumbLd, ids } from "@/components/json-ld";
import { Button, Container } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { IconTile } from "@/components/icons";
import { OfficeHours } from "@/components/office-hours";
import { ContactForm } from "@/components/contact-form";
import { ChannelLogo } from "@/components/channel-logo";
import { PageHero } from "@/components/sections";
import { Car, Pill } from "@/components/product/kit";

const copy = defineCopy({
  nl: {
    metaTitle: "Contact: stel je vraag aan VINVARO",
    metaDescription: "Neem contact op met VINVARO over het platform, een overstap of een integratie. Of plan direct een demo van 30 minuten.",
    eyebrow: "Contact",
    title: "We helpen je graag verder.",
    lead: "Mail ons of stuur een bericht. Wil je VINVARO zien werken met je eigen voorraad? Dan is een demo de snelste route.",
    demo: "Plan een demo",
    call: "Bel ons",
    mail: "Mail ons",
    reply: "Reactie binnen één werkdag",
    visit: "Kom langs",
    demoCard: "Plan een demo",
    demoCardBody: "30 minuten, op jouw voorraad en werkwijze. Kies direct een moment.",
    pickTime: "Kies een moment",
    customer: "Al klant?",
    customerBody: "Log in op VINVARO of neem contact op met je vaste aanspreekpunt.",
    login: "Inloggen",
    dealersEyebrow: "Voor autobedrijven",
    dealersTitle: "Zien hoe VINVARO werkt met jouw voorraad?",
    dealersBody: "In 30 minuten laten we zien hoe intake, inbox, verkoop en publiceren samenkomen in één werkplek.",
    chat: "Is de XC40 nog beschikbaar?",
    label: "Proefrit",
  },
  en: {
    metaTitle: "Contact: ask VINVARO your question",
    metaDescription: "Get in touch with VINVARO about the platform, switching or an integration. Or book a 30-minute demo straight away.",
    eyebrow: "Contact",
    title: "We're happy to help.",
    lead: "Email us or send a message. Want to see VINVARO working with your own stock? A demo is the quickest route.",
    demo: "Book a demo",
    call: "Call us",
    mail: "Email us",
    reply: "Reply within one working day",
    visit: "Visit us",
    demoCard: "Book a demo",
    demoCardBody: "30 minutes, on your stock and way of working. Pick a time right away.",
    pickTime: "Pick a time",
    customer: "Already a customer?",
    customerBody: "Log in to VINVARO or contact your dedicated point of contact.",
    login: "Log in",
    dealersEyebrow: "For dealers",
    dealersTitle: "Want to see VINVARO work with your stock?",
    dealersBody: "In 30 minutes we show you how intake, inbox, sales and publishing come together in one workspace.",
    chat: "Is the XC40 still available?",
    label: "Test drive",
  },
});

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLang();
  return pageMetadata({ lang, path: "/contact", title: copy[lang].metaTitle, description: copy[lang].metaDescription });
}

function MapIllustration() {
  return (
    <svg viewBox="0 0 320 140" className="h-full w-full" aria-hidden>
      <rect width="320" height="140" fill="#eef4ff" />
      {[20, 60, 100].map((y) => (
        <rect key={y} x="0" y={y} width="320" height="10" fill="#ffffff" />
      ))}
      {[40, 130, 220, 290].map((x) => (
        <rect key={x} x={x} y="0" width="10" height="140" fill="#ffffff" />
      ))}
      <path d="M0 125 C 80 105, 160 140, 320 112" stroke="#bfd3fb" strokeWidth="14" fill="none" />
      <circle cx="180" cy="66" r="18" fill="#2563eb" opacity="0.15" />
      <path d="M180 48c-7 0-12 5-12 12 0 9 12 20 12 20s12-11 12-20c0-7-5-12-12-12Z" fill="#2563eb" />
      <circle cx="180" cy="60" r="4.5" fill="#fff" />
    </svg>
  );
}

export default async function ContactPage() {
  const lang = await getLang();
  const t = copy[lang];
  const { site } = getContent(lang);
  const card = "flex flex-col rounded-2xl bg-surface p-6 shadow-card";
  return (
    <>
      <JsonLd
        data={[
          { "@type": "ContactPage", url: absoluteUrl(lang, "/contact"), name: t.metaTitle, inLanguage: htmlLang[lang], about: { "@id": ids.organization() } },
          breadcrumbLd(lang, [{ name: t.eyebrow, path: "/contact" }]),
        ]}
      />
      <PageHero eyebrow={t.eyebrow} title={t.title} lead={t.lead}>
        <Button href="/demo" size="lg" arrow>
          {t.demo}
        </Button>
      </PageHero>

      <section className="pb-20">
        <Container>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Reveal className={card}>
              <IconTile icon={Mail} />
              <p className="mt-5 text-[15px] font-semibold">{t.mail}</p>
              <a href={`mailto:${site.email}`} className="mt-1 text-[18px] font-semibold tracking-[-0.02em] hover:text-brand">
                {site.email}
              </a>
              <p className="mt-auto pt-5 text-[13px] text-muted">{t.reply}</p>
            </Reveal>
            {site.phone && site.phoneHref ? (
              <Reveal delay={0.05} className={card}>
                <IconTile icon={Phone} />
                <p className="mt-5 text-[15px] font-semibold">{t.call}</p>
                <a href={site.phoneHref} className="mt-1 text-[18px] font-semibold tracking-[-0.02em] hover:text-brand">
                  {site.phone}
                </a>
                <div className="mt-auto pt-5">
                  <OfficeHours className="flex-wrap" />
                </div>
              </Reveal>
            ) : (
              <Reveal delay={0.05} className={card}>
                <IconTile icon={CalendarDays} />
                <p className="mt-5 text-[15px] font-semibold">{t.demoCard}</p>
                <p className="mt-1 text-[14px] text-muted">{t.demoCardBody}</p>
                <Link href="/demo" className="mt-auto inline-flex items-center gap-1 pt-5 text-[14px] font-medium text-brand">
                  {t.pickTime} <ArrowRight className="size-3.5" />
                </Link>
              </Reveal>
            )}
            {site.address ? (
              <Reveal delay={0.1} className="flex flex-col overflow-hidden rounded-2xl bg-surface shadow-card">
                <div className="h-[110px] border-b border-line">
                  <MapIllustration />
                </div>
                <div className="p-6 pt-5">
                  <p className="flex items-center gap-2 text-[15px] font-semibold">
                    <MapPin className="size-4 text-brand" /> {t.visit}
                  </p>
                  <a href={`https://maps.google.com/?q=${encodeURIComponent(site.address)}`} target="_blank" rel="noreferrer" className="mt-1 block text-[14px] text-ink-2 hover:text-ink">
                    {site.address}
                  </a>
                </div>
              </Reveal>
            ) : (
              <Reveal delay={0.1} className="flex flex-col overflow-hidden rounded-2xl bg-surface shadow-card">
                <div className="bg-stage flex h-[110px] items-end justify-center border-b border-line px-8 pb-2">
                  <Car className="w-full max-w-[200px] animate-float" />
                </div>
                <div className="p-6 pt-5">
                  <p className="text-[15px] font-semibold">{t.dealersEyebrow}</p>
                  <OfficeHours className="mt-2 flex-wrap" />
                </div>
              </Reveal>
            )}
            <Reveal delay={0.15} className={card}>
              <IconTile icon={LogIn} />
              <p className="mt-5 text-[15px] font-semibold">{t.customer}</p>
              <p className="mt-1 text-[14px] text-muted">{t.customerBody}</p>
              <a href={site.appUrl} className="mt-auto inline-flex items-center gap-1 pt-5 text-[14px] font-medium text-brand">
                {t.login} <ArrowRight className="size-3.5" />
              </a>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="border-t border-line bg-surface py-20 sm:py-24">
        <Container>
          <div className="grid items-stretch gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <Reveal className="bg-stage flex flex-col rounded-[22px] p-7 sm:p-9">
              <p className="font-mono text-[11.5px] tracking-[0.12em] text-brand uppercase">{t.dealersEyebrow}</p>
              <p className="text-h3 mt-3">{t.dealersTitle}</p>
              <p className="mt-3 text-[15px] text-muted">{t.dealersBody}</p>
              <div className="relative my-8">
                <Car className="w-full max-w-[360px] animate-float" />
                <div className="absolute -top-2 right-0 max-w-[220px] animate-toast-in rounded-2xl bg-surface p-3 shadow-float" style={{ animationDelay: "0.6s" }}>
                  <p className="flex items-center gap-1.5 text-[11.5px] font-semibold">
                    <ChannelLogo kind="whatsapp" size={13} /> Mark Jansen
                  </p>
                  <p className="mt-1.5 rounded-lg rounded-tl-sm bg-[#e7fbe0] px-2.5 py-1.5 text-[12px] text-ink-2">{t.chat}</p>
                  <Pill tone="brand" className="mt-2">
                    {t.label}
                  </Pill>
                </div>
              </div>
              <div className="mt-auto">
                <Button href="/demo" size="lg" arrow>
                  {t.demo}
                </Button>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <ContactForm />
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
