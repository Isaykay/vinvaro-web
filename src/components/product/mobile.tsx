"use client";

import clsx from "clsx";
import type { ReactNode } from "react";
import { useLang } from "@/components/lang-provider";
import { defineCopy } from "@/lib/i18n";
import { Icon, type IconName } from "@/components/app-icons";
import { ChannelLogo } from "@/components/channel-logo";
import { Mark, Wordmark } from "@/components/ui";
import { BrandLogo, Car, LogoTile, Plate, delay } from "@/components/product/kit";
import type { ModuleVisualKey } from "@/lib/content";

const copy = defineCopy({
  nl: {
    tabs: ["Overzicht", "Voertuigen", "Inbox", "Taken", "Meer"],
    myWork: "Mijn werk",
    myWorkSub: "Drie volgende stappen voor vandaag.",
    synced: "Alle wijzigingen gesynchroniseerd",
    startIntake: "Intake starten",
    assigned: "Aan jou toegewezen",
    tasks: "3 taken",
    work: [
      ["Te beoordelen", "warn", "Tweede sleutel bevestigen", "BMW 320e · S-208-KL", "Intake · vandaag"],
      ["Bezig", "brand", "Fotografie afronden", "Kia EV6 · T-114-NB", "8 van 12 foto's"],
      ["Klaar", "ok", "Afleverchecklist nalopen", "Peugeot 308 · N-009-GH", "10 controles af"],
    ] as [string, "warn" | "brand" | "ok", string, string, string][],
    dossierTabs: ["Overzicht", "Foto's", "Workflows", "Verkoop"],
    rdw: "RDW",
    rows: [
      ["APK", "nog 214 dagen"],
      ["Tellerstand", "Logisch"],
      ["Brandstof", "Hybride"],
    ],
    workflows: "Workflows",
    wf: [
      ["Intake", 100],
      ["Poetsen", 60],
      ["Fotografie", 25],
    ] as [string, number][],
    capture: "Exterieur vastleggen",
    captureView: "Linksvoor",
    captureHint: "Houd de hele auto binnen de hulplijnen.",
    offline: "Op dit toestel opgeslagen · 2 uploads wachten",
    review: "Scan beoordelen",
    reviewNotice: "Twee bevindingen vragen je beoordeling.",
    ai: "AI-voorstel",
    finding: "Mogelijke kras",
    findingBody: "Linkerzijde, achterportier. Bevestig op de originele foto.",
    confirm: "Bevestigen",
    dismiss: "Negeren",
    inbox: "Inbox",
    chatIn1: "Hoi! Is de XC40 nog beschikbaar?",
    chatIn2: "Kan ik zaterdag een proefrit maken?",
    chatOut: "Zeker! Zaterdag 10:00 staat de auto voor je klaar.",
    quick: ["Proefrit plannen", "Prijs sturen"],
    today: "Vandaag",
    appts: [
      ["10:00", "Proefrit XC40", "Mark Jansen", "brand"],
      ["11:30", "Bezichtiging EV6", "Ahmed Yilmaz", "ai"],
      ["15:30", "Aflevering 308", "Fam. Peters", "ok"],
    ] as [string, string, string, "brand" | "ai" | "ok"][],
    deals: "Deals",
    dealsList: [
      ["Mark Jansen", "volvo", "XC40 Recharge", "€ 38.950", "Proefrit"],
      ["Garage Smit B.V.", "renault", "3× Kangoo", "€ 92.400", "Offerte"],
      ["Fam. Peters", "peugeot", "308 SW", "€ 31.750", "Gewonnen"],
    ],
    sign: "Koopovereenkomst",
    signFor: "Volvo XC40 Recharge · € 38.950",
    signHere: "Teken hieronder",
    signBtn: "Ondertekenen",
    publish: "Publiceren",
    channels: [
      ["mobilede", "mobile.de", "Online"],
      ["autoscout24", "AutoScout24", "Online"],
      ["site", "Jouw website", "Online"],
      ["marktplaats", "Marktplaats", "Gepland"],
    ],
  },
  en: {
    tabs: ["Overview", "Vehicles", "Inbox", "Tasks", "More"],
    myWork: "My work",
    myWorkSub: "Three clear next steps for today.",
    synced: "All changes synced",
    startIntake: "Start intake",
    assigned: "Assigned to you",
    tasks: "3 tasks",
    work: [
      ["Needs review", "warn", "Confirm the second key", "BMW 320e · S-208-KL", "Intake · today"],
      ["In progress", "brand", "Finish photography", "Kia EV6 · T-114-NB", "8 of 12 photos"],
      ["Ready", "ok", "Review delivery checklist", "Peugeot 308 · N-009-GH", "10 checks done"],
    ] as [string, "warn" | "brand" | "ok", string, string, string][],
    dossierTabs: ["Overview", "Photos", "Workflows", "Sales"],
    rdw: "RDW",
    rows: [
      ["MOT", "214 days left"],
      ["Odometer", "Logical"],
      ["Fuel", "Hybrid"],
    ],
    workflows: "Workflows",
    wf: [
      ["Intake", 100],
      ["Valeting", 60],
      ["Photography", 25],
    ] as [string, number][],
    capture: "Exterior capture",
    captureView: "Front-left",
    captureHint: "Keep the whole car inside the guides.",
    offline: "Saved on this device · 2 uploads pending",
    review: "Review scan",
    reviewNotice: "Two findings need your review.",
    ai: "AI suggestion",
    finding: "Possible scratch",
    findingBody: "Left side, rear door. Confirm on the original photo.",
    confirm: "Confirm",
    dismiss: "Dismiss",
    inbox: "Inbox",
    chatIn1: "Hi! Is the XC40 still available?",
    chatIn2: "Could I take a test drive on Saturday?",
    chatOut: "Sure! The car is ready for you Saturday at 10:00.",
    quick: ["Plan test drive", "Send price"],
    today: "Today",
    appts: [
      ["10:00", "Test drive XC40", "Mark Jansen", "brand"],
      ["11:30", "Viewing EV6", "Ahmed Yilmaz", "ai"],
      ["15:30", "Delivery 308", "The Peters family", "ok"],
    ] as [string, string, string, "brand" | "ai" | "ok"][],
    deals: "Deals",
    dealsList: [
      ["Mark Jansen", "volvo", "XC40 Recharge", "€38,950", "Test drive"],
      ["Smit Garage Ltd", "renault", "3× Kangoo", "€92,400", "Quote"],
      ["The Peters family", "peugeot", "308 SW", "€31,750", "Won"],
    ],
    sign: "Sales agreement",
    signFor: "Volvo XC40 Recharge · €38,950",
    signHere: "Sign below",
    signBtn: "Sign",
    publish: "Publishing",
    channels: [
      ["mobilede", "mobile.de", "Online"],
      ["autoscout24", "AutoScout24", "Online"],
      ["site", "Your website", "Online"],
      ["marktplaats", "Marktplaats", "Planned"],
    ],
  },
});

