import type { Metadata } from "next";
import clsx from "clsx";
import { defineCopy } from "@/lib/i18n";
import { getLang } from "@/lib/i18n-server";
import { pageMetadata } from "@/lib/seo";
import { JsonLd, breadcrumbLd, faqLd, softwareApplicationLd } from "@/components/json-ld";
import { Button, Container, Eyebrow, SectionHeader } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { CheckItem } from "@/components/icons";
import { FAQ } from "@/components/faq";
import { CTASection, FeatureList, PageHero } from "@/components/sections";
import { StoreBadges } from "@/components/store-badges";
import { AgentApproval, AgentChat, AgentCommands, AgentMark, AgentSecurity, AgentSelection, AgentVoiceFiles } from "@/components/product/agent";

const copy = defineCopy({
  nl: {
    metaTitle: "VINVARO Agent: vraag het in gewone taal",
    metaDescription:
      "De VINVARO Agent voert je vragen en opdrachten in gewone taal uit: auto's aanmaken met RDW-gegevens, prijzen en fases wijzigen, publiceren, contracten en facturen, workflows en rapportages. Risicovolle acties vraagt hij eerst aan je.",
    ogTitle: "Vraag het in gewone taal. De agent regelt het.",
    eyebrow: "VINVARO Agent",
    title: "Zeg wat er moet gebeuren. De agent regelt het.",
    lead: "Typ of spreek een vraag of opdracht in, in gewone taal. De agent zoekt, rapporteert en voert uit in heel VINVARO, met precies de rechten die jij hebt. Risicovolle acties vraagt hij eerst aan je, en alles wat hij doet staat in het auditlog.",
    demo: "Plan een demo",
    examplesCta: "Bekijk voorbeelden",
    examples: {
      eyebrow: "Voorbeelden",
      title: "Vraag het zoals je het een collega zou vragen.",
      lead: "Geen menu's zoeken of filters bouwen. Een paar opdrachten die dealers elke dag geven:",
      prompts: [
        "Welke auto's staan langer dan 60 dagen op voorraad?",
        "Maak een nieuwe auto aan met kenteken XV-365-V",
        "Zet alle auto's in fase Werkplaats op de marktplaats",
        "Maak een factuur voor Jan de Vries",
        "Welke facturen zijn verlopen? Stuur een herinnering",
        "Geef me het financieel overzicht van deze maand",
        "Wat staat er vandaag open aan taken en workflows?",
        "Plan een proefrit met de Golf voor morgen om 11:00",
        "Koppel de betaling van € 1.250 aan de juiste factuur",
        "Start de afleverworkflow voor de XC40 en wijs hem toe aan Mark",
      ],
    },
    can: {
      eyebrow: "Wat de agent kan",
      title: "Alles wat jij mag in VINVARO. In één zin.",
      items: [
        { title: "Voorraad & kenteken", body: "Auto's aanmaken vanaf een kenteken met RDW-gegevens. Prijzen, status en fases wijzigen, ook voor veel auto's tegelijk." },
        { title: "Publiceren", body: "Auto's online of offline zetten op je marktplaatsen, het Handelsplein en de VINVARO Marktplaats." },
        { title: "Contracten & facturen", body: "Maken, uitgeven, versturen, betaald markeren en herinneringen sturen." },
        { title: "Relaties & deals", body: "Relaties en deals aanmaken, bijwerken en opvolgen, met de auto erbij." },
        { title: "Workflows & taken", body: "Workflows starten en taken toewijzen aan je team." },
        { title: "Inbox & agenda", body: "Klantberichten beantwoorden en afspraken zoals proefritten plannen." },
        { title: "Bank & financiën", body: "Banktransacties matchen, financiële rapportages en KPI's opvragen." },
        { title: "Instellingen", body: "Instellingen opzoeken en aanpassen, binnen wat jouw rol mag." },
      ],
    },
    blocks: {
      commands: {
        eyebrow: "Gewone taal",
        title: "Een vraag wordt een antwoord. Een opdracht wordt een actie.",
        lead: "De agent begrijpt wat je bedoelt en zoekt de juiste gegevens erbij. Resultaten verschijnen als kaarten in het gesprek, zodat je meteen ziet wat er is gebeurd.",
        points: ["Voertuigkaarten met kenteken en prijs, lijsten met facturen en contracten, KPI-tegels", "Een tijdlijn laat stap voor stap zien wat de agent deed", "Elke kaart opent het record in VINVARO"],
      },
      approval: {
        eyebrow: "Akkoord bij risico",
        title: "Niets onomkeerbaars zonder jouw akkoord.",
        lead: "Uitgeven, versturen, verwijderen, betaald markeren of een bulkactie op meer dan tien records: de agent toont eerst een bevestigingskaart met wat er gaat gebeuren en waarom. Jij kiest Uitvoeren of Annuleren.",
        points: ["Duidelijke kaart met actie, bedrag en gevolg", "Na akkoord voert de agent de stap uit en gaat verder", "Geannuleerd is geannuleerd: er verandert niets"],
      },
      voice: {
        eyebrow: "Inspreken & bijlagen",
        title: "Praat het in. Sleep het erin.",
        lead: "Druk op de microfoon en spreek je opdracht in; de agent schrijft live mee. Sleep tot 60 foto's, video's en pdf's in het gesprek, zoals het kentekenbewijs en de inkoopfactuur, en zeg wat ermee moet. De agent leest de documenten, maakt de auto aan en zet alle foto's in de galerij.",
        points: ["Live uitgeschreven terwijl je praat", "Tot 60 bestanden per bericht: foto's, video's, pdf's, csv en Excel", "Documenten gelezen, gegevens ingevuld, foto's in de galerij"],
      },
      selection: {
        eyebrow: "Vraag de agent",
        title: "Selecteer in een tabel. Vraag de agent.",
        lead: "Selecteer rijen bij voertuigen, facturen, relaties of contracten en kies Vraag de agent. De selectie gaat mee als context, zodat je opdracht precies over die records gaat.",
        points: ["Werkt in de tabellen voor voertuigen, facturen, relaties en contracten", "De selectie staat zichtbaar in het gesprek", "Bulkacties op meer dan tien records vragen eerst akkoord"],
      },
      security: {
        eyebrow: "Veilig & herleidbaar",
        title: "Dezelfde rechten als jij. Elke actie gelogd.",
        lead: "De agent werkt namens de ingelogde gebruiker en kan nooit meer dan jouw rol toestaat. Wat hij doet, komt in het auditlog, met wie en wanneer.",
        points: [
          "Rollen en rechten gelden ook voor de agent",
          "Elke actie in het auditlog, namens wie hij werkte",
          "Strikt per organisatie afgeschermd",
          "Je gegevens worden niet gebruikt om publieke AI-modellen te trainen",
          "Opslag zoveel mogelijk binnen de Europese Economische Ruimte",
        ],
      },
    },
    app: {
      title: "Ook in de VINVARO-app.",
      body: "Stel je vraag of geef een opdracht vanaf je telefoon, op het terrein of in de showroom.",
    },
    faq: {
      eyebrow: "Veelgestelde vragen",
      title: "Vragen over de agent",
      items: [
        { q: "Wat kan de agent wel en niet?", a: "De agent kan alles wat jij in VINVARO mag: auto's aanmaken en wijzigen, publiceren, contracten en facturen, relaties en deals, workflows en taken, de inbox, afspraken, bankmatching, rapportages en instellingen. Wat jouw rol niet toestaat, kan de agent ook niet." },
        { q: "Voert de agent zomaar acties uit?", a: "Nee. Bij risicovolle acties, zoals uitgeven, versturen, verwijderen, betaald markeren of een bulkactie op meer dan tien records, toont de agent eerst een bevestigingskaart. Pas als jij op Uitvoeren klikt, gaat hij verder." },
        { q: "Kan de agent fouten maken?", a: "Ja, zoals elke AI. Daarom zie je bij elke opdracht een tijdlijn van de stappen, vraagt de agent akkoord bij risicovolle acties en staat alles in het auditlog. Controleer belangrijke wijzigingen." },
        { q: "Welke bestanden kan ik toevoegen?", a: "Tot 60 bestanden per bericht: foto's, video's, pdf's, csv- en Excel-bestanden. Sleep bijvoorbeeld het kentekenbewijs, de inkoopfactuur en alle foto's van een auto in het gesprek en zeg wat ermee moet." },
        { q: "Kan ik ook inspreken?", a: "Ja. Druk op de microfoon en spreek je vraag of opdracht in. De agent schrijft mee en je controleert de tekst voordat je verstuurt." },
      ],
    },
    ctaTitle: "Zie de agent werken met jouw voorraad.",
    ctaLead: "In 30 minuten laten we zien hoe de agent je voorraad, facturen en workflows bedient, met jouw rollen en werkwijze.",
  },
  en: {
    metaTitle: "VINVARO Agent: ask in plain language",
    metaDescription:
      "The VINVARO Agent carries out your questions and instructions in plain language: create cars with RDW data, change prices and stages, publish, contracts and invoices, workflows and reports. It asks you first before risky actions.",
    ogTitle: "Ask in plain language. The agent takes care of it.",
    eyebrow: "VINVARO Agent",
    title: "Say what needs doing. The agent takes care of it.",
    lead: "Type or dictate a question or instruction in plain language. The agent searches, reports and acts across VINVARO, with exactly the permissions you have. It asks you first before risky actions, and everything it does is in the audit log.",
    demo: "Book a demo",
    examplesCta: "See examples",
    examples: {
      eyebrow: "Examples",
      title: "Ask the way you'd ask a colleague.",
      lead: "No hunting through menus or building filters. A few instructions dealers give every day:",
      prompts: [
        "Which cars have been in stock for more than 60 days?",
        "Create a new car with registration XV-365-V",
        "Put all cars in the workshop stage on the marketplace",
        "Create an invoice for Jan de Vries",
        "Which invoices are overdue? Send a reminder",
        "Give me this month's financial overview",
        "What tasks and workflows are open today?",
        "Schedule a test drive in the Golf for tomorrow at 11:00",
        "Match the €1,250 payment to the right invoice",
        "Start the delivery workflow for the XC40 and assign it to Mark",
      ],
    },
    can: {
      eyebrow: "What the agent can do",
      title: "Everything you may do in VINVARO. In one sentence.",
      items: [
        { title: "Stock & registration", body: "Create cars from a registration with RDW data. Change prices, status and stages, for many cars at once too." },
        { title: "Publishing", body: "Put cars online or offline on your marketplaces, the Trade network and the VINVARO Marketplace." },
        { title: "Contracts & invoices", body: "Create, issue, send, mark as paid and send reminders." },
        { title: "Contacts & deals", body: "Create, update and follow up contacts and deals, with the car attached." },
        { title: "Workflows & tasks", body: "Start workflows and assign tasks to your team." },
        { title: "Inbox & calendar", body: "Reply to customer messages and schedule appointments such as test drives." },
        { title: "Bank & finance", body: "Match bank transactions, request financial reports and KPIs." },
        { title: "Settings", body: "Look up and change settings, within what your role allows." },
      ],
    },
    blocks: {
      commands: {
        eyebrow: "Plain language",
        title: "A question becomes an answer. An instruction becomes an action.",
        lead: "The agent understands what you mean and finds the right data. Results appear as cards in the conversation, so you see straight away what happened.",
        points: ["Vehicle cards with registration and price, lists of invoices and contracts, KPI tiles", "A timeline shows step by step what the agent did", "Every card opens the record in VINVARO"],
      },
      approval: {
        eyebrow: "Approval for risky actions",
        title: "Nothing irreversible without your approval.",
        lead: "Issuing, sending, deleting, marking as paid or a bulk action on more than ten records: the agent first shows a confirmation card with what will happen and why. You choose Run or Cancel.",
        points: ["A clear card with the action, amount and consequence", "After approval the agent runs the step and carries on", "Cancelled means cancelled: nothing changes"],
      },
      voice: {
        eyebrow: "Dictation & attachments",
        title: "Say it. Drop it in.",
        lead: "Press the microphone and dictate your instruction; the agent transcribes live. Drop up to 60 photos, videos and PDFs into the conversation, such as the registration document and the purchase invoice, and say what to do. The agent reads the documents, creates the car and puts every photo in the gallery.",
        points: ["Transcribed live while you speak", "Up to 60 files per message: photos, videos, PDFs, CSV and Excel", "Documents read, data filled in, photos in the gallery"],
      },
      selection: {
        eyebrow: "Ask the agent",
        title: "Select in a table. Ask the agent.",
        lead: "Select rows in vehicles, invoices, contacts or contracts and choose Ask the agent. The selection comes along as context, so your instruction is about exactly those records.",
        points: ["Works in the vehicle, invoice, contact and contract tables", "The selection is visible in the conversation", "Bulk actions on more than ten records ask for approval first"],
      },
      security: {
        eyebrow: "Secure & traceable",
        title: "The same permissions as you. Every action logged.",
        lead: "The agent works on behalf of the signed-in user and can never do more than your role allows. What it does goes into the audit log, with who and when.",
        points: [
          "Roles and permissions apply to the agent too",
          "Every action in the audit log, with who it acted for",
          "Strictly scoped per organisation",
          "Your data is not used to train public AI models",
          "Stored within the European Economic Area wherever possible",
        ],
      },
    },
    app: {
      title: "In the VINVARO app too.",
      body: "Ask a question or give an instruction from your phone, on the lot or in the showroom.",
    },
    faq: {
      eyebrow: "FAQ",
      title: "Questions about the agent",
      items: [
        { q: "What can the agent do, and what not?", a: "The agent can do everything you may do in VINVARO: create and edit cars, publish, contracts and invoices, contacts and deals, workflows and tasks, the inbox, appointments, bank matching, reports and settings. What your role doesn't allow, the agent can't do either." },
        { q: "Does the agent just go ahead with actions?", a: "No. For risky actions, such as issuing, sending, deleting, marking as paid or a bulk action on more than ten records, the agent first shows a confirmation card. Only when you click Run does it continue." },
        { q: "Can the agent make mistakes?", a: "Yes, like any AI. That's why every instruction shows a timeline of its steps, the agent asks for approval before risky actions and everything is in the audit log. Check important changes." },
        { q: "Which files can I attach?", a: "Up to 60 files per message: photos, videos, PDFs, CSV and Excel files. For example, drop the registration document, the purchase invoice and all photos of a car into the conversation and say what to do." },
        { q: "Can I dictate?", a: "Yes. Press the microphone and dictate your question or instruction. The agent transcribes and you check the text before sending." },
      ],
    },
    ctaTitle: "See the agent work with your stock.",
    ctaLead: "In 30 minutes we show you how the agent runs your stock, invoices and workflows, with your roles and way of working.",
  },
});

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLang();
  const t = copy[lang];
  return pageMetadata({ lang, path: "/agent", title: t.metaTitle, description: t.metaDescription, og: { kicker: "VINVARO Agent", title: t.ogTitle } });
}

