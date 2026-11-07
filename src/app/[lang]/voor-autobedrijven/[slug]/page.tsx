import type { Metadata } from "next";
import Link from "@/components/link";
import { notFound } from "next/navigation";
import { ArrowRight, Minus } from "lucide-react";
import { getContent } from "@/lib/content";
import { defaultLang, defineCopy } from "@/lib/i18n";
import { getLang } from "@/lib/i18n-server";
import { pageMetadata } from "@/lib/seo";
import { JsonLd, breadcrumbLd } from "@/components/json-ld";
import { Button, Container, SectionHeader } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { IconTile } from "@/components/icons";
import { CTASection, FeatureList, PageHero } from "@/components/sections";
import { HeroWorkspace, VehicleJourney } from "@/components/product/hero";

const copy = defineCopy({
  nl: {
    demo: "Plan een demo",
    platform: "Bekijk het platform",
    painsTitle: "Herkenbaar?",
    outcomesEyebrow: "Wat VINVARO verandert",
    outcomesTitle: "Van losse lijstjes naar één werkplek.",
    modulesTitle: "Modules die hier het meest helpen",
    journeyEyebrow: "Van intake tot aflevering",
    journeyTitle: "Zo loopt een auto door je bedrijf.",
    view: "Bekijk",
    forDealers: "Voor autobedrijven",
  },
  en: {
    demo: "Book a demo",
    platform: "Explore the platform",
    painsTitle: "Sound familiar?",
    outcomesEyebrow: "What VINVARO changes",
    outcomesTitle: "From scattered lists to one workspace.",
    modulesTitle: "Modules that help most here",
    journeyEyebrow: "From intake to delivery",
    journeyTitle: "How a car moves through your business.",
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
  const { segments, platform } = getContent(lang);
  const seg = segments.find((s) => s.slug === slug);
  if (!seg) notFound();
  const modules = seg.modules.map((m) => platform.find((p) => p.slug === m)).filter((p) => p !== undefined);

  return (
    <>
      <JsonLd data={breadcrumbLd(lang, [{ name: `${t.forDealers}: ${seg.name}`, path: `/voor-autobedrijven/${seg.slug}` }])} />
      <PageHero eyebrow={seg.eyebrow} title={seg.title} lead={seg.lead}>
        <Button href="/demo" size="lg" arrow>
          {t.demo}
        </Button>
        <Button href="/platform" size="lg" variant="secondary">
          {t.platform}
        </Button>
      </PageHero>

      <section className="pb-20">
        <Container>
          <div className="grid items-start gap-8 lg:grid-cols-[0.7fr_1.3fr]">
            <Reveal className="rounded-2xl border border-dashed border-line-strong p-7">
              <p className="mb-5 text-[14px] font-medium text-muted">{t.painsTitle}</p>
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
            <Reveal delay={0.1}>
              <div className="bg-stage rounded-[26px] p-3 sm:p-6">
                <HeroWorkspace />
              </div>
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
            <SectionHeader align="center" eyebrow={t.journeyEyebrow} title={t.journeyTitle} />
          </Reveal>
          <Reveal delay={0.1} className="mx-auto mt-14 max-w-[1040px]">
            <VehicleJourney />
          </Reveal>
        </Container>
      </section>

      <section className="border-t border-line bg-surface py-20 sm:py-24">
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

      <CTASection />
    </>
  );
}
