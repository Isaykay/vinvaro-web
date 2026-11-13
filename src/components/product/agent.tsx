"use client";

import clsx from "clsx";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, LayoutGroup, motion, useInView, useReducedMotion } from "motion/react";
import { ArrowUp, Check, FileText, Globe, Mic, Paperclip, Play, Plus, ScrollText, ShieldCheck, Lock, Users, X } from "lucide-react";
import { useLang } from "@/components/lang-provider";
import { defineCopy, numberLocale } from "@/lib/i18n";
import { Mark } from "@/components/brand-mark";
import { AppWindow, Car, Pill, Plate } from "@/components/product/kit";

const copy = defineCopy({
  nl: {
    agent: "Agent",
    newChat: "Nieuwe chat",
    today: "Vandaag",
    threads: ["Nieuwe auto XV-365-V", "Verlopen facturen", "Voorraad langer dan 60 dagen", "Overzicht november"],
    placeholder: "Vraag iets of geef een opdracht…",
    hello: "Waar kan ik mee helpen, Sanne?",
    working: "Bezig…",
    done: "Klaar",
    steps: (n: number) => `${n} stappen`,
    hero: {
      command: "Maak een nieuwe auto aan met kenteken XV-365-V, vraagprijs 24.950",
      photos: "12 foto's",
      suggestions: ["Welke auto's staan langer dan 60 dagen op voorraad?", "Welke facturen zijn verlopen?"],
      steps: ["Kenteken opgezocht bij de RDW", "Auto aangemaakt in de voorraad", "12 foto's in de galerij gezet", "Workflow Intake gestart"],
      model: "Volkswagen Golf",
      meta: "1.5 eTSI Life · 2022 · 34.512 km",
      price: "€ 24.950",
      status: "Intake",
      reply: "Klaar. De Golf staat in je voorraad met de RDW-gegevens en 12 foto's. De intake staat klaar voor je team.",
      open: "Openen",
      approval: "Factuur versturen?",
      approvalMeta: "Wacht op jouw akkoord",
      kpiLabel: "Marge deze maand",
      kpiValue: "€ 21.380",
    },
    commands: {
      prompts: ["Welke auto's staan langer dan 60 dagen op voorraad?", "Welke facturen zijn verlopen? Stuur een herinnering", "Geef me het financieel overzicht van deze maand"],
      stockTitle: "3 auto's langer dan 60 dagen op voorraad",
      stock: [
        ["BMW 320i Touring", "H-928-KD", "74 dagen"],
        ["Peugeot 3008 Hybrid", "S-311-PL", "68 dagen"],
        ["Kia Niro EV", "N-570-RT", "63 dagen"],
      ],
      invoicesTitle: "2 facturen verlopen",
      invoices: [
        ["F-2026-0131", "Jan de Vries", "€ 1.250"],
        ["F-2026-0127", "Garage Peters", "€ 640"],
      ],
      overdue: "Verlopen",
      sendReminders: "2 herinneringen versturen?",
      run: "Uitvoeren",
      sent: "Herinnering verstuurd",
      kpiTitle: "Financieel overzicht · november",
      kpis: [
        ["Omzet", "€ 186.400"],
        ["Brutomarge", "€ 21.380"],
        ["Verkocht", "9 auto's"],
      ],
    },
    approval: {
      command: "Maak een factuur voor Jan de Vries en stuur hem op",
      steps: ["Relatie Jan de Vries gevonden", "Factuur F-2026-0142 als concept gemaakt"],
      title: "Bevestigen",
      action: "Factuur F-2026-0142 uitgeven en versturen naar Jan de Vries",
      reason: "Een uitgegeven factuur kun je niet meer wijzigen.",
      amount: "€ 24.950,00",
      run: "Uitvoeren",
      cancel: "Annuleren",
      ran: "Factuur uitgegeven en verstuurd",
      ranMeta: "Uitgevoerd na akkoord",
      log: "Auditlog",
      logLines: ["Factuur F-2026-0142 uitgegeven", "E-mail verstuurd naar Jan de Vries"],
      by: "Agent namens Sanne",
      always: "Vraagt altijd eerst bij",
      risky: ["Uitgeven", "Versturen", "Verwijderen", "Betaald markeren", "Bulk op meer dan 10"],
    },
    voice: {
      title: "Inspreken",
      listening: "Luisteren…",
      transcribing: "Bezig met uitschrijven…",
      ready: "Uitgeschreven",
      spoken: "Maak de auto aan uit deze papieren en zet alle foto's in de galerij",
      drop: "Laat los om toe te voegen",
      files: (n: number) => `${n} bestanden`,
      max: "Tot 60 per bericht",
      docs: ["Kentekenbewijs.pdf gelezen", "Inkoopfactuur.pdf gelezen"],
      gallery: (n: number) => `Galerij · ${n} foto's`,
    },
    selection: {
      title: "Voertuigen",
      columns: ["Kenteken", "Model", "Fase", "Prijs"],
      stage: "Werkplaats",
      sales: "Verkoop",
      selected: (n: number) => `${n} geselecteerd`,
      actions: ["Status", "Fase"],
      ask: "Vraag de agent",
      context: "4 geselecteerd uit voertuigen",
      command: "Zet deze op de marktplaats en verlaag de prijs met 500",
      steps: ["4 auto's op de VINVARO Marktplaats gezet", "Vraagprijs van 4 auto's verlaagd"],
    },
    security: {
      log: "Auditlog",
      by: "Agent namens Sanne",
      entries: ["Auto aangemaakt · XV-365-V", "Workflow Intake gestart · XV-365-V", "Prijs gewijzigd · XV-365-V", "Herinnering verstuurd · F-2026-0131", "Deal bijgewerkt · Jan de Vries"],
      ago: ["nu", "1 min", "4 min", "12 min"],
      deniedTitle: "Niet toegestaan",
      denied: "Je rol Verkoper mag geen facturen verwijderen. Vraag een beheerder.",
      deniedCommand: "Verwijder factuur F-2026-0127",
      nodes: ["Rollen & rechten", "Auditlog", "Per organisatie"],
    },
  },
  en: {
    agent: "Agent",
    newChat: "New chat",
    today: "Today",
    threads: ["New car XV-365-V", "Overdue invoices", "Stock over 60 days", "November overview"],
    placeholder: "Ask something or give an instruction…",
    hello: "How can I help, Sanne?",
    working: "Working…",
    done: "Done",
    steps: (n: number) => `${n} steps`,
    hero: {
      command: "Create a new car with registration XV-365-V, asking price 24,950",
      photos: "12 photos",
      suggestions: ["Which cars have been in stock for more than 60 days?", "Which invoices are overdue?"],
      steps: ["Registration looked up at the RDW", "Car created in stock", "12 photos added to the gallery", "Intake workflow started"],
      model: "Volkswagen Golf",
      meta: "1.5 eTSI Life · 2022 · 34,512 km",
      price: "€24,950",
      status: "Intake",
      reply: "Done. The Golf is in your stock with its RDW data and 12 photos. Intake is ready for your team.",
      open: "Open",
      approval: "Send invoice?",
      approvalMeta: "Waiting for your approval",
      kpiLabel: "Margin this month",
      kpiValue: "€21,380",
    },
    commands: {
      prompts: ["Which cars have been in stock for more than 60 days?", "Which invoices are overdue? Send a reminder", "Give me this month's financial overview"],
      stockTitle: "3 cars in stock for more than 60 days",
      stock: [
        ["BMW 320i Touring", "H-928-KD", "74 days"],
        ["Peugeot 3008 Hybrid", "S-311-PL", "68 days"],
        ["Kia Niro EV", "N-570-RT", "63 days"],
      ],
      invoicesTitle: "2 invoices overdue",
      invoices: [
        ["F-2026-0131", "Jan de Vries", "€1,250"],
        ["F-2026-0127", "Garage Peters", "€640"],
      ],
      overdue: "Overdue",
      sendReminders: "Send 2 reminders?",
      run: "Run",
      sent: "Reminder sent",
      kpiTitle: "Financial overview · November",
      kpis: [
        ["Revenue", "€186,400"],
        ["Gross margin", "€21,380"],
        ["Sold", "9 cars"],
      ],
    },
    approval: {
      command: "Create an invoice for Jan de Vries and send it",
      steps: ["Contact Jan de Vries found", "Invoice F-2026-0142 created as draft"],
      title: "Confirm",
      action: "Issue invoice F-2026-0142 and send it to Jan de Vries",
      reason: "An issued invoice can no longer be changed.",
      amount: "€24,950.00",
      run: "Run",
      cancel: "Cancel",
      ran: "Invoice issued and sent",
      ranMeta: "Ran after approval",
      log: "Audit log",
      logLines: ["Invoice F-2026-0142 issued", "Email sent to Jan de Vries"],
      by: "Agent on behalf of Sanne",
      always: "Always asks first before",
      risky: ["Issuing", "Sending", "Deleting", "Marking paid", "Bulk on more than 10"],
    },
    voice: {
      title: "Dictate",
      listening: "Listening…",
      transcribing: "Transcribing…",
      ready: "Transcribed",
      spoken: "Create the car from these papers and put all the photos in the gallery",
      drop: "Drop to attach",
      files: (n: number) => `${n} files`,
      max: "Up to 60 per message",
      docs: ["Registration-document.pdf read", "Purchase-invoice.pdf read"],
      gallery: (n: number) => `Gallery · ${n} photos`,
    },
    selection: {
      title: "Vehicles",
      columns: ["Registration", "Model", "Stage", "Price"],
      stage: "Workshop",
      sales: "Sales",
      selected: (n: number) => `${n} selected`,
      actions: ["Status", "Stage"],
      ask: "Ask the agent",
      context: "4 selected from vehicles",
      command: "Put these on the marketplace and lower the price by 500",
      steps: ["4 cars listed on the VINVARO Marketplace", "Asking price of 4 cars lowered"],
    },
    security: {
      log: "Audit log",
      by: "Agent on behalf of Sanne",
      entries: ["Car created · XV-365-V", "Intake workflow started · XV-365-V", "Price changed · XV-365-V", "Reminder sent · F-2026-0131", "Deal updated · Jan de Vries"],
      ago: ["now", "1 min", "4 min", "12 min"],
      deniedTitle: "Not allowed",
      denied: "Your Sales role can't delete invoices. Ask an admin.",
      deniedCommand: "Delete invoice F-2026-0127",
      nodes: ["Roles & permissions", "Audit log", "Per organisation"],
    },
  },
});