const tagTone = {
  warn: "bg-warn-50 text-warn",
  brand: "bg-brand-50 text-brand",
  ok: "bg-ok-50 text-ok",
  ai: "bg-ask-50 text-ask",
  neutral: "bg-sunken text-ink-2",
};

function Tag({ tone, children }: { tone: keyof typeof tagTone; children: ReactNode }) {
  return <span className={clsx("inline-flex h-[18px] items-center rounded-full px-1.5 text-[9.5px] font-semibold", tagTone[tone])}>{children}</span>;
}

/** iPhone frame with status bar and the app's icon-only tab bar (src/app/(app)/(tabs)/_layout.tsx). */
export function PhoneFrame({
  children,
  className,
  dark,
  tab = 0,
  tabs = true,
  header,
}: {
  children: ReactNode;
  className?: string;
  dark?: boolean;
  tab?: number;
  tabs?: boolean;
  header?: ReactNode;
}) {
  const icons: IconName[] = ["dashboard", "vehicle", "pipeline", "chat", "list"];
  return (
    <div className={clsx("relative aspect-[9/19.2] w-[248px] shrink-0 rounded-[44px] bg-[#0b0f14] p-[7px] shadow-[0_40px_80px_-30px_rgb(11_15_20/0.45),0_0_0_1px_rgb(255_255_255/0.08)_inset]", className)}>
      <span className="absolute top-[110px] -left-[2px] h-10 w-[3px] rounded-l bg-[#1e293b]" />
      <span className="absolute top-[160px] -left-[2px] h-10 w-[3px] rounded-l bg-[#1e293b]" />
      <span className="absolute top-[130px] -right-[2px] h-16 w-[3px] rounded-r bg-[#1e293b]" />
      <div className={clsx("relative flex h-full flex-col overflow-hidden rounded-[37px]", dark ? "bg-[#0b0f14] text-white" : "bg-canvas text-ink")}>
        <div className="relative z-20 flex h-9 shrink-0 items-center justify-between px-6 pt-1 text-[10.5px] font-semibold">
          <span>9:41</span>
          <span className="absolute top-2 left-1/2 h-[19px] w-[72px] -translate-x-1/2 rounded-full bg-black" />
          <span className="flex items-center gap-1">
            <svg width="14" height="9" viewBox="0 0 14 9" aria-hidden>
              {[0, 1, 2, 3].map((i) => (
                <rect key={i} x={i * 3.6} y={6 - i * 2} width="2.4" height={3 + i * 2} rx="0.6" fill="currentColor" />
              ))}
            </svg>
            <span className="relative h-[9px] w-[18px] rounded-[3px] border border-current/60">
              <span className="absolute inset-[1px] right-[3px] rounded-[1.5px] bg-current" />
            </span>
          </span>
        </div>
        {header}
        <div className="relative min-h-0 flex-1 overflow-hidden">{children}</div>
        {tabs && (
          <nav className={clsx("grid shrink-0 grid-cols-5 border-t px-2 pt-2 pb-5", dark ? "border-white/10 bg-[#0b0f14]" : "border-line bg-surface")}>
            {icons.map((icon, i) => (
              <span key={icon} className={clsx("relative mx-auto", i === tab ? "text-brand" : dark ? "text-white/45" : "text-muted")}>
                <Icon name={icon} size={19} strokeWidth={1.7} />
                {icon === "chat" && <span className="absolute -top-1.5 -right-2 grid h-3.5 min-w-3.5 place-items-center rounded-full bg-brand px-1 text-[8px] font-semibold text-white">4</span>}
              </span>
            ))}
          </nav>
        )}
      </div>
    </div>
  );
}

