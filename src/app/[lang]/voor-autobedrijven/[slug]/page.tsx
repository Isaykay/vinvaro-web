import type { Metadata } from "next";
import Link from "@/components/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, Minus } from "lucide-react";
import { getContent } from "@/lib/content";
import { integrations as nlIntegrations } from "@/content/nl";
import { defaultLang, defineCopy } from "@/lib/i18n";
import { getLang } from "@/lib/i18n-server";
import { pageMetadata } from "@/lib/seo";
import { JsonLd, breadcrumbLd, faqLd } from "@/components/json-ld";
import { Button, Container, SectionHeader } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { IconTile } from "@/components/icons";
import { FAQ } from "@/components/faq";
import { CTASection, FeatureList, PageHero } from "@/components/sections";
import { VehicleJourney } from "@/components/product/hero";
import { IntegrationLogo } from "@/components/product/kit";
import { ModuleVisual } from "@/components/product/module-visual";

const copy = defineCopy({
  nl: {
    demo: "Plan een demo",
    platform: "Bekijk het platform",
    contrastEyebrow: "Van losse lijstjes naar één werkplek",
    before: "Zonder VINVARO",
    after: "Met VINVARO",
    outcomesEyebrow: "Wat VINVARO verandert",
    outcomesTitle: "Drie dingen die je meteen merkt.",
    dayEyebrow: "Een dag in VINVARO",
    dayTitle: (name: string) => `Zo ziet een dag eruit bij ${name.toLowerCase()}.`,
    featuresEyebrow: "Alles wat je nodig hebt",
    featuresTitle: "Gebouwd voor hoe jullie werken.",
    featuresLead: "Elke functie hieronder zit in hetzelfde plan, op hetzelfde voertuigdossier.",
    journeyEyebrow: "Van intake tot aflevering",
    journeyTitle: "Zo loopt een auto door je bedrijf.",
    integrationsEyebrow: "Gekoppeld",
    integrationsTitle: "Werkt met wat je al gebruikt.",
    allIntegrations: "Alle integraties",
    modulesTitle: "Modules die hier het meest helpen",
    faqEyebrow: "Veelgestelde vragen",
    faqTitle: "Goed om te weten.",
    view: "Bekijk",
    forDealers: "Voor autobedrijven",
  },
  en: {
    demo: "Book a demo",
    platform: "Explore the platform",
    contrastEyebrow: "From scattered lists to one workspace",
    before: "Without VINVARO",
    after: "With VINVARO",
    outcomesEyebrow: "What VINVARO changes",
    outcomesTitle: "Three things you notice straight away.",
    dayEyebrow: "A day in VINVARO",
    dayTitle: (name: string) => `What a day looks like for ${name.toLowerCase()}.`,
    featuresEyebrow: "Everything you need",
    featuresTitle: "Built for the way you work.",
    featuresLead: "Every feature below is part of the same plan, on the same vehicle dossier.",
    journeyEyebrow: "From intake to delivery",
    journeyTitle: "How a car moves through your business.",
    integrationsEyebrow: "Connected",
    integrationsTitle: "Works with what you already use.",
    allIntegrations: "All integrations",
    modulesTitle: "Modules that help most here",
    faqEyebrow: "FAQ",
    faqTitle: "Good to know.",
    view: "View",
    forDealers: "For dealers",
  },
});

export function generateStaticParams() {
  return getContent(defaultLang).segments.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/voor-autobedrijven/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const lang = await getLang();
  const seg = getContent(lang).segments.find((s) => s.slug === slug);
  return seg ? pageMetadata({ lang, path: `/voor-autobedrijven/${slug}`, title: `${seg.name}: ${seg.title}`, description: seg.lead, og: { kicker: seg.name, title: seg.title } }) : {};
}

