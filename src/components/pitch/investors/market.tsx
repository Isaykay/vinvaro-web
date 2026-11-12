"use client";

import type { ReactNode } from "react";
import { Mark } from "@/components/brand-mark";
import { useLang } from "@/components/lang-provider";
import { getContent } from "@/lib/content";
import { motion } from "../animation";
import { HeroVisual } from "../hero";
import { useT } from "../lang";
import { Slide } from "../slide";
import { Card, Check, Chip, Cross, Heading, Label, Lead, ease, useOnScreen } from "../ui";
import { market, type Figure } from "./data";
import { blendedMonthlyCents, euro } from "./model";

const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease } } };

export function Assumption({ figure }: { figure: Figure }) {
  const t = useT();
  return figure.verified ? null : (
    <Chip tone="orange" small>
      {t("aanname", "assumption")}
    </Chip>
  );
}

export function InvestorHero() {
  const t = useT();
  const { platform, integrations } = getContent(useLang());
  const live = integrations.filter((i) => i.status === "live").length;
  const facts = [
    [String(platform.length), t("modules in één plan", "modules in one plan")],
    [String(live), t("live koppelingen", "live integrations")],
    [t("Web + app", "Web + app"), t("iOS en Android, ook offline", "iOS and Android, offline too")],
  ];
  return (
    <section id="hero" className="slide-section relative overflow-hidden bg-white">
      <div
        className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_70%_40%,black_10%,transparent_65%)]"
        style={{
          backgroundImage: "linear-gradient(to right, rgb(11 15 20 / 0.045) 1px, transparent 1px), linear-gradient(to bottom, rgb(11 15 20 / 0.045) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <motion.div
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } } }}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-12 px-6 py-24 lg:grid-cols-[1.05fr_1fr] lg:gap-16"
      >
        <div className="flex flex-col items-start">
          <motion.span variants={fadeUp} className="mb-7 inline-flex items-center gap-2 rounded-full bg-ink py-1.5 pr-4 pl-1.5 text-[13px] font-medium text-white">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10">
              <Mark width={13} />
            </span>
            {t("Vertrouwelijk · investeerderspresentatie", "Confidential · investor presentation")}
          </motion.span>
          <motion.h1 variants={fadeUp} className="text-[clamp(2.5rem,5.2vw,4.5rem)] leading-[1.02] text-ink">
            {t("Het besturingssysteem voor de", "The operating system for the")} <span className="text-brand">{t("autohandel", "car trade")}</span>
          </motion.h1>
          <motion.p variants={fadeUp} className="mt-6 max-w-[540px] text-[clamp(1.0625rem,1.4vw,1.25rem)] leading-[1.55] tracking-[-0.011em] text-muted">
            {t(
              "Autobedrijven draaien op Excel, WhatsApp en losse systemen. VINVARO brengt voorraad, klanten, workflows, contracten en publicatie samen in één werkplek, met een AI-laag en een eigen netwerk tussen dealers.",
              "Dealerships run on Excel, WhatsApp and scattered tools. VINVARO brings stock, customers, workflows, contracts and listings together in one workspace, with an AI layer and its own network between dealers.",
            )}
          </motion.p>
          <motion.div variants={fadeUp} className="mt-9 grid w-full max-w-[540px] grid-cols-3 gap-3">
            {facts.map(([value, label]) => (
              <div key={label} className="rounded-2xl bg-white p-4 shadow-card">
                <p className="text-[22px] leading-tight font-semibold tracking-[-0.03em] text-ink">{value}</p>
                <p className="mt-1 text-[12.5px] leading-snug text-muted">{label}</p>
              </div>
            ))}
          </motion.div>
        </div>
        <HeroVisual />
      </motion.div>
    </section>
  );
}

