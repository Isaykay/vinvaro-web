"use client";

import clsx from "clsx";
import { AlertTriangle, CalendarDays, Car as CarIcon, Check, ClipboardCheck, Inbox, LayoutGrid, Plus, Rocket, Search, Users } from "lucide-react";
import { useLang } from "@/components/lang-provider";
import { defineCopy } from "@/lib/i18n";
import { Mark } from "@/components/ui";
import { ChannelLogo } from "@/components/channel-logo";
import { AppWindow, BrandLogo, Car, Dot, Pill, Plate, delay } from "@/components/product/kit";

const copy = defineCopy({
  nl: {
    greeting: "Goedemorgen, Sanne",
    sub: "Donderdag · 4 proefritten vandaag",
    search: "Zoek op kenteken, VIN of klant",
    add: "Voertuig",
    kpis: [
      ["In voorraad", "48", "+3"],
      ["Verkoopklaar", "12", "+2"],
      ["Open bevindingen", "3", "−1"],
      ["Proefritten vandaag", "4", ""],
    ],
    stages: ["Intake", "Inspectie", "Voorbereiding", "Verkoop", "Aflevering"],
    intake: "Intake 3/8",
    finding: "1 bevinding",
    valet: "Poetsen",
    photos: "Fotografie",
    online: "Online",
    handover: "Za 10:00",
    gate: "Verplicht voor Verkoop",
    toastWa: "Is de XC40 nog beschikbaar? Kan ik zaterdag een proefrit maken?",
    testDrive: "Proefrit",
    lead: "Lead 86",
    findingTitle: "Tweede sleutel ontbreekt",
    findingBody: "BMW 320e · Intake · verwacht 2, aangetroffen 1",
    published: "Gepubliceerd",
    illustrative: "Illustratie",
  },
  en: {
    greeting: "Good morning, Sanne",
    sub: "Thursday · 4 test drives today",
    search: "Search registration, VIN or customer",
    add: "Vehicle",
    kpis: [
      ["In stock", "48", "+3"],
      ["Sale-ready", "12", "+2"],
      ["Open findings", "3", "−1"],
      ["Test drives today", "4", ""],
    ],
    stages: ["Intake", "Inspection", "Preparation", "Sales", "Delivery"],
    intake: "Intake 3/8",
    finding: "1 finding",
    valet: "Valeting",
    photos: "Photography",
    online: "Online",
    handover: "Sat 10:00",
    gate: "Required for Sales",
    toastWa: "Is the XC40 still available? Could I take a test drive on Saturday?",
    testDrive: "Test drive",
    lead: "Lead 86",
    findingTitle: "Second key missing",
    findingBody: "BMW 320e · Intake · expected 2, found 1",
    published: "Published",
    illustrative: "Illustrative",
  },
});

type CardData = { make: string; model: string; plate: string; tag: React.ReactNode; progress?: number; pulse?: boolean };

function VehicleCard({ c, i }: { c: CardData; i: number }) {
  return (
    <div
      className={clsx("animate-row-in rounded-xl bg-surface p-2.5 shadow-card", c.pulse && "animate-soft-pulse ring-1 ring-brand/40")}
      style={delay(0.35 + i * 0.08)}
    >
      <div className="flex items-center gap-2">
        <BrandLogo make={c.make} className="size-7" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-[11.5px] font-semibold tracking-[-0.01em]">{c.model}</p>
          <Plate className="mt-0.5">{c.plate}</Plate>
        </div>
      </div>
      {c.progress !== undefined && (
        <div className="mt-2.5 h-1 overflow-hidden rounded-full bg-sunken">
          <span className="block h-full origin-left animate-progress rounded-full bg-brand" style={{ width: `${c.progress}%`, ...delay(i * 0.3) }} />
        </div>
      )}
      <div className="mt-2 flex flex-wrap gap-1">{c.tag}</div>
    </div>
  );
}