/** TabHeader: logo left, avatar right. With `back`, a sub-screen header with a title. */
function MobileHeader({ title, back, right }: { title?: string; back?: boolean; right?: ReactNode }) {
  if (!back) {
    return (
      <header className="flex shrink-0 items-center justify-between px-4 pt-1 pb-2.5">
        <Wordmark className="h-[11px] w-auto" />
        {right ?? <span className="grid size-[30px] place-items-center rounded-full bg-brand-50 text-[10px] font-semibold text-brand-600">SB</span>}
      </header>
    );
  }
  return (
    <header className="flex h-11 shrink-0 items-center gap-2 px-3">
      <span className="grid size-7 place-items-center rounded-full bg-surface text-ink shadow-sm ring-1 ring-line">
        <Icon name="chevronLeft" size={14} />
      </span>
      <span className="min-w-0 flex-1 truncate text-center text-[12px] font-semibold">{title}</span>
      <span className="grid w-7 place-items-center">{right ?? null}</span>
    </header>
  );
}

const dashCopy = defineCopy({
  nl: {
    title: "Overzicht",
    subtitle: "Voertuigen, team en de volgende actie.",
    metrics: [
      ["Voertuigen in voorraad", "48", "vehicle"],
      ["Lopende workflows", "9", "workflow"],
      ["Open bevindingen", "3", "warning"],
      ["Openstaande taken", "12", "check"],
    ] as [string, string, IconName][],
    invoiced: "Gefactureerd",
    ytd: "Dit jaar",
    value: "€ 412.380",
    hint: "38 facturen",
    next: "Volgende acties",
    open: "12 open",
    tasks: [
      ["bmw", "Tweede sleutel bevestigen", "S-208-KL", "Hoog", "warning"],
      ["kia", "Exterieur fotograferen", "T-114-NB", "Normaal", "neutral"],
    ] as [string, string, string, string, "warning" | "neutral"][],
  },
  en: {
    title: "Overview",
    subtitle: "Vehicles, team and the next action.",
    metrics: [
      ["Vehicles in stock", "48", "vehicle"],
      ["Active workflows", "9", "workflow"],
      ["Open findings", "3", "warning"],
      ["Open tasks", "12", "check"],
    ] as [string, string, IconName][],
    invoiced: "Invoiced",
    ytd: "Year to date",
    value: "€412,380",
    hint: "38 invoices",
    next: "Next actions",
    open: "12 open",
    tasks: [
      ["bmw", "Confirm the second key", "S-208-KL", "High", "warning"],
      ["kia", "Exterior photography", "T-114-NB", "Normal", "neutral"],
    ] as [string, string, string, string, "warning" | "neutral"][],
  },
});

