"use client";

import { useEffect, useState, type ReactNode } from "react";
import { AnimatePresence } from "motion/react";
import { Mark } from "@/components/brand-mark";
import { motion } from "./animation";
import { useT } from "./lang";
import { Slide } from "./slide";
import { Arrow, Card, Check, Chip, Cross, Label, Logo, Sparkles, Stage, ease, make, useOnScreen } from "./ui";

type Step = { label: string; title: string; body: string };

function StageCard({ stage, on, delay, children, accent, start, icon }: { stage: Step; on: boolean; delay: number; children: ReactNode; accent?: boolean; start?: boolean; icon?: ReactNode }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={on ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay, ease }} className="h-full">
      <Card
        className={`relative flex h-full flex-col overflow-hidden p-5 ${accent ? "shadow-[0_0_0_1.5px_#2563eb,0_28px_70px_-24px_rgb(37_99_235/0.55)]" : start ? "shadow-[0_0_0_1.5px_#0b0f14,0_20px_50px_-24px_rgb(11_15_20/0.35)]" : ""}`}
      >
        {accent && <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-brand-50 via-white to-white" />}
        {accent && (
          <span className="absolute top-4 right-4 z-10 flex items-center gap-1.5 rounded-full bg-white py-1 pr-1 pl-2.5 text-[11px] font-medium text-ink-2 shadow-card ring-1 ring-line">
            AI
            <motion.span
              initial={{ backgroundColor: "#cbd5e1" }}
              animate={on ? { backgroundColor: "#2563eb" } : {}}
              transition={{ duration: 0.3, delay: delay + 0.9 }}
              className="relative inline-block h-4 w-7 rounded-full"
            >
              <motion.span
                initial={{ x: 2 }}
                animate={on ? { x: 14 } : {}}
                transition={{ duration: 0.3, delay: delay + 0.9, ease }}
                className="absolute top-0.5 left-0 h-3 w-3 rounded-full bg-white shadow"
              />
            </motion.span>
          </span>
        )}
        <div className="relative">
          <div className="flex items-center gap-2">
            {icon}
            <Label>{stage.label}</Label>
          </div>
          <h3 className={`mt-2 text-[19px] leading-tight ${accent ? "text-brand" : "text-ink"}`}>{stage.title}</h3>
          <p className="mt-1.5 text-[13px] leading-[1.5] text-muted">{stage.body}</p>
        </div>
        <div className="relative mt-4 flex-1">{children}</div>
      </Card>
    </motion.div>
  );
}

function Connector({ on, delay }: { on: boolean; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6 }}
      animate={on ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.4, delay, ease }}
      className="relative z-10 mx-auto flex h-9 w-9 shrink-0 rotate-90 items-center justify-center rounded-full bg-white text-brand shadow-card ring-1 ring-brand-100 md:rotate-0"
    >
      <Arrow className="h-4 w-4" />
    </motion.div>
  );
}

type FeedItem = { make: string; text: string; tone: "green" | "orange" };

