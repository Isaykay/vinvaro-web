import type { Metadata } from "next";
import Link from "@/components/link";
import clsx from "clsx";
import { ArrowRight, Check } from "lucide-react";
import { getContent } from "@/lib/content";
import { defineCopy, numberLocale, type Lang } from "@/lib/i18n";
import { getLang } from "@/lib/i18n-server";
import { pageMetadata } from "@/lib/seo";
import { JsonLd, absoluteUrl, breadcrumbLd, faqLd } from "@/components/json-ld";
import { Button, Container, Mark, SectionHeader } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { IconTile } from "@/components/icons";
import { FAQ } from "@/components/faq";
import { CTASection, PageHero } from "@/components/sections";
import { PricingCalculator } from "@/components/pricing-calculator";

const copy = defineCopy({
  nl: {
    metaTitle: "Prijzen: € 199 per maand, alle modules inbegrepen",
    metaDescription: "Het VINVARO Dealer-plan: € 199 per maand plus € 4 per voertuig in voorraad, excl. btw. Alle modules, onbeperkt gebruikers en partners, 30 dagen gratis proberen.",
    eyebrow: "Prijzen",
    title: "Eén plan. Alle modules. Je betaalt voor wat er in voorraad staat.",
    lead: "Geen kosten per gebruiker en geen modules om bij te kopen. Een vast bedrag voor je bedrijf, plus een klein bedrag per auto in voorraad.",
    start: "Start 30 dagen gratis",
    demo: "Plan een demo",
    perMonth: "/ maand",
    exVat: "excl. btw",
    plus: "plus",
    perVehicle: "per voertuig in voorraad",
    unlimitedUsers: "Onbeperkt gebruikers",
    trial: "30 dagen gratis",
    includedTitle: "Inbegrepen",
    modulesEyebrow: "Alle modules",
    modulesTitle: "Alles wat een autobedrijf draait, in één plan.",
    modulesLead: "Elke module zit in het Dealer-plan. Waar verbruik meetelt, staat het erbij; de rest kost niets extra.",
    includedBadge: "Inbegrepen",
    moduleNote: {
      voorraad: (p: string) => `${p} per voertuig in voorraad`,
      free: "Geen extra kosten",
    },
    tableEyebrow: "Prijslijst",
    tableTitle: "Alle prijzen op een rij.",
    cols: ["Onderdeel", "Inbegrepen per maand", "Prijs"],
    base: "Dealer-plan (vast per bedrijf)",
    unlimited: "Onbeperkt",
    none: "—",
    perUnit: (u: string) => `per ${u}`,
    free: "Gratis",
    pricesNote: "Alle bedragen zijn in euro en exclusief 21% btw.",
    billingEyebrow: "Zo factureren we",
    billingTitle: "Duidelijk, per maand, zonder verrassingen.",
    billing: [
      ["Proefperiode", "De eerste 30 dagen zijn gratis, met alle modules."],
      ["Maandperiode", "Elke maand een factuur met het vaste bedrag en je verbruik."],
      ["Factuurdrempel", "Loopt het verbruik op tot € 250, dan factureren we tussentijds."],
      ["Inzicht in de app", "Live verbruik, logboek en printbare facturen onder Facturatie."],
    ],
    faqEyebrow: "Veelgestelde vragen",
    faqTitle: "Vragen over prijzen",
    talk: "Meer dan één vestiging of een groot volume? Neem contact op.",
  },
  en: {
    metaTitle: "Pricing: €199 per month, every module included",
    metaDescription: "The VINVARO Dealer plan: €199 per month plus €4 per vehicle in stock, excl. VAT. Every module, unlimited users and partners, 30-day free trial.",
    eyebrow: "Pricing",
    title: "One plan. Every module. You pay for what's in stock.",
    lead: "No per-user fees and no modules to buy on top. A fixed amount for your business, plus a small amount per car in stock.",
    start: "Start 30 days free",
    demo: "Book a demo",
    perMonth: "/ month",
    exVat: "excl. VAT",
    plus: "plus",
    perVehicle: "per vehicle in stock",
    unlimitedUsers: "Unlimited users",
    trial: "30 days free",
    includedTitle: "Included",
    modulesEyebrow: "Every module",
    modulesTitle: "Everything an automotive business runs on, in one plan.",
    modulesLead: "Every module is part of the Dealer plan. Where usage counts, it says so; everything else costs nothing extra.",
    includedBadge: "Included",
    moduleNote: {
      voorraad: (p: string) => `${p} per vehicle in stock`,
      free: "No extra cost",
    },
    tableEyebrow: "Price list",
    tableTitle: "Every price at a glance.",
    cols: ["Item", "Included per month", "Price"],
    base: "Dealer plan (fixed per business)",
    unlimited: "Unlimited",
    none: "—",
    perUnit: (u: string) => `per ${u}`,
    free: "Free",
    pricesNote: "All amounts are in euros and exclude 21% VAT.",
    billingEyebrow: "How we invoice",
    billingTitle: "Clear, monthly, no surprises.",
    billing: [
      ["Trial", "The first 30 days are free, with every module."],
      ["Monthly period", "One invoice a month with the fixed amount and your usage."],
      ["Invoice threshold", "If usage reaches €250, we invoice it in between."],
      ["Insight in the app", "Live usage, a log and printable invoices under Billing."],
    ],
    faqEyebrow: "FAQ",
    faqTitle: "Questions about pricing",
    talk: "More than one location or a large volume? Get in touch.",
  },
});