export default async function SegmentPage({ params }: PageProps<"/[lang]/voor-autobedrijven/[slug]">) {
  const { slug } = await params;
  const lang = await getLang();
  const t = copy[lang];
  const { segments, platform, integrations } = getContent(lang);
  const seg = segments.find((s) => s.slug === slug);
  if (!seg) notFound();
  const modules = seg.modules.map((m) => platform.find((p) => p.slug === m)).filter((p) => p !== undefined);
  const moduleOf = (slug: string) => platform.find((p) => p.slug === slug);
  const linked = seg.integrations.map((name) => integrations[nlIntegrations.findIndex((i) => i.name === name)]).filter((i) => i !== undefined);

  return (
    <>
      <JsonLd data={[breadcrumbLd(lang, [{ name: `${t.forDealers}: ${seg.name}`, path: `/voor-autobedrijven/${seg.slug}` }]), faqLd(seg.faq, lang)]} />
      <PageHero eyebrow={seg.eyebrow} title={seg.title} lead={seg.lead}>
        <Button href="/demo" size="lg" arrow>
          {t.demo}
        </Button>
        <Button href="/platform" size="lg" variant="secondary">
          {t.platform}
        </Button>
      </PageHero>

      <section className="pb-16">
        <Container>
          <Reveal y={28}>
            <div className="bg-stage mx-auto max-w-[1080px] rounded-[26px] p-3 sm:p-8">
              <ModuleVisual visual={seg.visual} />
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="py-20 sm:py-24">
        <Container>
          <Reveal>
            <SectionHeader align="center" eyebrow={t.contrastEyebrow} title={seg.name} />
          </Reveal>
          <div className="mx-auto mt-12 grid max-w-[1000px] gap-5 md:grid-cols-2">
            <Reveal className="rounded-2xl border border-dashed border-line-strong p-7">
              <p className="mb-5 text-[14px] font-medium text-muted">{t.before}</p>
              <ul className="space-y-3.5">
                {seg.pains.map((p) => (
                  <li key={p} className="flex items-center gap-3 text-[15px] text-muted">
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-sunken ring-1 ring-line">
                      <Minus className="size-3.5 text-subtle" />
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.08} className="rounded-2xl bg-surface p-7 shadow-float ring-1 ring-brand/15">
              <p className="mb-5 text-[14px] font-semibold text-brand">{t.after}</p>
              <ul className="space-y-3.5">
                {seg.wins.map((w) => (
                  <li key={w} className="flex items-center gap-3 text-[15px] text-ink">
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand ring-1 ring-brand-100">
                      <Check className="size-3.5" strokeWidth={2.5} />
                    </span>
                    {w}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="border-y border-line bg-surface py-20 sm:py-28">
        <Container>
          <Reveal>
            <SectionHeader eyebrow={t.outcomesEyebrow} title={t.outcomesTitle} />
          </Reveal>
          <Reveal delay={0.1} className="mt-12">
            <FeatureList items={seg.outcomes} columns={3} />
          </Reveal>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container>
          <Reveal>
            <SectionHeader eyebrow={t.dayEyebrow} title={t.dayTitle(seg.name)} />
          </Reveal>
          <ol className="relative mt-14 grid gap-4 lg:grid-cols-5">
            <span aria-hidden className="absolute top-[22px] right-[10%] left-[10%] hidden h-px bg-line lg:block" />
            {seg.day.map((d, i) => {
              const mod = moduleOf(d.module);
              return (
                <Reveal key={d.time} delay={i * 0.06} className="relative">
                  <li className="flex h-full flex-col rounded-2xl bg-surface p-5 shadow-card ring-1 ring-line">
                    <span className="relative z-[1] inline-flex w-fit items-center rounded-full bg-brand px-2.5 py-1 font-mono text-[12px] font-semibold text-white">{d.time}</span>
                    <p className="mt-4 text-[15.5px] font-semibold tracking-[-0.015em]">{d.title}</p>
                    <p className="mt-1.5 text-[13.5px] leading-relaxed text-muted">{d.body}</p>
                    {mod && (
                      <Link href={`/platform/${mod.slug}`} className="mt-auto inline-flex items-center gap-1.5 pt-4 text-[12.5px] font-medium text-muted hover:text-brand">
                        <IconTile text={mod.name} hint={mod.title} size="sm" />
                        {mod.name}
                      </Link>
                    )}
                  </li>
                </Reveal>
              );
            })}
          </ol>
        </Container>
      </section>

      <section className="border-y border-line bg-surface py-20 sm:py-28">
        <Container>
          <Reveal>
            <SectionHeader eyebrow={t.featuresEyebrow} title={t.featuresTitle} lead={t.featuresLead} />
          </Reveal>
          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl bg-line shadow-card sm:grid-cols-2 lg:grid-cols-3">
            {seg.features.map((f, i) => {
              const mod = moduleOf(f.module);
              return (
                <Reveal key={f.title} delay={(i % 3) * 0.05} className="bg-surface">
                  <div className="flex h-full flex-col p-7">
                    <IconTile text={f.title} hint={f.body} />
                    <p className="mt-5 text-[16px] font-semibold tracking-[-0.02em]">{f.title}</p>
                    <p className="mt-1.5 text-[14px] leading-relaxed text-muted">{f.body}</p>
                    {mod && (
                      <Link href={`/platform/${mod.slug}`} className="mt-auto inline-flex items-center gap-1 pt-5 text-[13px] font-medium text-muted hover:text-brand">
                        {mod.name} <ArrowRight className="size-3.5" />
                      </Link>
                    )}
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container>
          <Reveal>
            <SectionHeader align="center" eyebrow={t.journeyEyebrow} title={t.journeyTitle} />
          </Reveal>
          <Reveal delay={0.1} className="mx-auto mt-14 max-w-[1040px]">
            <VehicleJourney />
          </Reveal>
        </Container>
      </section>

      {linked.length > 0 && (
        <section className="border-t border-line bg-surface py-20 sm:py-24">
          <Container>
            <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
              <Reveal>
                <SectionHeader eyebrow={t.integrationsEyebrow} title={t.integrationsTitle} />
              </Reveal>
              <Button href="/integraties" variant="secondary" arrow>
                {t.allIntegrations}
              </Button>
            </div>
            <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {linked.map((i) => (
                <div key={i.name} className="flex items-start gap-3 rounded-2xl bg-canvas p-4 ring-1 ring-line">
                  <IntegrationLogo slug={i.slug} channel={i.channel} className="size-10 rounded-[10px]" size={22} />
                  <span className="min-w-0">
                    <span className="block text-[14px] font-semibold tracking-[-0.01em]">{i.name}</span>
                    <span className="mt-0.5 line-clamp-2 block text-[12.5px] leading-snug text-muted">{i.body}</span>
                  </span>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      <section className="border-t border-line py-20 sm:py-24">
        <Container>
          <p className="mb-6 text-[14px] font-medium text-muted">{t.modulesTitle}</p>
          <div className="grid gap-px overflow-hidden rounded-2xl bg-line shadow-card sm:grid-cols-2 lg:grid-cols-4">
            {modules.map((m) => (
              <Link key={m.slug} href={`/platform/${m.slug}`} className="group flex flex-col bg-surface p-7 transition-colors hover:bg-canvas">
                <IconTile text={m.name} hint={m.title} />
                <p className="mt-5 text-[16px] font-semibold tracking-[-0.02em]">{m.name}</p>
                <p className="mt-1.5 text-[14px] leading-relaxed text-muted">{m.title}</p>
                <span className="mt-auto inline-flex items-center gap-1 pt-6 text-[13.5px] text-muted group-hover:text-brand">
                  {t.view} <ArrowRight className="size-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-line bg-surface py-20 sm:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <Reveal>
              <SectionHeader eyebrow={t.faqEyebrow} title={t.faqTitle} />
            </Reveal>
            <Reveal delay={0.1}>
              <FAQ items={seg.faq} />
            </Reveal>
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
