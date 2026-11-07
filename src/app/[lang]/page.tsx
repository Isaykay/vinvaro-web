import Image from "next/image";
import Link from "@/components/link";
import clsx from "clsx";
import { ArrowRight, Minus } from "lucide-react";
import type { Metadata } from "next";
import { getContent } from "@/lib/content";
import { defineCopy } from "@/lib/i18n";
import { getLang } from "@/lib/i18n-server";
import { pageMetadata } from "@/lib/seo";
import { JsonLd, faqLd, softwareApplicationLd } from "@/components/json-ld";
import { Button, Container, Eyebrow, SectionHeader } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { CheckItem, IconTile } from "@/components/icons";
import { FAQ } from "@/components/faq";
import { BrandMarquee, CTASection, ContactStrip, IntegrationWall } from "@/components/sections";
import { HeroWorkspace, PipelineBoard, VehicleJourney } from "@/components/product/hero";
import { MobileCapture, MobileDashboard, MobileReview } from "@/components/product/mobile";
import { IntegrationLogo } from "@/components/product/kit";
import { IntelligenceScan, VehicleDossier, WorkflowRun } from "@/components/product/ops";
import { InboxView, PublishFlow } from "@/components/product/sales";
import { PhotoStudio } from "@/components/product/studio";

const copy = defineCopy({
  nl: {
    metaTitle: "VINVARO: het besturingssysteem voor autobedrijven",
    news: "Nieuw",
    heroTitle: "Elk voertuig. Elk detail.",
    heroAccent: "Onder controle.",
    heroLead: "VINVARO brengt voorraad, klanten en processen samen in één werkplek. Van kenteken en intake tot proefrit, contract, publicatie en aflevering.",
    bookDemo: "Plan een demo",
    seeHow: "Bekijk hoe het werkt",
    worksWith: "Werkt met",
    contrast: {
      eyebrow: "Van losse systemen naar één werkplek",
      title: "Je hebt geen extra spreadsheet nodig.",
      accent: "Je hebt overzicht nodig.",
      beforeTitle: "Zonder VINVARO",
      before: ["Voorraad in Excel", "Klantvragen in vijf WhatsApp-telefoons", "Intake op papier, foto's in een galerij", "Advertenties per site handmatig bijwerken", "Contracten printen en scannen", "Niemand weet wie de volgende stap heeft"],
      after: ["Eén dossier per voertuig, RDW-gegevens erbij", "Eén gedeelde inbox met AI-labels", "Vaste workflows met foto's en bevindingen", "Publiceren vanuit het dossier", "Digitaal ondertekenen via een link", "Taken en fases die bewaken"],
    },
    journey: {
      eyebrow: "Van intake tot aflevering",
      title: "Eén voertuig. Vijf fases. Niets valt ertussen.",
      lead: "Elke auto doorloopt jouw fases met vaste workflows. Een fase gaat pas verder als de verplichte stappen af zijn; afwijkingen worden bevindingen en taken.",
    },
    splits: {
      inventory: { eyebrow: "Voorraad & dossier", title: "Kenteken in. Dossier compleet.", lead: "Merk, model, APK en tellerstandoordeel uit de RDW. Foto's, documenten, kosten en historie in één dossier, van inkoop tot aflevering.", cta: "Bekijk voorraad & dossier", href: "/platform/voorraad" },
      studio: { eyebrow: "Fotostudio", title: "Van terreinfoto naar studiofoto. In één klik.", lead: "Haal de achtergrond weg, zet de auto in een lichte studio, retoucheer met AI en dek het kenteken af met een blanco plaat of je logo. Rechtstreeks in het dossier, het origineel blijft bewaard.", cta: "Bekijk de Fotostudio", href: "/platform/fotostudio" },
      intake: { eyebrow: "Intake & aflevering", title: "Afwijking vastgesteld. Bevinding gemaakt.", lead: "Checklists die je team op de telefoon doorloopt. Verwacht en aangetroffen verschillen? Dan ontstaat automatisch een bevinding en zo nodig een taak.", cta: "Bekijk workflows", href: "/platform/intake-en-aflevering" },
      inbox: { eyebrow: "Gedeelde inbox", title: "Elke klantvraag in één inbox. Met de auto erbij.", lead: "WhatsApp Business, Gmail en Outlook samen. AI labelt elk bericht, geeft een leadscore en stelt een antwoord voor in jouw toon.", cta: "Bekijk de inbox", href: "/platform/inbox" },
      publish: { eyebrow: "Publiceren", title: "Eén keer invoeren. Overal online.", lead: "Publiceer naar mobile.de en AutoScout24 en toon je voorraad op je eigen website. Nieuwe prijs of verkocht? Alles wordt bijgewerkt.", cta: "Bekijk publiceren", href: "/platform/publiceren" },
    },
    intelligence: {
      eyebrow: "VINVARO Intelligence",
      title: "Bewijs, geen aannames.",
      lead: "AI die helpt controleren, niet die beslist. VINVARO leest documenten, signaleert afwijkingen en scoort leads. Elke suggestie toont waar hij vandaan komt; je team bevestigt.",
      points: ["Mogelijke kras? Bekijk de originele foto.", "Inkoopfactuur gelezen, gegevens voorgesteld.", "AI-voorstellen blijven gescheiden van wat is vastgesteld."],
      cta: "Bekijk AI & bevindingen",
    },
    app: {
      eyebrow: "Team-app voor iOS en Android",
      title: "Vastleggen waar het werk gebeurt.",
      accent: "Ook zonder bereik.",
      lead: "Je team fotografeert, doorloopt workflows en beantwoordt klanten vanaf de telefoon. Zonder verbinding wordt alles bewaard en daarna verstuurd.",
      points: ["Offline foto's en workflowantwoorden", "Camera direct in de juiste stap", "Pushmeldingen voor taken en berichten", "Rechten per rol, net als op het web"],
      cta: "Bekijk de team-app",
    },
    modules: {
      eyebrow: "Eén platform, één plan",
      title: "Alles wat een autobedrijf draait.",
      lead: "Alle modules zitten in één plan van € 199 per maand. Ze werken samen op hetzelfde voertuigdossier, met dezelfde rollen, dezelfde historie en hetzelfde auditlog.",
      all: "Platformoverzicht",
      view: "Bekijk",
    },
    integrations: {
      eyebrow: "Integraties",
      title: "Gekoppeld aan wat je al gebruikt.",
      lead: "RDW, marktplaatsen, je mailbox, WhatsApp en je agenda. Live koppelingen werken vandaag; geplande staan duidelijk als gepland gemarkeerd.",
      cta: "Alle integraties",
    },
    security: {
      eyebrow: "Veilig & herleidbaar",
      title: "Je gegevens blijven van jou.",
      lead: "Strikt per organisatie afgeschermd, met rollen, rechten en een auditlog dat laat zien wie wat wanneer deed.",
    },
    faq: { eyebrow: "Veelgestelde vragen", title: "Goed om te weten.", lead: "Gebouwd voor zelfstandige autobedrijven. Staat je vraag er niet bij?", contact: "Neem gerust contact met ons op" },
  },
  en: {
    metaTitle: "VINVARO: the operating system for automotive businesses",
    news: "New",
    heroTitle: "Every vehicle. Every detail.",
    heroAccent: "Under control.",
    heroLead: "VINVARO brings stock, customers and operations together in one workspace. From registration and intake to test drive, contract, listing and delivery.",
    bookDemo: "Book a demo",
    seeHow: "See how it works",
    worksWith: "Works with",
    contrast: {
      eyebrow: "From scattered tools to one workspace",
      title: "You don't need another spreadsheet.",
      accent: "You need overview.",
      beforeTitle: "Without VINVARO",
      before: ["Stock in Excel", "Customer questions across five WhatsApp phones", "Intake on paper, photos in a camera roll", "Updating listings site by site", "Printing and scanning contracts", "Nobody knows who has the next step"],
      after: ["One dossier per vehicle, with RDW data", "One shared inbox with AI labels", "Fixed workflows with photos and findings", "Publish straight from the dossier", "Sign digitally via a link", "Tasks and stages that guard"],
    },
    journey: {
      eyebrow: "From intake to delivery",
      title: "One vehicle. Five stages. Nothing falls through.",
      lead: "Every car moves through your stages with fixed workflows. A stage only moves on once the required steps are done; deviations become findings and tasks.",
    },
    splits: {
      inventory: { eyebrow: "Inventory & dossier", title: "Registration in. Dossier complete.", lead: "Make, model, MOT and odometer verdict from the RDW. Photos, documents, costs and history in one dossier, from purchase to delivery.", cta: "Explore inventory & dossier", href: "/platform/voorraad" },
      studio: { eyebrow: "Photo studio", title: "From lot photo to studio shot. In one click.", lead: "Remove the background, place the car in a bright studio, retouch with AI and cover the licence plate with a blank plate or your logo. Right in the dossier, with the original kept.", cta: "Explore the Photo studio", href: "/platform/fotostudio" },
      intake: { eyebrow: "Intake & delivery", title: "Deviation found. Finding created.", lead: "Checklists your team completes on their phone. Expected and found don't match? A finding is created automatically, and a task when needed.", cta: "Explore workflows", href: "/platform/intake-en-aflevering" },
      inbox: { eyebrow: "Shared inbox", title: "Every customer question in one inbox. With the car attached.", lead: "WhatsApp Business, Gmail and Outlook together. AI labels every message, adds a lead score and suggests a reply in your tone.", cta: "Explore the inbox", href: "/platform/inbox" },
      publish: { eyebrow: "Publishing", title: "Enter once. Online everywhere.", lead: "Publish to mobile.de and AutoScout24 and show your stock on your own website. New price or sold? Everything is updated.", cta: "Explore publishing", href: "/platform/publiceren" },
    },
    intelligence: {
      eyebrow: "VINVARO Intelligence",
      title: "Evidence, not assumptions.",
      lead: "AI that helps you check, not AI that decides. VINVARO reads documents, flags deviations and scores leads. Every suggestion shows where it came from; your team confirms.",
      points: ["Possible scratch? Review the original photo.", "Purchase invoice read, data suggested.", "AI suggestions stay separate from what's been confirmed."],
      cta: "Explore AI & findings",
    },
    app: {
      eyebrow: "Staff app for iOS and Android",
      title: "Capture where the work happens.",
      accent: "Even without signal.",
      lead: "Your team takes photos, completes workflows and answers customers from their phone. Without a connection, everything is saved and sent later.",
      points: ["Offline photos and workflow answers", "Camera straight into the right step", "Push notifications for tasks and messages", "Permissions per role, just like on the web"],
      cta: "Explore the staff app",
    },
    modules: {
      eyebrow: "One platform, one plan",
      title: "Everything an automotive business runs on.",
      lead: "Every module is part of one plan at €199 per month. They work together on the same vehicle dossier, with the same roles, the same history and the same audit log.",
      all: "Platform overview",
      view: "View",
    },
    integrations: {
      eyebrow: "Integrations",
      title: "Connected to what you already use.",
      lead: "RDW, marketplaces, your mailbox, WhatsApp and your calendar. Live integrations work today; planned ones are clearly marked as planned.",
      cta: "All integrations",
    },
    security: {
      eyebrow: "Secure & traceable",
      title: "Your data stays yours.",
      lead: "Strictly scoped per organisation, with roles, permissions and an audit log that shows who did what and when.",
    },
    faq: { eyebrow: "Frequently asked questions", title: "Good to know.", lead: "Built for independent automotive businesses. Question not listed?", contact: "Feel free to get in touch" },
  },
});

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLang();
  const { site } = getContent(lang);
  return pageMetadata({ lang, path: "/", title: copy[lang].metaTitle, description: site.description });
}