/** The app's home tab (src/app/(app)/(tabs)/index.tsx). */
export function MobileDashboard({ className }: { className?: string }) {
  const t = dashCopy[useLang()];
  return (
    <PhoneFrame className={className} header={<MobileHeader />}>
      <div className="space-y-2.5 px-3.5 pb-4">
        <div className="flex items-start justify-between pt-1">
          <div>
            <p className="text-[19px] leading-tight font-semibold tracking-[-0.02em]">{t.title}</p>
            <p className="mt-0.5 text-[9.5px] text-[#475569]">{t.subtitle}</p>
          </div>
          <span className="grid size-8 place-items-center rounded-full bg-brand text-white shadow-sm">
            <Icon name="plus" size={15} />
          </span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {t.metrics.map(([label, value, icon], i) => (
            <div key={label} className="animate-row-in rounded-[12px] border border-line bg-surface p-2.5" style={delay(0.2 + i * 0.08)}>
              <div className="flex items-start justify-between gap-1 text-muted">
                <span className="text-[8.5px] leading-tight">{label}</span>
                <Icon name={icon} size={11} className="shrink-0" />
              </div>
              <p className="mt-1 text-[21px] leading-tight tracking-[-0.04em] tabular-nums">{value}</p>
            </div>
          ))}
        </div>
        <div className="animate-row-in rounded-[12px] border border-line bg-surface p-2.5" style={delay(0.55)}>
          <div className="flex justify-between text-[9.5px] text-muted">
            <span>{t.invoiced}</span>
            <span>{t.ytd}</span>
          </div>
          <div className="mt-1 flex items-center gap-1.5">
            <span className="text-[16px] font-semibold tracking-[-0.02em] tabular-nums">{t.value}</span>
            <span className="inline-flex h-4 items-center rounded-full bg-ok-50 px-1.5 text-[8.5px] font-semibold text-ok">+12,4%</span>
          </div>
          <div className="mt-2 flex h-7 items-end gap-[2px]">
            {[30, 42, 38, 55, 48, 62, 58, 71, 66, 80, 74, 92].map((h, i) => (
              <span key={i} className={clsx("flex-1 origin-bottom rounded-t-[2px] bg-brand", i < 11 && "opacity-45")} style={{ height: `${h}%`, animation: "bar-grow 700ms cubic-bezier(.2,0,0,1) both", animationDelay: `${600 + i * 35}ms` }} />
            ))}
          </div>
        </div>
        <div className="animate-row-in rounded-[12px] border border-line bg-surface p-2.5" style={delay(0.7)}>
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold">{t.next}</span>
            <span className="rounded-[5px] bg-sunken px-1.5 py-0.5 text-[8.5px] font-medium text-[#475569]">{t.open}</span>
          </div>
          {t.tasks.map(([make, title, plate, prio, tone]) => (
            <div key={title} className="mt-2 flex items-center gap-2 border-t border-line pt-2">
              <BrandLogo make={make} className="size-6 rounded-[6px]" />
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[10px] font-medium">{title}</span>
                <Plate size="xs" className="mt-0.5">
                  {plate}
                </Plate>
              </span>
              <span className={clsx("rounded-[5px] px-1.5 py-0.5 text-[8.5px] font-medium", tone === "warning" ? "bg-warn-50 text-[#92400e]" : "bg-sunken text-[#475569]")}>{prio}</span>
            </div>
          ))}
        </div>
      </div>
    </PhoneFrame>
  );
}

