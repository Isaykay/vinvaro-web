"use client";

import clsx from "clsx";
import { AlertTriangle, Camera, Check, CloudOff, FileText, Image as ImageIcon, KeyRound, ScanLine, Sparkles, Upload } from "lucide-react";
import { useLang } from "@/components/lang-provider";
import { defineCopy } from "@/lib/i18n";
import { AppWindow, BrandLogo, Car, Phone, Pill, Plate, delay } from "@/components/product/kit";

const copy = defineCopy({
  nl: {
    dossier: "Voertuigdossier",
    tabs: ["Overzicht", "Foto's", "Workflows", "Verkoop", "Historie"],
    rdw: "Opgehaald bij de RDW",
    rows: [
      ["Merk", "Volkswagen"],
      ["Model", "Golf 1.5 eTSI Life"],
      ["Brandstof", "Benzine / hybride"],
      ["Eerste toelating", "14-03-2022"],
    ],
    apk: "APK",
    apkValue: "nog 214 dagen",
    odo: "Tellerstand (NAP)",
    odoValue: "Logisch",
    stock: "Voorraadperiode",
    asking: "Vraagprijs",
    history: [
      ["Intake afgerond", "Ma 09:12"],
      ["Bevinding gesloten", "Ma 14:30"],
      ["Gepubliceerd op mobile.de", "Di 10:05"],
    ],
    runTitle: "Intake · Volkswagen Golf",
    stepOf: "Stap 4 van 6",
    steps: [
      ["Kilometerstand vastgelegd", "34.512 km"],
      ["Kentekenbewijs aanwezig", "Aanwezig"],
      ["Foto's rondom", "8/8"],
    ],
    keys: "Sleutels",
    expected: "Verwacht",
    found: "Aangetroffen",
    deviation: "Afwijking: bij afronden wordt hier een bevinding voor aangemaakt.",
    signature: "Handtekening",
    signHere: "Teken hieronder",
    stages: ["Intake", "Inspectie", "Voorbereiding", "Verkoop"],
    gate: "Verplicht",
    scan: "Analyse van inspectiefoto's",
    findingTitle: "Mogelijke kras",
    findingBody: "Linkerzijde, achterportier. Controleer de originele foto.",
    aiSuggestion: "AI-voorstel",
    confirm: "Bevestigen",
    reject: "Afwijzen",
    docTitle: "Inkoopfactuur.pdf",
    docRows: [
      ["Kenteken", "R-512-FX"],
      ["Inkoopprijs", "€ 18.250"],
      ["Btw/marge", "Marge"],
    ],
    reading: "Gegevens voorgesteld · controleer en sla op",
    appTitle: "Intake",
    appCar: "Kia EV6 · T-114-NB",
    zones: ["Voor", "Links", "Achter", "Rechts"],
    offline: "Op dit toestel opgeslagen. Twee uploads wachten op verbinding.",
    sent: "Alles verstuurd",
    tasks: "Vandaag",
    taskList: ["Intake Kia EV6", "Proefrit XC40 · 11:00", "Aflevering 308 · 15:30"],
  },
  en: {
    dossier: "Vehicle dossier",
    tabs: ["Overview", "Photos", "Workflows", "Sales", "History"],
    rdw: "Retrieved from the RDW",
    rows: [
      ["Make", "Volkswagen"],
      ["Model", "Golf 1.5 eTSI Life"],
      ["Fuel", "Petrol / hybrid"],
      ["First registration", "14-03-2022"],
    ],
    apk: "MOT",
    apkValue: "214 days left",
    odo: "Odometer (NAP)",
    odoValue: "Logical",
    stock: "Stock period",
    asking: "Asking price",
    history: [
      ["Intake completed", "Mon 09:12"],
      ["Finding closed", "Mon 14:30"],
      ["Published on mobile.de", "Tue 10:05"],
    ],
    runTitle: "Intake · Volkswagen Golf",
    stepOf: "Step 4 of 6",
    steps: [
      ["Odometer recorded", "34,512 km"],
      ["Registration document", "Present"],
      ["Photos all round", "8/8"],
    ],
    keys: "Keys",
    expected: "Expected",
    found: "Found",
    deviation: "Deviation: completing the run creates a finding for this.",
    signature: "Signature",
    signHere: "Sign below",
    stages: ["Intake", "Inspection", "Preparation", "Sales"],
    gate: "Required",
    scan: "Analysing inspection photos",
    findingTitle: "Possible scratch",
    findingBody: "Left side, rear door. Review the original photo.",
    aiSuggestion: "AI suggestion",
    confirm: "Confirm",
    reject: "Reject",
    docTitle: "Purchase-invoice.pdf",
    docRows: [
      ["Registration", "R-512-FX"],
      ["Purchase price", "€18,250"],
      ["VAT/margin", "Margin"],
    ],
    reading: "Data suggested · check and save",
    appTitle: "Intake",
    appCar: "Kia EV6 · T-114-NB",
    zones: ["Front", "Left", "Rear", "Right"],
    offline: "Saved on this device. Two uploads are waiting for a connection.",
    sent: "Everything sent",
    tasks: "Today",
    taskList: ["Intake Kia EV6", "Test drive XC40 · 11:00", "Delivery 308 · 15:30"],
  },
});