const ease = [0.22, 1, 0.36, 1] as const;
const spring = { type: "spring", stiffness: 240, damping: 26 } as const;
const rise = { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -6 }, transition: { duration: 0.45, ease } };

/**
 * Elapsed time in a looping scene. Holds on `still` (a representative frame) when the scene is
 * off screen, during server rendering, or when the visitor prefers reduced motion.
 */
function useScene(duration: number, still: number) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-12% 0px -12% 0px" });
  const reduce = useReducedMotion();
  const running = inView && !reduce;
  const [time, setTime] = useState(still);
  useEffect(() => {
    if (!running) return;
    const start = performance.now() - still;
    const id = setInterval(() => setTime((performance.now() - start) % duration), 50);
    return () => clearInterval(id);
  }, [running, duration, still]);
  return { ref, t: running ? time : still };
}

const typed = (text: string, t: number, start: number, speed = 28) => text.slice(0, Math.max(0, Math.min(text.length, Math.floor((t - start) / speed))));

function Caret({ className }: { className?: string }) {
  return <span className={clsx("ml-px inline-block h-[1.05em] w-[1.5px] translate-y-[2px] animate-blink bg-brand", className)} />;
}

function Sparkle({ size }: { size: number }) {
  return (
    <svg viewBox="0 0 12 12" width={size} height={size} fill="currentColor" aria-hidden>
      <path d="M6 0.5c.3 2.6 1.9 4.2 4.5 4.5v1c-2.6.3-4.2 1.9-4.5 4.5h-1C4.7 7.9 3.1 6.3.5 6V5c2.6-.3 4.2-1.9 4.5-4.5h1Z" transform="translate(.5 .5)" />
    </svg>
  );
}

/** The agent's avatar, as in the product: the V mark on an ink tile with a sparkle badge. */
export function AgentMark({ size = "md", thinking, ring = "ring-surface" }: { size?: "sm" | "md" | "lg"; thinking?: boolean; ring?: string }) {
  const box = size === "sm" ? "size-7 rounded-[9px]" : size === "md" ? "size-9 rounded-[11px]" : "size-14 rounded-[18px]";
  return (
    <span className={clsx("relative inline-grid shrink-0 place-items-center", box)} aria-hidden>
      {size === "lg" && <span className="absolute -inset-4 -z-10 rounded-[30px] bg-[radial-gradient(closest-side,rgba(37,99,235,0.35),transparent)] blur-md" />}
      {thinking && (
        <span className={clsx("absolute -inset-[2px] overflow-hidden", box)}>
          <span className="absolute top-1/2 left-1/2 aspect-square w-[200%] -translate-x-1/2 -translate-y-1/2 animate-spin bg-[conic-gradient(from_0deg,transparent_0deg,transparent_200deg,#3b82f6_290deg,#8b5cf6_340deg,transparent_360deg)] [animation-duration:1.6s]" />
        </span>
      )}
      <span className={clsx("relative grid size-full place-items-center overflow-hidden bg-[linear-gradient(145deg,#1b2430_0%,#0b0f14_60%)] text-white shadow-[0_4px_10px_-4px_rgba(11,15,20,0.6)] ring-1 ring-white/10 ring-inset", box)}>
        <span className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/[0.12] to-transparent" />
        <Mark width={size === "sm" ? 14 : size === "md" ? 18 : 28} className="relative h-auto" />
      </span>
      <span className={clsx("absolute grid place-items-center rounded-full bg-gradient-to-br from-brand-400 to-ask-400 text-white ring-2", ring, size === "lg" ? "-right-1.5 -bottom-1.5 size-6" : "-right-1 -bottom-1 size-3.5")}>
        <Sparkle size={size === "lg" ? 12 : 7} />
      </span>
    </span>
  );
}

type StepState = "running" | "done";

function StepIcon({ state }: { state: StepState }) {
  return state === "done" ? (
    <motion.span initial={{ scale: 0.4 }} animate={{ scale: 1 }} transition={spring} className="flex size-[18px] shrink-0 items-center justify-center rounded-full bg-brand text-white">
      <Check className="size-[11px]" strokeWidth={3} />
    </motion.span>
  ) : (
    <span className="size-[18px] shrink-0 animate-spin rounded-full border-2 border-brand/20 border-t-brand" />
  );
}

