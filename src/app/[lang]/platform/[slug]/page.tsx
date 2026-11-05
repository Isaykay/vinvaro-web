import type { Metadata } from "next";
import Link from "@/components/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { getContent } from "@/lib/content";
import { defaultLang, defineCopy } from "@/lib/i18n";
import { getLang } from "@/lib/i18n-server";
import { pageMetadata } from "@/lib/seo";
import { JsonLd, breadcrumbLd, faqLd, softwareApplicationLd } from "@/components/json-ld";
import { Button, Container, SectionHeader } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { IconTile } from "@/components/icons";
import { CTASection, FeatureList, PageHero } from "@/components/sections";
import { FAQ } from "@/components/faq";
import { ModuleVisual } from "@/components/product/module-visual";

const copy = defineCopy({
  nl: { demo: "Plan een demo", platform: "Bekijk het platform", more: "Meer van het platform", view: "Bekijk", faqEyebrow: "Veelgestelde vragen", faqTitle: (name: string) => `Vragen over ${name}` },
  en: { demo: "Book a demo", platform: "Explore the platform", more: "More of the platform", view: "View", faqEyebrow: "FAQ", faqTitle: (name: string) => `Questions about ${name}` },
});

export function generateStaticParams() {
  return getContent(defaultLang).platform.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/platform/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const lang = await getLang();
  const mod = getContent(lang).platform.find((p) => p.slug === slug);
  return mod ? pageMetadata({ lang, path: `/platform/${slug}`, title: `${mod.name}: ${mod.title}`, description: mod.lead }) : {};
}

export default async function PlatformModulePage({ params }: PageProps<"/[lang]/platform/[slug]">) {
  const { slug } = await params;
  const lang = await getLang();
  const t = copy[lang];
  const { platform } = getContent(lang);
  const index = platform.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();
  const mod = platform[index];
  const others = [1, 2, 3].map((n) => platform[(index + n) % platform.length]);

  return (
    <>
      <JsonLd
        data={[
          softwareApplicationLd(lang),
          breadcrumbLd(lang, [
            { name: "Platform", path: "/platform" },
            { name: mod.name, path: `/platform/${mod.slug}` },
          ]),
          ...(mod.faq ? [faqLd(mod.faq, lang)] : []),
        ]}
      />
      <PageHero eyebrow={mod.eyebrow} title={mod.title} lead={mod.lead}>
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
              <ModuleVisual visual={mod.visual} />
            </div>
          </Reveal>
        </Container>
      </section>

      {mod.steps && (
        <section className="pb-8">
          <Container>
            <Reveal>
              <ol className="flex flex-wrap items-center justify-center gap-2">
                {mod.steps.map((s, i) => (
                  <li key={s} className="flex items-center gap-2">
                    <span className="rounded-full bg-surface px-3 py-1.5 font-mono text-[12px] text-ink-2 shadow-card">{s}</span>
                    {i < mod.steps!.length - 1 && <ArrowRight className="size-3.5 text-subtle" />}
                  </li>
                ))}
              </ol>
            </Reveal>
          </Container>
        </section>
      )}

      <section className="py-20 sm:py-28">
        <Container>
          <Reveal>
            <FeatureList items={mod.points} columns={mod.points.length % 3 === 0 ? 3 : 2} />
          </Reveal>
        </Container>
      </section>

      {mod.faq && (
        <section className="border-t border-line py-20 sm:py-24">
          <Container className="grid gap-10 lg:grid-cols-[1fr_1.6fr]">
            <SectionHeader eyebrow={t.faqEyebrow} title={t.faqTitle(mod.name)} />
            <FAQ items={mod.faq} />
          </Container>
        </section>
      )}

      <section className="border-t border-line bg-surface py-20 sm:py-24">
        <Container>
          <p className="mb-6 text-[14px] font-medium text-muted">{t.more}</p>
          <div className="grid gap-px overflow-hidden rounded-2xl bg-line shadow-card md:grid-cols-3">
            {others.map((o) => (
              <Link key={o.slug} href={`/platform/${o.slug}`} className="group bg-surface p-7 transition-colors hover:bg-canvas">
                <div className="flex items-center gap-3">
                  <IconTile text={o.name} hint={o.title} size="sm" />
                  <p className="font-mono text-[11.5px] tracking-[0.1em] text-brand uppercase">{o.name}</p>
                </div>
                <p className="mt-4 text-[17px] font-semibold tracking-[-0.02em]">{o.title}</p>
                <span className="mt-6 inline-flex items-center gap-1 text-[13.5px] text-muted group-hover:text-ink">
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