export function MarketSlide() {
  const t = useT();
  const lang = useLang();
  const [ref, on] = useOnScreen<HTMLDivElement>();
  const arpu = blendedMonthlyCents(lang);
  const arr = (count: number) => euro(lang, count * arpu * 12, true);
  const rings: { key: keyof typeof market; tag: string; r: number; cy: number; fill: string; stroke: string; text: string }[] = [
    { key: "tam", tag: "TAM", r: 155, cy: 170, fill: "#f1f5f9", stroke: "#e2e8f0", text: "#64748b" },
    { key: "sam", tag: "SAM", r: 105, cy: 190, fill: "#dbeafe", stroke: "#bfdbfe", text: "#1d4ed8" },
    { key: "som", tag: "SOM", r: 48, cy: 225, fill: "#2563eb", stroke: "#2563eb", text: "#ffffff" },
  ];
  const cards: { key: keyof typeof market; tag: string; full: string; tone: string }[] = [
    { key: "tam", tag: "TAM", full: "Total addressable market", tone: "bg-sunken text-ink-2 ring-line" },
    { key: "sam", tag: "SAM", full: "Serviceable addressable market", tone: "bg-brand-50 text-brand ring-brand-100" },
    { key: "som", tag: t("SOM · 3 jaar", "SOM · 3 years"), full: "Serviceable obtainable market", tone: "bg-brand text-white ring-brand" },
  ];

  return (
    <Slide id="markt" variant="white">
      <div ref={ref}>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <Heading on={on}>
            {t("Een grote markt die nog ", "A large market still running on ")}
            <span className="text-brand">{t("op Excel draait", "Excel")}</span>
          </Heading>
          <Lead on={on} className="max-w-sm lg:mt-0 lg:pb-1.5 lg:text-right">
            {t(`${market.usedCars.value} occasions per jaar in Nederland, verkocht door duizenden zelfstandige autobedrijven.`, `${market.usedCars.value} used cars a year in the Netherlands, sold by thousands of independent dealerships.`)}
          </Lead>
        </div>

        <div className="mt-12 grid items-center gap-12 md:grid-cols-[1fr_1.05fr]">
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={on ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.8, delay: 0.2, ease }} className="flex justify-center">
            <svg viewBox="0 0 340 340" className="w-full max-w-[460px]">
              {rings.map((ring, i) => (
                <g key={ring.key}>
                  <motion.circle cx="170" cy={ring.cy} fill={ring.fill} stroke={ring.stroke} strokeWidth="1.5" initial={{ r: 0 }} animate={on ? { r: ring.r } : {}} transition={{ duration: 0.7, delay: 0.3 + i * 0.2 }} />
                  <motion.text
                    x="170"
                    y={ring.cy - ring.r + (i === 2 ? 40 : 26)}
                    textAnchor="middle"
                    fill={ring.text}
                    fontSize="12"
                    fontWeight="600"
                    initial={{ opacity: 0 }}
                    animate={on ? { opacity: 1 } : {}}
                    transition={{ delay: 0.8 + i * 0.15 }}
                  >
                    {ring.tag}
                  </motion.text>
                  <motion.text
                    x="170"
                    y={ring.cy - ring.r + (i === 2 ? 56 : 42)}
                    textAnchor="middle"
                    fill={ring.text}
                    opacity={0.8}
                    fontSize="10.5"
                    initial={{ opacity: 0 }}
                    animate={on ? { opacity: 0.85 } : {}}
                    transition={{ delay: 0.9 + i * 0.15 }}
                  >
                    {market[ring.key].value}
                  </motion.text>
                </g>
              ))}
            </svg>
          </motion.div>

          <div className="space-y-3">
            {cards.map((c, i) => {
              const f = market[c.key];
              return (
                <motion.div key={c.key} initial={{ opacity: 0, x: 24 }} animate={on ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5, delay: 0.4 + i * 0.12, ease }}>
                  <Card className="p-4">
                    <div className="flex items-center gap-2.5">
                      <span className={`rounded-md px-2 py-0.5 font-mono text-[10.5px] font-semibold tracking-[0.06em] uppercase ring-1 ${c.tone}`}>{c.tag}</span>
                      <span className="text-[11.5px] text-subtle">{c.full}</span>
                      <span className="ml-auto">
                        <Assumption figure={f} />
                      </span>
                    </div>
                    <div className="mt-2 flex items-baseline gap-2">
                      <span className="text-[26px] leading-none font-semibold tracking-[-0.03em] text-ink">{f.value}</span>
                      <span className="text-[13.5px] text-muted">{t(f.label[0], f.label[1])}</span>
                      <span className="ml-auto font-mono text-[13px] font-semibold text-brand">{arr(f.count)} ARR</span>
                    </div>
                    <p className="mt-1.5 text-[12.5px] text-subtle">{t(f.note[0], f.note[1])}</p>
                  </Card>
                </motion.div>
              );
            })}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={on ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.9, ease }} className="rounded-[18px] bg-ink p-5 text-white">
              <div className="flex items-center justify-between gap-3">
                <Label className="!text-white/50">{t("Europa · upside", "Europe · upside")}</Label>
                <Assumption figure={market.eu} />
              </div>
              <p className="mt-2 flex items-baseline gap-2">
                <span className="text-[26px] leading-none font-semibold tracking-[-0.03em]">{market.eu.value}</span>
                <span className="text-[13.5px] text-white/60">{t(market.eu.label[0], market.eu.label[1])}</span>
                <span className="ml-auto font-mono text-[13px] font-semibold text-brand-300">{arr(market.eu.count)} ARR</span>
              </p>
              <p className="mt-1.5 text-[12.5px] text-white/45">
                {t("ARR berekend met de VINVARO-prijslijst:", "ARR calculated with the VINVARO price list:")} {euro(lang, arpu)} {t("per dealer per maand, gemiddeld over de segmenten.", "per dealer per month, averaged over the segments.")}
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </Slide>
  );
}

type Level = "yes" | "partial" | "no";

function Cell({ level }: { level: Level }) {
  if (level === "yes")
    return (
      <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-ok-50 text-ok ring-1 ring-ok/20">
        <Check className="h-3 w-3" />
      </span>
    );
  if (level === "partial")
    return (
      <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-warn-50 ring-1 ring-warn/25">
        <span className="h-1.5 w-1.5 rounded-full bg-warn" />
      </span>
    );
  return (
    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-danger-50 text-danger ring-1 ring-danger/20">
      <Cross className="h-2.5 w-2.5" />
    </span>
  );
}