/** Compact timeline of what the agent did, ticking through its steps. */
function StepTimeline({ items, t, start, gap = 650, run = 520, dark }: { items: string[]; t: number; start: number; gap?: number; run?: number; dark?: boolean }) {
  const lang = useLang();
  const c = copy[lang];
  const visible = items.filter((_, i) => t >= start + i * gap);
  const allDone = t >= start + (items.length - 1) * gap + run;
  if (visible.length === 0) return null;
  return (
    <motion.div layout {...rise} className={clsx("rounded-[14px] px-3 py-2.5 ring-1", dark ? "bg-white/[0.04] ring-white/10" : "bg-surface/80 ring-line")}>
      <div className={clsx("mb-1.5 flex items-center justify-between text-[11px]", dark ? "text-white/50" : "text-muted")}>
        <span className="font-mono tracking-[0.04em]">{c.steps(items.length)}</span>
        <span className={clsx("font-medium", allDone ? "text-ok" : dark ? "text-ask-400" : "text-ask")}>{allDone ? c.done : c.working}</span>
      </div>
      <ul className="space-y-1.5">
        <AnimatePresence initial={false}>
          {visible.map((label, i) => (
            <motion.li key={label} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.35, ease }} className="flex items-center gap-2.5">
              <StepIcon state={t >= start + i * gap + run ? "done" : "running"} />
              <span className={clsx("truncate text-[12.5px]", dark ? "text-white/85" : "text-ink-2")}>{label}</span>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </motion.div>
  );
}

/** Tiny illustrated photo of a car, used for attachments and gallery tiles. */
function PhotoThumb({ className, tone = 0 }: { className?: string; tone?: number }) {
  const bodies = ["#ffffff", "#dbeafe", "#1e293b", "#e2e8f0", "#93c5fd", "#cbd5e1"];
  return (
    <span className={clsx("bg-stage relative flex items-end justify-center overflow-hidden ring-1 ring-ink/5", className)}>
      <Car body={bodies[tone % bodies.length]} className="mb-[8%] w-[86%]" />
    </span>
  );
}

function Cursor({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 22" className={clsx("size-5 drop-shadow-[0_2px_3px_rgba(11,15,20,0.35)]", className)} aria-hidden>
      <path d="M3 2 L17 11.5 L10.6 12.6 L13.8 19.2 L11.3 20.4 L8.1 13.8 L3.4 18 Z" fill="#0b0f14" stroke="#fff" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  );
}

/* ------------------------------------------------------------------------------------------------
 * Hero: a command is typed, the timeline ticks through and a vehicle card slides in.
 * ---------------------------------------------------------------------------------------------- */

export function AgentChat({ decor }: { decor?: boolean }) {
  const c = copy[useLang()];
  const h = c.hero;
  const { ref, t } = useScene(12800, 9800);
  const typeStart = 700;
  const sentAt = typeStart + h.command.length * 28 + 450;
  const sent = t >= sentAt;
  const input = sent ? "" : typed(h.command, t, typeStart);
  const stepsStart = sentAt + 500;
  const stepsDone = stepsStart + (h.steps.length - 1) * 650 + 520;
  const cardAt = stepsDone + 250;
  const replyAt = cardAt + 700;
  const words = h.reply.split(" ");
  const shownWords = t >= replyAt ? Math.min(words.length, Math.floor((t - replyAt) / 55) + 1) : 0;
  const fading = t >= 12100;
  const busy = sent && t < replyAt;

  return (
    <div ref={ref} className="relative">
      {decor && (
        <>
          <div className="pointer-events-none absolute -inset-10 rounded-[48px] bg-[radial-gradient(60%_60%_at_70%_40%,rgba(37,99,235,0.35),transparent_70%),radial-gradient(50%_50%_at_20%_80%,rgba(139,92,246,0.28),transparent_70%)] blur-2xl" />
          <div className="absolute top-20 -left-10 z-20 hidden w-[210px] animate-float rounded-2xl bg-surface p-3 shadow-float xl:block" aria-hidden>
            <div className="flex items-center gap-2.5">
              <span className="grid size-8 place-items-center rounded-lg bg-warn-50 text-warn ring-1 ring-warn/20">
                <ShieldCheck className="size-4" />
              </span>
              <span className="min-w-0">
                <span className="block text-[12px] font-semibold text-ink">{h.approval}</span>
                <span className="block text-[11px] text-muted">{h.approvalMeta}</span>
              </span>
            </div>
            <div className="mt-2.5 flex gap-1.5">
              <span className="flex h-6 flex-1 items-center justify-center rounded-md bg-brand text-[10.5px] font-semibold text-white">{c.approval.run}</span>
              <span className="flex h-6 flex-1 items-center justify-center rounded-md text-[10.5px] font-medium text-ink-2 ring-1 ring-line">{c.approval.cancel}</span>
            </div>
          </div>
          <div className="absolute -right-8 bottom-24 z-20 hidden w-[190px] animate-float rounded-2xl bg-surface p-3 shadow-float [animation-delay:-3s] xl:block" aria-hidden>
            <p className="text-[11px] text-muted">{h.kpiLabel}</p>
            <p className="mt-0.5 text-[18px] font-semibold tracking-[-0.03em] text-ink tabular-nums">{h.kpiValue}</p>
            <svg viewBox="0 0 160 36" className="mt-2 w-full">
              <defs>
                <linearGradient id="agent-kpi" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#3b82f6" />
                  <stop offset="1" stopColor="#8b5cf6" />
                </linearGradient>
              </defs>
              {[14, 20, 16, 24, 19, 27, 23, 31, 34].map((v, i) => (
                <rect key={i} x={i * 18} y={36 - v} width="11" height={v} rx="2.5" fill={i === 8 ? "url(#agent-kpi)" : "#e2e8f0"} />
              ))}
            </svg>
          </div>
        </>
      )}
      <AppWindow title="app.vinvaro.com/chat" className="@container relative z-10 text-ink">
        <div className="grid h-[520px] sm:h-[540px] @2xl:grid-cols-[196px_1fr]">
          <aside className="hidden flex-col border-r border-line bg-canvas p-3 @2xl:flex">
            <span className="flex h-8 items-center gap-2 rounded-lg bg-surface px-2.5 text-[12px] font-medium text-ink shadow-card">
              <Plus className="size-3.5 text-muted" /> {c.newChat}
            </span>
            <p className="mt-5 px-2 font-mono text-[10px] tracking-[0.1em] text-subtle uppercase">{c.today}</p>
            <ul className="mt-1.5 space-y-0.5">
              {c.threads.map((th, i) => (
                <li key={th} className={clsx("truncate rounded-lg px-2 py-1.5 text-[12px]", i === 0 ? "bg-surface font-medium text-ink shadow-card" : "text-muted")}>
                  {th}
                </li>
              ))}
            </ul>
            <div className="mt-auto space-y-1.5 px-1">
              {[68, 52, 60].map((w, i) => (
                <span key={i} className="block h-1.5 rounded-full bg-line/70" style={{ width: `${w}%` }} />
              ))}
            </div>
          </aside>

          <div className="relative flex min-h-0 flex-col bg-[linear-gradient(180deg,#f8fafc_0%,#ffffff_40%)]">
            <div className="flex h-12 shrink-0 items-center gap-2.5 border-b border-line px-4">
              <AgentMark size="sm" />
              <span className="text-[13px] font-semibold tracking-[-0.01em]">{c.agent}</span>
              <span className="ml-auto">
                {busy ? (
                  <Pill tone="ai">
                    <span className="size-1.5 animate-pulse rounded-full bg-ask" /> {c.working}
                  </Pill>
                ) : t >= replyAt ? (
                  <Pill tone="ok">
                    <Check className="size-2.5" strokeWidth={3} /> {c.done}
                  </Pill>
                ) : null}
              </span>
            </div>

            <motion.div animate={{ opacity: fading ? 0 : 1 }} transition={{ duration: 0.5 }} className="relative flex min-h-0 flex-1 flex-col justify-end gap-3 overflow-hidden px-3.5 pt-8 pb-3 [mask-image:linear-gradient(to_bottom,transparent,black_44px)] sm:px-5">
              <AnimatePresence mode="popLayout">
                {!sent && (
                  <motion.div key="hello" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.4 }} className="m-auto flex flex-col items-center text-center">
                    <AgentMark size="lg" />
                    <p className="mt-5 text-[17px] font-semibold tracking-[-0.02em]">{c.hello}</p>
                    <div className="mt-4 flex max-w-[360px] flex-col gap-1.5">
                      {h.suggestions.map((s) => (
                        <span key={s} className="rounded-full bg-surface px-3 py-1.5 text-[11.5px] text-ink-2 shadow-card">
                          {s}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                )}
                {sent && (
                  <motion.div key="user" layout initial={{ opacity: 0, y: 18, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={spring} className="ml-auto flex max-w-[88%] flex-col items-end gap-1.5">
                    <AttachmentStack label={h.photos} />
                    <p className="rounded-2xl rounded-br-md bg-ink px-3.5 py-2.5 text-[13px] leading-snug text-white">{h.command}</p>
                  </motion.div>
                )}
                {sent && t >= sentAt + 250 && (
                  <motion.div key="assistant" layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-2.5">
                    <AgentMark size="sm" thinking={busy} />
                    <div className="min-w-0 flex-1 space-y-2.5">
                      <StepTimeline items={h.steps} t={t} start={stepsStart} />
                      <AnimatePresence>{t >= cardAt && <VehicleCard key="car" />}</AnimatePresence>
                      {shownWords > 0 && (
                        <motion.p layout className="text-[13px] leading-relaxed text-ink-2">
                          {words.slice(0, shownWords).join(" ")}
                          {shownWords < words.length && <Caret />}
                        </motion.p>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            <div className="shrink-0 border-t border-line bg-surface p-2.5 sm:p-3">
              {!sent && t >= 350 && (
                <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="mb-2 flex">
                  <AttachmentStack label={h.photos} compact />
                </motion.div>
              )}
              <div className={clsx("flex items-end gap-2 rounded-2xl bg-canvas px-3 py-2 ring-1 transition-shadow duration-300", input ? "shadow-[0_0_0_4px_rgb(37_99_235_/_0.08)] ring-brand/40" : "ring-line")}>
                <Paperclip className="mb-1.5 size-4 shrink-0 text-subtle" />
                <p className="min-h-[20px] min-w-0 flex-1 py-0.5 text-[13px] leading-snug">
                  {input ? (
                    <>
                      {input}
                      <Caret />
                    </>
                  ) : (
                    <span className="text-subtle">{c.placeholder}</span>
                  )}
                </p>
                <Mic className="mb-1.5 size-4 shrink-0 text-subtle" />
                <motion.span
                  animate={input.length === h.command.length ? { scale: [1, 0.86, 1] } : { scale: 1 }}
                  transition={{ duration: 0.35, delay: 0.25 }}
                  className={clsx("grid size-8 shrink-0 place-items-center rounded-full text-white transition-colors", input ? "bg-brand shadow-lg shadow-brand/30" : "bg-line-strong")}
                >
                  <ArrowUp className="size-4" strokeWidth={2.4} />
                </motion.span>
              </div>
            </div>
          </div>
        </div>
      </AppWindow>
    </div>
  );
}

function AttachmentStack({ label, compact }: { label: string; compact?: boolean }) {
  return (
    <span className={clsx("inline-flex items-center gap-2 rounded-xl bg-surface py-1 pr-2.5 pl-1 shadow-card", compact && "bg-canvas shadow-none ring-1 ring-line")}>
      <span className="flex -space-x-3">
        {[0, 1, 2].map((i) => (
          <PhotoThumb key={i} tone={i} className="h-7 w-10 rounded-md ring-2 ring-surface" />
        ))}
      </span>
      <span className="text-[11.5px] font-medium text-ink-2">{label}</span>
    </span>
  );
}

function VehicleCard() {
  const h = copy[useLang()].hero;
  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 48, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 22 }}
      className="relative flex items-center gap-3 overflow-hidden rounded-[14px] bg-surface p-2.5 shadow-float"
    >
      <div className="bg-stage relative flex h-[64px] w-[92px] shrink-0 items-end justify-center overflow-hidden rounded-[10px] px-1.5 pb-1.5 sm:w-[104px]">
        <div className="bg-dots pointer-events-none absolute inset-0 opacity-50" />
        <Car className="relative w-full" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          <Plate size="xs">XV-365-V</Plate>
          <Pill tone="brand">{h.status}</Pill>
        </div>
        <p className="mt-1.5 truncate text-[13px] font-semibold tracking-[-0.01em]">{h.model}</p>
        <p className="truncate text-[11px] text-muted">
          <span className="font-semibold text-ink sm:hidden">{h.price} · </span>
          {h.meta}
        </p>
      </div>
      <div className="hidden shrink-0 pr-1 text-right sm:block">
        <p className="text-[17px] font-semibold tracking-[-0.03em] tabular-nums">{h.price}</p>
        <p className="mt-0.5 text-[11px] font-medium text-brand">{h.open} →</p>
      </div>
      <motion.span
        initial={{ x: "-120%" }}
        animate={{ x: "330%" }}
        transition={{ duration: 1.3, delay: 0.3, ease }}
        className="pointer-events-none absolute inset-y-0 left-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/80 to-transparent"
      />
    </motion.div>
  );
}

/* ------------------------------------------------------------------------------------------------
 * (a) Plain language in, an action or a rich result out. Three prompts take turns.
 * ---------------------------------------------------------------------------------------------- */

export function AgentCommands() {
  const c = copy[useLang()].commands;
  const slot = 5200;
  const { ref, t } = useScene(slot * 3, 4000);
  const idx = Math.floor(t / slot) % 3;
  const local = t % slot;
  const prompt = c.prompts[idx];
  const typedPrompt = typed(prompt, local, 150, 22);
  const typingDone = typedPrompt.length === prompt.length;
  const resultAt = 150 + prompt.length * 22 + 500;
  const showResult = local >= resultAt && local < slot - 300;

  return (
    <div ref={ref} className="space-y-4">
      <div className="rounded-2xl bg-surface p-4 shadow-float sm:p-5">
        <div className="flex items-start gap-3 rounded-xl bg-canvas px-3.5 py-3 ring-1 ring-line">
          <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-ink text-[10px] font-semibold text-white">S</span>
          <p className="min-h-[40px] text-[13.5px] leading-snug text-ink sm:min-h-0">
            {typedPrompt}
            {!typingDone && <Caret />}
          </p>
        </div>
        <div className="relative ml-[22px] h-9 w-px" aria-hidden>
          <span className="absolute inset-0 bg-gradient-to-b from-line-strong to-ask-400/60" />
          {typingDone && local < resultAt + 200 && (
            <motion.span
              key={idx}
              initial={{ top: "0%", opacity: 0 }}
              animate={{ top: "100%", opacity: [0, 1, 1, 0] }}
              transition={{ duration: 0.55, ease: "easeIn" }}
              className="absolute left-1/2 size-2 -translate-x-1/2 rounded-full bg-ask-400 shadow-[0_0_12px_3px_rgba(139,92,246,0.55)]"
            />
          )}
        </div>
        <div className="flex gap-3">
          <AgentMark size="sm" thinking={typingDone && !showResult} />
          <div className="min-h-[196px] min-w-0 flex-1">
            <AnimatePresence mode="wait">
              {showResult && (
                <motion.div key={idx} initial={{ opacity: 0, y: 12, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -8, transition: { duration: 0.25 } }} transition={{ duration: 0.5, ease }}>
                  {idx === 0 && <StockResult />}
                  {idx === 1 && <InvoiceResult t={local - resultAt} />}
                  {idx === 2 && <KpiResult />}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
      <ul className="flex flex-wrap gap-2">
        {c.prompts.map((p, i) => (
          <li key={p} className={clsx("relative overflow-hidden rounded-full px-3 py-1.5 text-[12px] transition-colors duration-300", i === idx ? "bg-surface font-medium text-ink shadow-card" : "bg-surface/50 text-muted ring-1 ring-line")}>
            {p}
            {i === idx && <span className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-gradient-to-r from-brand to-ask-400" style={{ transform: `scaleX(${local / slot})` }} />}
          </li>
        ))}
      </ul>
    </div>
  );
}

function ResultCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="overflow-hidden rounded-[14px] bg-surface ring-1 ring-line">
      <p className="border-b border-line bg-canvas px-3.5 py-2 text-[11.5px] font-semibold text-ink-2">{title}</p>
      {children}
    </div>
  );
}

function StockResult() {
  const c = copy[useLang()].commands;
  return (
    <ResultCard title={c.stockTitle}>
      <ul className="divide-y divide-line">
        {c.stock.map(([model, plate, days], i) => (
          <motion.li key={plate} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 + i * 0.12, duration: 0.4, ease }} className="flex items-center gap-3 px-3.5 py-2.5">
            <PhotoThumb tone={i + 2} className="h-8 w-11 shrink-0 rounded-md" />
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[12.5px] font-medium">{model}</span>
              <Plate size="xs" className="mt-1">
                {plate}
              </Plate>
            </span>
            <Pill tone="warn">{days}</Pill>
          </motion.li>
        ))}
      </ul>
    </ResultCard>
  );
}

function InvoiceResult({ t }: { t: number }) {
  const c = copy[useLang()].commands;
  const asking = t >= 1100;
  const pressed = t >= 1900;
  const sent = t >= 2200;
  return (
    <div className="space-y-2">
      <ResultCard title={c.invoicesTitle}>
        <ul className="divide-y divide-line">
          {c.invoices.map(([nr, name, amount], i) => (
            <motion.li key={nr} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 + i * 0.12, duration: 0.4, ease }} className="flex items-center gap-3 px-3.5 py-2.5">
              <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-sunken text-muted">
                <FileText className="size-4" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-mono text-[11px] text-muted">{nr}</span>
                <span className="block truncate text-[12.5px] font-medium">{name}</span>
              </span>
              <span className="text-[12.5px] font-semibold tabular-nums">{amount}</span>
              <AnimatePresence mode="wait" initial={false}>
                <motion.span key={sent ? "sent" : "due"} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.25, delay: sent ? i * 0.15 : 0 }}>
                  {sent ? (
                    <Pill tone="ok">
                      <Check className="size-2.5" strokeWidth={3} /> <span className="hidden sm:inline">{c.sent}</span>
                    </Pill>
                  ) : (
                    <Pill tone="danger">{c.overdue}</Pill>
                  )}
                </motion.span>
              </AnimatePresence>
            </motion.li>
          ))}
        </ul>
      </ResultCard>
      <AnimatePresence>
        {asking && !sent && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, height: 0 }} className="flex items-center gap-2.5 rounded-xl bg-warn-50 px-3 py-2 ring-1 ring-warn/25">
            <ShieldCheck className="size-4 shrink-0 text-warn" />
            <span className="flex-1 text-[12px] font-medium text-ink">{c.sendReminders}</span>
            <motion.span animate={{ scale: pressed ? 0.92 : 1 }} className="rounded-md bg-brand px-2.5 py-1 text-[11px] font-semibold text-white">
              {c.run}
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function KpiResult() {
  const c = copy[useLang()].commands;
  const bars = [32, 44, 38, 52, 47, 61, 55, 68, 64, 78, 72, 88];
  return (
    <ResultCard title={c.kpiTitle}>
      <div className="grid grid-cols-3 gap-px bg-line">
        {c.kpis.map(([label, value], i) => (
          <motion.div key={label} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.1, duration: 0.4, ease }} className="bg-surface px-3 py-2.5">
            <p className="text-[10.5px] text-muted">{label}</p>
            <p className="mt-0.5 text-[14px] font-semibold tracking-[-0.02em] tabular-nums sm:text-[15px]">{value}</p>
          </motion.div>
        ))}
      </div>
      <svg viewBox="0 0 240 64" className="block w-full px-3.5 pt-3 pb-2.5" aria-hidden>
        <defs>
          <linearGradient id="agent-bars" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#3b82f6" />
            <stop offset="1" stopColor="#8b5cf6" stopOpacity="0.85" />
          </linearGradient>
        </defs>
        {bars.map((v, i) => (
          <motion.rect
            key={i}
            x={i * 20 + 2}
            y={64 - (v / 100) * 60}
            width="13"
            height={(v / 100) * 60}
            rx="3"
            fill={i === bars.length - 1 ? "url(#agent-bars)" : "#dbeafe"}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: 0.25 + i * 0.04, duration: 0.5, ease }}
            style={{ transformBox: "fill-box", transformOrigin: "bottom" }}
          />
        ))}
      </svg>
    </ResultCard>
  );
}