const money = (lang: Lang, cents: number) =>
  new Intl.NumberFormat(numberLocale[lang], { style: "currency", currency: "EUR", minimumFractionDigits: cents % 100 ? 2 : 0, maximumFractionDigits: 2 }).format(cents / 100);

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLang();
  const t = copy[lang];
  return pageMetadata({ lang, path: "/prijzen", title: t.metaTitle, description: t.metaDescription });
}

export default async function PricingPage() {
  const lang = await getLang();
  const t = copy[lang];
  const { pricing, platform, site } = getContent(lang);
  const m = (cents: number) => money(lang, cents);
  const num = (n: number) => new Intl.NumberFormat(numberLocale[lang]).format(n);
  const stock = pricing.items.find((i) => i.key === "stock_vehicles")!;
  const itemNote = (key: string) => {
    const i = pricing.items.find((x) => x.key === key)!;
    if (i.unitPriceCents === 0) return `${i.name}: ${t.unlimited.toLowerCase()}`;
    if (i.included) return `${num(i.included)} ${i.name.toLowerCase()} ${lang === "nl" ? "inbegrepen, daarna" : "included, then"} ${m(i.unitPriceCents)}`;
    return `${m(i.unitPriceCents)} ${t.perUnit(i.unit)}`;
  };
  const moduleNotes = (slug: string) => pricing.items.filter((i) => i.module === slug).map((i) => (i.key === "stock_vehicles" ? t.moduleNote.voorraad(m(i.unitPriceCents)) : itemNote(i.key)));

  return (
    <>
      <JsonLd
        data={[
          {
            "@type": "Product",
            name: `${site.name} ${pricing.plan}`,
            description: t.metaDescription,
            url: absoluteUrl(lang, "/prijzen"),
            brand: { "@type": "Brand", name: site.name },
            offers: {
              "@type": "Offer",
              price: (pricing.basePriceCents / 100).toFixed(2),
              priceCurrency: "EUR",
              priceSpecification: { "@type": "UnitPriceSpecification", price: (pricing.basePriceCents / 100).toFixed(2), priceCurrency: "EUR", unitText: "MON", valueAddedTaxIncluded: false },
              availability: "https://schema.org/InStock",
            },
          },
          breadcrumbLd(lang, [{ name: t.eyebrow, path: "/prijzen" }]),
          faqLd(pricing.faq, lang),
        ]}
      />
      <PageHero center eyebrow={t.eyebrow} title={t.title} lead={t.lead} />

      <section className="pb-16">
        <Container>
          <Reveal y={24}>
            <div className="mx-auto grid max-w-[1040px] overflow-hidden rounded-[26px] border border-line bg-surface shadow-float lg:grid-cols-[1fr_1fr]">
              <div className="bg-obsidian-glow relative overflow-hidden p-8 text-white sm:p-10">
                <div className="bg-grid-dark mask-fade-radial pointer-events-none absolute inset-0" />
                <Mark className="pointer-events-none absolute -right-10 -bottom-16 h-[260px] w-auto text-white/[0.04]" />
                <div className="relative">
                  <div className="flex items-center justify-between">
                    <p className="text-[15px] font-semibold">{pricing.plan}</p>
                    <span className="rounded-full bg-white/10 px-2.5 py-1 text-[12px] font-medium text-white ring-1 ring-white/15">{t.trial}</span>
                  </div>
                  <p className="mt-1 text-[14px] text-white/55">{pricing.planBody}</p>
                  <p className="mt-8 flex items-baseline gap-2">
                    <span className="text-[64px] leading-none font-semibold tracking-[-0.05em]">{m(pricing.basePriceCents)}</span>
                    <span className="text-[15px] text-white/60">
                      {t.perMonth}, {t.exVat}
                    </span>
                  </p>
                  <div className="mt-6 flex items-center gap-3 rounded-2xl bg-white/[0.06] px-4 py-3.5 ring-1 ring-white/10">
                    <span className="text-[13px] text-white/55">{t.plus}</span>
                    <span className="text-[24px] font-semibold tracking-[-0.03em]">{m(stock.unitPriceCents)}</span>
                    <span className="text-[13px] leading-snug text-white/70">{t.perVehicle}</span>
                  </div>
                  <div className="mt-6 flex flex-wrap gap-2.5">
                    <Button href={site.signupUrl} size="lg" arrow>
                      {t.start}
                    </Button>
                    <Button href="/demo" size="lg" variant="light">
                      {t.demo}
                    </Button>
                  </div>
                </div>
              </div>
              <div className="p-8 sm:p-10">
                <p className="font-mono text-[11.5px] tracking-[0.12em] text-brand uppercase">{t.includedTitle}</p>
                <ul className="mt-5 space-y-3.5">
                  {pricing.included.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-[15px] text-ink-2">
                      <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-brand text-white">
                        <Check className="size-3" strokeWidth={3} />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-8 border-t border-line pt-5 text-[13.5px] text-muted">
                  {t.talk}{" "}
                  <Link href="/contact" className="inline-flex items-center gap-1 font-medium text-brand">
                    Contact <ArrowRight className="size-3.5" />
                  </Link>
                </p>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="pb-24">
        <Container>
          <Reveal delay={0.05} className="mx-auto max-w-[1040px]">
            <PricingCalculator />
          </Reveal>
        </Container>
      </section>

      <section className="border-y border-line bg-surface py-24 sm:py-28">
        <Container>
          <Reveal>
            <SectionHeader align="center" eyebrow={t.modulesEyebrow} title={t.modulesTitle} lead={t.modulesLead} />
          </Reveal>
          <div className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {platform.map((p, i) => {
              const notes = moduleNotes(p.slug);
              return (
                <Reveal key={p.slug} delay={(i % 3) * 0.05}>
                  <Link href={`/platform/${p.slug}`} className="group flex h-full flex-col rounded-[16px] border border-line bg-canvas p-6 transition-all hover:-translate-y-0.5 hover:bg-surface hover:shadow-float">
                    <div className="flex items-center justify-between">
                      <IconTile text={p.name} hint={p.title} size="lg" />
                      <span className="inline-flex items-center gap-1.5 rounded-[6px] bg-ok-50 px-2 py-1 text-[11.5px] font-medium text-ok">
                        <Check className="size-3" strokeWidth={3} /> {t.includedBadge}
                      </span>
                    </div>
                    <p className="mt-5 font-mono text-[11px] tracking-[0.08em] text-subtle uppercase">{p.module}</p>
                    <p className="mt-1 text-[17px] font-semibold tracking-[-0.02em]">{p.name}</p>
                    <p className="mt-1.5 text-[14px] leading-relaxed text-muted">{p.title}</p>
                    <ul className="mt-auto space-y-1.5 border-t border-line pt-4 text-[13px]">
                      {(notes.length ? notes : [t.moduleNote.free]).map((n) => (
                        <li key={n} className={clsx("flex items-center gap-2", notes.length ? "text-ink-2" : "text-muted")}>
                          <span className={clsx("size-1.5 shrink-0 rounded-full", notes.length ? "bg-brand" : "bg-ok")} />
                          {n}
                        </li>
                      ))}
                    </ul>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="py-24 sm:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
            <Reveal>
              <SectionHeader eyebrow={t.tableEyebrow} title={t.tableTitle} />
              <p className="mt-5 text-[14px] text-muted">{t.pricesNote}</p>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="overflow-hidden rounded-[16px] border border-line bg-surface">
                <div className="grid grid-cols-[1.6fr_1fr_1fr] gap-3 border-b border-line bg-canvas px-5 py-3 text-[12px] font-semibold text-muted">
                  {t.cols.map((c, i) => (
                    <span key={c} className={i === 2 ? "text-right" : undefined}>
                      {c}
                    </span>
                  ))}
                </div>
                <div className="grid grid-cols-[1.6fr_1fr_1fr] items-center gap-3 border-b border-line px-5 py-4">
                  <span className="text-[14.5px] font-semibold">{t.base}</span>
                  <span className="text-[13.5px] text-muted">{t.none}</span>
                  <span className="text-right text-[14.5px] font-semibold tabular-nums">
                    {m(pricing.basePriceCents)} <span className="text-[12px] font-normal text-muted">{t.perMonth}</span>
                  </span>
                </div>
                {pricing.items.map((i) => (
                  <div key={i.key} className="grid grid-cols-[1.6fr_1fr_1fr] items-center gap-3 border-b border-line px-5 py-3.5 last:border-0">
                    <span>
                      <span className="block text-[14px] font-medium">{i.name}</span>
                      <span className="block text-[12.5px] text-muted">{i.description}</span>
                    </span>
                    <span className="text-[13.5px] text-ink-2 tabular-nums">{i.included === null ? t.unlimited : i.included === 0 ? t.none : num(i.included)}</span>
                    <span className="text-right text-[14px] tabular-nums">
                      {i.unitPriceCents === 0 ? (
                        <span className="font-medium text-ok">{t.free}</span>
                      ) : (
                        <>
                          <span className="font-semibold">{m(i.unitPriceCents)}</span> <span className="text-[12px] text-muted">{t.perUnit(i.unit)}</span>
                        </>
                      )}
                    </span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="border-y border-line bg-surface py-24 sm:py-28">
        <Container>
          <Reveal>
            <SectionHeader align="center" eyebrow={t.billingEyebrow} title={t.billingTitle} />
          </Reveal>
          <div className="mt-14 grid gap-px overflow-hidden rounded-2xl bg-line shadow-card sm:grid-cols-2 lg:grid-cols-4">
            {t.billing.map(([title, body], i) => (
              <Reveal key={title} delay={i * 0.05} className="bg-surface">
                <div className="h-full p-7">
                  <div className="flex items-center justify-between">
                    <IconTile text={title} hint={body} size="lg" />
                    <span className="font-mono text-[12px] text-subtle">0{i + 1}</span>
                  </div>
                  <h3 className="mt-6 text-[17px] font-semibold tracking-[-0.02em]">{title}</h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-muted">{body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-24 sm:py-28">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.6fr]">
          <SectionHeader eyebrow={t.faqEyebrow} title={t.faqTitle} />
          <FAQ items={pricing.faq} />
        </Container>
      </section>

      <CTASection />
    </>
  );
}