export function VehicleDossier() {
  const t = copy[useLang()];
  return (
    <AppWindow>
      <div className="grid gap-0 md:grid-cols-[1.15fr_1fr]">
        <div className="border-b border-line p-5 md:border-r md:border-b-0">
          <div className="flex items-center gap-3">
            <BrandLogo make="volkswagen" className="size-10" />
            <div>
              <p className="font-mono text-[10px] tracking-[0.1em] text-subtle uppercase">{t.dossier}</p>
              <p className="text-[16px] font-semibold tracking-[-0.02em]">Golf 1.5 eTSI Life</p>
            </div>
            <Plate size="md" className="ml-auto">R-512-FX</Plate>
          </div>
          <div className="bg-stage relative mt-4 overflow-hidden rounded-xl px-6 pt-7 pb-3">
            <div className="bg-dots pointer-events-none absolute inset-0 opacity-50" />
            <Car className="relative mx-auto w-full max-w-[340px] animate-float" />
          </div>
          <div className="mt-4 flex gap-1 overflow-hidden">
            {t.tabs.map((tab, i) => (
              <span key={tab} className={clsx("rounded-lg px-2.5 py-1 text-[11.5px] font-medium", i === 0 ? "bg-ink text-white" : "text-muted")}>
                {tab}
              </span>
            ))}
          </div>
          <ol className="mt-4 space-y-2.5">
            {t.history.map(([label, time], i) => (
              <li key={label} className="flex animate-row-in items-center gap-2.5 text-[12px]" style={delay(1.4 + i * 0.15)}>
                <span className="flex size-5 items-center justify-center rounded-full bg-ok-50 text-ok">
                  <Check className="size-3" strokeWidth={3} />
                </span>
                <span className="text-ink-2">{label}</span>
                <span className="ml-auto font-mono text-[10.5px] text-subtle">{time}</span>
              </li>
            ))}
          </ol>
        </div>
        <div className="p-5">
          <p className="flex items-center gap-2 text-[11.5px] font-medium text-ok">
            <span className="relative flex size-2">
              <span className="absolute inset-0 animate-ping rounded-full bg-ok/60" />
              <span className="relative size-2 rounded-full bg-ok" />
            </span>
            {t.rdw}
          </p>
          <dl className="mt-3 divide-y divide-line rounded-xl ring-1 ring-line">
            {t.rows.map(([k, v], i) => (
              <div key={k} className="flex items-center justify-between px-3.5 py-2.5 text-[12.5px]">
                <dt className="text-muted">{k}</dt>
                <dd className="animate-row-in font-medium" style={delay(0.3 + i * 0.12)}>
                  {v}
                </dd>
              </div>
            ))}
          </dl>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <div className="animate-row-in rounded-xl bg-ok-50 p-3 ring-1 ring-ok/15" style={delay(0.9)}>
              <p className="text-[10.5px] text-ok/80">{t.apk}</p>
              <p className="mt-0.5 text-[13px] font-semibold text-ok">{t.apkValue}</p>
            </div>
            <div className="animate-row-in rounded-xl bg-ok-50 p-3 ring-1 ring-ok/15" style={delay(1)}>
              <p className="text-[10.5px] text-ok/80">{t.odo}</p>
              <p className="mt-0.5 text-[13px] font-semibold text-ok">{t.odoValue}</p>
            </div>
          </div>
          <div className="mt-3 rounded-xl bg-canvas p-3.5 ring-1 ring-line">
            <div className="flex items-center justify-between text-[11.5px]">
              <span className="text-muted">{t.stock}</span>
              <span className="font-mono text-ink-2">V-2026-041</span>
            </div>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-[11.5px] text-muted">{t.asking}</span>
              <span className="text-[20px] font-semibold tracking-[-0.03em] tabular-nums">€ 24.950</span>
            </div>
          </div>
        </div>
      </div>
    </AppWindow>
  );
}

