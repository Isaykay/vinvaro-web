import type { Metadata } from "next";
import { defineCopy } from "@/lib/i18n";
import { getLang } from "@/lib/i18n-server";
import { pageMetadata } from "@/lib/seo";
import { JsonLd, breadcrumbLd } from "@/components/json-ld";
import { Button, Container } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { CTASection, IntegrationGrid, PageHero } from "@/components/sections";
import { PublishFlow } from "@/components/product/sales";

const copy = defineCopy({
  nl: {
    metaTitle: "Integraties: RDW, marktplaatsen, inbox en agenda",
    metaDescription: "VINVARO koppelt met RDW Open Data, mobile.de, AutoScout24, WhatsApp Business, Gmail, Outlook, Google Agenda, KVK, VIES en meer. Live en geplande integraties op een rij.",
    eyebrow: "Integraties",
    title: "Gekoppeld aan wat je al gebruikt.",
    lead: "Voertuiggegevens, marktplaatsen, berichten, agenda's en relatiecontroles. Live koppelingen werken vandaag; wat gepland staat, markeren we als gepland.",
    demo: "Plan een demo",
    contact: "Mis je een koppeling?",
  },
  en: {
    metaTitle: "Integrations: RDW, marketplaces, inbox and calendar",
    metaDescription: "VINVARO connects with RDW Open Data, mobile.de, AutoScout24, WhatsApp Business, Gmail, Outlook, Google Calendar, KVK, VIES and more. Live and planned integrations at a glance.",
    eyebrow: "Integrations",
    title: "Connected to what you already use.",
    lead: "Vehicle data, marketplaces, messaging, calendars and contact checks. Live integrations work today; anything planned is marked as planned.",
    demo: "Book a demo",
    contact: "Missing an integration?",
  },
});

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLang();
  const t = copy[lang];
  return pageMetadata({ lang, path: "/integraties", title: t.metaTitle, description: t.metaDescription });
}

export default async function IntegrationsPage() {
  const lang = await getLang();
  const t = copy[lang];
  return (
    <>
      <JsonLd data={breadcrumbLd(lang, [{ name: t.eyebrow, path: "/integraties" }])} />
      <PageHero eyebrow={t.eyebrow} title={t.title} lead={t.lead}>
        <Button href="/demo" size="lg" arrow>
          {t.demo}
        </Button>
        <Button href="/contact" size="lg" variant="secondary">
          {t.contact}
        </Button>
      </PageHero>
      <section className="pb-20">
        <Container>
          <Reveal y={28}>
            <div className="bg-stage mx-auto max-w-[1080px] rounded-[26px] p-4 sm:p-10">
              <PublishFlow />
            </div>
          </Reveal>
        </Container>
      </section>
      <section className="border-t border-line bg-surface py-20 sm:py-24">
        <Container>
          <IntegrationGrid />
        </Container>
      </section>
      <CTASection />
    </>
  );
}
