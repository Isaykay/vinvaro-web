"use client";

import { useEffect, useState, type ReactNode } from "react";
import { AnimatePresence } from "motion/react";
import { Globe } from "lucide-react";
import { Mark } from "@/components/brand-mark";
import { ChannelLogo, type ChannelKind } from "@/components/channel-logo";
import { Plate } from "@/components/product/kit";
import { motion } from "./animation";
import { useT } from "./lang";
import { Card, Chip, Label, Logo, Sparkles, ease, logo, make, type Tone } from "./ui";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
};

function Source({ kind, size = 14 }: { kind: ChannelKind | string; size?: number }) {
  if (kind === "whatsapp" || kind === "gmail" || kind === "outlook" || kind === "imap") return <ChannelLogo kind={kind} size={size} />;
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={logo(kind)} alt="" width={size} height={size} className="rounded-[3px] object-contain" style={{ width: size, height: size }} />;
}

type Item = { name: string; make: string; plate: string; amount: string; note: [string, string]; tone: Tone; status: [string, string]; source: string };

function HeroVisual() {
  const t = useT();
  const items: Item[] = [
    { name: "Volvo XC40", make: "volvo", plate: "P-771-RD", amount: "38.950", note: ["Proefritaanvraag · lead 86", "Test drive request · lead 86"], tone: "brand", status: ["Gelabeld", "Labelled"], source: "whatsapp" },
    { name: "VW Golf", make: "volkswagen", plate: "R-512-FX", amount: "24.950", note: ["RDW opgehaald · APK nog 214 d", "RDW fetched · MOT 214 d left"], tone: "green", status: ["Dossier", "Dossier"], source: "rdw" },
    { name: "BMW 320e", make: "bmw", plate: "S-208-KL", amount: "34.950", note: ["Tweede sleutel ontbreekt", "Second key missing"], tone: "orange", status: ["Bevinding", "Finding"], source: "imap" },
    { name: "Kia EV6", make: "kia", plate: "T-114-NB", amount: "42.750", note: ["Online op 3 kanalen", "Live on 3 channels"], tone: "green", status: ["Online", "Online"], source: "mobilede" },
    { name: "VW Polo", make: "volkswagen", plate: "H-381-VB", amount: "4.500", note: ["Inruilvraag · lead 72", "Trade-in question · lead 72"], tone: "purple", status: ["Concept", "Draft"], source: "gmail" },
    { name: "Peugeot 308", make: "peugeot", plate: "N-009-GH", amount: "31.750", note: ["Koopovereenkomst getekend", "Sales agreement signed"], tone: "green", status: ["Getekend", "Signed"], source: "outlook" },
    { name: "Toyota Yaris", make: "toyota", plate: "K-662-JD", amount: "27.450", note: ["Studio-achtergrond toegepast", "Studio background applied"], tone: "brand", status: ["AI-foto", "AI photo"], source: "autoscout24" },
  ];
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick((n) => n + 1), 2400);
    return () => clearInterval(id);
  }, []);
  const visible = [0, 1, 2, 3].map((k) => ({ id: tick + 3 - k, ...items[(tick + 3 - k) % items.length] }));
  const count = 214 + tick * 3;

  const sources = ["whatsapp", "gmail", "outlook", "imap", "rdw", "kvk", "mobilede", "autoscout24", "gcal"];
  const channels: { name: string; node: ReactNode }[] = [
    { name: "mobile.de", node: <Logo src={logo("mobilede")} size={18} className="rounded-full" /> },
    { name: "AutoScout24", node: <Logo src={logo("autoscout24")} size={18} className="rounded-full" /> },
    {
      name: t("Je website", "Your website"),
      node: (
        <span className="flex h-[18px] w-[18px] items-center justify-center rounded-full bg-brand-50 text-brand ring-1 ring-brand-100">
          <Globe className="h-2.5 w-2.5" strokeWidth={2.2} />
        </span>
      ),
    },
    {
      name: "VINVARO Marktplaats",
      node: (
        <span className="flex h-[18px] w-[18px] items-center justify-center rounded-full bg-ink text-white">
          <Mark width={11} />
        </span>
      ),
    },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.4, ease }} className="relative mx-auto w-full max-w-[560px]">
      <div className="pointer-events-none absolute -inset-10 -z-10 rounded-full bg-[radial-gradient(closest-side,rgba(37,99,235,0.16),transparent)]" />

      <div className="mb-3 flex items-center justify-between px-1">
        <Label>{t("Bronnen", "Sources")}</Label>
        <div className="flex gap-1">
          {sources.map((s, i) => (
            <motion.span
              key={s}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: [0, i === tick % sources.length ? -4 : 0, 0] }}
              transition={{ opacity: { delay: 0.7 + i * 0.05 }, y: { duration: 0.6 } }}
              className={`flex h-7 w-7 items-center justify-center rounded-full bg-white shadow-card transition-shadow ${i === tick % sources.length ? "shadow-[0_0_0_1.5px_#2563eb,0_6px_16px_-6px_rgba(37,99,235,0.6)]" : ""}`}
            >
              <Source kind={s} />
            </motion.span>
          ))}
        </div>
      </div>

      <Card className="relative overflow-hidden shadow-float">
        <div className="flex items-center justify-between border-b border-line bg-canvas px-4 py-2.5">
          <span className="flex items-center gap-2 text-[13px] font-semibold text-ink">
            <span className="flex h-5 w-5 items-center justify-center rounded-[6px] bg-ink text-white">
              <Mark width={12} />
            </span>
            {t("Activiteit", "Activity")}
          </span>
          <span className="flex items-center gap-3">
            <span className="font-mono text-[11px] text-muted">
              {t("vandaag", "today")} <span className="text-ink tabular-nums">{count.toLocaleString("nl-NL")}</span>
            </span>
            <span className="flex items-center gap-1.5 font-mono text-[11px] text-ok">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ok opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-ok" />
              </span>
              {t("AI actief", "AI active")}
            </span>
          </span>
        </div>
        <div className="relative overflow-hidden">
          <AnimatePresence initial={false} mode="popLayout">
            {visible.map((it, k) => (
              <motion.div
                key={it.id}
                layout
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5, ease }}
                className={`relative flex items-center gap-3 border-b border-line px-4 py-3 last:border-0 ${k === 0 ? "bg-brand-50/50" : "bg-white"}`}
              >
                {k === 0 && (
                  <motion.span
                    key={`scan-${it.id}`}
                    className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-brand/10 to-transparent"
                    initial={{ x: "-100%" }}
                    animate={{ x: "300%" }}
                    transition={{ duration: 1.6, ease: "easeInOut" }}
                  />
                )}
                <span className="opacity-70">
                  <Source kind={it.source} />
                </span>
                <Logo src={make(it.make)} size={26} contain />
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-2">
                    <span className="truncate text-[13.5px] font-medium text-ink">{it.name}</span>
                    <Plate size="xs">{it.plate}</Plate>
                  </span>
                  <span className="mt-0.5 block truncate text-[11.5px] text-muted">{t(it.note[0], it.note[1])}</span>
                </span>
                <span className="font-mono text-[12.5px] text-ink">€ {it.amount}</span>
                <span className="w-[98px] text-right">
                  {k === 0 ? (
                    <span className="inline-flex items-center gap-1 font-mono text-[11px] text-brand">
                      <Sparkles className="h-3 w-3 animate-pulse" />
                      {t("verwerkt…", "processing…")}
                    </span>
                  ) : (
                    <Chip tone={it.tone}>{t(it.status[0], it.status[1])}</Chip>
                  )}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </Card>

      <div className="mt-3 grid grid-cols-2 gap-3">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.4, duration: 0.6, ease }} className="rounded-2xl bg-white p-3.5 shadow-card">
          <p className="flex items-center gap-1.5 font-mono text-[10px] tracking-[0.06em] text-subtle uppercase">
            <ChannelLogo kind="whatsapp" size={12} />
            {t("Antwoordvoorstel", "Reply suggestion")}
          </p>
          <p className="mt-1.5 text-[12px] leading-snug text-ink-2">
            {t("Hoi Mark, de XC40 staat voor je klaar. Zaterdag kan een proefrit, welke tijd past?", "Hi Mark, the XC40 is ready for you. A test drive on Saturday works, which time suits you?")}
          </p>
          <div className="mt-2 flex gap-1">
            <span className="rounded-full bg-brand px-2 py-0.5 text-[10.5px] font-medium text-white">{t("Za 10:00", "Sat 10:00")}</span>
            <span className="rounded-full bg-sunken px-2 py-0.5 text-[10.5px] font-medium text-ink-2 ring-1 ring-line">{t("Za 11:30", "Sat 11:30")}</span>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.6, duration: 0.6, ease }} className="flex flex-col rounded-2xl bg-white p-3.5 shadow-card">
          <p className="font-mono text-[10px] tracking-[0.06em] text-subtle uppercase">{t("AI Leadscore", "AI Lead score")}</p>
          <div className="mt-2 flex items-center gap-2">
            <span className="relative flex h-5 w-5 items-center justify-center rounded-full bg-sunken text-[8.5px] font-semibold text-ink-2">
              MJ
              <span className="absolute -right-1 -bottom-1 flex h-3 w-3 items-center justify-center rounded-full bg-white ring-1 ring-line">
                <ChannelLogo kind="whatsapp" size={7} />
              </span>
            </span>
            <span className="text-[12px] font-medium text-ink">Mark Jansen</span>
            <span className="ml-auto font-mono text-[11px] text-ok">86</span>
          </div>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-sunken">
            <motion.div initial={{ width: 0 }} animate={{ width: "86%" }} transition={{ delay: 2.2, duration: 1.2, ease }} className="h-full rounded-full bg-ok" />
          </div>
          <p className="mt-auto pt-1.5 text-[11.5px] text-muted">{t("Proefrit · XC40 gekoppeld", "Test drive · XC40 linked")}</p>
        </motion.div>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 px-1">
        <Label className="whitespace-nowrap">{t("Publiceert direct op", "Publishes straight to")}</Label>
        <div className="flex items-center gap-1.5">
          {channels.map((c, i) => (
            <motion.span
              key={c.name}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 + i * 0.08 }}
              className="flex items-center gap-1.5 rounded-full bg-white py-1 pr-2.5 pl-1 shadow-card"
            >
              {c.node}
              <span className="text-[11.5px] font-medium whitespace-nowrap text-ink-2">{c.name}</span>
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function HeroSlide({ companyName, firstName }: { companyName?: string; firstName?: string }) {
  const [toast, setToast] = useState(false);
  const t = useT();

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
          {(firstName || companyName) && (
            <motion.span variants={fadeUp} className="mb-7 inline-flex items-center gap-2 rounded-full bg-white py-1.5 pr-4 pl-2 text-[13.5px] font-medium text-ink shadow-card">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-50 text-[13px]">👋</span>
              {firstName && companyName ? (
                <>
                  {t("Hoi", "Hi")} {firstName} <span className="text-subtle">·</span> {t("Speciaal voor", "Made for")} <span className="text-brand">{companyName}</span>
                </>
              ) : firstName ? (
                <>
                  {t("Hoi", "Hi")} {firstName}
                </>
              ) : (
                <>
                  {t("Speciaal voor", "Made for")} <span className="text-brand">{companyName}</span>
                </>
              )}
            </motion.span>
          )}

          <motion.h1 variants={fadeUp} className="text-[clamp(2.5rem,5.2vw,4.5rem)] leading-[1.02] text-ink">
            {t("Het besturingssysteem voor je", "The operating system for your")} <span className="text-brand">{t("autobedrijf", "dealership")}</span>
          </motion.h1>

          <motion.p variants={fadeUp} className="mt-6 max-w-[540px] text-[clamp(1.0625rem,1.4vw,1.25rem)] leading-[1.55] tracking-[-0.011em] text-muted">
            {t(
              "Van kenteken en intake tot proefrit, contract, publicatie en aflevering. VINVARO brengt voorraad, klanten en processen samen in één werkplek. Minder losse systemen, meer overzicht.",
              "From registration and intake to test drive, contract, listing and delivery. VINVARO brings stock, customers and operations together in one workspace. Fewer scattered tools, more overview.",
            )}
          </motion.p>

          <motion.div variants={fadeUp} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={() => {
                const el = document.documentElement;
                if (el.requestFullscreen) el.requestFullscreen().catch(() => {});
                else (el as unknown as { webkitRequestFullscreen?: () => void }).webkitRequestFullscreen?.();
                setToast(true);
                setTimeout(() => setToast(false), 5000);
                setTimeout(() => document.getElementById("probleem")?.scrollIntoView({ behavior: "smooth" }), 300);
              }}
              className="inline-flex h-12 items-center gap-2.5 rounded-full bg-brand px-6 text-[15px] font-medium text-white shadow-[0_1px_0_rgb(255_255_255/0.18)_inset,0_8px_20px_-10px_rgb(37_99_235/0.8)] transition-colors hover:bg-brand-600"
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M2 6V3a1 1 0 011-1h3M10 2h3a1 1 0 011 1v3M14 10v3a1 1 0 01-1 1h-3M6 14H3a1 1 0 01-1-1v-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {t("Bekijk de presentatie", "View presentation")}
            </button>
            <a href="https://vinvaro.com/demo" className="inline-flex h-12 items-center gap-2 rounded-full bg-white px-6 text-[15px] font-medium text-ink shadow-card transition-colors hover:text-brand">
              {t("Plan een demo", "Book a demo")}
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 7h10m0 0L8 3m4 4L8 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </motion.div>

          <motion.p variants={fadeUp} className="mt-8 flex items-center gap-2.5 text-[14px] text-muted">
            <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] shrink-0 overflow-hidden rounded-full ring-1 ring-black/10" aria-hidden>
              <clipPath id="pitch-nl-flag">
                <circle cx="12" cy="12" r="12" />
              </clipPath>
              <g clipPath="url(#pitch-nl-flag)">
                <rect width="24" height="8" fill="#AE1C28" />
                <rect y="8" width="24" height="8" fill="#FFFFFF" />
                <rect y="16" width="24" height="8" fill="#21468B" />
              </g>
            </svg>
            <span>
              <span className="font-semibold text-ink">{t("Gemaakt voor Nederlandse autobedrijven:", "Built for Dutch dealerships:")}</span>{" "}
              {t("RDW, KVK en VIES zitten er standaard in", "RDW, KVK and VIES built in as standard")}
            </span>
          </motion.p>
        </div>

        <HeroVisual />
      </motion.div>

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4, ease }}
            className="fixed bottom-8 left-1/2 z-50 hidden -translate-x-1/2 md:block"
          >
            <div className="flex items-center gap-3 rounded-2xl bg-white px-5 py-3 shadow-float">
              <span className="text-[14px] whitespace-nowrap text-ink">
                {t("Gebruik", "Press")} <kbd className="mx-1 rounded-md bg-sunken px-1.5 py-0.5 font-mono text-xs ring-1 ring-line">{t("spatie", "space")}</kbd> {t("of", "or")}{" "}
                <kbd className="mx-1 rounded-md bg-sunken px-1.5 py-0.5 font-mono text-xs ring-1 ring-line">↑</kbd>
                <kbd className="rounded-md bg-sunken px-1.5 py-0.5 font-mono text-xs ring-1 ring-line">↓</kbd> {t("om te navigeren", "to navigate")}
              </span>
              <button onClick={() => setToast(false)} className="text-subtle hover:text-ink" aria-label={t("Sluiten", "Close")}>
                ×
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