/* ------------------------------------------------------------------------------------------------
 * (b) A risky action waits for approval; a click runs it and it lands in the audit log.
 * ---------------------------------------------------------------------------------------------- */

function ShieldGlyph({ draw }: { draw: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className="size-5" fill="none" aria-hidden>
      <path d="M12 2.8 19.5 5.6v5.6c0 4.7-3.1 8.4-7.5 10-4.4-1.6-7.5-5.3-7.5-10V5.6L12 2.8Z" fill="currentColor" fillOpacity="0.12" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <motion.path d="m8.6 12.2 2.4 2.4 4.6-4.8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: draw ? 1 : 0 }} transition={{ duration: 0.6, delay: 0.3, ease }} />
    </svg>
  );
}

export function AgentApproval() {
  const a = copy[useLang()].approval;
  const { ref, t } = useScene(10400, 3000);
  const cardAt = 1900;
  const cursorAt = 3300;
  const pressAt = 4500;
  const approved = t >= pressAt + 350;
  const fading = t >= 9800;

  return (
    <div ref={ref} className="mx-auto max-w-[540px]">
      <motion.div animate={{ opacity: fading ? 0 : 1 }} transition={{ duration: 0.45 }} className="space-y-3">
        <p className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-md bg-ink px-3.5 py-2.5 text-[13px] leading-snug text-white">{a.command}</p>
        <div className="flex gap-2.5">
          <AgentMark size="sm" thinking={t >= 300 && !approved} />
          <div className="min-w-0 flex-1 space-y-2.5">
            <StepTimeline items={a.steps} t={t} start={400} gap={600} />
            <LayoutGroup>
              <AnimatePresence mode="popLayout">
                {t >= cardAt && !approved && (
                  <motion.div
                    key="card"
                    layout
                    initial={{ opacity: 0, y: 14, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97, transition: { duration: 0.25 } }}
                    transition={spring}
                    className="relative rounded-[16px] border border-warn/30 bg-gradient-to-b from-warn-50 to-surface shadow-float"
                  >
                    <motion.span
                      className="pointer-events-none absolute -inset-px rounded-[16px]"
                      animate={{ boxShadow: ["0 0 0 0 rgba(180,83,9,0)", "0 0 0 6px rgba(180,83,9,0.10)", "0 0 0 0 rgba(180,83,9,0)"] }}
                      transition={{ duration: 2.2, repeat: Infinity }}
                    />
                    <div className="flex gap-3 p-4">
                      <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-surface text-warn shadow-card ring-1 ring-warn/25">
                        <ShieldGlyph draw />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-[11px] font-semibold tracking-[0.06em] text-warn uppercase">{a.title}</p>
                        <p className="mt-1 text-[13.5px] leading-snug font-semibold text-ink">{a.action}</p>
                        <p className="mt-1 text-[12.5px] leading-relaxed text-ink-2">{a.reason}</p>
                        <div className="mt-2.5 flex items-center gap-2 rounded-lg bg-surface px-2.5 py-1.5 text-[12px] ring-1 ring-line">
                          <FileText className="size-3.5 text-muted" />
                          <span className="font-mono text-[11px] text-muted">F-2026-0142</span>
                          <span className="ml-auto font-semibold tabular-nums">{a.amount}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 rounded-b-[16px] border-t border-warn/15 bg-surface/70 px-4 py-3">
                      <motion.span animate={{ scale: t >= pressAt && t < pressAt + 250 ? 0.94 : 1 }} transition={{ duration: 0.15 }} className="relative inline-flex h-9 items-center gap-1.5 rounded-[10px] bg-brand px-4 text-[13px] font-semibold text-white shadow-lg shadow-brand/25">
                        <Check className="size-3.5" strokeWidth={2.6} /> {a.run}
                        {t >= pressAt && <motion.span initial={{ scale: 0, opacity: 0.5 }} animate={{ scale: 2.6, opacity: 0 }} transition={{ duration: 0.6 }} className="absolute top-1/2 left-1/2 size-8 -translate-1/2 rounded-full bg-white" />}
                        {t >= cursorAt && (
                          <motion.span initial={{ x: 150, y: 70, opacity: 0 }} animate={{ x: 34, y: 14, opacity: 1 }} transition={{ duration: 1, ease }} className="absolute top-0 left-0">
                            <Cursor />
                          </motion.span>
                        )}
                      </motion.span>
                      <span className="inline-flex h-9 items-center rounded-[10px] px-3.5 text-[13px] font-medium text-ink-2">{a.cancel}</span>
                    </div>
                  </motion.div>
                )}
                {approved && (
                  <motion.div key="done" layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={spring} className="flex items-center gap-2.5 rounded-[14px] bg-ok-50 px-3.5 py-3 ring-1 ring-ok/20">
                    <span className="grid size-7 place-items-center rounded-full bg-ok text-white">
                      <Check className="size-4" strokeWidth={3} />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[13px] font-semibold text-ink">{a.ran}</span>
                      <span className="block text-[11.5px] text-ok">{a.ranMeta}</span>
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </LayoutGroup>
          </div>
        </div>
        <div className="rounded-[14px] bg-obsidian p-3.5 font-mono text-[11px] text-white/70 ring-1 ring-white/10">
          <p className="flex items-center gap-2 text-[10.5px] tracking-[0.1em] text-white/40 uppercase">
            <ScrollText className="size-3.5" /> {a.log}
          </p>
          <ul className="mt-2 min-h-[44px] space-y-1">
            <AnimatePresence>
              {a.logLines.map(
                (line, i) =>
                  t >= pressAt + 900 + i * 500 && (
                    <motion.li key={line} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="flex gap-2 truncate">
                      <span className="text-brand-300">14:02</span>
                      <span className="text-white/40">{a.by}</span>
                      <span className="truncate text-white/85">{line}</span>
                    </motion.li>
                  ),
              )}
            </AnimatePresence>
          </ul>
        </div>
      </motion.div>
      <div className="mt-4 flex flex-wrap items-center gap-1.5">
        <span className="mr-1 text-[11.5px] text-muted">{a.always}</span>
        {a.risky.map((r) => (
          <span key={r} className="rounded-full bg-surface px-2.5 py-1 text-[11px] font-medium text-ink-2 ring-1 ring-line">
            {r}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------------------------------------
 * (c) Voice and attachments: a live waveform and transcript; files fly into the car's dossier.
 * ---------------------------------------------------------------------------------------------- */

const bars = Array.from({ length: 30 }, (_, i) => 0.25 + Math.abs(Math.sin(i * 1.7) * Math.cos(i * 0.6)) * 0.75);

type Flying = { kind: "photo" | "pdf" | "video"; x: number; y: number; r: number };
const flying: Flying[] = [
  { kind: "photo", x: 10, y: 14, r: -8 },
  { kind: "pdf", x: 34, y: 6, r: 5 },
  { kind: "photo", x: 58, y: 16, r: 7 },
  { kind: "video", x: 80, y: 8, r: -4 },
  { kind: "photo", x: 20, y: 34, r: 4 },
  { kind: "photo", x: 46, y: 30, r: -6 },
  { kind: "pdf", x: 70, y: 32, r: 9 },
  { kind: "photo", x: 88, y: 28, r: -10 },
];

export function AgentVoiceFiles() {
  const v = copy[useLang()].voice;
  const { ref, t } = useScene(11000, 7600);
  const listening = t < 3800;
  const transcribing = t >= 3800 && t < 4600;
  const words = v.spoken.split(" ");
  const heard = listening ? Math.min(words.length, Math.floor(t / (3600 / words.length))) : words.length;
  const dropped = t >= 900;
  const fly = t >= 4800 && t < 10400;
  const arrived = Math.max(0, Math.min(36, Math.floor((t - 4900) / 40)));
  const reading = t >= 6200;

  return (
    <div ref={ref} className="grid gap-4 sm:grid-cols-[0.9fr_1.1fr]">
      <div className="flex flex-col rounded-2xl bg-surface p-5 shadow-float">
        <p className="flex items-center gap-2 text-[12px] font-medium text-brand">
          <span className={clsx("size-1.5 rounded-full", listening ? "animate-pulse bg-danger" : "bg-brand")} />
          {listening ? v.listening : transcribing ? v.transcribing : v.ready}
        </p>
        <div className="relative mx-auto my-6 grid size-24 place-items-center">
          {listening && (
            <>
              <span className="absolute inset-2 animate-ring rounded-full border-2 border-brand/40" />
              <span className="absolute inset-2 animate-ring rounded-full border-2 border-ask-400/40 [animation-delay:1.3s]" />
            </>
          )}
          <motion.span animate={{ scale: listening ? [1, 1.06, 1] : 1 }} transition={{ duration: 1.4, repeat: listening ? Infinity : 0 }} className="relative grid size-16 place-items-center rounded-full bg-gradient-to-br from-brand-400 to-ask-400 text-white shadow-[0_14px_30px_-10px_rgba(37,99,235,0.7)]">
            <Mic className="size-6" strokeWidth={2.2} />
          </motion.span>
        </div>
        <div className="flex h-10 items-center justify-center gap-[3px]" aria-hidden>
          {bars.map((b, i) => (
            <motion.span
              key={i}
              className="w-[3px] rounded-full bg-gradient-to-t from-brand to-ask-400"
              style={{ height: 36 }}
              animate={listening ? { scaleY: [b * 0.3, b, b * 0.45, b * 0.85, b * 0.3] } : { scaleY: transcribing ? 0.12 : b * 0.18 }}
              transition={listening ? { duration: 1 + (i % 5) * 0.14, repeat: Infinity, ease: "easeInOut", delay: (i % 7) * 0.05 } : { duration: 0.3 }}
            />
          ))}
        </div>
        <p className="mt-5 min-h-[60px] rounded-xl bg-canvas px-3.5 py-3 text-[13px] leading-snug text-ink ring-1 ring-line">
          {words.slice(0, heard).join(" ")}
          {listening && <Caret />}
        </p>
      </div>

      <div className="relative min-h-[360px] overflow-hidden rounded-2xl bg-surface p-5 shadow-float">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 text-[12px] font-medium text-ink">
            <Paperclip className="size-3.5 text-muted" /> {v.files(dropped ? 39 : 0)}
          </span>
          <Pill tone="ai">{v.max}</Pill>
        </div>
        <motion.div
          animate={{ opacity: dropped && !fly ? 1 : 0 }}
          className="pointer-events-none absolute inset-x-5 top-12 bottom-[132px] grid place-items-center rounded-xl border-2 border-dashed border-brand/35 bg-brand-50/50"
        >
          <span className="mt-auto mb-3 text-[11.5px] font-medium text-brand">{v.drop}</span>
        </motion.div>
        {flying.map((f, i) => (
          <motion.span
            key={i}
            className="absolute z-10 -translate-1/2"
            initial={false}
            animate={
              fly
                ? { left: "50%", top: "78%", scale: 0.35, rotate: 0, opacity: [1, 1, 0] }
                : { left: `${f.x}%`, top: `${22 + f.y}%`, scale: dropped ? 1 : 0.6, rotate: f.r, opacity: dropped && !reading ? 1 : 0 }
            }
            transition={fly ? { duration: 0.85, delay: i * 0.09, ease: [0.55, 0, 0.45, 1] } : { duration: dropped ? 0.5 : 0, delay: dropped ? i * 0.05 : 0, ease }}
          >
            <FileChip kind={f.kind} tone={i} />
          </motion.span>
        ))}
        <div className="absolute inset-x-5 bottom-5 rounded-[14px] bg-canvas p-3 ring-1 ring-line">
          <div className="flex items-center gap-2">
            <Plate size="xs">XV-365-V</Plate>
            <span className="truncate text-[12.5px] font-semibold">Volkswagen Golf</span>
            <span className="ml-auto font-mono text-[10.5px] text-muted">{v.gallery(reading ? 36 : arrived)}</span>
          </div>
          <div className="mt-2.5 grid grid-cols-6 gap-1.5">
            {Array.from({ length: 6 }, (_, i) => (
              <motion.span key={i} animate={{ opacity: arrived > i * 6 ? 1 : 0.25, scale: arrived > i * 6 ? 1 : 0.92 }} transition={{ duration: 0.3 }}>
                {arrived > i * 6 ? <PhotoThumb tone={i} className="h-7 rounded-md" /> : <span className="block h-7 rounded-md bg-sunken ring-1 ring-line" />}
              </motion.span>
            ))}
          </div>
          <ul className="mt-2.5 space-y-1">
            {v.docs.map((d, i) => (
              <li key={d} className={clsx("flex items-center gap-1.5 text-[11.5px] transition-opacity duration-300", reading && t >= 6200 + i * 450 ? "opacity-100" : "opacity-0")}>
                <span className="grid size-4 place-items-center rounded-full bg-ok-50 text-ok">
                  <Check className="size-2.5" strokeWidth={3} />
                </span>
                <span className="text-ink-2">{d}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function FileChip({ kind, tone }: { kind: Flying["kind"]; tone: number }) {
  if (kind === "pdf")
    return (
      <span className="flex h-12 w-10 flex-col items-center justify-center gap-0.5 rounded-md bg-surface shadow-card ring-1 ring-line">
        <FileText className="size-4 text-danger" />
        <span className="font-mono text-[8px] font-semibold text-danger">PDF</span>
      </span>
    );
  if (kind === "video")
    return (
      <span className="grid h-10 w-14 place-items-center rounded-md bg-obsidian-3 shadow-card ring-1 ring-white/10">
        <Play className="size-4 fill-white text-white" />
      </span>
    );
  return <PhotoThumb tone={tone} className="block h-10 w-14 rounded-md shadow-card" />;
}

/* ------------------------------------------------------------------------------------------------
 * (d) Select rows in a table, choose "Ask the agent" and act on exactly that selection.
 * ---------------------------------------------------------------------------------------------- */

const selectionRows: [plate: string, model: string, price: number, workshop: boolean][] = [
  ["XV-365-V", "Volkswagen Golf", 24950, true],
  ["H-928-KD", "BMW 320i Touring", 28450, true],
  ["S-311-PL", "Peugeot 3008", 22900, true],
  ["N-570-RT", "Kia Niro EV", 26750, true],
  ["R-512-FX", "Volvo XC40", 31900, false],
];

export function AgentSelection() {
  const lang = useLang();
  const s = copy[lang].selection;
  const money = new Intl.NumberFormat(numberLocale[lang], { style: "currency", currency: "EUR", maximumFractionDigits: 0 });
  const { ref, t } = useScene(11200, 6900);
  const checkAt = (i: number) => 700 + i * 420;
  const checked = selectionRows.map((_, i) => i < 4 && t >= checkAt(i));
  const count = checked.filter(Boolean).length;
  const clickAt = 2900;
  const drawerOpen = t >= clickAt + 250 && t < 8400;
  const commandStart = clickAt + 900;
  const sentAt = commandStart + s.command.length * 24 + 300;
  const stepsStart = sentAt + 300;
  const updated = t >= stepsStart + 600 + 520;
  const fading = t >= 10600;
  const target = t < checkAt(0) - 200 ? null : t < checkAt(3) + 150 ? `row-${Math.min(3, Math.floor((t - checkAt(0) + 200) / 420))}` : t < clickAt + 300 ? "ask" : null;

  return (
    <div ref={ref}>
      <AppWindow title="app.vinvaro.com/vehicles">
        <motion.div animate={{ opacity: fading ? 0 : 1 }} transition={{ duration: 0.4 }} className="relative h-[390px] overflow-hidden">
          <LayoutGroup id="agent-selection">
            <div className="flex h-11 items-center gap-2 border-b border-line px-4">
              <span className="text-[13px] font-semibold">{s.title}</span>
              <span className="ml-auto h-6 w-28 rounded-md bg-sunken ring-1 ring-line" />
            </div>
            <table className="w-full text-left text-[12px]">
              <thead className="text-[10.5px] tracking-[0.04em] text-muted uppercase">
                <tr className="border-b border-line">
                  <th className="w-10 py-2 pl-4 font-medium" />
                  <th className="py-2 font-medium">{s.columns[0]}</th>
                  <th className="hidden py-2 font-medium sm:table-cell">{s.columns[1]}</th>
                  <th className="hidden py-2 font-medium md:table-cell">{s.columns[2]}</th>
                  <th className="py-2 pr-4 text-right font-medium">{s.columns[3]}</th>
                </tr>
              </thead>
              <tbody>
                {selectionRows.map(([plate, model, price, workshop], i) => (
                  <tr key={plate} className={clsx("border-b border-line transition-colors duration-300", checked[i] ? "bg-brand-50/60" : "bg-surface")}>
                    <td className="py-2.5 pl-4">
                      <span className={clsx("relative grid size-4 place-items-center rounded-[5px] ring-1 transition-colors", checked[i] ? "bg-brand text-white ring-brand" : "bg-surface ring-line-strong")}>
                        {checked[i] && <Check className="size-3" strokeWidth={3} />}
                        {target === `row-${i}` && <CursorAnchor />}
                      </span>
                    </td>
                    <td className="py-2.5">
                      <Plate size="xs">{plate}</Plate>
                    </td>
                    <td className="hidden py-2.5 font-medium text-ink-2 sm:table-cell">{model}</td>
                    <td className="hidden py-2.5 md:table-cell">
                      <span className="inline-flex items-center gap-1.5">
                        <Pill tone={workshop ? "warn" : "neutral"}>{workshop ? s.stage : s.sales}</Pill>
                        {checked[i] && updated && (
                          <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={spring} className="grid size-5 place-items-center rounded-full bg-ink text-white">
                            <Globe className="size-3" />
                          </motion.span>
                        )}
                      </span>
                    </td>
                    <td className="py-2.5 pr-4 text-right font-semibold tabular-nums">
                      <AnimatePresence mode="wait" initial={false}>
                        <motion.span key={checked[i] && updated ? "new" : "old"} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.3, delay: checked[i] && updated ? i * 0.08 : 0 }} className={clsx("inline-block rounded px-1", checked[i] && updated && "bg-ok-50 text-ok")}>
                          {money.format(checked[i] && updated ? price - 500 : price)}
                        </motion.span>
                      </AnimatePresence>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <AnimatePresence>
              {count > 0 && (
                <motion.div initial={{ y: 70, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 70, opacity: 0 }} transition={spring} className="absolute inset-x-3 bottom-3 flex items-center gap-2 rounded-xl bg-ink px-3 py-2 text-white shadow-float sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2">
                  <span className="text-[12px] font-medium whitespace-nowrap tabular-nums">{s.selected(count)}</span>
                  <span className="mx-1 h-4 w-px bg-white/15" />
                  {s.actions.map((a) => (
                    <span key={a} className="hidden rounded-md px-2 py-1 text-[11.5px] text-white/70 sm:inline">
                      {a}
                    </span>
                  ))}
                  <motion.span animate={{ scale: t >= clickAt && t < clickAt + 220 ? 0.93 : 1 }} className="relative ml-auto inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-brand to-ask-400 px-2.5 py-1 text-[11.5px] font-semibold whitespace-nowrap shadow-[0_0_0_3px_rgba(139,92,246,0.25)]">
                    <Sparkle size={10} /> {s.ask}
                    {target === "ask" && <CursorAnchor />}
                  </motion.span>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {drawerOpen && (
                <motion.aside initial={{ x: "105%" }} animate={{ x: 0 }} exit={{ x: "105%" }} transition={{ type: "spring", stiffness: 200, damping: 28 }} className="absolute inset-y-0 right-0 z-10 flex w-full flex-col border-l border-line bg-surface shadow-float sm:w-[58%]">
                  <div className="flex h-11 shrink-0 items-center gap-2 border-b border-line px-3.5">
                    <AgentMark size="sm" />
                    <span className="text-[13px] font-semibold">{copy[lang].agent}</span>
                    <X className="ml-auto size-4 text-subtle" />
                  </div>
                  <div className="flex flex-1 flex-col justify-end gap-2.5 p-3.5">
                    {t >= sentAt && (
                      <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="ml-auto max-w-[92%] rounded-2xl rounded-br-md bg-ink px-3 py-2 text-[12.5px] leading-snug text-white">
                        {s.command}
                      </motion.p>
                    )}
                    {t >= stepsStart && (
                      <div className="flex gap-2">
                        <AgentMark size="sm" thinking={!updated} />
                        <div className="min-w-0 flex-1">
                          <StepTimeline items={s.steps} t={t} start={stepsStart} gap={600} />
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="shrink-0 border-t border-line p-2.5">
                    <span className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-2.5 py-1 text-[11px] font-medium text-brand ring-1 ring-brand-100">
                      <Check className="size-3" strokeWidth={3} /> {s.context}
                    </span>
                    <p className="min-h-[36px] rounded-xl bg-canvas px-3 py-2 text-[12.5px] leading-snug ring-1 ring-line">
                      {t < sentAt ? (
                        <>
                          {typed(s.command, t, commandStart, 24)}
                          {t >= commandStart && <Caret />}
                        </>
                      ) : (
                        <span className="text-subtle">{copy[lang].placeholder}</span>
                      )}
                    </p>
                  </div>
                </motion.aside>
              )}
            </AnimatePresence>
          </LayoutGroup>
        </motion.div>
      </AppWindow>
    </div>
  );
}

function CursorAnchor() {
  return (
    <motion.span layoutId="agent-cursor" transition={{ type: "spring", stiffness: 260, damping: 30 }} className="pointer-events-none absolute top-1/2 left-1/2 z-30">
      <Cursor className="translate-x-[-3px] translate-y-[-2px]" />
    </motion.span>
  );
}

/* ------------------------------------------------------------------------------------------------
 * (e) Security: a shield in orbit of roles, the audit log and the organisation boundary.
 * ---------------------------------------------------------------------------------------------- */

export function AgentSecurity() {
  const s = copy[useLang()].security;
  const { ref, t } = useScene(9000, 0);
  const n = s.entries.length;
  const newest = Math.floor(t / 1800) % n;
  const shown = s.ago.map((_, i) => s.entries[(newest - i + n * 2) % n]);
  const icons = [Users, ScrollText, Lock];

  return (
    <div ref={ref} className="grid gap-4 md:grid-cols-[1fr_1fr]">
      <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-2xl bg-obsidian-2 ring-1 ring-white/10 md:aspect-auto md:min-h-[400px]">
        <div className="bg-grid-dark mask-fade-radial pointer-events-none absolute inset-0" />
        <svg viewBox="0 0 320 320" className="absolute inset-0 m-auto h-full max-h-[400px] w-full" aria-hidden>
          <defs>
            <linearGradient id="agent-shield" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#3b82f6" />
              <stop offset="1" stopColor="#8b5cf6" />
            </linearGradient>
            <radialGradient id="agent-halo">
              <stop offset="0" stopColor="#3b82f6" stopOpacity="0.45" />
              <stop offset="1" stopColor="#3b82f6" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="160" cy="160" r="120" fill="url(#agent-halo)" />
          {[70, 108, 142].map((r, i) => (
            <circle key={r} cx="160" cy="160" r={r} fill="none" stroke="rgb(255 255 255 / 0.09)" strokeDasharray={i === 1 ? "3 7" : undefined} />
          ))}
          <g className="animate-spin [animation-duration:36s]" style={{ transformOrigin: "160px 160px" }}>
            <circle cx="160" cy="18" r="3" fill="#93c5fd" />
            <circle cx="302" cy="160" r="2.5" fill="#8b5cf6" />
          </g>
          <g className="animate-spin [animation-direction:reverse] [animation-duration:24s]" style={{ transformOrigin: "160px 160px" }}>
            <circle cx="160" cy="52" r="2.5" fill="#8b5cf6" />
            <circle cx="66" cy="214" r="2" fill="#93c5fd" />
          </g>
          {[0, 1].map((i) => (
            <motion.circle key={i} cx="160" cy="160" fill="none" stroke="#3b82f6" strokeWidth="1.5" initial={{ r: 56, opacity: 0.5 }} animate={{ r: 150, opacity: 0 }} transition={{ duration: 3.2, repeat: Infinity, delay: i * 1.6, ease: "easeOut" }} />
          ))}
          <path d="M160 104 204 120v34c0 28-18.5 50-44 60-25.5-10-44-32-44-60v-34Z" fill="url(#agent-shield)" />
          <path d="M160 104 204 120v34c0 28-18.5 50-44 60-25.5-10-44-32-44-60v-34Z" fill="none" stroke="rgb(255 255 255 / 0.35)" strokeWidth="1.2" />
          <path d="M160 112 196 125v29c0 23-15 41-36 50" fill="none" stroke="rgb(255 255 255 / 0.25)" strokeWidth="1" />
        </svg>
        <Mark width={46} className="relative z-10 -mt-1 h-auto text-white" />
        {s.nodes.map((n, i) => {
          const Icon = icons[i];
          return (
            <span
              key={n}
              className={clsx(
                "absolute z-10 inline-flex items-center gap-1.5 rounded-full bg-white/[0.07] px-2.5 py-1 text-[11px] font-medium text-white/85 ring-1 ring-white/15 backdrop-blur",
                i === 0 && "top-[12%] left-[8%]",
                i === 1 && "top-[24%] right-[6%]",
                i === 2 && "bottom-[12%] left-1/2 -translate-x-1/2",
              )}
            >
              <Icon className="size-3.5 text-brand-300" /> {n}
            </span>
          );
        })}
      </div>

      <div className="flex flex-col gap-4">
        <div className="rounded-2xl bg-obsidian-2 p-4 ring-1 ring-white/10">
          <p className="ml-auto w-fit rounded-2xl rounded-br-md bg-white/10 px-3 py-2 text-[12.5px] text-white">{s.deniedCommand}</p>
          <div className="mt-3 flex gap-2.5">
            <AgentMark size="sm" ring="ring-obsidian-2" />
            <div className="min-w-0 flex-1 rounded-[14px] bg-danger/10 px-3 py-2.5 ring-1 ring-danger/30">
              <p className="flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.06em] text-[#fca5a5] uppercase">
                <Lock className="size-3" /> {s.deniedTitle}
              </p>
              <p className="mt-1 text-[12.5px] leading-snug text-white/80">{s.denied}</p>
            </div>
          </div>
        </div>
        <div className="flex-1 rounded-2xl bg-obsidian-2 p-4 ring-1 ring-white/10">
          <p className="flex items-center gap-2 font-mono text-[10.5px] tracking-[0.1em] text-white/40 uppercase">
            <ScrollText className="size-3.5" /> {s.log}
            <span className="relative ml-auto flex size-2">
              <span className="absolute inset-0 animate-ping rounded-full bg-ok/60" />
              <span className="relative size-2 rounded-full bg-ok" />
            </span>
          </p>
          <ul className="mt-3 space-y-2">
            <AnimatePresence initial={false} mode="popLayout">
              {shown.map((label, i) => (
                <motion.li
                  key={label}
                  layout
                  initial={{ opacity: 0, y: -14, scale: 0.98 }}
                  animate={{ opacity: 1 - i * 0.18, y: 0, scale: 1 }}
                  exit={{ opacity: 0, transition: { duration: 0.2 } }}
                  transition={{ duration: 0.45, ease }}
                  className="flex items-center gap-2.5 rounded-xl bg-white/[0.04] px-3 py-2 ring-1 ring-white/10"
                >
                  <span className="grid size-6 shrink-0 place-items-center rounded-lg bg-brand/20 text-brand-300">
                    <Sparkle size={9} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[12px] font-medium text-white">{label}</span>
                    <span className="block truncate text-[10.5px] text-white/45">{s.by}</span>
                  </span>
                  <span className="font-mono text-[10.5px] text-white/40">{s.ago[i]}</span>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        </div>
      </div>
    </div>
  );
}