export function HeroWorkspace() {
  const t = copy[useLang()];
  const columns: CardData[][] = [
    [{ make: "volkswagen", model: "Golf 1.5 eTSI", plate: "R-512-FX", tag: <Pill tone="brand">{t.intake}</Pill>, progress: 38 }],
    [
      {
        make: "bmw",
        model: "320e Touring",
        plate: "S-208-KL",
        tag: (
          <Pill tone="warn">
            <AlertTriangle className="size-2.5" /> {t.finding}
          </Pill>
        ),
        pulse: true,
      },
    ],
    [
      { make: "kia", model: "EV6 GT-Line", plate: "T-114-NB", tag: <Pill>{t.valet}</Pill>, progress: 64 },
      { make: "mercedes-benz", model: "A 250 e", plate: "L-390-PZ", tag: <Pill>{t.photos}</Pill>, progress: 82 },
    ],
    [
      {
        make: "volvo",
        model: "XC40 Recharge",
        plate: "P-771-RD",
        tag: (
          <>
            <Pill tone="ok">
              <Dot className="bg-ok" /> {t.online}
            </Pill>
            <Pill>mobile.de</Pill>
          </>
        ),
      },
    ],
    [{ make: "peugeot", model: "308 SW Hybrid", plate: "N-009-GH", tag: <Pill tone="brand">{t.handover}</Pill> }],
  ];
  const nav = [LayoutGrid, CarIcon, Inbox, ClipboardCheck, Users, CalendarDays, Rocket];
  return (
    <div className="relative">
      <AppWindow>
        <div className="grid grid-cols-[48px_1fr] sm:grid-cols-[56px_1fr]">
          <aside className="flex flex-col items-center gap-1.5 bg-obsidian py-3.5">
            <span className="mb-3 flex size-8 items-center justify-center rounded-lg bg-white/[0.06]">
              <Mark className="h-3 w-auto text-white" />
            </span>
            {nav.map((Icon, i) => (
              <span key={i} className={clsx("flex size-8 items-center justify-center rounded-lg", i === 1 ? "bg-brand text-white" : "text-white/40")}>
                <Icon className="size-4" strokeWidth={1.9} />
              </span>
            ))}
          </aside>
          <div className="min-w-0 bg-canvas p-3.5 sm:p-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-[15px] font-semibold tracking-[-0.02em] sm:text-[17px]">{t.greeting}</p>
                <p className="text-[11.5px] text-muted">{t.sub}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="hidden h-8 items-center gap-2 rounded-lg bg-surface px-3 text-[11.5px] text-subtle ring-1 ring-line md:flex">
                  <Search className="size-3.5" /> {t.search}
                  <kbd className="ml-4 rounded bg-sunken px-1 font-mono text-[10px]">⌘K</kbd>
                </span>
                <span className="flex h-8 items-center gap-1 rounded-lg bg-brand px-3 text-[11.5px] font-semibold text-white">
                  <Plus className="size-3.5" /> {t.add}
                </span>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2 lg:grid-cols-4">
              {t.kpis.map(([label, value, delta], i) => (
                <div key={label} className="animate-row-in rounded-xl bg-surface p-3 shadow-card" style={delay(0.1 + i * 0.06)}>
                  <p className="text-[10.5px] text-muted">{label}</p>
                  <p className="mt-1 flex items-baseline gap-1.5">
                    <span className="text-[20px] font-semibold tracking-[-0.03em] tabular-nums">{value}</span>
                    {delta && <span className={clsx("font-mono text-[10px]", delta.startsWith("−") ? "text-ok" : "text-brand")}>{delta}</span>}
                  </p>
                  <div className="mt-2 flex h-5 items-end gap-[3px]">
                    {[40, 55, 35, 70, 50, 80, 65].map((h, j) => (
                      <span
                        key={j}
                        className={clsx("flex-1 origin-bottom animate-row-in rounded-sm", j === 6 ? "bg-brand" : "bg-brand-100")}
                        style={{ height: `${h - i * 5}%`, ...delay(0.3 + j * 0.05) }}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2 md:grid-cols-5">
              {columns.map((col, ci) => (
                <div key={ci} className={clsx("rounded-xl bg-sunken/70 p-2 ring-1 ring-line/70", ci > 1 && "hidden md:block")}>
                  <div className="mb-2 flex items-center justify-between px-1">
                    <p className="text-[11px] font-semibold text-ink-2">{t.stages[ci]}</p>
                    <span className="font-mono text-[10px] text-subtle">{[6, 4, 9, 12, 3][ci]}</span>
                  </div>
                  <div className="space-y-2">
                    {col.map((c, i) => (
                      <VehicleCard key={c.plate} c={c} i={ci + i} />
                    ))}
                  </div>
                  {ci === 2 && (
                    <p className="mt-2 flex items-center gap-1 px-1 text-[9.5px] text-muted">
                      <ClipboardCheck className="size-3 text-brand" /> {t.gate}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </AppWindow>

      <div className="pointer-events-none absolute -top-6 -right-4 hidden w-[290px] animate-toast-in rounded-2xl bg-surface p-3.5 shadow-float lg:block xl:-right-14" style={delay(1.1)}>
        <div className="flex items-center gap-2">
          <ChannelLogo kind="whatsapp" size={16} />
          <span className="text-[12px] font-semibold">Mark Jansen</span>
          <span className="ml-auto font-mono text-[10px] text-subtle">09:41</span>
        </div>
        <p className="mt-2 rounded-xl rounded-tl-sm bg-[#e7fbe0] px-3 py-2 text-[12px] leading-snug text-ink-2">{t.toastWa}</p>
        <div className="mt-2 flex gap-1.5">
          <Pill tone="brand">{t.testDrive}</Pill>
          <Pill tone="ai">✦ {t.lead}</Pill>
        </div>
      </div>

      <div className="pointer-events-none absolute -bottom-8 -left-4 hidden w-[280px] animate-toast-in rounded-2xl bg-surface p-3.5 shadow-float lg:block xl:-left-12" style={delay(1.7)}>
        <div className="flex items-start gap-2.5">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-warn-50 text-warn">
            <AlertTriangle className="size-4" />
          </span>
          <div>
            <p className="text-[12.5px] font-semibold">{t.findingTitle}</p>
            <p className="mt-0.5 text-[11px] leading-snug text-muted">{t.findingBody}</p>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute right-6 -bottom-6 hidden animate-toast-in items-center gap-2 rounded-full bg-ink py-2 pr-4 pl-2 text-white shadow-float lg:flex" style={delay(2.3)}>
        <span className="flex size-6 items-center justify-center rounded-full bg-ok">
          <Check className="size-3.5" strokeWidth={3} />
        </span>
        <span className="text-[12px] font-medium">{t.published}</span>
        <span className="text-[11px] text-white/55">mobile.de · AutoScout24</span>
      </div>
    </div>
  );
}

const journeyCopy = defineCopy({
  nl: { stages: ["Intake", "Inspectie", "Voorbereiding", "Verkoop", "Aflevering"], notes: ["Kenteken via RDW", "Afwijking → bevinding", "Poetsen · foto's", "Online · proefrit", "Getekend · sleutels"] },
  en: { stages: ["Intake", "Inspection", "Preparation", "Sales", "Delivery"], notes: ["Registration via RDW", "Deviation → finding", "Valeting · photos", "Online · test drive", "Signed · keys"] },
});

/** A car driving along a road through the five stages; each marker lights up as it passes. */
export function VehicleJourney({ dark }: { dark?: boolean }) {
  const t = journeyCopy[useLang()];
  const duration = 14;
  return (
    <div className="relative">
      <div className="relative h-[86px] sm:h-[130px]">
        <div className={clsx("mask-fade-x absolute inset-x-0 bottom-0 h-[26px] rounded-md sm:h-[34px]", dark ? "bg-obsidian-2" : "bg-line")}>
          <svg viewBox="0 0 1000 10" preserveAspectRatio="none" className="absolute inset-x-0 top-1/2 h-1 w-full -translate-y-1/2" aria-hidden>
            <line x1="0" y1="5" x2="1000" y2="5" stroke={dark ? "#334155" : "#ffffff"} strokeWidth="6" strokeDasharray="22 16" className="animate-dash" style={{ animationDuration: "0.6s" }} />
          </svg>
        </div>
        <div className="absolute inset-x-[4%] bottom-[12px] sm:bottom-[16px]">
          <div className="absolute bottom-0 left-0 w-[17%]" style={{ animation: `journey ${duration}s cubic-bezier(0.45,0,0.55,1) infinite` }}>
            <Car tone={dark ? "dark" : "light"} spin className="w-full drop-shadow-[0_10px_14px_rgb(11_15_20/0.18)]" />
          </div>
        </div>
      </div>
      <ol className="mt-6 grid grid-cols-5 gap-2">
        {t.stages.map((s, i) => (
          <li key={s} className="text-center">
            <span
              className={clsx("mx-auto flex size-7 items-center justify-center rounded-full font-mono text-[11px] ring-1", dark ? "bg-obsidian-2 text-white/50 ring-white/10" : "bg-surface text-subtle ring-line")}
              style={{ animation: `stage-lit ${duration}s linear infinite`, animationDelay: `${(0.1 + i * 0.18) * duration}s` }}
            >
              {i + 1}
            </span>
            <p className={clsx("mt-2 text-[13px] font-semibold tracking-[-0.01em] sm:text-[14px]", dark ? "text-white" : "text-ink")}>{s}</p>
            <p className={clsx("mt-0.5 hidden text-[12px] sm:block", dark ? "text-white/50" : "text-muted")}>{t.notes[i]}</p>
          </li>
        ))}
      </ol>
      <style>{`
        @keyframes journey {
          0% { transform: translateX(-70%); opacity: 0; }
          4% { opacity: 1; }
          10%, 16% { transform: translateX(-12%); }
          28%, 34% { transform: translateX(116%); }
          46%, 52% { transform: translateX(244%); }
          64%, 70% { transform: translateX(372%); }
          82%, 88% { transform: translateX(500%); opacity: 1; }
          100% { transform: translateX(600%); opacity: 0; }
        }
        @keyframes stage-lit {
          0% { background: var(--color-brand); color: #fff; box-shadow: 0 0 0 6px rgb(37 99 235 / 0.18); }
          9% { background: var(--color-brand); color: #fff; box-shadow: 0 0 0 0 rgb(37 99 235 / 0); }
          12%, 100% { }
        }
      `}</style>
    </div>
  );
}