export function MobileMyWork() {
  const t = copy[useLang()];
  return (
    <PhoneFrame header={<MobileHeader />}>
      <div className="px-4 pb-4">
        <p className="mt-1 text-[20px] font-semibold tracking-[-0.03em]">{t.myWork}</p>
        <p className="mt-0.5 text-[10.5px] text-muted">{t.myWorkSub}</p>
        <p className="mt-3 flex items-center gap-1.5 rounded-lg bg-ok-50 px-2.5 py-1.5 text-[10px] font-medium text-ok">
          <Icon name="check" size={12} /> {t.synced}
        </p>
        <span className="mt-3 flex h-9 items-center justify-center gap-1.5 rounded-[10px] bg-brand text-[11px] font-semibold text-white">
          <Icon name="plus" size={13} /> {t.startIntake}
        </span>
        <div className="mt-4 mb-2 flex items-center justify-between">
          <p className="text-[11.5px] font-semibold">{t.assigned}</p>
          <span className="text-[10px] text-muted">{t.tasks}</span>
        </div>
        <div className="space-y-2">
          {t.work.map(([tag, tone, title, car, meta], i) => (
            <article key={title} className="animate-row-in rounded-xl border border-line bg-surface p-2.5" style={delay(0.2 + i * 0.12)}>
              <div className="flex items-center justify-between">
                <Tag tone={tone}>{tag}</Tag>
                <Icon name="chevronRight" size={12} className="text-subtle" />
              </div>
              <p className="mt-1.5 text-[11.5px] font-semibold">{title}</p>
              <p className="text-[10px] text-muted">{car}</p>
              <p className="mt-1.5 border-t border-line pt-1.5 text-[9.5px] text-subtle">{meta}</p>
            </article>
          ))}
        </div>
      </div>
    </PhoneFrame>
  );
}

export function MobileVehicle() {
  const t = copy[useLang()];
  return (
    <PhoneFrame tab={1} header={<MobileHeader back title="Golf 1.5 eTSI" right={<Icon name="more" size={16} className="text-muted" />} />}>
      <div className="px-4">
        <div className="bg-stage relative overflow-hidden rounded-2xl px-3 pt-4 pb-1">
          <Car className="w-full animate-float" />
        </div>
        <div className="mt-3 flex items-center gap-2">
          <BrandLogo make="volkswagen" className="size-8" />
          <span className="min-w-0 flex-1">
            <span className="block text-[12.5px] font-semibold">Golf 1.5 eTSI Life</span>
            <span className="block text-[10px] text-muted">2022 · 34.512 km</span>
          </span>
          <Plate size="xs">R-512-FX</Plate>
        </div>
        <div className="mt-3 flex gap-1 rounded-lg bg-sunken p-0.5">
          {t.dossierTabs.map((tab, i) => (
            <span key={tab} className={clsx("flex-1 rounded-md py-1 text-center text-[9.5px] font-medium", i === 0 ? "bg-surface text-ink shadow-sm" : "text-muted")}>
              {tab}
            </span>
          ))}
        </div>
        <div className="mt-3 rounded-xl border border-line bg-surface">
          <p className="flex items-center gap-1.5 border-b border-line px-3 py-1.5 text-[9.5px] font-semibold text-ok">
            <LogoTile slug="rdw" className="size-4 rounded-[4px] border-0" size={12} /> {t.rdw}
          </p>
          {t.rows.map(([k, v], i) => (
            <div key={k} className="flex animate-row-in justify-between px-3 py-1.5 text-[10.5px]" style={delay(0.3 + i * 0.1)}>
              <span className="text-muted">{k}</span>
              <span className={clsx("font-semibold", i < 2 && "text-ok")}>{v}</span>
            </div>
          ))}
        </div>
        <p className="mt-3 mb-1.5 text-[11px] font-semibold">{t.workflows}</p>
        {t.wf.map(([name, pct], i) => (
          <div key={name} className="mb-1.5 flex items-center gap-2 text-[10px]">
            <span className="w-16 text-ink-2">{name}</span>
            <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-sunken">
              <span className={clsx("block h-full origin-left animate-progress rounded-full", pct === 100 ? "bg-ok" : "bg-brand")} style={{ width: `${pct}%`, animationIterationCount: 1, ...delay(0.4 + i * 0.15) }} />
            </span>
          </div>
        ))}
      </div>
    </PhoneFrame>
  );
}

