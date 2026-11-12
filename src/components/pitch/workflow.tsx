"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, useInView } from "motion/react";
import { ChannelLogo, type ChannelKind } from "@/components/channel-logo";
import { Plate } from "@/components/product/kit";
import { motion } from "./animation";
import { useT, type T } from "./lang";
import { Slide } from "./slide";
import { Chip, Code, Label, Logo, ease, logo, make, type Tone } from "./ui";

const STAGE_MS = 6500;

function svg(d: ReactNode, sw = 1.8) {
  return function renderIcon(c = "currentColor") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" className="h-full w-full">
        {d}
      </svg>
    );
  };
}
const I = {
  check: svg(<path d="m5 12.5 4.5 4.5L19 7.5" />, 2.4),
  x: svg(<path d="M6 6l12 12M18 6 6 18" />, 2.2),
  loop: svg(
    <>
      <path d="M20 12a8 8 0 1 1-2.34-5.66" />
      <path d="M20 4v4h-4" />
    </>,
    2,
  ),
  arrow: svg(<path d="M5 12h14M13 6l6 6-6 6" />, 2),
  sparkles: svg(
    <>
      <path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z" />
      <path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z" />
    </>,
    1.6,
  ),
  key: svg(
    <>
      <circle cx="8" cy="15" r="4" />
      <path d="m10.8 12.2 9.2-9.2M17 6l3 3M14.5 8.5l2 2" />
    </>,
    1.8,
  ),
  camera: svg(
    <>
      <path d="M4 8h3l2-3h6l2 3h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z" />
      <circle cx="12" cy="13" r="3.5" />
    </>,
    1.7,
  ),
  inbox: svg(
    <>
      <path d="M22 12h-6l-2 3h-4l-2-3H2" />
      <path d="M5.5 5h13l3.5 7v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-6z" />
    </>,
    1.7,
  ),
  calendar: svg(
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </>,
    1.7,
  ),
};
const Ico = ({ children, className = "h-4 w-4" }: { children: ReactNode; className?: string }) => <span className={`inline-flex shrink-0 ${className}`}>{children}</span>;

/** Replays an entrance animation when `play` is on; renders the end state otherwise. */
const enter = (play: boolean, delay: number, from: Record<string, number> = { opacity: 0, y: 8 }) =>
  play ? { initial: from, animate: { opacity: 1, x: 0, y: 0, scale: 1 }, transition: { duration: 0.5, delay, ease } } : { initial: false as const };

