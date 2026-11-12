"use client";

import type { ReactNode } from "react";
import { ChannelLogo } from "@/components/channel-logo";
import { Plate } from "@/components/product/kit";
import { motion } from "./animation";
import { useT, type T } from "./lang";
import { Slide } from "./slide";
import { Chip, ease, useOnScreen } from "./ui";

const Row = ({ label, children }: { label: ReactNode; children: ReactNode }) => (
  <div className="flex items-center justify-between gap-2 border-t border-line py-[5px] first:border-0">
    <span className="text-[10.5px] text-muted">{label}</span>
    <span className="flex items-center gap-1">{children}</span>
  </div>
);

function Sheet({ name }: { name: string }) {
  return (
    <p className="flex items-center gap-1.5 border-b border-line bg-[#ebf6f0] px-3 py-1 font-mono text-[9.5px] text-[#1d6f42]">
      <span className="rounded-[3px] bg-[#1d6f42] px-1 text-[8px] font-bold text-white">X</span>
      {name}
    </p>
  );
}

function ArtStock({ t }: { t: T }) {
  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-card">
      <Sheet name="voorraad_def_v7.xlsx" />
      <div className="px-3 py-1.5">
        <Row label={<Plate size="xs">R-512-FX</Plate>}>
          <Chip tone="orange" small>
            {t("Foto's in galerij", "Photos in camera roll")}
          </Chip>
        </Row>
        <Row label={<Plate size="xs">S-208-KL</Plate>}>
          <Chip tone="red" small>
            {t("Kosten niet bijgewerkt", "Costs not updated")}
          </Chip>
        </Row>
        <Row label={<Plate size="xs">T-114-NB</Plate>}>
          <span className="font-mono text-[10px] text-danger line-through decoration-danger/50">€ 43.950</span>
          <Chip tone="red" small>
            {t("Oude prijs", "Old price")}
          </Chip>
        </Row>
      </div>
    </div>
  );
}

function ArtInbox({ t }: { t: T }) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center gap-2 rounded-xl bg-white px-3 py-2 shadow-card">
        <ChannelLogo kind="whatsapp" size={16} />
        <span className="flex-1 truncate text-[11px] font-medium text-ink">{t("XC40 nog te koop?", "XC40 still for sale?")}</span>
        <span className="font-mono text-[10.5px] text-danger">26 u</span>
      </div>
      <div className="flex justify-center">
        <span className="flex h-5 items-center gap-1 rounded-full bg-danger-50 px-2 font-mono text-[9.5px] font-medium text-danger ring-1 ring-danger/20">
          ↕ {t("vijf telefoons, geen overzicht", "five phones, no overview")}
        </span>
      </div>
      <div className="flex items-center gap-2 rounded-xl bg-white px-3 py-2 shadow-card ring-1 ring-danger/25">
        <ChannelLogo kind="gmail" size={16} />
        <span className="flex-1 truncate text-[11px] font-medium text-ink">{t("RE: Proefrit zaterdag", "RE: Test drive Saturday")}</span>
        <span className="font-mono text-[10.5px] text-danger">{t("2× beantwoord", "Answered 2×")}</span>
      </div>
    </div>
  );
}

function ArtIntake({ t }: { t: T }) {
  return (
    <div className="space-y-1.5">
      <div className="overflow-hidden rounded-xl bg-white shadow-card">
        <p className="flex items-center gap-1.5 border-b border-line bg-sunken px-3 py-1 font-mono text-[9.5px] text-ink-2">
          <span className="rounded-[3px] bg-ink-2 px-1 text-[8px] font-bold text-white">JPG</span>
          intakeformulier_scan.jpg
        </p>
        {[
          [t("Sleutels", "Keys"), "2?"],
          [t("Schade", "Damage"), "?"],
          [t("Kentekenbewijs", "Registration"), "?"],
        ].map(([v, s]) => (
          <p key={v} className="grid grid-cols-[1fr_auto] gap-2 border-b border-line px-3 py-[3px] font-mono text-[10px] text-ink-2 last:border-0">
            <span>{v}</span>
            <span className="text-center text-warn">{s}</span>
          </p>
        ))}
      </div>
      <div className="flex items-center gap-2 rounded-xl bg-white px-3 py-1.5 shadow-card">
        <ChannelLogo kind="whatsapp" size={14} />
        <span className="min-w-0 flex-1 truncate text-[10.5px] text-ink">{t("Waar is sleutel 2 van de BMW?", "Where is key 2 of the BMW?")}</span>
        <Chip tone="orange" small>
          {t("Bij aflevering", "At delivery")}
        </Chip>
      </div>
    </div>
  );
}

