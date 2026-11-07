import type { Metadata } from "next";
import Link from "@/components/link";
import { ArrowRight } from "lucide-react";
import { getContent } from "@/lib/content";
import { defineCopy } from "@/lib/i18n";
import { getLang } from "@/lib/i18n-server";
import { pageMetadata } from "@/lib/seo";
import { JsonLd, absoluteUrl, breadcrumbLd, softwareApplicationLd } from "@/components/json-ld";
import { Button, Container, SectionHeader } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { IconTile } from "@/components/icons";
import { CTASection, PageHero } from "@/components/sections";
import { HeroWorkspace, VehicleJourney } from "@/components/product/hero";

const copy = defineCopy({
  nl: {
    metaTitle: "Platform: één werkplek voor je autobedrijf",
    metaDescription: "Voorraad en voertuigdossier, intake- en afleverworkflows, AI, Fotostudio, team-app, gedeelde inbox, CRM, agenda, contracten, facturen, publiceren, Handelsplein en Marktplaats in één platform voor autobedrijven.",
    eyebrow: "Platform",
    title: "Eén werkplek voor voertuigen, klanten en processen.",
    lead: "Twaalf modules die samenwerken op hetzelfde voertuigdossier, van voorraad, workflows en Fotostudio tot inbox, contracten en het VINVARO-netwerk. Allemaal in één plan; je team werkt in één omgeving, op het web en in de app.",
    cta: "Plan een demo",
    integrations: "Bekijk integraties",
    groups: ["Voertuigen", "Klanten & verkoop", "VINVARO-netwerk"],
    journeyEyebrow: "Hoe het samenkomt",
    journeyTitle: "Elke module schuift aan bij hetzelfde voertuig.",
    view: "Bekijk",
  },
  en: {
    metaTitle: "Platform: one workspace for your automotive business",
    metaDescription: "Inventory and vehicle dossier, intake and delivery workflows, AI, Photo studio, staff app, shared inbox, CRM, calendar, contracts, invoices, publishing, Trade network and Marketplace in one platform for automotive businesses.",
    eyebrow: "Platform",
    title: "One workspace for vehicles, customers and operations.",
    lead: "Twelve modules that work together on the same vehicle dossier, from inventory, workflows and the Photo studio to the inbox, contracts and the VINVARO network. All in one plan; your team works in one environment, on the web and in the app.",
    cta: "Book a demo",
    integrations: "View integrations",
    groups: ["Vehicles", "Customers & sales", "VINVARO network"],
    journeyEyebrow: "How it comes together",
    journeyTitle: "Every module joins the same vehicle.",
    view: "View",
  },
});

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLang();
  const t = copy[lang];
  return pageMetadata({ lang, path: "/platform", title: t.metaTitle, description: t.metaDescription });
}

export default async function PlatformIndex() {
  const lang = await getLang();
  const t = copy[lang];
  const { platform } = getContent(lang);
  const groups = (["vehicles", "sales", "network"] as const).map((g) => platform.filter((p) => p.group === g));
  return (
    <>
      <JsonLd
        data={[
          softwareApplicationLd(lang),
          {
            "@type": "ItemList",
            name: t.title,
            itemListElement: platform.map((p, i) => ({ "@type": "ListItem", position: i + 1, name: p.name, description: p.title, url: absoluteUrl(lang, `/platform/${p.slug}`) })),
          },
          breadcrumbLd(lang, [{ name: "Platform", path: "/platform" }]),
        ]}
      />
      <PageHero eyebrow={t.eyebrow} title={t.title} lead={t.lead}>
        <Button href="/demo" size="lg" arrow>
          {t.cta}
        </Button>
        <Button href="/integraties" size="lg" variant="secondary">
          {t.integrations}
        </Button>
      </PageHero>
      <section className="pb-24">
        <Container>
          <Reveal y={28}>
            <div className="bg-stage rounded-[26px] p-3 sm:p-8">
              <HeroWorkspace />
            </div>
          </Reveal>
        </Container>
      </section>

      {groups.map((group, gi) => (
        <section key={gi} className={gi === 1 ? "py-20 sm:py-24" : "border-t border-line bg-surface py-20 sm:py-24"}>
          <Container>
            <p className="mb-6 font-mono text-[11.5px] tracking-[0.12em] text-brand uppercase">{t.groups[gi]}</p>
            <div className={`grid gap-px overflow-hidden rounded-2xl bg-line shadow-card sm:grid-cols-2 ${group.length >= 5 ? "lg:grid-cols-5" : group.length === 4 ? "lg:grid-cols-4" : "lg:grid-cols-2"}`}>
              {group.map((p) => (
                <Link key={p.slug} href={`/platform/${p.slug}`} className="group flex flex-col bg-surface p-7 transition-colors hover:bg-canvas">
                  <IconTile text={p.name} hint={p.title} size="lg" />
                  <p className="mt-6 font-mono text-[11px] tracking-[0.08em] text-subtle uppercase">{p.module}</p>
                  <p className="mt-1 text-[17px] font-semibold tracking-[-0.02em]">{p.name}</p>
                  <p className="mt-2 text-[14px] leading-relaxed text-muted">{p.title}</p>
                  <span className="mt-auto inline-flex items-center gap-1 pt-6 text-[13.5px] text-muted group-hover:text-brand">
                    {t.view} <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      ))}

      <section className="border-t border-line bg-surface py-24 sm:py-28">
        <Container>
          <Reveal>
            <SectionHeader align="center" eyebrow={t.journeyEyebrow} title={t.journeyTitle} />
          </Reveal>
          <Reveal delay={0.1} className="mx-auto mt-14 max-w-[1040px]">
            <VehicleJourney />
          </Reveal>
        </Container>
      </section>
      <CTASection />
    </>
  );
}