const worksWith: { name: string; slug?: string; channel?: "whatsapp" | "gmail" | "outlook" }[] = [
  { name: "RDW", slug: "rdw" },
  { name: "mobile.de", slug: "mobilede" },
  { name: "AutoScout24", slug: "autoscout24" },
  { name: "WhatsApp", channel: "whatsapp" },
  { name: "Gmail", channel: "gmail" },
  { name: "Outlook", channel: "outlook" },
  { name: "Google Agenda", slug: "gcal" },
  { name: "KVK", slug: "kvk" },
]

export default async function Home() {
  const lang = await getLang();
  const { faq, platform, securityControls, site } = getContent(lang);
  const t = copy[lang];
  const points = (slug: string) => platform.find((p) => p.slug === slug)?.points ?? [];
  return (
    <>
      <JsonLd data={[softwareApplicationLd(lang), faqLd(faq, lang)]} />

      <section className="relative overflow-hidden pt-28 sm:pt-32">
        <div className="bg-grid mask-fade-b pointer-events-none absolute inset-x-0 top-0 h-[780px]" />
        <div className="pointer-events-none absolute top-[360px] left-1/2 h-[520px] w-[1100px] -translate-x-1/2 rounded-full bg-brand/[0.08] blur-3xl" />
        <div className="pointer-events-none absolute top-[560px] left-[15%] h-[300px] w-[420px] rounded-full bg-ask-400/[0.07] blur-3xl" />
        <Container className="relative">
          <div className="mx-auto max-w-[920px] animate-rise text-center">
            <Link
              href={site.news.href}
              className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full bg-surface py-1 pr-3 pl-1 text-[13px] text-ink-2 shadow-card transition-colors hover:text-ink"
            >
              <span className="rounded-full bg-brand-50 px-2 py-0.5 font-mono text-[11px] font-medium tracking-[0.06em] text-brand uppercase">{t.news}</span>
              {site.news.label}
              <ArrowRight className="size-3.5" />
            </Link>
            <h1 className="text-display text-balance">
              {t.heroTitle}
              <br />
              <span className="bg-gradient-to-r from-brand via-brand-400 to-ask-400 bg-clip-text text-transparent">{t.heroAccent}</span>
            </h1>
            <p className="text-lead mx-auto mt-6 max-w-[640px] text-muted text-pretty">{t.heroLead}</p>
            <div className="mx-auto mt-8 flex max-w-sm flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-center">
              <Button href="/demo" size="lg" arrow>
                {t.bookDemo}
              </Button>
              <Button href="#hoe-het-werkt" size="lg" variant="secondary">
                {t.seeHow}
              </Button>
            </div>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[13px] text-muted">
              <span>{t.worksWith}</span>
              {worksWith.map((w) => (
                <span key={w.name} className="inline-flex items-center gap-1.5 font-medium text-ink-2">
                  <IntegrationLogo slug={w.slug} channel={w.channel} className="size-6 rounded-[7px]" size={14} />
                  {w.name}
                </span>
              ))}
            </div>
          </div>

          <div className="relative mx-auto mt-12 max-w-[1100px] animate-rise [animation-delay:150ms] sm:mt-14">
            <HeroWorkspace />
          </div>
        </Container>
        <Container className="mt-20 sm:mt-24">
          <Reveal>
            <BrandMarquee />
          </Reveal>
        </Container>
      </section>

      <section className="py-28 sm:py-36">
        <Container>
          <Reveal>
            <SectionHeader
              eyebrow={t.contrast.eyebrow}
              title={
                <>
                  {t.contrast.title}
                  <br />
                  <span className="text-muted">{t.contrast.accent}</span>
                </>
              }
            />
          </Reveal>
          <Reveal delay={0.1} className="mt-14 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-dashed border-line-strong p-7 sm:p-9">
              <p className="mb-6 text-[14px] font-medium text-muted">{t.contrast.beforeTitle}</p>
              <ul className="space-y-3.5">
                {t.contrast.before.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-[15px] text-muted">
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-sunken ring-1 ring-line">
                      <Minus className="size-3.5 text-subtle" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative rounded-2xl bg-surface p-7 shadow-card sm:p-9">
              <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-brand to-transparent" />
              <p className="mb-6 text-[14px] font-semibold tracking-[0.04em] text-brand">VINVARO</p>
              <ul className="space-y-3.5">
                {t.contrast.after.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-[15px] font-medium">
                    <IconTile text={item} size="sm" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </Container>
      </section>

      <section id="hoe-het-werkt" className="scroll-mt-20 border-y border-line bg-surface py-28 sm:py-36">
        <Container>
          <Reveal>
            <SectionHeader align="center" eyebrow={t.journey.eyebrow} title={t.journey.title} lead={t.journey.lead} />
          </Reveal>
          <Reveal delay={0.1} className="mx-auto mt-16 max-w-[1040px]">
            <VehicleJourney />
          </Reveal>
          <Reveal delay={0.1} className="mx-auto mt-16 max-w-[1100px]">
            <div className="bg-stage rounded-[26px] p-3 sm:p-6">
              <PipelineBoard />
            </div>
          </Reveal>
        </Container>
      </section>

      <FeatureSplit {...t.splits.inventory} points={points("voorraad")} visual={<VehicleDossier />} />
      <FeatureSplit reverse {...t.splits.intake} points={points("intake-en-aflevering")} visual={<WorkflowRun />} />
      <FeatureSplit {...t.splits.studio} points={points("fotostudio")} visual={<PhotoStudio />} />
      <FeatureSplit reverse {...t.splits.inbox} points={points("inbox")} visual={<InboxView />} />
      <FeatureSplit {...t.splits.publish} points={points("publiceren")} visual={<PublishFlow />} />

      <section className="bg-obsidian-glow relative overflow-hidden py-28 text-white sm:py-36">
        <div className="bg-grid-dark mask-fade-b pointer-events-none absolute inset-0" />
        <Container className="relative">
          <div className="grid items-center gap-14 lg:grid-cols-[0.85fr_1.15fr]">
            <Reveal>
              <div className="relative">
                <div className="relative aspect-[4/5] max-h-[560px] overflow-hidden rounded-[26px] ring-1 ring-white/10">
                  <Image src="/photos/showroom.webp" alt="" fill sizes="(min-width: 1024px) 460px, 100vw" quality={90} className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/20 to-transparent" />
                  <div className="absolute inset-x-6 bottom-6">
                    <Eyebrow tone="light">{t.intelligence.eyebrow}</Eyebrow>
                    <h2 className="text-h2 mt-4 text-white">{t.intelligence.title}</h2>
                  </div>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-lead max-w-[560px] text-white/65">{t.intelligence.lead}</p>
              <ul className="mt-7 space-y-3">
                {t.intelligence.points.map((p) => (
                  <CheckItem key={p} tone="dark" className="text-white/85">
                    {p}
                  </CheckItem>
                ))}
              </ul>
              <div className="mt-9">
                <IntelligenceScan dark />
              </div>
              <Button href="/platform/intelligence" variant="light" arrow className="mt-9">
                {t.intelligence.cta}
              </Button>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="py-28 sm:py-36">
        <Container>
          <div className="grid items-center gap-14 lg:grid-cols-[1fr_1.1fr]">
            <Reveal>
              <SectionHeader
                eyebrow={t.app.eyebrow}
                title={
                  <>
                    {t.app.title}
                    <br />
                    <span className="text-muted">{t.app.accent}</span>
                  </>
                }
                lead={t.app.lead}
              />
              <ul className="mt-8 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                {t.app.points.map((p) => (
                  <li key={p} className="flex items-center gap-3 text-[14.5px] text-ink-2">
                    <IconTile text={p} size="sm" /> {p}
                  </li>
                ))}
              </ul>
              <Button href="/platform/team-app" variant="secondary" size="lg" arrow className="mt-9">
                {t.app.cta}
              </Button>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="bg-stage relative flex h-[580px] items-end justify-center overflow-hidden rounded-[28px] px-4 pt-10">
                <div className="absolute bottom-[-40px] left-1/2 hidden origin-bottom -translate-x-[136%] scale-[0.86] rotate-[-7deg] sm:block">
                  <MobileCapture />
                </div>
                <div className="relative z-10 mb-[-40px]">
                  <MobileDashboard />
                </div>
                <div className="absolute bottom-[-40px] left-1/2 hidden origin-bottom translate-x-[36%] scale-[0.86] rotate-[7deg] sm:block">
                  <MobileReview />
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="border-y border-line bg-surface py-28 sm:py-36">
        <Container>
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <Reveal>
              <SectionHeader eyebrow={t.modules.eyebrow} title={t.modules.title} lead={t.modules.lead} />
            </Reveal>
            <Button href="/platform" variant="secondary" arrow>
              {t.modules.all}
            </Button>
          </div>
          <div className="mt-14 grid gap-px overflow-hidden rounded-2xl bg-line shadow-card sm:grid-cols-2 lg:grid-cols-3">
            {platform.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 3) * 0.05} className="bg-surface">
                <Link href={`/platform/${p.slug}`} className="group flex h-full flex-col p-7 transition-colors hover:bg-canvas">
                  <div className="flex items-center justify-between">
                    <IconTile text={p.name} hint={p.title} size="lg" />
                    <span className="font-mono text-[11px] text-subtle">{p.module}</span>
                  </div>
                  <p className="mt-6 text-[17px] font-semibold tracking-[-0.02em]">{p.name}</p>
                  <p className="mt-1.5 text-[14px] leading-relaxed text-muted">{p.title}</p>
                  <span className="mt-auto inline-flex items-center gap-1 pt-6 text-[13.5px] font-medium text-muted group-hover:text-brand">
                    {t.modules.view} <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-28 sm:py-36">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[0.7fr_1.3fr]">
            <Reveal>
              <SectionHeader eyebrow={t.integrations.eyebrow} title={t.integrations.title} lead={t.integrations.lead} />
              <Button href="/integraties" variant="secondary" arrow className="mt-9">
                {t.integrations.cta}
              </Button>
            </Reveal>
            <Reveal delay={0.1}>
              <IntegrationWall />
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="border-y border-line bg-surface py-28 sm:py-36">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
            <Reveal>
              <SectionHeader eyebrow={t.security.eyebrow} title={t.security.title} lead={t.security.lead} />
            </Reveal>
            <Reveal delay={0.1}>
              <div className="grid gap-px overflow-hidden rounded-2xl bg-line shadow-card sm:grid-cols-2">
                {securityControls.map((c) => (
                  <div key={c.title} className="bg-surface p-6">
                    <IconTile text={c.title} hint={c.body} tone="ok" size="sm" />
                    <h3 className="mt-4 text-[15px] font-semibold tracking-[-0.015em]">{c.title}</h3>
                    <p className="mt-1.5 text-[14px] leading-relaxed text-muted">{c.body}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="py-28 sm:py-36">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr]">
            <Reveal>
              <SectionHeader eyebrow={t.faq.eyebrow} title={t.faq.title} lead={t.faq.lead} />
              <div className="mt-8 space-y-4">
                <p className="text-[14px] font-medium">{t.faq.contact}</p>
                <ContactStrip stacked />
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <FAQ items={faq} />
            </Reveal>
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  );
}

