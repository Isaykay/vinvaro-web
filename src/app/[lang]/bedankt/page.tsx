import type { Metadata } from "next";
import { defineCopy } from "@/lib/i18n";
import { getLang } from "@/lib/i18n-server";
import { pageMetadata } from "@/lib/seo";
import { Button, Container, Eyebrow } from "@/components/ui";
import { IconTile } from "@/components/icons";
import { ThanksSlot } from "@/components/thanks-slot";

const copy = defineCopy({
  nl: {
    metaTitle: "Bedankt",
    metaDescription: "Bedankt voor je demo-aanvraag. We bevestigen het moment per e-mail en bereiden de demo voor op jouw autobedrijf.",
    eyebrow: "Aanvraag ontvangen",
    title: "Bedankt! Tot snel in de demo.",
    lead: "We hebben je aanvraag ontvangen en bevestigen het moment per e-mail, met een link naar het videogesprek.",
    next: [
      { title: "Bevestiging per e-mail", body: "Je ontvangt een agenda-uitnodiging met de link naar het videogesprek." },
      { title: "We bereiden de demo voor", body: "Op basis van je type bedrijf, voorraad en waar je mee wilt beginnen." },
      { title: "Demo van 30 minuten", body: "We laten VINVARO zien met voorbeelden die passen bij jouw werkwijze." },
    ],
    home: "Terug naar home",
    platform: "Bekijk het platform",
  },
  en: {
    metaTitle: "Thank you",
    metaDescription: "Thank you for requesting a demo. We'll confirm the time by email and tailor the demo to your automotive business.",
    eyebrow: "Request received",
    title: "Thank you! See you soon in the demo.",
    lead: "We've received your request and will confirm the time by email, with a link to the video call.",
    next: [
      { title: "Confirmation by email", body: "You'll receive a calendar invitation with the link to the video call." },
      { title: "We prepare the demo", body: "Based on your type of business, stock and where you'd like to start." },
      { title: "A 30-minute demo", body: "We show VINVARO with examples that fit the way you work." },
    ],
    home: "Back to home",
    platform: "Explore the platform",
  },
});

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLang();
  return pageMetadata({ lang, path: "/bedankt", title: copy[lang].metaTitle, description: copy[lang].metaDescription, noindex: true });
}

export default async function ThanksPage() {
  const t = copy[await getLang()];
  return (
    <section className="relative overflow-hidden pt-28 pb-28 sm:pt-36">
      <div className="bg-grid mask-fade-b pointer-events-none absolute inset-x-0 top-0 h-[600px] opacity-70" />
      <Container className="relative">
        <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="animate-rise">
            <Eyebrow className="mb-5">{t.eyebrow}</Eyebrow>
            <h1 className="text-h1 text-balance">{t.title}</h1>
            <p className="text-lead mt-5 max-w-[560px] text-muted">{t.lead}</p>
            <ol className="mt-10 space-y-5">
              {t.next.map((s, i) => (
                <li key={s.title} className="flex items-start gap-4">
                  <IconTile text={s.title} hint={s.body} />
                  <div>
                    <p className="text-[15px] font-semibold tracking-[-0.015em]">
                      <span className="mr-2 font-mono text-[12px] text-subtle">0{i + 1}</span>
                      {s.title}
                    </p>
                    <p className="mt-0.5 text-[14px] text-muted">{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button href="/platform" size="lg" arrow>
                {t.platform}
              </Button>
              <Button href="/" size="lg" variant="secondary">
                {t.home}
              </Button>
            </div>
          </div>
          <div className="bg-stage rounded-[28px] px-6 py-14">
            <ThanksSlot />
          </div>
        </div>
      </Container>
    </section>
  );
}