export function MobileCapture() {
  const t = copy[useLang()];
  return (
    <PhoneFrame dark tabs={false} header={<MobileHeader back title={t.capture} right={<span className="text-[10px] text-white/50">6/12</span>} />}>
      <div className="flex h-full flex-col px-4 pb-5">
        <p className="text-[17px] font-semibold tracking-[-0.02em]">{t.captureView}</p>
        <p className="text-[10px] text-white/55">{t.captureHint}</p>
        <div className="relative mt-3 flex-1 overflow-hidden rounded-2xl bg-gradient-to-b from-[#1e293b] to-[#0b0f14] ring-1 ring-white/10">
          <div className="bg-grid-dark absolute inset-0 opacity-70" />
          <Car tone="dark" className="absolute top-1/2 left-1/2 w-[90%] -translate-x-1/2 -translate-y-1/2" />
          {["top-3 left-3 border-t-2 border-l-2", "top-3 right-3 border-t-2 border-r-2", "bottom-3 left-3 border-b-2 border-l-2", "bottom-3 right-3 border-b-2 border-r-2"].map((c) => (
            <span key={c} className={clsx("absolute size-5 rounded-[3px] border-white/85", c)} />
          ))}
          <span className="absolute inset-0 bg-white opacity-0" style={{ animation: "flash 3.2s ease-out infinite" }} />
        </div>
        <p className="mt-3 flex items-center gap-1.5 rounded-lg bg-warn/15 px-2.5 py-1.5 text-[9.5px] font-medium text-[#fcd34d]">
          <Icon name="clock" size={12} /> {t.offline}
        </p>
        <div className="mt-4 flex items-center justify-between px-3">
          <span className="grid size-9 place-items-center rounded-lg bg-white/10 ring-1 ring-white/15">
            <Icon name="layers" size={14} className="text-white/60" />
          </span>
          <span className="grid size-14 place-items-center rounded-full ring-4 ring-white/85">
            <span className="size-11 rounded-full bg-white" style={{ animation: "shutter 3.2s ease-out infinite" }} />
          </span>
          <span className="grid size-9 place-items-center rounded-full bg-white/10">
            <Icon name="camera" size={14} />
          </span>
        </div>
      </div>
      <style>{`@keyframes flash{0%,62%{opacity:0}64%{opacity:.5}74%,100%{opacity:0}}@keyframes shutter{0%,60%{transform:scale(1)}64%{transform:scale(.82)}72%,100%{transform:scale(1)}}`}</style>
    </PhoneFrame>
  );
}

export function MobileReview() {
  const t = copy[useLang()];
  return (
    <PhoneFrame tab={4} header={<MobileHeader back title={t.review} />}>
      <div className="px-4">
        <p className="text-[18px] font-semibold tracking-[-0.03em]">BMW 320e</p>
        <p className="text-[10px] text-muted">S-208-KL · Intake</p>
        <p className="mt-3 flex items-center gap-1.5 rounded-lg bg-brand-50 px-2.5 py-1.5 text-[10px] font-medium text-brand">
          <Icon name="info" size={12} /> {t.reviewNotice}
        </p>
        <div className="relative mt-3 overflow-hidden rounded-xl bg-sunken px-3 pt-4 pb-1">
          <Car className="w-full" />
          <span className="absolute inset-y-0 left-0 w-10 animate-scan bg-gradient-to-r from-transparent via-ask-400/35 to-transparent" style={{ "--scan-distance": "200px" } as React.CSSProperties} />
          <span className="absolute top-[55%] left-[34%] flex size-5 items-center justify-center">
            <span className="absolute inset-0 animate-ring rounded-full border-2 border-warn" />
            <span className="size-2 rounded-full bg-warn ring-2 ring-white" />
          </span>
        </div>
        <article className="mt-3 animate-toast-in rounded-xl border border-line bg-surface p-3" style={delay(0.6)}>
          <Tag tone="ai">✦ {t.ai}</Tag>
          <p className="mt-2 text-[12px] font-semibold">{t.finding}</p>
          <p className="mt-0.5 text-[10px] leading-snug text-muted">{t.findingBody}</p>
          <div className="mt-2.5 grid grid-cols-2 gap-1.5">
            <span className="grid h-7 place-items-center rounded-lg bg-brand text-[10.5px] font-semibold text-white">{t.confirm}</span>
            <span className="grid h-7 place-items-center rounded-lg border border-line text-[10.5px] font-medium text-ink-2">{t.dismiss}</span>
          </div>
        </article>
      </div>
    </PhoneFrame>
  );
}