export function WorkflowSlide() {
  const t = useT();
  const ref = useRef(null);
  const on = useInView(ref, { once: false, margin: "-120px" });
  const [stage, setStage] = useState(0);
  const [cycle, setCycle] = useState(1);
  const skip = useRef(0);

  useEffect(() => {
    if (!on) return;
    const id = setInterval(() => {
      if (skip.current > 0) return void (skip.current -= 1);
      setStage((s) => {
        if (s === 3) setCycle((c) => c + 1);
        return (s + 1) % 4;
      });
    }, STAGE_MS);
    return () => clearInterval(id);
  }, [on]);

  const pick = (i: number) => {
    setStage(i);
    skip.current = 1;
  };

  const cards = [
    {
      num: "01",
      title: t("Inkoop & intake", "Purchase & intake"),
      short: t("Intake", "Intake"),
      desc: t(
        "Typ een kenteken en VINVARO haalt merk, model, APK en het tellerstandoordeel op bij de RDW. Je team doorloopt de intake op de telefoon, met foto's rondom, ook zonder bereik.",
        "Type a registration and VINVARO fetches make, model, MOT and the odometer verdict from the RDW. Your team runs the intake on their phone, with photos all round, even without signal.",
      ),
      art: <ArtIntake t={t} play />,
    },
    {
      num: "02",
      title: t("Voorbereiding & bevindingen", "Preparation & findings"),
      short: t("Voorbereiden", "Prepare"),
      desc: t(
        "Geen papieren checklist meer. Een fase gaat pas verder als de verplichte workflows af zijn. Verwacht twee sleutels, aangetroffen één? Dan wordt dat automatisch een bevinding en een taak, met de foto erbij.",
        "No more paper checklists. A stage only moves on once the required workflows are done. Expected two keys, found one? That automatically becomes a finding and a task, with the photo attached.",
      ),
      art: <ArtPrepare t={t} play />,
    },
    {
      num: "03",
      title: t("Inbox & verkoop", "Inbox & sales"),
      short: t("Verkopen", "Sell"),
      desc: t(
        "WhatsApp, Gmail en Outlook in één gedeelde inbox. AI labelt elk gesprek, geeft een leadscore en koppelt de juiste auto.",
        "WhatsApp, Gmail and Outlook in one shared inbox. AI labels every conversation, adds a lead score and links the right car.",
      ),
      art: <ArtSales t={t} play />,
    },
    {
      num: "04",
      title: t("Contract & aflevering", "Contract & delivery"),
      short: t("Afleveren", "Deliver"),
      desc: t(
        "De klant tekent de koopovereenkomst via een link en het afleverprotocol op de telefoon. De auto gaat vanzelf offline op alle kanalen.",
        "The customer signs the sales agreement via a link and the delivery protocol on the phone. The car goes offline on every channel by itself.",
      ),
      art: <ArtDeliver t={t} play />,
    },
  ];
  const active = cards[stage];

  return (
    <Slide id="oplossing" variant="white" className="!bg-canvas">
      <div className="pointer-events-none absolute inset-y-0 left-1/2 w-screen -translate-x-1/2">
        <div
          className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black_20%,transparent_70%)]"
          style={{
            backgroundImage: "linear-gradient(to right, rgb(11 15 20 / 0.045) 1px, transparent 1px), linear-gradient(to bottom, rgb(11 15 20 / 0.045) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <div ref={ref} className="relative mx-auto max-w-5xl">
        <div className="text-center">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={on ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mx-auto max-w-3xl text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] text-balance text-ink"
          >
            {t("Van kenteken tot aflevering, één workflow", "From registration to delivery, one workflow")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={on ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mx-auto mt-5 max-w-[600px] text-[clamp(1.0625rem,1.4vw,1.25rem)] leading-[1.55] tracking-[-0.011em] text-pretty text-muted"
          >
            {t(
              "VINVARO vervangt de losse lijstjes, telefoons en mappen. Elke auto doorloopt dezelfde fases, van inkoop tot de sleutels bij de klant.",
              "VINVARO replaces the scattered lists, phones and folders. Every car runs through the same stages, from purchase to the keys in the customer's hand.",
            )}
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={on ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mx-auto mt-10 flex w-fit items-center gap-1 rounded-full bg-white p-1 shadow-card"
        >
          {cards.map((c, i) => {
            const current = i === stage;
            return (
              <button
                key={c.num}
                type="button"
                onClick={() => pick(i)}
                className={`relative flex items-center gap-2 overflow-hidden rounded-full px-3.5 py-2 text-[13.5px] font-medium transition-colors duration-300 sm:px-4 ${
                  current ? "bg-brand text-white shadow-[0_4px_14px_-4px_rgba(37,99,235,0.6)]" : "text-muted hover:bg-sunken hover:text-ink"
                }`}
              >
                <span className={`font-mono text-[11.5px] ${current ? "text-white/60" : "text-subtle"}`}>{c.num}</span>
                <span className="hidden sm:inline">{c.short}</span>
                {current && on && (
                  <motion.span
                    key={`${stage}-${cycle}`}
                    className="absolute bottom-0 left-0 h-[2px] bg-white/40"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: STAGE_MS / 1000, ease: "linear" }}
                  />
                )}
              </button>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={on ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.25, ease }}
          className="mt-6 overflow-hidden rounded-[22px] bg-white shadow-float"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={`${stage}-${cycle}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid md:min-h-[440px] md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]"
            >
              <div className="flex flex-col justify-center p-8 md:p-11">
                <motion.h3 {...enter(true, 0.05)} className="text-[30px] leading-[1.1] font-semibold tracking-[-0.03em] text-balance text-ink md:text-[34px]">
                  {active.title}
                </motion.h3>
                <motion.p {...enter(true, 0.12)} className="mt-4 max-w-md text-[16px] leading-[1.6] text-muted">
                  {active.desc}
                </motion.p>
                <button
                  type="button"
                  onClick={() => pick((stage + 1) % 4)}
                  className="mt-8 inline-flex w-fit items-center gap-2 rounded-full px-0 text-[14px] font-medium text-ink transition-colors hover:text-brand"
                >
                  {stage === 3 ? t("Terug naar stap 01", "Back to step 01") : `${t("Volgende", "Next")}: ${cards[stage + 1].short}`}
                  <Ico className="h-4 w-4">{stage === 3 ? I.loop() : I.arrow()}</Ico>
                </button>
              </div>
              <div className="relative flex items-center justify-center border-t border-line bg-canvas p-6 md:border-t-0 md:border-l md:p-10">
                <div
                  className="pointer-events-none absolute inset-0 opacity-70"
                  style={{ backgroundImage: "radial-gradient(rgb(11 15 20 / 0.07) 1px, transparent 1px)", backgroundSize: "16px 16px" }}
                />
                <div className="relative w-full max-w-[400px]">{active.art}</div>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        <motion.p initial={{ opacity: 0 }} animate={on ? { opacity: 1 } : {}} transition={{ delay: 0.6 }} className="mt-6 flex items-center justify-center gap-2 text-[14px] text-muted">
          <Ico className="h-4 w-4 text-brand">{I.loop()}</Ico>
          {t(
            "Auto verkocht? Hij gaat offline op alle kanalen, en de volgende inkoop start weer bij de intake.",
            "Car sold? It goes offline on every channel, and the next purchase starts again at intake.",
          )}
        </motion.p>
      </div>
    </Slide>
  );
}

function ArtIntake({ t, play }: { t: T; play: boolean }) {
  const steps: [string, string][] = [
    [t("Kilometerstand vastgelegd", "Odometer recorded"), "34.512 km"],
    [t("Kentekenbewijs", "Registration document"), t("Aanwezig", "Present")],
    [t("Foto's rondom", "Photos all round"), "8/8"],
  ];
  return (
    <div className="space-y-3">
      <motion.div {...enter(play, 0.1)} className="rounded-2xl bg-white p-4 shadow-card">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-[13px] font-semibold text-ink">
            <Logo src={make("volkswagen")} contain /> Golf 1.5 eTSI
          </span>
          <Plate size="xs">R-512-FX</Plate>
        </div>
        <div className="mt-3 space-y-1.5 font-mono text-[12px] text-ink-2">
          {[
            [t("Eerste toelating", "First registration"), "14-03-2022"],
            [t("APK", "MOT"), t("nog 214 dagen", "214 days left")],
            [t("Tellerstand (NAP)", "Odometer (NAP)"), t("Logisch", "Logical")],
          ].map(([l, a], i) => (
            <motion.p key={l} {...enter(play, 0.35 + i * 0.12, { opacity: 0, x: -6 })} className="flex justify-between">
              <span>{l}</span>
              <span className={i > 0 ? "text-ok" : ""}>{a}</span>
            </motion.p>
          ))}
        </div>
        <p className="mt-3 flex items-center gap-2 border-t border-line pt-2.5 text-[12px] font-medium text-ok">
          <Logo src={logo("rdw")} size={16} /> {t("Opgehaald bij de RDW", "Retrieved from the RDW")}
        </p>
      </motion.div>

      <motion.div {...enter(play, 0.7)} className="overflow-hidden rounded-2xl bg-white shadow-card">
        <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
          <span className="flex items-center gap-1.5 text-[12.5px] font-semibold text-ink">
            <Ico className="h-3.5 w-3.5 text-brand">{I.camera()}</Ico>
            {t("Intake · team-app", "Intake · staff app")}
          </span>
          <span className="font-mono text-[10.5px] text-subtle">{t("STAP 4/6", "STEP 4/6")}</span>
        </div>
        {steps.map(([label, value], i) => (
          <motion.div key={label} {...enter(play, 0.9 + i * 0.18, { opacity: 0, x: 10 })} className="flex items-center gap-2.5 border-b border-line px-4 py-2.5 text-[12.5px] last:border-0">
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-brand p-[3px] text-white">{I.check()}</span>
            <span className="min-w-0 flex-1 truncate text-ink-2">{label}</span>
            <Chip tone="brand">{value}</Chip>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

function ArtPrepare({ t, play }: { t: T; play: boolean }) {
  const stages: { name: string; progress: string; tone: Tone; status: string }[] = [
    { name: t("Intake", "Intake"), progress: "6/6", tone: "green", status: t("Klaar", "Done") },
    { name: t("Poetsen", "Valeting"), progress: "4/7", tone: "brand", status: t("Bezig", "In progress") },
    { name: t("Fotografie", "Photography"), progress: "0/12", tone: "neutral", status: t("Verplicht", "Required") },
  ];
  return (
    <div className="space-y-3">
      <motion.div {...enter(play, 0.1)} className="rounded-2xl bg-white p-4 shadow-card">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-[13px] font-semibold text-ink">
            <Ico className="h-3.5 w-3.5 text-warn">{I.key()}</Ico>
            {t("Bevinding · sleutels", "Finding · keys")}
          </span>
          <span className="flex items-center gap-1.5 text-[11.5px] text-muted">
            <Logo src={make("bmw")} size={16} contain /> BMW 320e
          </span>
        </div>
        <motion.div {...enter(play, 0.35, { opacity: 0, x: 10 })} className="mt-3 flex items-center gap-2 rounded-xl bg-warn-50 px-3 py-2 ring-1 ring-warn/25">
          <span className="text-[12px] text-muted">{t("Verwacht", "Expected")}</span>
          <span className="rounded-md bg-white px-1.5 font-mono text-[12px] ring-1 ring-line">2</span>
          <span className="text-[12px] text-muted">{t("Aangetroffen", "Found")}</span>
          <span className="rounded-md bg-warn px-1.5 font-mono text-[12px] text-white">1</span>
          <span className="ml-auto">
            <Chip tone="orange">{t("Taak voor Sanne", "Task for Sanne")}</Chip>
          </span>
        </motion.div>
        <div className="mt-2">
          {stages.map((s, i) => (
            <motion.div key={s.name} {...enter(play, 0.6 + i * 0.2, { opacity: 0, x: 10 })} className="flex items-center gap-3 border-t border-line py-2.5 first:border-0">
              <span className="min-w-0 flex-1 truncate font-mono text-[11.5px] text-muted">{s.name}</span>
              <Code>{s.progress}</Code>
              <Chip tone={s.tone}>{s.status}</Chip>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div {...enter(play, 1.25)} className="flex items-start gap-2.5 rounded-2xl bg-white px-4 py-3 shadow-card">
        <span className="mt-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-danger-50 p-[3px] text-danger">{I.x()}</span>
        <div>
          <Label>{t("Papieren checklist", "Paper checklist")}</Label>
          <p className="mt-0.5 text-[13px] text-muted">
            <span className="line-through decoration-danger/60">{t("'Sleutels: ok', verder geen foto of naam", "'Keys: ok', no photo or name")}</span>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

function ArtSales({ t, play }: { t: T; play: boolean }) {
  const rows: { name: string; kind: ChannelKind; car: string; make: string; label: string; score: number; result: string; tone: Tone }[] = [
    { name: "Mark Jansen", kind: "whatsapp", car: "XC40 Recharge", make: "volvo", label: t("Proefrit", "Test drive"), score: 86, result: t("Ingepland", "Booked"), tone: "green" },
    { name: "Lisa de Boer", kind: "gmail", car: "Polo", make: "volkswagen", label: t("Inruil", "Trade-in"), score: 72, result: t("Concept klaar", "Draft ready"), tone: "purple" },
    { name: "Garage Smit B.V.", kind: "outlook", car: "3× Kangoo", make: "renault", label: t("Zakelijk", "Business"), score: 64, result: t("Deal", "Deal"), tone: "brand" },
  ];
  return (
    <motion.div {...enter(play, 0.1)} className="overflow-hidden rounded-2xl bg-white shadow-card">
      <div className="flex items-center justify-between border-b border-line px-4 py-3">
        <span className="flex items-center gap-2 text-[12.5px] font-medium text-ink">
          <Ico className="h-4 w-4 text-brand">{I.inbox()}</Ico> {t("Inbox · alle kanalen", "Inbox · all channels")}
        </span>
        <span className="flex items-center gap-1.5 rounded-lg bg-brand px-2.5 py-1 text-[11.5px] font-medium text-white">
          <Ico className="h-3 w-3">{I.sparkles("#fff")}</Ico>
          {t("Labelen met AI", "Label with AI")}
        </span>
      </div>
      {rows.map((r, i) => (
        <motion.div key={r.name} {...enter(play, 0.35 + i * 0.3, { opacity: 0, x: 10 })} className="border-b border-line px-4 py-3 last:border-0">
          <div className="flex items-center gap-2.5 text-[12.5px]">
            <span className="flex h-5 w-5 items-center justify-center">
              <ChannelLogo kind={r.kind} size={16} />
            </span>
            <span className="min-w-0 flex-1 truncate font-medium text-ink">{r.name}</span>
            <span className="flex items-center gap-1 font-mono text-[11px] text-ask">
              <Ico className="h-3 w-3">{I.sparkles()}</Ico>
              {r.score}
            </span>
          </div>
          <div className="mt-1.5 flex items-center justify-between pl-[30px]">
            <span className="flex items-center gap-1.5 font-mono text-[11px] text-subtle">
              <Logo src={make(r.make)} size={14} contain /> {r.car} · {r.label}
            </span>
            <Chip tone={r.tone}>{r.result}</Chip>
          </div>
        </motion.div>
      ))}
      <div className="flex items-center gap-1.5 border-t border-line bg-canvas px-4 py-2.5 text-[11.5px] text-muted">
        <Ico className="h-3.5 w-3.5 text-ok">{I.calendar()}</Ico>
        {t("3 gesprekken gelabeld · 1 proefrit in de agenda", "3 conversations labelled · 1 test drive in the calendar")}
      </div>
    </motion.div>
  );
}

function ArtDeliver({ t, play }: { t: T; play: boolean }) {
  return (
    <div className="mx-auto w-[260px] rounded-[34px] bg-ink p-[6px] shadow-float">
      <div className="relative overflow-hidden rounded-[29px] bg-canvas px-3 pt-9 pb-4">
        <div className="absolute top-2 left-1/2 h-[18px] w-16 -translate-x-1/2 rounded-full bg-ink" />
        <motion.div {...enter(play, 0.15)} className="flex items-center gap-2 rounded-xl bg-white px-3 py-2 shadow-card">
          <Logo src={make("volvo")} size={18} contain />
          <span className="flex-1 text-[12px] font-medium text-ink">XC40 Recharge</span>
          <span className="font-mono text-[11.5px] text-ink">€ 38.950</span>
        </motion.div>

        <motion.div {...enter(play, 0.45)} className="mt-2.5 rounded-xl bg-white p-2.5 ring-1 ring-line">
          <p className="font-mono text-[9.5px] text-subtle uppercase">{t("Koopovereenkomst · teken hieronder", "Sales agreement · sign below")}</p>
          <svg viewBox="0 0 220 60" className="mt-1 w-full" aria-hidden>
            <motion.path
              d="M10 40 C 22 14, 36 16, 38 34 S 52 54, 62 30 C 68 18, 76 20, 78 34 C 80 46, 92 46, 98 30 L 108 18 C 114 38, 126 44, 142 30 C 156 18, 172 28, 206 22"
              fill="none"
              stroke="#1d4ed8"
              strokeWidth="2.4"
              strokeLinecap="round"
              initial={play ? { pathLength: 0 } : false}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.4, delay: 0.7, ease }}
            />
            <line x1="8" y1="52" x2="212" y2="52" stroke="#cbd5e1" strokeDasharray="3 4" />
          </svg>
        </motion.div>

        <motion.div {...enter(play, 1.5)} className="mt-2 ml-auto max-w-[88%] rounded-xl rounded-tr-sm bg-brand p-2.5 text-white">
          <p className="text-[12px]">{t("Afleverprotocol afgerond", "Delivery protocol completed")}</p>
          <span className="mt-1.5 inline-flex items-center gap-1 rounded-md bg-white/15 px-1.5 py-0.5 font-mono text-[10px]">
            <Ico className="h-2.5 w-2.5">{I.key("#fff")}</Ico> {t("2/2 sleutels · 18.412 km", "2/2 keys · 18,412 km")}
          </span>
        </motion.div>

        <motion.div {...enter(play, 2)} className="mt-3 flex justify-center">
          <Chip tone="green">{t("Offline op alle kanalen", "Offline on every channel")}</Chip>
        </motion.div>
      </div>
    </div>
  );
}