function FeatureSplit({
  eyebrow,
  title,
  lead,
  cta,
  href,
  points,
  visual,
  reverse,
}: {
  eyebrow: string;
  title: string;
  lead: string;
  cta: string;
  href: string;
  points: { title: string; body: string }[];
  visual: React.ReactNode;
  reverse?: boolean;
}) {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <div className={clsx("grid items-center gap-12 lg:gap-16", reverse ? "lg:grid-cols-[1.25fr_0.75fr]" : "lg:grid-cols-[0.75fr_1.25fr]")}>
          <Reveal className={reverse ? "lg:order-2" : undefined}>
            <SectionHeader eyebrow={eyebrow} title={title} lead={lead} />
            <ul className="mt-8 space-y-4">
              {points.slice(0, 3).map((p) => (
                <li key={p.title} className="flex items-start gap-3.5">
                  <IconTile text={p.title} hint={p.body} size="sm" />
                  <span>
                    <span className="block text-[14.5px] font-medium text-ink">{p.title}</span>
                    <span className="mt-0.5 block text-[13.5px] leading-relaxed text-muted">{p.body}</span>
                  </span>
                </li>
              ))}
            </ul>
            <Button href={href} variant="secondary" arrow className="mt-9">
              {cta}
            </Button>
          </Reveal>
          <Reveal delay={0.1} className={reverse ? "lg:order-1" : undefined}>
            <div className="bg-stage rounded-[24px] p-3 sm:p-6">{visual}</div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