export function MobileInbox() {
  const t = copy[useLang()];
  return (
    <PhoneFrame
      tab={3}
      header={
        <header className="flex h-12 shrink-0 items-center gap-2 border-b border-line px-4">
          <Icon name="chevronLeft" size={14} className="text-brand" />
          <span className="relative grid size-7 place-items-center rounded-full bg-sunken text-[9.5px] font-bold text-ink-2">
            MJ
            <span className="absolute -right-0.5 -bottom-0.5 grid size-3.5 place-items-center rounded-full bg-white">
              <ChannelLogo kind="whatsapp" size={9} />
            </span>
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-[11.5px] font-semibold">Mark Jansen</span>
            <span className="block text-[9px] text-ask">✦ Proefrit · Lead 86</span>
          </span>
        </header>
      }
    >
      <div className="flex h-full flex-col bg-[#efeae2]/60 px-3 pt-3">
        <div className="flex items-center gap-2 rounded-xl bg-surface p-2 shadow-sm">
          <BrandLogo make="volvo" className="size-7" />
          <span className="text-[10.5px] font-semibold">XC40 Recharge</span>
          <Plate size="xs" className="ml-auto">
            P-771-RD
          </Plate>
        </div>
        <div className="mt-3 flex flex-col gap-1.5">
          <p className="max-w-[82%] animate-row-in self-start rounded-xl rounded-tl-sm bg-white px-2.5 py-1.5 text-[10.5px] shadow-sm" style={delay(0.2)}>
            {t.chatIn1}
          </p>
          <p className="max-w-[82%] animate-row-in self-start rounded-xl rounded-tl-sm bg-white px-2.5 py-1.5 text-[10.5px] shadow-sm" style={delay(0.5)}>
            {t.chatIn2}
          </p>
          <p className="max-w-[82%] animate-row-in self-end rounded-xl rounded-tr-sm bg-[#d9fdd3] px-2.5 py-1.5 text-[10.5px] shadow-sm" style={delay(1.1)}>
            {t.chatOut}
          </p>
        </div>
        <div className="mt-auto flex gap-1.5 pb-2">
          {t.quick.map((q) => (
            <span key={q} className="rounded-full border border-line bg-surface px-2.5 py-1 text-[9.5px] font-medium text-ink-2">
              {q}
            </span>
          ))}
        </div>
      </div>
    </PhoneFrame>
  );
}

export function MobileAgenda() {
  const t = copy[useLang()];
  return (
    <PhoneFrame tab={4} header={<MobileHeader />}>
      <div className="px-4">
        <p className="mt-1 text-[20px] font-semibold tracking-[-0.03em]">{t.today}</p>
        <div className="mt-3 grid grid-cols-5 gap-1">
          {["ma", "di", "wo", "do", "vr"].map((d, i) => (
            <span key={d} className={clsx("flex flex-col items-center rounded-lg py-1", i === 3 ? "bg-brand text-white" : "bg-surface text-ink-2 ring-1 ring-line")}>
              <span className="text-[8.5px] uppercase opacity-70">{d}</span>
              <span className="text-[12px] font-semibold">{3 + i}</span>
            </span>
          ))}
        </div>
        <div className="mt-4 space-y-2">
          {t.appts.map(([time, title, who, tone], i) => (
            <div key={title} className="flex animate-row-in gap-2.5" style={delay(0.2 + i * 0.12)}>
              <span className="w-8 pt-1 font-mono text-[9.5px] text-subtle">{time}</span>
              <span className={clsx("flex-1 rounded-xl border-l-[3px] px-2.5 py-2", tone === "brand" ? "border-brand bg-brand-50" : tone === "ai" ? "border-ask bg-ask-50" : "border-ok bg-ok-50")}>
                <span className="block text-[11px] font-semibold">{title}</span>
                <span className="mt-0.5 flex items-center gap-1 text-[9.5px] text-muted">
                  <Icon name="user" size={10} /> {who}
                </span>
              </span>
            </div>
          ))}
        </div>
        <p className="mt-3 flex items-center gap-1.5 text-[9.5px] text-muted">
          <LogoTile slug="gcal" className="size-4 rounded-[4px] border-0" size={12} /> Google Agenda
        </p>
      </div>
    </PhoneFrame>
  );
}