export function CompetitionSlide() {
  const t = useT();
  const [ref, on] = useOnScreen<HTMLDivElement>();
  const columns: { name: string; example: string; head?: ReactNode }[] = [
    { name: t("Excel & WhatsApp", "Excel & WhatsApp"), example: t("de status quo", "the status quo") },
    { name: t("Voorraadtools", "Stock tools"), example: t("bijv. Autotelex", "e.g. Autotelex") },
    { name: t("Werkplaatssoftware", "Workshop software"), example: t("bijv. Carsys", "e.g. Carsys") },
    { name: t("Merkdealer-DMS", "Franchise DMS"), example: t("bijv. Keyloop, incadea", "e.g. Keyloop, incadea") },
    {
      name: "VINVARO",
      example: t("alles in één", "all in one"),
      head: (
        <span className="flex h-7 w-7 items-center justify-center rounded-[8px] bg-ink text-white">
          <Mark width={16} />
        </span>
      ),
    },
  ];
  const rows: [string, Level[]][] = [
    [t("Voorraad & RDW-gegevens", "Stock & RDW data"), ["partial", "yes", "partial", "yes", "yes"]],
    [t("Publiceren naar marktplaatsen", "Publishing to marketplaces"), ["no", "yes", "no", "partial", "yes"]],
    [t("Gedeelde inbox (WhatsApp, mail)", "Shared inbox (WhatsApp, email)"), ["partial", "no", "no", "partial", "yes"]],
    [t("Workflows intake & aflevering", "Intake & delivery workflows"), ["no", "no", "partial", "yes", "yes"]],
    [t("Contracten & digitaal tekenen", "Contracts & e-signing"), ["no", "partial", "partial", "yes", "yes"]],
    [t("Team-app, ook offline", "Staff app, offline too"), ["no", "partial", "no", "partial", "yes"]],
    [t("AI: labels, documenten, foto's", "AI: labels, documents, photos"), ["no", "no", "no", "partial", "yes"]],
    [t("Eigen B2B-netwerk tussen dealers", "Own B2B network between dealers"), ["no", "no", "no", "no", "yes"]],
    [t("Betaalbaar voor zelfstandige dealer", "Affordable for independent dealers"), ["yes", "yes", "yes", "no", "yes"]],
  ];

  return (
    <Slide id="concurrentie" variant="subtle">
      <div ref={ref}>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={on ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, ease }}>
              <Chip tone="brand">{t("Concurrentie", "Competition")}</Chip>
            </motion.div>
            <Heading on={on} className="mt-4">
              {t("Iedereen lost één stuk op, ", "Everyone solves one piece, ")}
              <span className="text-brand">{t("niemand het geheel", "nobody the whole")}</span>
            </Heading>
          </div>
          <Lead on={on} className="max-w-sm lg:mt-0 lg:pb-1.5 lg:text-right">
            {t(
              "Zelfstandige dealers kiezen nu tussen losse tools of een duur merkdealer-systeem. VINVARO dekt de hele zaak in één platform, voor de prijs van één tool.",
              "Independent dealers now choose between scattered tools or an expensive franchise system. VINVARO covers the whole business, for the price of one tool.",
            )}
          </Lead>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={on ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.2, ease }} className="mt-10">
          <Card className="overflow-hidden shadow-float">
            <table className="w-full table-fixed text-left">
              <thead>
                <tr className="border-b border-line bg-canvas">
                  <th className="w-[28%] px-5 py-4 align-bottom">
                    <Label>{t("Wat een dealer nodig heeft", "What a dealer needs")}</Label>
                  </th>
                  {columns.map((c, i) => (
                    <th key={c.name} className={`px-2 py-4 text-center align-bottom font-normal ${i === columns.length - 1 ? "bg-brand-50/70" : ""}`}>
                      <div className="flex flex-col items-center gap-1.5">
                        {c.head}
                        <span className={`text-[13px] font-semibold tracking-[-0.01em] ${i === columns.length - 1 ? "text-brand" : "text-ink"}`}>{c.name}</span>
                        <span className="text-[11px] text-subtle">{c.example}</span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map(([label, levels], i) => (
                  <motion.tr key={label} initial={{ opacity: 0 }} animate={on ? { opacity: 1 } : {}} transition={{ delay: 0.35 + i * 0.04 }} className="border-b border-line last:border-0">
                    <td className="px-5 py-2.5 text-[14px] text-ink">{label}</td>
                    {levels.map((level, k) => (
                      <td key={k} className={`py-2.5 text-center ${k === levels.length - 1 ? "bg-brand-50/40" : ""}`}>
                        <Cell level={level} />
                      </td>
                    ))}
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </Card>
        </motion.div>
        <p className="mt-4 text-center text-[12px] text-subtle">
          {t(
            "* Indicatief per categorie, op basis van publieke informatie. Genoemde leveranciers zijn voorbeelden en kunnen per pakket afwijken.",
            "* Indicative per category, based on public information. Named vendors are examples and may differ per package.",
          )}
        </p>
      </div>
    </Slide>
  );
}