export default async function AgentPage() {
  const lang = await getLang();
  const t = copy[lang];
  const b = t.blocks;
  return (
    <>
      <JsonLd data={[softwareApplicationLd(lang), breadcrumbLd(lang, [{ name: "Agent", path: "/agent" }]), faqLd(t.faq.items, lang)]} />
      <PageHero eyebrow={t.eyebrow} title={t.title} lead={t.lead}>
        <Button href="/demo" size="lg" arrow>
          {t.demo}
        </Button>
        <Button href="#voorbeelden" size="lg" variant="secondary">
          {t.examplesCta}
        </Button>
      </PageHero>

      <section className="pb-20 sm:pb-24">
        <Container>
          <Reveal y={28}>
            <div className="bg-stage mx-auto max-w-[1080px] rounded-[26px] p-3 sm:p-8">
              <AgentChat />
            </div>
          </Reveal>
        </Container>
      </section>

      <section id="voorbeelden" className="scroll-mt-20 border-y border-line bg-surface py-20 sm:py-28">
        <Container>
          <Reveal>
            <SectionHeader align="center" eyebrow={t.examples.eyebrow} title={t.examples.title} lead={t.examples.lead} />
          </Reveal>
          <Reveal delay={0.1}>
            <ul className="mx-auto mt-12 flex max-w-[960px] flex-wrap justify-center gap-2.5">
              {t.examples.prompts.map((p) => (
                <li key={p} className="inline-flex items-center gap-2 rounded-full bg-canvas py-1.5 pr-4 pl-1.5 text-[14px] text-ink-2 ring-1 ring-line transition-colors hover:bg-surface hover:text-ink hover:shadow-card">
                  <AgentMark size="sm" ring="ring-canvas" />
                  {p}
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </section>

      <AgentBlock {...b.commands} visual={<AgentCommands />} />
      <AgentBlock reverse {...b.approval} visual={<AgentApproval />} />
      <AgentBlock {...b.voice} wide visual={<AgentVoiceFiles />} />
      <AgentBlock reverse {...b.selection} wide visual={<AgentSelection />} />

      <section className="bg-obsidian-glow relative overflow-hidden py-24 text-white sm:py-32">
        <div className="bg-grid-dark mask-fade-b pointer-events-none absolute inset-0" />
        <Container className="relative">
          <div className="grid items-center gap-14 lg:grid-cols-[0.8fr_1.2fr]">
            <Reveal>
              <SectionHeader tone="dark" eyebrow={b.security.eyebrow} title={b.security.title} lead={b.security.lead} />
              <ul className="mt-8 space-y-3">
                {b.security.points.map((p) => (
                  <CheckItem key={p} tone="dark" className="text-white/85">
                    {p}
                  </CheckItem>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.1}>
              <AgentSecurity />
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container>
          <Reveal>
            <SectionHeader eyebrow={t.can.eyebrow} title={t.can.title} className="mb-12" />
            <FeatureList items={t.can.items} columns={4} />
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-16 flex flex-col items-start justify-between gap-6 rounded-2xl bg-surface p-6 shadow-card sm:flex-row sm:items-center sm:p-8">
              <div className="flex items-center gap-4">
                <AgentMark size="md" />
                <div>
                  <p className="text-[17px] font-semibold tracking-[-0.02em]">{t.app.title}</p>
                  <p className="mt-1 text-[14px] text-muted">{t.app.body}</p>
                </div>
              </div>
              <StoreBadges lang={lang} />
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="border-t border-line bg-surface py-20 sm:py-24">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.6fr]">
          <SectionHeader eyebrow={t.faq.eyebrow} title={t.faq.title} />
          <FAQ items={t.faq.items} />
        </Container>
      </section>

      <CTASection title={t.ctaTitle} lead={t.ctaLead} />
    </>
  );
}

function AgentBlock({
  eyebrow,
  title,
  lead,
  points,
  visual,
  reverse,
  wide,
}: {
  eyebrow: string;
  title: string;
  lead: string;
  points: string[];
  visual: React.ReactNode;
  reverse?: boolean;
  wide?: boolean;
}) {
  const columns = wide ? (reverse ? "lg:grid-cols-[1.3fr_0.7fr]" : "lg:grid-cols-[0.7fr_1.3fr]") : reverse ? "lg:grid-cols-[1.1fr_0.9fr]" : "lg:grid-cols-[0.9fr_1.1fr]";
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <div className={clsx("grid items-center gap-12 lg:gap-16", columns)}>
          <Reveal className={reverse ? "lg:order-2" : undefined}>
            <Eyebrow className="mb-5">{eyebrow}</Eyebrow>
            <h2 className="text-h2 text-balance">{title}</h2>
            <p className="text-lead mt-5 text-muted text-pretty">{lead}</p>
            <ul className="mt-8 space-y-3">
              {points.map((p) => (
                <CheckItem key={p}>{p}</CheckItem>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1} className={reverse ? "lg:order-1" : undefined}>
            <div className="bg-stage rounded-[24px] p-3 sm:p-6">{visual}</div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
