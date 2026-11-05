import type { Metadata } from "next";
import { Mail } from "lucide-react";
import { getContent } from "@/lib/content";
import { defineCopy } from "@/lib/i18n";
import { getLang } from "@/lib/i18n-server";
import { pageMetadata } from "@/lib/seo";
import { JsonLd, breadcrumbLd } from "@/components/json-ld";
import { Container, Eyebrow } from "@/components/ui";
import { IconTile } from "@/components/icons";
import { OfficeHours } from "@/components/office-hours";
import { DemoQualifier } from "@/components/demo-qualifier";
import { Car } from "@/components/product/kit";

const copy = defineCopy({
  nl: {
    metaTitle: "Plan een demo",
    metaDescription: "Plan een demo van 30 minuten en zie VINVARO werken met jouw voorraad: voertuigdossier, intake en aflevering, gedeelde inbox, verkoop en publiceren.",
    eyebrow: "Plan een demo",
    title: "Zie VINVARO werken in jouw autobedrijf.",
    lead: "Een paar korte vragen, dan kies je direct een moment. We bereiden de demo voor op jouw voorraad en werkwijze.",
    benefits: [
      { title: "30 minuten, op maat", body: "Afgestemd op je type bedrijf, voorraad en team." },
      { title: "Online via videogesprek", body: "Vanuit je kantoor of de showroom, zonder installatie." },
      { title: "Hulp bij de overstap", body: "Import van voorraad en relaties, en koppelingen met je kanalen." },
    ],
    agendaTitle: "Wat we bespreken",
    agenda: ["Hoe een auto nu door je bedrijf loopt", "Voertuigdossier, intake en bevindingen op echte voorbeelden", "Inbox, verkoop en publiceren", "Modules, overstap en vervolgstappen"],
    direct: "Liever direct contact?",
  },
  en: {
    metaTitle: "Book a demo",
    metaDescription: "Book a 30-minute demo and see VINVARO working with your stock: vehicle dossier, intake and delivery, shared inbox, sales and publishing.",
    eyebrow: "Book a demo",
    title: "See VINVARO at work in your business.",
    lead: "A few short questions, then pick a time straight away. We'll tailor the demo to your stock and way of working.",
    benefits: [
      { title: "30 minutes, tailored", body: "Matched to your type of business, stock and team." },
      { title: "Online via video call", body: "From your office or showroom, nothing to install." },
      { title: "Help with switching", body: "Import of stock and contacts, and connecting your channels." },
    ],
    agendaTitle: "What we'll cover",
    agenda: ["How a car moves through your business today", "Vehicle dossier, intake and findings on real examples", "Inbox, sales and publishing", "Modules, switching and next steps"],
    direct: "Prefer to talk directly?",
  },
});

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLang();
  const t = copy[lang];
  return pageMetadata({ lang, path: "/demo", title: t.metaTitle, description: t.metaDescription });
}

export default async function DemoPage() {
  const lang = await getLang();
  const t = copy[lang];
  const { site } = getContent(lang);
  return (
    <section className="relative overflow-hidden pt-28 pb-24 sm:pt-32">
      <JsonLd data={breadcrumbLd(lang, [{ name: t.metaTitle, path: "/demo" }])} />
      <div className="bg-grid mask-fade-b pointer-events-none absolute inset-x-0 top-0 h-[600px] opacity-70" />
      <div className="pointer-events-none absolute -top-20 right-0 h-[420px] w-[620px] rounded-full bg-brand/[0.08] blur-3xl" />
      <Container className="relative">
        <div className="grid items-start gap-x-16 gap-y-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="animate-rise lg:col-start-1 lg:row-start-1">
            <Eyebrow className="mb-5">{t.eyebrow}</Eyebrow>
            <h1 className="text-h2 text-balance">{t.title}</h1>
            <p className="text-lead mt-5 text-muted">{t.lead}</p>
          </div>

          <div className="lg:sticky lg:top-24 lg:col-start-2 lg:row-span-2 lg:row-start-1">
            <DemoQualifier />
          </div>

          <div className="lg:col-start-1 lg:row-start-2">
            <div className="space-y-4">
              {t.benefits.map((b) => (
                <div key={b.title} className="flex items-start gap-4">
                  <IconTile text={b.title} hint={b.body} />
                  <div>
                    <p className="text-[15px] font-semibold tracking-[-0.015em]">{b.title}</p>
                    <p className="mt-0.5 text-[14px] text-muted">{b.body}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-9 overflow-hidden rounded-2xl bg-surface shadow-card">
              <div className="bg-stage relative flex h-[120px] items-end justify-center overflow-hidden px-10 pb-2">
                <div className="bg-dots pointer-events-none absolute inset-0 opacity-50" />
                <Car spin className="relative w-full max-w-[260px]" />
              </div>
              <div className="p-5">
                <p className="font-mono text-[11px] tracking-[0.1em] text-subtle uppercase">{t.agendaTitle}</p>
                <ol className="mt-3 space-y-2.5">
                  {t.agenda.map((a, i) => (
                    <li key={a} className="flex items-start gap-3 text-[14px] text-ink-2">
                      <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-brand-50 font-mono text-[11px] text-brand">{i + 1}</span>
                      {a}
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            <div className="mt-4 rounded-2xl bg-surface p-5 shadow-card">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-[15px] font-semibold">{t.direct}</p>
                <OfficeHours />
              </div>
              <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:gap-6">
                <a href={`mailto:${site.email}`} className="flex items-center gap-2 text-[14px] text-ink-2 hover:text-ink">
                  <Mail className="size-4 text-subtle" /> {site.email}
                </a>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