/** The AI layer at work, with suggestions ticking past. */
function IntelligenceWorking({ on }: { on: boolean }) {
  const t = useT();
  const items: FeedItem[] = [
    { make: "volvo", text: t("Gesprek gelabeld · proefrit", "Conversation labelled · test drive"), tone: "green" },
    { make: "volkswagen", text: t("Kentekenbewijs gelezen · R-512-FX", "Registration read · R-512-FX"), tone: "green" },
    { make: "bmw", text: t("Bevinding · tweede sleutel", "Finding · second key"), tone: "orange" },
    { make: "kia", text: t("Antwoord voorgesteld · WhatsApp", "Reply suggested · WhatsApp"), tone: "green" },
    { make: "toyota", text: t("Studio-achtergrond toegepast", "Studio background applied"), tone: "green" },
    { make: "renault", text: t("Partner herkend · geen lead", "Partner recognised · not a lead"), tone: "green" },
    { make: "peugeot", text: t("Leadscore 72 · inruil", "Lead score 72 · trade-in"), tone: "green" },
  ];
  const [tick, setTick] = useState(0);
  useEffect(() => {
    if (!on) return;
    const id = setInterval(() => setTick((v) => v + 1), 1400);
    return () => clearInterval(id);
  }, [on]);
  const rows = [0, 1, 2].map((i) => tick + 2 - i);
  const done = 124 + tick;

  return (
    <div>
      <div className="relative mx-auto flex h-[150px] items-center justify-center">
        <div className="absolute h-[150px] w-[150px] rounded-full bg-brand/15 blur-2xl" />
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 22, repeat: Infinity, ease: "linear" }} className="absolute h-[140px] w-[140px] rounded-full border border-dashed border-brand/35" />
        <div className="absolute h-[104px] w-[104px] rounded-full bg-white shadow-card" />
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="relative flex h-[64px] w-[64px] items-center justify-center rounded-[18px] bg-ink text-white shadow-float"
        >
          <div className="absolute inset-0 rounded-[18px] bg-[radial-gradient(60%_60%_at_80%_0%,rgb(37_99_235/0.55),transparent_70%)]" />
          <Mark width={36} className="relative" />
          <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-ask text-white ring-2 ring-white">
            <Sparkles className="h-2.5 w-2.5" />
          </span>
        </motion.div>
        <span className="absolute top-1 right-0 inline-flex items-center gap-1.5 rounded-full bg-white px-2 py-1 font-mono text-[10.5px] text-ok shadow-card ring-1 ring-ok/20">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ok opacity-60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-ok" />
          </span>
          {done} {t("voorstellen", "suggestions")}
        </span>
      </div>
      <div className="mt-2 space-y-1.5">
        <AnimatePresence initial={false} mode="popLayout">
          {rows.map((k) => {
            const it = items[k % items.length];
            return (
              <motion.div
                key={k}
                layout
                initial={{ opacity: 0, y: -10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45, ease }}
                className={`flex items-center gap-2 rounded-lg bg-white px-2.5 py-1.5 ring-1 ${it.tone === "orange" ? "ring-warn/30" : "ring-line"}`}
              >
                <Logo src={make(it.make)} size={18} contain />
                <span className="min-w-0 flex-1 truncate text-[12px] text-ink">{it.text}</span>
                {it.tone === "green" ? (
                  <span className="flex h-4 w-4 items-center justify-center rounded-full bg-ok-50 text-ok ring-1 ring-ok/20">
                    <Check className="h-2.5 w-2.5" />
                  </span>
                ) : (
                  <span className="h-2 w-2 rounded-full bg-warn" />
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}

type Support = "yes" | "partial" | "no";

/** Same rows in both cards, so the gap between stock software and VINVARO reads at a glance. */
function ModuleList({ rows, on, delay, tone }: { rows: { label: string; support: Support; note?: string }[]; on: boolean; delay: number; tone: "muted" | "brand" }) {
  const t = useT();
  const covered = rows.filter((r) => r.support !== "no").length;
  return (
    <div>
      <ul className="divide-y divide-line overflow-hidden rounded-xl bg-white ring-1 ring-line">
        {rows.map((r, i) => (
          <motion.li
            key={r.label}
            initial={{ opacity: 0, x: -6 }}
            animate={on ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.35, delay: delay + i * 0.05, ease }}
            className="flex items-center gap-2.5 px-3 py-[7px]"
          >
            {r.support === "yes" ? (
              <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-ok-50 text-ok ring-1 ring-ok/20">
                <Check className="h-2.5 w-2.5" />
              </span>
            ) : r.support === "partial" ? (
              <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-warn-50 ring-1 ring-warn/25">
                <span className="h-1.5 w-1.5 rounded-full bg-warn" />
              </span>
            ) : (
              <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-danger-50 text-danger ring-1 ring-danger/20">
                <Cross className="h-2.5 w-2.5" />
              </span>
            )}
            <span className={`flex-1 text-[12.5px] ${r.support === "no" ? "text-subtle" : "text-ink-2"}`}>{r.label}</span>
            {r.note && <span className="text-[11px] text-warn">{r.note}</span>}
            {r.support === "no" && <span className="text-[11px] text-subtle">{t("handwerk", "manual")}</span>}
          </motion.li>
        ))}
      </ul>
      <div className="mt-3 flex items-center gap-2">
        <span className="font-mono text-[10px] tracking-[0.06em] text-subtle uppercase">{t("Dekking", "Coverage")}</span>
        <div className={`h-1.5 flex-1 overflow-hidden rounded-full ${tone === "brand" ? "bg-brand-100" : "bg-sunken"}`}>
          <motion.div
            initial={{ width: 0 }}
            animate={on ? { width: `${(covered / rows.length) * 100}%` } : {}}
            transition={{ duration: 1.1, delay: delay + 0.3, ease }}
            className={`h-full rounded-full ${tone === "brand" ? "bg-brand" : "bg-line-strong"}`}
          />
        </div>
        <span className={`font-mono text-[11.5px] font-semibold ${tone === "brand" ? "text-brand" : "text-muted"}`}>
          {covered}/{rows.length}
        </span>
      </div>
    </div>
  );
}

export function ComparisonSlide() {
  const t = useT();
  const [ref, on] = useOnScreen<HTMLDivElement>();

  const stages: Step[] = [
    {
      label: t("Andere software", "Other software"),
      title: t("Beheert voorraad, de rest blijft handwerk", "Manages stock, the rest stays manual"),
      body: t(
        "Traditionele dealersoftware richt zich op voorraad en advertenties. Klantvragen, intake en contracten lopen via losse systemen.",
        "Traditional dealer software focuses on stock and listings. Customer questions, intake and contracts run through separate tools.",
      ),
    },
    {
      label: t("VINVARO · hier start je", "VINVARO · where you start"),
      title: t("Je hele bedrijf in één werkplek", "Your whole business in one workspace"),
      body: t(
        "Voorraad, workflows, inbox, verkoop, contracten en publiceren op hetzelfde dossier. Je team houdt alles in eigen hand.",
        "Stock, workflows, inbox, sales, contracts and publishing on the same dossier. Your team keeps everything in its own hands.",
      ),
    },
    {
      label: t("VINVARO Intelligence · de AI-laag", "VINVARO Intelligence · the AI layer"),
      title: t("Denkt mee bij elke stap", "Thinks along at every step"),
      body: t(
        "Bovenop het platform. Labelt en scoort gesprekken, leest documenten, signaleert afwijkingen en stelt antwoorden voor. Je team bevestigt.",
        "On top of the platform. Labels and scores conversations, reads documents, flags deviations and suggests replies. Your team confirms.",
      ),
    },
  ];

  const modules = [
    t("Voorraad & RDW", "Stock & RDW"),
    t("Publiceren", "Publishing"),
    t("CRM & pijplijn", "CRM & pipeline"),
    t("Gedeelde inbox", "Shared inbox"),
    t("Workflows & intake", "Workflows & intake"),
    t("Contracten & tekenen", "Contracts & signing"),
    t("Team-app, ook offline", "Staff app, offline too"),
  ];
  const other: { support: Support; note?: string }[] = [{ support: "yes" }, { support: "yes" }, { support: "partial", note: t("beperkt", "limited") }, { support: "no" }, { support: "no" }, { support: "no" }, { support: "no" }];

  return (
    <Slide id="vergelijking" variant="subtle">
      <div ref={ref}>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={on ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, ease }}>
              <Chip tone="brand">{t("Vergelijking", "Comparison")}</Chip>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              animate={on ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.05, ease }}
              className="mt-4 max-w-3xl text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] text-ink"
            >
              {t("Waar anderen stoppen, ", "Where others stop, ")}
              <span className="text-brand">{t("begint VINVARO", "VINVARO begins")}</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={on ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease }}
            className="max-w-sm text-[clamp(1.0625rem,1.4vw,1.25rem)] leading-[1.55] tracking-[-0.011em] text-pretty text-muted lg:pb-1.5 lg:text-right"
          >
            {t(
              "Andere software stopt bij voorraad en advertenties. Met VINVARO draait je hele bedrijf in één werkplek, met een AI-laag die meekijkt.",
              "Other software stops at stock and listings. With VINVARO your whole business runs in one workspace, with an AI layer that looks along.",
            )}
          </motion.p>
        </div>

        <motion.div initial={{ opacity: 0, y: 24 }} animate={on ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.15, ease }} className="mt-10">
          <Card className="overflow-hidden shadow-float">
            <Stage className="px-5 py-7 md:px-8">
              <div className="grid items-stretch gap-3 md:grid-cols-[1fr_auto_1fr_auto_1.2fr]">
                <StageCard stage={stages[0]} on={on} delay={0.3}>
                  <ModuleList rows={modules.map((label, k) => ({ label, ...other[k] }))} on={on} delay={0.5} tone="muted" />
                </StageCard>

                <div className="flex items-center justify-center">
                  <Connector on={on} delay={0.55} />
                </div>

                <StageCard
                  stage={stages[1]}
                  on={on}
                  delay={0.45}
                  start
                  icon={
                    <span className="flex h-5 w-5 items-center justify-center rounded-[6px] bg-ink text-white">
                      <Mark width={12} />
                    </span>
                  }
                >
                  <ModuleList rows={modules.map((label) => ({ label, support: "yes" as const }))} on={on} delay={0.65} tone="brand" />
                </StageCard>

                <div className="flex items-center justify-center">
                  <Connector on={on} delay={0.75} />
                </div>

                <StageCard stage={stages[2]} on={on} delay={0.6} accent>
                  <IntelligenceWorking on={on} />
                </StageCard>
              </div>
            </Stage>
          </Card>
        </motion.div>
      </div>
    </Slide>
  );
}