export function MobileDeals() {
  const t = copy[useLang()];
  return (
    <PhoneFrame tab={2} header={<MobileHeader />}>
      <div className="px-4">
        <p className="mt-1 text-[20px] font-semibold tracking-[-0.03em]">{t.deals}</p>
        <div className="mt-3 space-y-2">
          {t.dealsList.map(([name, make, car, value, stage], i) => (
            <div key={name} className="animate-row-in rounded-xl border border-line bg-surface p-2.5" style={delay(0.2 + i * 0.12)}>
              <div className="flex items-center gap-2">
                <BrandLogo make={make} className="size-8" />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[11px] font-semibold">{name}</span>
                  <span className="block text-[9.5px] text-muted">{car}</span>
                </span>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-[12px] font-semibold tabular-nums">{value}</span>
                <Tag tone={i === 2 ? "ok" : i === 1 ? "ai" : "brand"}>{stage}</Tag>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PhoneFrame>
  );
}

export function MobileSign() {
  const t = copy[useLang()];
  return (
    <PhoneFrame tabs={false} header={<MobileHeader title={t.sign} right={<Mark className="h-2.5 w-auto" />} />}>
      <div className="flex h-full flex-col px-4 pb-5">
        <p className="text-[10.5px] text-muted">{t.signFor}</p>
        <div className="mt-3 space-y-1.5 rounded-xl border border-line bg-surface p-3">
          {[100, 86, 94, 72, 90, 60].map((w, i) => (
            <span key={i} className="block h-1.5 rounded-full bg-sunken" style={{ width: `${w}%` }} />
          ))}
        </div>
        <p className="mt-3 text-[10.5px] font-semibold">{t.signHere}</p>
        <div className="mt-1.5 rounded-xl border border-dashed border-line-strong bg-surface p-2">
          <svg viewBox="0 0 220 80" className="w-full" aria-hidden>
            <path
              d="M14 52 C 26 22, 40 24, 42 44 S 56 66, 66 40 C 72 28, 80 30, 82 44 C 84 56, 96 56, 102 40 L 112 28 C 118 48, 130 54, 146 40 C 160 28, 176 38, 204 32"
              fill="none"
              stroke="#1d4ed8"
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeDasharray="500"
              className="animate-draw"
              style={{ "--path-length": 500, animationDuration: "2.6s", animationDelay: "0.5s", animationIterationCount: "infinite" } as React.CSSProperties}
            />
            <line x1="12" y1="68" x2="208" y2="68" stroke="#cbd5e1" strokeDasharray="3 4" />
          </svg>
        </div>
        <span className="mt-auto grid h-10 place-items-center rounded-[10px] bg-brand text-[12px] font-semibold text-white">{t.signBtn}</span>
      </div>
    </PhoneFrame>
  );
}

export function MobilePublish() {
  const t = copy[useLang()];
  return (
    <PhoneFrame tab={1} header={<MobileHeader back title={t.publish} />}>
      <div className="px-4">
        <div className="flex items-center gap-2 rounded-xl border border-line bg-surface p-2.5">
          <BrandLogo make="volvo" className="size-9" />
          <span className="min-w-0 flex-1">
            <span className="block text-[11.5px] font-semibold">XC40 Recharge</span>
            <span className="block text-[10px] font-semibold text-brand">€ 38.950</span>
          </span>
          <Plate size="xs">P-771-RD</Plate>
        </div>
        <div className="mt-3 divide-y divide-line rounded-xl border border-line bg-surface">
          {t.channels.map(([slug, name, status], i) => {
            const on = i < 3;
            return (
              <div key={slug} className="flex animate-row-in items-center gap-2.5 px-3 py-2.5" style={delay(0.2 + i * 0.12)}>
                {slug === "site" ? (
                  <span className="grid size-7 place-items-center rounded-[7px] border border-line bg-brand-50 text-brand">
                    <Icon name="globe" size={14} />
                  </span>
                ) : (
                  <LogoTile slug={slug} className="size-7 rounded-[7px]" size={18} />
                )}
                <span className="min-w-0 flex-1">
                  <span className="block text-[11px] font-semibold">{name}</span>
                  <span className={clsx("block text-[9.5px]", on ? "text-ok" : "text-muted")}>{status}</span>
                </span>
                <span className={clsx("relative h-[18px] w-8 rounded-full transition-colors", on ? "bg-ok" : "bg-line-strong")}>
                  <span className={clsx("absolute top-[2px] size-[14px] rounded-full bg-white shadow", on ? "right-[2px]" : "left-[2px]")} />
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </PhoneFrame>
  );
}

/** The app screen that belongs to a platform module, for the "also in the app" section. */
export function moduleScreens(visual: ModuleVisualKey): [() => React.JSX.Element, () => React.JSX.Element] {
  switch (visual) {
    case "inventory":
      return [MobileVehicle, MobileCapture];
    case "intake":
      return [MobileMyWork, MobileCapture];
    case "intelligence":
      return [MobileReview, MobileVehicle];
    case "app":
      return [MobileMyWork, MobileCapture];
    case "inbox":
      return [MobileInbox, MobileMyWork];
    case "crm":
      return [MobileDeals, MobileInbox];
    case "agenda":
      return [MobileAgenda, MobileInbox];
    case "contracts":
      return [MobileSign, MobileDeals];
    case "publish":
      return [MobilePublish, MobileVehicle];
  }
}
