"use client";

import { useState, type ReactNode } from "react";
import { AnimatePresence } from "motion/react";
import { ChannelLogo } from "@/components/channel-logo";
import { DashboardScreen, PipelineBoard } from "@/components/product/hero";
import { VehicleDossier } from "@/components/product/ops";
import { ContractSign, InboxView, PublishFlow } from "@/components/product/sales";
import { PhotoStudio } from "@/components/product/studio";
import { motion } from "./animation";
import { useT } from "./lang";
import { Slide } from "./slide";
import { Arrow, Fit, Heading, Lead, Tick, ease, logo, useOnScreen } from "./ui";

type Tab = { id: string; label: string; title: string; desc: string; visual: ReactNode; width: number; features: string[]; logos?: ReactNode[]; href: string };

export function DashboardSlide() {
  const t = useT();
  const [ref, on] = useOnScreen<HTMLDivElement>();
  const [activeId, setActiveId] = useState("dashboard");

  const img = (slug: string) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img key={slug} src={logo(slug)} alt="" className="h-5 w-5 rounded-[4px] object-contain" />
  );

  const tabs: Tab[] = [
    {
      id: "dashboard",
      label: t("Overzicht", "Overview"),
      title: t("Je bedrijf, in één oogopslag", "Your business, at a glance"),
      desc: t(
        "Voorraadwaarde, marge, openstaande facturen en de volgende acties voor je team. Iedereen begint de dag op hetzelfde scherm.",
        "Stock value, margin, outstanding invoices and the next actions for your team. Everyone starts the day on the same screen.",
      ),
      visual: <DashboardScreen />,
      width: 1100,
      features: [t("Voorraad en voorraadwaarde", "Stock and stock value"), t("Marge en gefactureerd dit jaar", "Margin and invoiced this year"), t("Taken en open bevindingen", "Tasks and open findings")],
      href: "/platform",
    },
    {
      id: "pipeline",
      label: t("Pijplijn", "Pipeline"),
      title: t("Elke auto, elke fase", "Every car, every stage"),
      desc: t(
        "Zie per fase welke auto waar staat, hoe lang al, en welke workflow nog vereist is voordat hij door mag.",
        "See per stage which car is where, for how long, and which workflow is still required before it can move on.",
      ),
      visual: <PipelineBoard />,
      width: 1100,
      features: [t("Je eigen fases", "Your own stages"), t("Verplichte workflows per fase", "Required workflows per stage"), t("Dagen in voorraad per auto", "Days in stock per car")],
      href: "/platform/intake-en-aflevering",
    },
    {
      id: "dossier",
      label: t("Voertuigdossier", "Vehicle dossier"),
      title: t("Eén voertuig, één complete geschiedenis", "One vehicle, one complete history"),
      desc: t(
        "Kenteken in, RDW-gegevens erbij. Foto's, documenten, kosten, workflows en verkoop komen samen in één dossier.",
        "Registration in, RDW data attached. Photos, documents, costs, workflows and sales come together in one dossier.",
      ),
      visual: <VehicleDossier />,
      width: 780,
      features: [t("RDW-gegevens, APK en NAP", "RDW data, MOT and NAP"), t("Foto's, documenten en kosten", "Photos, documents and costs"), t("Marge, btw en BPM per auto", "Margin, VAT and BPM per car")],
      logos: [img("rdw")],
      href: "/platform/voorraad",
    },
    {
      id: "inbox",
      label: "Inbox",
      title: t("Elke klantvraag in één inbox", "Every customer question in one inbox"),
      desc: t(
        "WhatsApp Business, Gmail en Outlook samen. AI labelt elk bericht, geeft een leadscore en stelt een antwoord voor in jouw toon.",
        "WhatsApp Business, Gmail and Outlook together. AI labels every message, adds a lead score and suggests a reply in your tone.",
      ),
      visual: <InboxView />,
      width: 780,
      features: [t("WhatsApp, Gmail, Outlook en eigen mail", "WhatsApp, Gmail, Outlook and own mail"), t("Labels en leadscore met AI", "Labels and lead score with AI"), t("Gesprekken op het dossier", "Conversations on the dossier")],
      logos: (["whatsapp", "gmail", "outlook", "imap"] as const).map((k) => <ChannelLogo key={k} kind={k} size={20} />),
      href: "/platform/inbox",
    },
    {
      id: "contracts",
      label: t("Contracten & facturen", "Contracts & invoices"),
      title: t("Getekend en gefactureerd, zonder printer", "Signed and invoiced, without a printer"),
      desc: t(
        "Contracten uit je eigen sjablonen, digitaal getekend via een link. Facturen en creditnota's met je productcatalogus.",
        "Contracts from your own templates, signed digitally via a link. Invoices and credit notes with your product catalogue.",
      ),
      visual: <ContractSign />,
      width: 760,
      features: [
        t("Contracten uit je eigen sjablonen", "Contracts from your own templates"),
        t("Digitaal ondertekenen via een link", "Sign digitally via a link"),
        t("Btw- of margeregeling per auto", "VAT or margin scheme per car"),
        t("Financiering via Autus Finance", "Financing via Autus Finance"),
        t("Export naar je boekhouding", "Export to your accounting"),
      ],
      logos: [img("autus"), img("autoboeker")],
      href: "/platform/contracten-en-facturen",
    },
    {
      id: "publish",
      label: t("Publiceren", "Publishing"),
      title: t("Eén keer invoeren, overal online", "Enter once, online everywhere"),
      desc: t(
        "Publiceer vanuit het dossier naar mobile.de en AutoScout24 en toon je voorraad op je eigen website. Nieuwe prijs of verkocht? Alles wordt bijgewerkt.",
        "Publish from the dossier to mobile.de and AutoScout24 and show your stock on your own website. New price or sold? Everything is updated.",
      ),
      visual: <PublishFlow />,
      width: 760,
      features: [t("mobile.de, AutoScout24 en AutoTrack", "mobile.de, AutoScout24 and AutoTrack"), t("Prijs en status overal gelijk", "Price and status the same everywhere"), t("Voorraad op je eigen website", "Stock on your own website")],
      logos: [img("mobilede"), img("autoscout24"), img("autotrack")],
      href: "/platform/publiceren",
    },
    {
      id: "studio",
      label: t("Fotostudio", "Photo studio"),
      title: t("Studiofoto's, zonder fotostudio", "Studio shots, without a studio"),
      desc: t(
        "Haal de achtergrond weg, zet de auto in een lichte studio, retoucheer met AI en dek het kenteken af. Het origineel blijft bewaard.",
        "Remove the background, place the car in a bright studio, retouch with AI and cover the plate. The original is kept.",
      ),
      visual: <PhotoStudio />,
      width: 760,
      features: [t("Achtergrond weg of studio-achtergrond", "Remove background or studio background"), t("Kenteken afdekken met je logo", "Cover the plate with your logo"), t("Origineel blijft altijd bewaard", "The original is always kept")],
      href: "/platform/fotostudio",
    },
  ];
  const active = tabs.find((x) => x.id === activeId) ?? tabs[0];

  return (
    <Slide id="dashboard" variant="subtle">
      <div ref={ref}>
        <Heading on={on} center>
          {t("Eén plek voor ", "One place for ")}
          <span className="text-brand">{t("je hele bedrijf", "your whole business")}</span>
        </Heading>
        <Lead on={on} center>
          {t("Voorraad, verkoop, contracten en publicatie in één werkplek die je team vandaag kan gebruiken.", "Stock, sales, contracts and publishing in one workspace your team can use today.")}
        </Lead>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={on ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mx-auto mt-9 flex w-fit flex-wrap justify-center gap-1 rounded-full bg-white p-1 shadow-card"
        >
          {tabs.map((x) => (
            <button
              key={x.id}
              type="button"
              onClick={() => setActiveId(x.id)}
              className={`rounded-full px-4 py-2 text-[13.5px] font-medium transition-colors ${x.id === activeId ? "bg-brand text-white shadow-[0_4px_14px_-4px_rgba(37,99,235,0.6)]" : "text-muted hover:bg-sunken hover:text-ink"}`}
            >
              {x.label}
            </button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease }}
            className="mt-8 grid items-center gap-10 lg:grid-cols-[1.55fr_1fr]"
          >
            <div className="bg-stage rounded-[22px] p-3 shadow-card sm:p-4">
              <Fit width={active.width}>{active.visual}</Fit>
            </div>

            <div>
              <h3 className="text-[26px] leading-[1.15] text-ink">{active.title}</h3>
              <p className="mt-3 text-[15px] leading-[1.6] text-muted">{active.desc}</p>
              <ul className="mt-5">
                {active.features.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 border-t border-line py-2.5 text-[14px] text-ink last:border-b">
                    <Tick />
                    {f}
                  </li>
                ))}
              </ul>
              {active.logos && (
                <div className="mt-5 flex flex-wrap items-center gap-2">
                  {active.logos.map((l, i) => (
                    <span key={i} className="flex h-10 min-w-10 items-center justify-center rounded-xl bg-white px-3 shadow-card">
                      {l}
                    </span>
                  ))}
                </div>
              )}
              <a
                href={`https://vinvaro.com${active.href}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-1.5 text-[14px] font-medium text-ink transition-colors hover:text-brand"
              >
                {t("Meer over ", "More about ")}
                {active.label.toLowerCase()}
                <Arrow className="h-3.5 w-3.5" />
              </a>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </Slide>
  );
}