export function WorkflowRun() {
  const t = copy[useLang()];
  return (
    <div className="grid gap-4 md:grid-cols-[1.2fr_0.8fr]">
      <div className="rounded-2xl bg-surface p-5 shadow-float">
        <div className="flex items-center justify-between">
          <p className="text-[14px] font-semibold tracking-[-0.015em]">{t.runTitle}</p>
          <span className="font-mono text-[10.5px] text-subtle">{t.stepOf}</span>
        </div>
        <div className="mt-3 flex gap-1">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <span key={i} className={clsx("h-1 flex-1 rounded-full", i < 3 ? "bg-brand" : i === 3 ? "animate-pulse bg-brand/50" : "bg-sunken")} />
          ))}
        </div>
        <ul className="mt-4 space-y-2">
          {t.steps.map(([label, value], i) => (
            <li key={label} className="flex animate-row-in items-center gap-3 rounded-xl bg-canvas px-3 py-2.5 ring-1 ring-line" style={delay(0.2 + i * 0.25)}>
              <span className="flex size-5 items-center justify-center rounded-full bg-brand text-white">
                <Check className="size-3" strokeWidth={3} />
              </span>
              <span className="text-[12.5px] text-ink-2">{label}</span>
              <span className="ml-auto text-[12px] font-medium">{value}</span>
            </li>
          ))}
        </ul>
        <div className="mt-2 animate-row-in rounded-xl bg-warn-50/70 p-3 ring-1 ring-warn/25" style={delay(1.1)}>
          <div className="flex items-center gap-2.5">
            <span className="flex size-7 items-center justify-center rounded-lg bg-surface text-warn ring-1 ring-warn/20">
              <KeyRound className="size-3.5" />
            </span>
            <span className="text-[12.5px] font-medium">{t.keys}</span>
            <span className="ml-auto flex items-center gap-1.5 text-[11.5px]">
              <span className="text-muted">{t.expected}</span>
              <span className="rounded-md bg-surface px-1.5 font-mono ring-1 ring-line">2</span>
              <span className="text-muted">{t.found}</span>
              <span className="rounded-md bg-warn px-1.5 font-mono text-white">1</span>
            </span>
          </div>
          <p className="mt-2 flex items-start gap-1.5 text-[11px] leading-snug text-warn">
            <AlertTriangle className="mt-px size-3 shrink-0" /> {t.deviation}
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="rounded-2xl bg-surface p-5 shadow-float">
          <p className="text-[12.5px] font-semibold">{t.signature}</p>
          <p className="text-[11px] text-muted">{t.signHere}</p>
          <div className="mt-3 rounded-xl border border-dashed border-line-strong bg-canvas">
            <svg viewBox="0 0 240 90" className="w-full" aria-hidden>
              <path
                d="M18 62 C 30 30, 44 30, 46 52 S 60 76, 70 48 C 76 34, 84 34, 86 50 C 88 64, 98 64, 104 46 C 110 30, 120 40, 118 56 C 116 70, 132 70, 140 52 L 150 38 C 156 58, 166 64, 178 50 C 190 36, 204 44, 222 40"
                fill="none"
                stroke="#0b0f14"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="600"
                className="animate-draw"
                style={{ "--path-length": 600, animationDelay: "0.8s", animationIterationCount: "infinite", animationDuration: "4s" } as React.CSSProperties}
              />
              <line x1="16" y1="76" x2="224" y2="76" stroke="#cbd5e1" strokeDasharray="3 4" />
            </svg>
          </div>
        </div>
        <div className="rounded-2xl bg-surface p-5 shadow-float">
          <ol className="space-y-2">
            {t.stages.map((s, i) => (
              <li key={s} className="flex items-center gap-2.5 text-[12.5px]">
                <span
                  className={clsx(
                    "flex size-5 items-center justify-center rounded-full font-mono text-[10px]",
                    i === 0 ? "bg-brand text-white" : i === 1 ? "animate-soft-pulse bg-brand-50 text-brand ring-1 ring-brand" : "bg-sunken text-subtle",
                  )}
                >
                  {i === 0 ? <Check className="size-3" strokeWidth={3} /> : i + 1}
                </span>
                <span className={i < 2 ? "font-medium text-ink" : "text-muted"}>{s}</span>
                {i === 1 && <Pill tone="brand" className="ml-auto">{t.gate}</Pill>}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

export function IntelligenceScan({ dark }: { dark?: boolean }) {
  const t = copy[useLang()];
  return (
    <div className="grid gap-4 md:grid-cols-[1.25fr_0.75fr]">
      <div className={clsx("relative overflow-hidden rounded-2xl p-5 shadow-float", dark ? "bg-obsidian-2 ring-1 ring-white/10" : "bg-surface")}>
        <p className={clsx("flex items-center gap-2 text-[12px] font-medium", dark ? "text-ask-400" : "text-ask")}>
          <ScanLine className="size-3.5" /> {t.scan}
        </p>
        <div className={clsx("relative mt-4 overflow-hidden rounded-xl px-4 pt-6 pb-2", dark ? "bg-obsidian" : "bg-sunken/70")}>
          <div className={clsx("pointer-events-none absolute inset-0", dark ? "bg-grid-dark" : "bg-grid")} />
          <Car tone={dark ? "dark" : "light"} className="relative w-full" />
          <div
            className="pointer-events-none absolute inset-y-0 left-0 w-16 animate-scan bg-gradient-to-r from-transparent via-ask-400/35 to-transparent"
            style={{ "--scan-distance": "520px" } as React.CSSProperties}
          >
            <span className="absolute inset-y-0 left-1/2 w-px bg-ask-400" />
          </div>
          <span className="absolute top-[54%] left-[36%] flex size-6 items-center justify-center">
            <span className="absolute inset-0 animate-ring rounded-full border-2 border-warn" />
            <span className="absolute inset-0 animate-ring rounded-full border-2 border-warn" style={delay(1.3)} />
            <span className="size-2.5 rounded-full bg-warn ring-2 ring-white" />
          </span>
          <span className="absolute top-[30%] left-[58%] flex size-4 items-center justify-center">
            <span className="size-2 rounded-full bg-ok ring-2 ring-white" />
          </span>
        </div>
        <div className="mt-3 flex gap-2">
          {[0, 1, 2, 3].map((i) => (
            <span key={i} className={clsx("flex h-11 flex-1 items-center justify-center rounded-lg ring-1", dark ? "bg-white/[0.04] text-white/30 ring-white/10" : "bg-canvas text-subtle ring-line", i === 1 && "ring-2 ring-warn")}>
              <ImageIcon className="size-4" />
            </span>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className={clsx("animate-toast-in rounded-2xl p-4 shadow-float", dark ? "bg-obsidian-2 ring-1 ring-white/10" : "bg-surface")} style={delay(0.8)}>
          <div className="flex items-center gap-2">
            <Pill tone="ai">
              <Sparkles className="size-2.5" /> {t.aiSuggestion}
            </Pill>
            <Pill tone="warn">Medium</Pill>
          </div>
          <p className={clsx("mt-3 text-[14px] font-semibold", dark && "text-white")}>{t.findingTitle}</p>
          <p className={clsx("mt-1 text-[12px] leading-snug", dark ? "text-white/55" : "text-muted")}>{t.findingBody}</p>
          <div className="mt-3 flex gap-2">
            <span className="flex h-7 items-center rounded-lg bg-brand px-3 text-[11.5px] font-semibold text-white">{t.confirm}</span>
            <span className={clsx("flex h-7 items-center rounded-lg px-3 text-[11.5px] font-medium ring-1", dark ? "text-white/70 ring-white/15" : "text-ink-2 ring-line")}>{t.reject}</span>
          </div>
        </div>
        <div className={clsx("animate-toast-in rounded-2xl p-4 shadow-float", dark ? "bg-obsidian-2 ring-1 ring-white/10" : "bg-surface")} style={delay(1.4)}>
          <p className={clsx("flex items-center gap-2 text-[12px] font-medium", dark ? "text-white" : "text-ink")}>
            <FileText className="size-3.5 text-danger" /> {t.docTitle}
          </p>
          <dl className="mt-2.5 space-y-1.5">
            {t.docRows.map(([k, v], i) => (
              <div key={k} className="flex items-center justify-between text-[11.5px]">
                <dt className={dark ? "text-white/45" : "text-muted"}>{k}</dt>
                <dd className={clsx("animate-row-in rounded-md px-1.5 font-medium", dark ? "bg-ask/25 text-white" : "bg-ask-50 text-ask")} style={delay(1.8 + i * 0.2)}>
                  {v}
                </dd>
              </div>
            ))}
          </dl>
          <p className={clsx("mt-2.5 text-[10.5px]", dark ? "text-white/40" : "text-subtle")}>{t.reading}</p>
        </div>
      </div>
    </div>
  );
}

export function StaffApp() {
  const t = copy[useLang()];
  return (
    <div className="relative mx-auto flex max-w-[640px] items-end justify-center gap-6">
      <Phone className="h-[540px] w-[268px] shrink-0" dark>
        <div className="relative h-full">
          <div className="absolute inset-0 bg-gradient-to-b from-obsidian-3 to-obsidian" />
          <div className="relative flex h-full flex-col px-4 pt-12 pb-5 text-white">
            <div className="flex items-center justify-between">
              <p className="text-[13px] font-semibold">{t.appTitle}</p>
              <span className="font-mono text-[10px] text-white/50">3/8</span>
            </div>
            <p className="text-[11px] text-white/50">{t.appCar}</p>
            <div className="relative mt-4 flex-1 overflow-hidden rounded-2xl bg-black/40 ring-1 ring-white/10">
              <div className="bg-grid-dark absolute inset-0 opacity-60" />
              <Car tone="dark" className="absolute top-1/2 left-1/2 w-[92%] -translate-x-1/2 -translate-y-1/2" />
              {["top-3 left-3 border-t-2 border-l-2", "top-3 right-3 border-t-2 border-r-2", "bottom-3 left-3 border-b-2 border-l-2", "bottom-3 right-3 border-b-2 border-r-2"].map((c) => (
                <span key={c} className={clsx("absolute size-5 rounded-[3px] border-white/80", c)} />
              ))}
              <span className="absolute inset-0 animate-[flash_3.2s_ease-out_infinite] bg-white opacity-0" />
            </div>
            <div className="mt-3 flex gap-1.5">
              {t.zones.map((z, i) => (
                <span key={z} className={clsx("flex-1 rounded-lg py-1 text-center text-[10px] font-medium", i < 2 ? "bg-brand text-white" : i === 2 ? "bg-white/15 text-white" : "bg-white/5 text-white/40")}>
                  {z}
                </span>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between px-2">
              <span className="flex size-10 items-center justify-center overflow-hidden rounded-lg bg-white/10 ring-1 ring-white/20">
                <ImageIcon className="size-4 text-white/60" />
              </span>
              <span className="flex size-16 items-center justify-center rounded-full ring-4 ring-white/80">
                <span className="size-12 animate-[shutter_3.2s_ease-out_infinite] rounded-full bg-white" />
              </span>
              <span className="flex size-10 items-center justify-center rounded-full bg-white/10">
                <Camera className="size-4" />
              </span>
            </div>
          </div>
        </div>
      </Phone>
      <div className="hidden w-[300px] flex-col gap-3 pb-6 sm:flex">
        <div className="animate-toast-in rounded-2xl bg-surface p-4 shadow-float" style={delay(0.6)}>
          <p className="flex items-center gap-2 text-[12px] font-semibold text-warn">
            <CloudOff className="size-3.5" /> Offline
          </p>
          <p className="mt-1.5 text-[12px] leading-snug text-ink-2">{t.offline}</p>
          <div className="mt-3 space-y-1.5">
            {[72, 34].map((p, i) => (
              <div key={i} className="flex items-center gap-2">
                <Upload className="size-3 text-subtle" />
                <span className="h-1 flex-1 overflow-hidden rounded-full bg-sunken">
                  <span className="block h-full animate-progress rounded-full bg-warn" style={{ width: `${p}%`, ...delay(i * 0.4) }} />
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="animate-toast-in rounded-2xl bg-surface p-4 shadow-float" style={delay(1.2)}>
          <p className="text-[12px] font-semibold">{t.tasks}</p>
          <ul className="mt-2 space-y-2">
            {t.taskList.map((task, i) => (
              <li key={task} className="flex items-center gap-2 text-[12px] text-ink-2">
                <span className={clsx("flex size-4 items-center justify-center rounded-[5px] ring-1", i === 0 ? "bg-brand text-white ring-brand" : "ring-line-strong")}>
                  {i === 0 && <Check className="size-2.5" strokeWidth={3} />}
                </span>
                {task}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex animate-toast-in items-center gap-2 self-start rounded-full bg-ok-50 px-3 py-1.5 text-[11.5px] font-medium text-ok ring-1 ring-ok/15" style={delay(2)}>
          <Check className="size-3.5" strokeWidth={3} /> {t.sent}
        </div>
      </div>
      <style>{`
        @keyframes flash { 0%, 62% { opacity: 0 } 64% { opacity: .55 } 74%, 100% { opacity: 0 } }
        @keyframes shutter { 0%, 60% { transform: scale(1) } 64% { transform: scale(.82) } 72%, 100% { transform: scale(1) } }
      `}</style>
    </div>
  );
}