function ArtStandstill({ t }: { t: T }) {
  const target = 50;
  const cars = [34, 58, 40, 86, 30, 44, 72, 38, 46, 92, 36, 48];
  const plates = ["R", "S", "T", "P", "K", "N", "L", "V", "H", "G", "B", "D"];
  return (
    <div className="rounded-xl bg-white px-3 pt-2.5 pb-2 shadow-card">
      <p className="flex items-center justify-between font-mono text-[9.5px] tracking-[0.06em] text-subtle uppercase">
        <span>{t("Dagen tot verkoopklaar", "Days to sale-ready")}</span>
        <span className="text-danger">{t("stilstand", "standstill")}</span>
      </p>
      <div className="relative mt-2 flex h-[72px] items-end gap-[3px]">
        <div className="pointer-events-none absolute inset-x-0 z-10 border-t border-dashed border-ink/30" style={{ bottom: `${target}%` }} />
        {cars.map((h, i) => {
          const late = h > target;
          return (
            <span key={i} className="relative flex-1 overflow-hidden rounded-t-[2px] bg-brand-100" style={{ height: `${h}%` }}>
              {late && <span className="absolute inset-x-0 bottom-0 bg-brand" style={{ height: `${(target / h) * 100}%` }} />}
              {late && <span className="absolute inset-x-0 top-0 bg-danger" style={{ height: `${((h - target) / h) * 100}%` }} />}
            </span>
          );
        })}
      </div>
      <div className="mt-1 flex gap-[3px]">
        {plates.map((l, i) => (
          <span key={i} className={`flex-1 text-center font-mono text-[8.5px] ${cars[i] > target ? "font-medium text-danger" : "text-subtle"}`}>
            {l}
          </span>
        ))}
      </div>
      <p className="mt-1.5 flex items-center justify-between gap-2 border-t border-line pt-1.5 text-[10.5px]">
        <span className="flex items-center gap-1.5 text-muted">
          <span className="w-3 border-t border-dashed border-ink/40" />
          {t("doel", "target")}
        </span>
        <span className="font-mono font-medium whitespace-nowrap text-danger">{t("4 auto's over tijd", "4 cars overdue")}</span>
      </p>
    </div>
  );
}

export function ProblemSlide({ firstName }: { firstName?: string }) {
  const [ref, on] = useOnScreen<HTMLDivElement>();
  const t = useT();

  const problems = [
    {
      title: t("Voorraad & dossier", "Stock & dossier"),
      desc: t(
        "Voorraad in Excel, foto's in een galerij en papieren in een map. Niemand ziet in één keer wat er in een auto zit, wat hij kost en wat er nog moet.",
        "Stock in Excel, photos in a camera roll and paperwork in a folder. Nobody sees at once what's in a car, what it costs and what's left to do.",
      ),
      art: <ArtStock t={t} />,
    },
    {
      title: t("Klantvragen", "Customer questions"),
      desc: t(
        "Vragen komen binnen op vijf WhatsApp-telefoons en een paar mailboxen. Een proefritaanvraag blijft een dag liggen, of wordt twee keer beantwoord.",
        "Questions arrive on five WhatsApp phones and a few mailboxes. A test drive request sits for a day, or gets answered twice.",
      ),
      art: <ArtInbox t={t} />,
    },
    {
      title: t("Intake & aflevering", "Intake & delivery"),
      desc: t(
        "Intake op papier, schade niet vastgelegd. Bij de aflevering mist de tweede sleutel en niemand weet wanneer die verdween.",
        "Intake on paper, damage not recorded. At delivery the second key is missing and nobody knows when it disappeared.",
      ),
      art: <ArtIntake t={t} />,
    },
    {
      title: t("Stilstand", "Standstill"),
      desc: t(
        "Al dat handwerk stapelt zich op. Auto's blijven staan tussen intake en verkoopklaar, en elke dag stilstand gaat van je marge af.",
        "All that manual work piles up. Cars sit between intake and sale-ready, and every day of standstill comes off your margin.",
      ),
      art: <ArtStandstill t={t} />,
      result: true,
    },
  ];

  return (
    <Slide id="probleem" variant="subtle">
      <div ref={ref}>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={on ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="max-w-3xl text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] text-ink"
          >
            {t("Autobedrijven groeien, maar het handwerk groeit mee", "Dealerships grow, but manual work grows with them")}
            {firstName && t(`, herken jij dit ${firstName}?`, `, sound familiar, ${firstName}?`)}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={on ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="max-w-sm text-[17px] leading-[1.55] text-muted lg:pb-1.5 lg:text-right"
          >
            {t("Losse systemen lossen elk één stukje op, niet de hele weg van een auto door je bedrijf.", "Scattered tools each solve one piece, not the whole journey of a car through your business.")}
          </motion.p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {problems.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 24 }}
              animate={on ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.15 + i * 0.08, ease }}
              className={`relative flex flex-col rounded-[18px] bg-white ${p.result ? "shadow-[0_0_0_1.5px_#b91c1c,0_24px_48px_-24px_rgb(185_28_28/0.45)]" : "shadow-card"}`}
            >
              {p.result && (
                <span className="absolute top-1/2 -left-[14px] z-10 hidden h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full bg-danger font-mono text-[13px] font-semibold text-white shadow-md lg:flex">
                  =
                </span>
              )}
              <div className={`relative flex h-[190px] items-center overflow-hidden rounded-t-[18px] border-b px-5 ${p.result ? "border-danger/20 bg-danger-50/60" : "border-line bg-canvas"}`}>
                <div
                  className="pointer-events-none absolute inset-0 opacity-70"
                  style={{ backgroundImage: "radial-gradient(rgb(11 15 20 / 0.07) 1px, transparent 1px)", backgroundSize: "14px 14px" }}
                />
                <div className="relative w-full">{p.art}</div>
              </div>
              <div className="p-5">
                <p className="flex items-center gap-2">
                  <span className={`font-mono text-[11px] ${p.result ? "text-danger" : "text-subtle"}`}>{p.result ? "=" : `0${i + 1}`}</span>
                  <span className="text-[16px] font-semibold tracking-[-0.02em] text-ink">{p.title}</span>
                  {p.result && <Chip tone="red">{t("Resultaat", "Result")}</Chip>}
                </p>
                <p className="mt-2.5 text-[14px] leading-[1.6] text-muted">{p.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Slide>
  );
}

