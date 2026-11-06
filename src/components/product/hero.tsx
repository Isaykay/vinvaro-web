"use client";

import clsx from "clsx";
import { useLang } from "@/components/lang-provider";
import { defineCopy } from "@/lib/i18n";
import { Icon, type IconName } from "@/components/app-icons";
import { ChannelLogo } from "@/components/channel-logo";
import { Car } from "@/components/product/kit";
import {
  AppBadge,
  AppButton,
  AppCard,
  AppMetricCard,
  AppSidebar,
  AppTopbar,
  BrowserFrame,
  FinanceCard,
  PageHeader,
  PipelineCard,
  SegmentBar,
  StageColumn,
  TrendBars,
  VehicleCell,
  type BadgeTone,
  type NavGroup,
  type PipelineCardData,
} from "@/components/product/app-ui";
import { MobileDashboard } from "@/components/product/mobile";

const shell = defineCopy({
  nl: {
    nav: [
      { items: [["dashboard", "Overzicht"], ["vehicle", "Voertuigen"], ["pipeline", "Pijplijn"]] },
      { label: "Operatie", items: [["chat", "Inbox", 4], ["mail", "Aanvragen"], ["calendar", "Agenda"], ["check", "Taken"], ["scan", "Bevindingen"], ["workflow", "Workflows"]] },
      { label: "Verkoop", items: [["users", "Relaties"], ["contract", "Contracten"], ["euro", "Facturen"], ["gauge", "Financieel rapport"]] },
    ] as NavGroup[],
    org: "Autobedrijf De Vries",
    role: "Eigenaar",
    search: "Zoeken",
    import: ["Document importeren", "Sleep een pdf hierheen"] as [string, string],
  },
  en: {
    nav: [
      { items: [["dashboard", "Overview"], ["vehicle", "Vehicles"], ["pipeline", "Pipeline"]] },
      { label: "Operations", items: [["chat", "Inbox", 4], ["mail", "Inquiries"], ["calendar", "Calendar"], ["check", "Tasks"], ["scan", "Findings"], ["workflow", "Workflows"]] },
      { label: "Sales", items: [["users", "Contacts"], ["contract", "Contracts"], ["euro", "Invoices"], ["gauge", "Finance report"]] },
    ] as NavGroup[],
    org: "De Vries Automotive",
    role: "Owner",
    search: "Search",
    import: ["Import document", "Drop a PDF here"] as [string, string],
  },
});

const copy = defineCopy({
  nl: {
    title: "Je bedrijf, in één oogopslag.",
    subtitle: "Voertuigen, team en de volgende actie.",
    customize: "Indeling aanpassen",
    add: "Voertuig toevoegen",
    metrics: [
      ["Voertuigen in voorraad", "48", "Open voorraadperiodes", "vehicle"],
      ["Lopende workflows", "9", "Intake, aflevering en inspecties", "workflow"],
      ["Open bevindingen", "3", "Menselijke bevestiging nodig", "warning"],
      ["Openstaande taken", "12", "Opvolgacties voor je team", "check"],
    ] as [string, string, string, IconName][],
    ytd: "Dit jaar",
    invoiced: ["Gefactureerd", "€ 412.380", "38 facturen · € 498.979 incl. btw", "+12,4%"],
    outstanding: ["Openstaand", "€ 23.415", "6 facturen · € 4.120 te laat"],
    aging: ["Niet vervallen", "1–30 d", "31–60 d"],
    margin: ["Marge", "€ 61.240", "14,9% marge · 31 verkocht", "+8,1%"],
    stock: ["Voorraadwaarde", "€ 1.184.500", "48 auto's · vraagprijs € 1,39 mln"],
    buckets: ["0–30 d", "31–60 d", "61–90 d", "90+ d"],
    table: "Voertuigen in behandeling",
    viewAll: "Bekijk voorraad",
    cols: ["Voertuig", "Fase", "Km", "Vraagprijs", "In voorraad", "APK", "Status"],
    rows: [
      ["bmw", "BMW 320e Touring", "S-208-KL", "2022 · Plug-in hybride · 41.200 km", "Inspectie", "warning", "41.200", "€ 34.950", "6 d", "14-08-2027", "Niet te koop", "neutral"],
      ["kia", "Kia EV6 GT-Line", "T-114-NB", "2023 · Elektrisch · 18.950 km", "Voorbereiding", "info", "18.950", "€ 42.750", "12 d", "02-03-2027", "Beschikbaar", "success"],
      ["volvo", "Volvo XC40 Recharge", "P-771-RD", "2023 · Elektrisch · 18.400 km", "Verkoopklaar", "success", "18.400", "€ 38.950", "21 d", "19-11-2027", "Gereserveerd", "warning"],
      ["volkswagen", "Volkswagen Golf 1.5 eTSI", "R-512-FX", "2022 · Benzine · 34.512 km", "Intake", "warning", "34.512", "€ 24.950", "2 d", "07-06-2027", "Niet te koop", "neutral"],
    ] as [string, string, string, string, string, BadgeTone, string, string, string, string, string, BadgeTone][],
    toastTitle: "Nieuw bericht van Mark Jansen",
    toast: "Is de XC40 nog beschikbaar? Kan ik zaterdag een proefrit maken?",
    open: "Openen",
  },
  en: {
    title: "Your business, at a glance.",
    subtitle: "Vehicles, team and the next action.",
    customize: "Customise layout",
    add: "Add vehicle",
    metrics: [
      ["Vehicles in stock", "48", "Open stock periods", "vehicle"],
      ["Active workflows", "9", "Intake, delivery and inspections", "workflow"],
      ["Open findings", "3", "Human confirmation needed", "warning"],
      ["Open tasks", "12", "Follow-ups for your team", "check"],
    ] as [string, string, string, IconName][],
    ytd: "Year to date",
    invoiced: ["Invoiced", "€412,380", "38 invoices · €498,979 incl. VAT", "+12.4%"],
    outstanding: ["Outstanding", "€23,415", "6 invoices · €4,120 overdue"],
    aging: ["Not due", "1–30 d", "31–60 d"],
    margin: ["Margin", "€61,240", "14.9% margin · 31 sold", "+8.1%"],
    stock: ["Stock value", "€1,184,500", "48 cars · asking €1.39m"],
    buckets: ["0–30 d", "31–60 d", "61–90 d", "90+ d"],
    table: "Vehicles in progress",
    viewAll: "View inventory",
    cols: ["Vehicle", "Stage", "Km", "Asking price", "In stock", "MOT", "Status"],
    rows: [
      ["bmw", "BMW 320e Touring", "S-208-KL", "2022 · Plug-in hybrid · 41,200 km", "Inspection", "warning", "41,200", "€34,950", "6 d", "14-08-2027", "Not for sale", "neutral"],
      ["kia", "Kia EV6 GT-Line", "T-114-NB", "2023 · Electric · 18,950 km", "Preparation", "info", "18,950", "€42,750", "12 d", "02-03-2027", "Available", "success"],
      ["volvo", "Volvo XC40 Recharge", "P-771-RD", "2023 · Electric · 18,400 km", "Sale-ready", "success", "18,400", "€38,950", "21 d", "19-11-2027", "Reserved", "warning"],
      ["volkswagen", "Volkswagen Golf 1.5 eTSI", "R-512-FX", "2022 · Petrol · 34,512 km", "Intake", "warning", "34,512", "€24,950", "2 d", "07-06-2027", "Not for sale", "neutral"],
    ] as [string, string, string, string, string, BadgeTone, string, string, string, string, string, BadgeTone][],
    toastTitle: "New message from Mark Jansen",
    toast: "Is the XC40 still available? Could I take a test drive on Saturday?",
    open: "Open",
  },
});

/** Workspace shell exactly as in the web client: sidebar, sticky topbar, padded main. */
export function AppShell({ active, children }: { active: string; children: React.ReactNode }) {
  const s = shell[useLang()];
  return (
    <BrowserFrame>
      <div className="flex bg-canvas">
        <AppSidebar groups={s.nav} active={active} org={s.org} role={s.role} import={s.import} />
        <div className="min-w-0 flex-1">
          <AppTopbar search={s.search} initials="SB" />
          <main className="p-4 sm:p-5">{children}</main>
        </div>
      </div>
    </BrowserFrame>
  );
}

/** The dashboard page (src/app/(workspace)/page.tsx) with illustrative data. */
export function DashboardScreen() {
  const t = copy[useLang()];
  const s = shell[useLang()];
  return (
    <AppShell active={s.nav[0].items[0][1]}>
      <PageHeader
        title={t.title}
        subtitle={t.subtitle}
        actions={
          <>
            <span className="hidden sm:inline-flex">
              <AppButton icon="dashboard">{t.customize}</AppButton>
            </span>
            <span className="relative" data-cursor-target>
              <AppButton primary icon="plus">
                {t.add}
              </AppButton>
              <span className="pointer-events-none absolute inset-0 rounded-[8px]" style={{ animation: "click-ring 6s ease-out infinite", animationDelay: "2.6s" }} />
            </span>
          </>
        }
      />
      <div className="grid grid-cols-2 gap-2.5 lg:grid-cols-4">
        {t.metrics.map(([label, value, caption, icon], i) => (
          <AppMetricCard key={label} label={label} value={value} caption={caption} icon={icon} delay={80 + i * 60} />
        ))}
        <FinanceCard label={t.invoiced[0]} ytd={t.ytd} value={t.invoiced[1]} hint={t.invoiced[2]} delta={t.invoiced[3]} delay={320}>
          <TrendBars values={[30, 42, 38, 55, 48, 62, 58, 71, 66, 80, 74, 92]} previous={[26, 35, 40, 44, 41, 52, 50, 60, 57, 66, 70, 74]} />
        </FinanceCard>
        <FinanceCard label={t.outstanding[0]} value={t.outstanding[1]} hint={t.outstanding[2]} delay={380}>
          <SegmentBar
            segments={[
              { label: t.aging[0], value: 14, className: "bg-ok/70" },
              { label: t.aging[1], value: 6, className: "bg-[#92400e]/60" },
              { label: t.aging[2], value: 3, className: "bg-danger/70" },
            ]}
          />
        </FinanceCard>
        <FinanceCard label={t.margin[0]} ytd={t.ytd} value={t.margin[1]} hint={t.margin[2]} delta={t.margin[3]} delay={440}>
          <TrendBars values={[12, 18, 15, 22, 20, 26, 24, 30, 27, 33, 31, 38]} previous={[10, 14, 16, 18, 17, 21, 22, 24, 25, 27, 29, 30]} />
        </FinanceCard>
        <FinanceCard label={t.stock[0]} value={t.stock[1]} hint={t.stock[2]} delay={500}>
          <SegmentBar
            segments={[
              { label: t.buckets[0], value: 22, className: "bg-brand" },
              { label: t.buckets[1], value: 14, className: "bg-brand/55" },
              { label: t.buckets[2], value: 8, className: "bg-[#92400e]/70" },
              { label: t.buckets[3], value: 4, className: "bg-danger/70" },
            ]}
          />
        </FinanceCard>
      </div>

      <AppCard flush className="mt-2.5" title={t.table} actions={<span className="inline-flex items-center gap-1 text-[10.5px] text-[#475569]">{t.viewAll} <Icon name="arrowRight" size={11} /></span>}>
        <div className="grid grid-cols-[2.6fr_1fr_1fr] gap-3 border-y border-line bg-canvas px-4 py-1.5 text-[9.5px] font-semibold text-muted lg:grid-cols-[2.6fr_1fr_0.7fr_0.9fr_0.7fr_0.9fr_1fr]">
          {t.cols.map((c, i) => (
            <span key={c} className={clsx(i > 0 && i < 6 && i !== 1 && "hidden lg:block", (i === 2 || i === 3 || i === 4) && "text-right")}>
              {c}
            </span>
          ))}
        </div>
        {t.rows.map(([make, name, plate, specs, stage, stageTone, km, price, days, apk, status, statusTone], i) => (
          <div
            key={plate}
            className="grid animate-row-in grid-cols-[2.6fr_1fr_1fr] items-center gap-3 border-b border-line px-4 py-2 last:border-0 lg:grid-cols-[2.6fr_1fr_0.7fr_0.9fr_0.7fr_0.9fr_1fr]"
            style={{ animationDelay: `${560 + i * 90}ms` }}
          >
            <VehicleCell make={make} name={name} plate={plate} specs={specs} />
            <span>
              <AppBadge tone={stageTone} small>
                {stage}
              </AppBadge>
            </span>
            <span className="hidden text-right text-[10.5px] tabular-nums lg:block">{km}</span>
            <span className="hidden text-right text-[10.5px] font-semibold tabular-nums lg:block">{price}</span>
            <span className="hidden text-right text-[10.5px] text-muted tabular-nums lg:block">{days}</span>
            <span className="hidden text-[10.5px] tabular-nums lg:block">{apk}</span>
            <span>
              <AppBadge tone={statusTone} dot small>
                {status}
              </AppBadge>
            </span>
          </div>
        ))}
      </AppCard>
    </AppShell>
  );
}

/** Animated pointer that glides to "Voertuig toevoegen" and clicks it. */
function Cursor() {
  return (
    <span className="pointer-events-none absolute z-30 hidden lg:block" style={{ animation: "cursor-path 6s cubic-bezier(.45,0,.25,1) infinite", animationDelay: "1.2s", left: "58%", top: "62%" }}>
      <svg width="22" height="22" viewBox="0 0 24 24" className="drop-shadow-[0_2px_4px_rgb(0_0_0/0.25)]" style={{ animation: "cursor-press 6s ease-in-out infinite", animationDelay: "1.2s" }}>
        <path d="M5 3l14 7.2-6.2 1.6L10 18z" fill="#0b0f14" stroke="#fff" strokeWidth="1.6" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

/** Hero composition: dashboard, the app's live inbox notification, a clicking cursor and the mobile app. */
export function HeroWorkspace() {
  const t = copy[useLang()];
  return (
    <div className="relative">
      <DashboardScreen />
      <Cursor />
      <div
        className="pointer-events-none absolute bottom-6 left-[230px] z-20 hidden w-[300px] items-start gap-3 rounded-[12px] border border-line bg-surface p-3 shadow-lg md:flex"
        style={{ animation: "toast-cycle 9s cubic-bezier(.2,0,0,1) infinite", animationDelay: "3s", opacity: 0 }}
      >
        <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-full border border-line bg-white">
          <ChannelLogo kind="whatsapp" size={16} />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-[12px] font-semibold">{t.toastTitle}</span>
          <span className="line-clamp-2 text-[11.5px] text-[#475569]">{t.toast}</span>
          <span className="mt-1 inline-block text-[11px] font-medium text-brand-600">{t.open} →</span>
        </span>
        <Icon name="x" size={13} className="text-muted" />
      </div>
      <div className="pointer-events-none absolute -right-10 -bottom-20 z-20 hidden origin-bottom-right scale-[0.88] animate-toast-in lg:block xl:-right-36" style={{ animationDelay: "0.7s" }}>
        <MobileDashboard />
      </div>
      <style>{`
        @keyframes cursor-path {
          0% { left: 58%; top: 70%; opacity: 0; }
          8% { opacity: 1; }
          38%, 62% { left: calc(100% - 118px); top: 98px; opacity: 1; }
          80% { left: 72%; top: 46%; opacity: 1; }
          92%, 100% { left: 72%; top: 46%; opacity: 0; }
        }
        @keyframes cursor-press { 0%, 40%, 50%, 100% { transform: scale(1); } 45% { transform: scale(.82); } }
        @keyframes click-ring { 0%, 22% { box-shadow: 0 0 0 0 rgb(37 99 235 / 0); } 25% { box-shadow: 0 0 0 0 rgb(37 99 235 / .5); } 40%, 100% { box-shadow: 0 0 0 10px rgb(37 99 235 / 0); } }
        @keyframes toast-cycle { 0% { opacity: 0; transform: translateY(8px) scale(.98); } 6%, 70% { opacity: 1; transform: none; } 78%, 100% { opacity: 0; transform: translateY(8px) scale(.98); } }
      `}</style>
    </div>
  );
}

const boardCopy = defineCopy({
  nl: {
    title: "Pijplijn",
    subtitle: "Van inkoop tot aflevering",
    tabs: ["Voorraad", "Verkoop"],
    avg: (d: number) => `gem. ${d} d`,
    stages: [
      ["Intake", "warning", "€ 59.900", 3, "Intake vereist"],
      ["Voorbereiding", "info", "€ 77.700", 6, "Intake, Poetsen vereist"],
      ["Verkoopklaar", "success", "€ 186.400", 9, "Fotografie vereist"],
      ["Aflevering", "ai", "€ 31.750", 2, "Verkocht vereist"],
    ] as [string, BadgeTone, string, number, string][],
    cards: [
      [
        { make: "volkswagen", title: "VW Golf", price: "€ 24.950", specs: "1.5 eTSI Life · 2022 · 34.512 km", plate: "R-512-FX", status: "Niet te koop", tone: "neutral", missing: "Tweede sleutel, onderhoudsboekje", days: 2, stock: "V-041", tasks: 2, done: 1, total: 4 },
        { make: "bmw", title: "BMW 320e Touring", price: "€ 34.950", specs: "M Sport · 2022 · 41.200 km", plate: "S-208-KL", status: "Niet te koop", tone: "neutral", days: 6, stock: "V-038", tasks: 1, done: 2, total: 4 },
      ],
      [
        { make: "kia", title: "Kia EV6", price: "€ 42.750", specs: "GT-Line · 2023 · 18.950 km", plate: "T-114-NB", status: "Beschikbaar", tone: "success", days: 12, stock: "V-033", done: 3, total: 4 },
        { make: "mercedes-benz", title: "Mercedes A 250 e", price: "€ 34.950", specs: "AMG Line · 2021 · 52.300 km", plate: "L-390-PZ", status: "Beschikbaar", tone: "success", days: 34, stock: "V-027", tasks: 1, done: 2, total: 4 },
      ],
      [
        { make: "volvo", title: "Volvo XC40 Recharge", price: "€ 38.950", specs: "Plus · 2023 · 18.400 km", plate: "P-771-RD", status: "Gereserveerd", tone: "warning", days: 21, stock: "V-031", testDrives: 2, done: 4, total: 4 },
        { make: "toyota", title: "Toyota Yaris Cross", price: "€ 27.450", specs: "Hybrid Dynamic · 2022 · 29.800 km", plate: "K-662-JD", status: "Beschikbaar", tone: "success", days: 64, stock: "V-019", done: 4, total: 4 },
      ],
      [{ make: "peugeot", title: "Peugeot 308 SW", price: "€ 31.750", specs: "Hybrid GT · 2023 · 12.100 km", plate: "N-009-GH", status: "Verkocht", tone: "info", days: 28, stock: "V-024", tasks: 1, done: 3, total: 4 }],
    ] as PipelineCardData[][],
  },
  en: {
    title: "Pipeline",
    subtitle: "From purchase to delivery",
    tabs: ["Stock", "Sales"],
    avg: (d: number) => `avg ${d} d`,
    stages: [
      ["Intake", "warning", "€59,900", 3, "Intake required"],
      ["Preparation", "info", "€77,700", 6, "Intake, Valeting required"],
      ["Sale-ready", "success", "€186,400", 9, "Photography required"],
      ["Delivery", "ai", "€31,750", 2, "Sold required"],
    ] as [string, BadgeTone, string, number, string][],
    cards: [
      [
        { make: "volkswagen", title: "VW Golf", price: "€24,950", specs: "1.5 eTSI Life · 2022 · 34,512 km", plate: "R-512-FX", status: "Not for sale", tone: "neutral", missing: "Second key, service book", days: 2, stock: "V-041", tasks: 2, done: 1, total: 4 },
        { make: "bmw", title: "BMW 320e Touring", price: "€34,950", specs: "M Sport · 2022 · 41,200 km", plate: "S-208-KL", status: "Not for sale", tone: "neutral", days: 6, stock: "V-038", tasks: 1, done: 2, total: 4 },
      ],
      [
        { make: "kia", title: "Kia EV6", price: "€42,750", specs: "GT-Line · 2023 · 18,950 km", plate: "T-114-NB", status: "Available", tone: "success", days: 12, stock: "V-033", done: 3, total: 4 },
        { make: "mercedes-benz", title: "Mercedes A 250 e", price: "€34,950", specs: "AMG Line · 2021 · 52,300 km", plate: "L-390-PZ", status: "Available", tone: "success", days: 34, stock: "V-027", tasks: 1, done: 2, total: 4 },
      ],
      [
        { make: "volvo", title: "Volvo XC40 Recharge", price: "€38,950", specs: "Plus · 2023 · 18,400 km", plate: "P-771-RD", status: "Reserved", tone: "warning", days: 21, stock: "V-031", testDrives: 2, done: 4, total: 4 },
        { make: "toyota", title: "Toyota Yaris Cross", price: "€27,450", specs: "Hybrid Dynamic · 2022 · 29,800 km", plate: "K-662-JD", status: "Available", tone: "success", days: 64, stock: "V-019", done: 4, total: 4 },
      ],
      [{ make: "peugeot", title: "Peugeot 308 SW", price: "€31,750", specs: "Hybrid GT · 2023 · 12,100 km", plate: "N-009-GH", status: "Sold", tone: "info", days: 28, stock: "V-024", tasks: 1, done: 3, total: 4 }],
    ] as PipelineCardData[][],
  },
});

/** The stock pipeline board (src/components/pipeline/board.tsx), with a card travelling to the next stage. */
export function PipelineBoard() {
  const t = boardCopy[useLang()];
  const s = shell[useLang()];
  return (
    <AppShell active={s.nav[0].items[2][1]}>
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div>
          <h2 className="text-[17px] leading-tight">{t.title}</h2>
          <p className="mt-0.5 text-[10.5px] text-[#475569]">{t.subtitle}</p>
        </div>
        <span className="flex rounded-[8px] bg-sunken p-0.5 text-[10.5px] font-medium">
          {t.tabs.map((tab, i) => (
            <span key={tab} className={clsx("rounded-[6px] px-2.5 py-1", i === 0 ? "bg-surface text-ink shadow-sm" : "text-muted")}>
              {tab}
            </span>
          ))}
        </span>
      </div>
      <div className="relative flex gap-2.5 overflow-hidden">
        {t.stages.map(([name, tone, value, avg, requires], si) => (
          <StageColumn key={name} width={236} name={name} tone={tone} count={t.cards[si].length} value={value} avg={t.avg(avg)} requires={requires}>
            {t.cards[si].map((card, ci) => (
              <PipelineCard key={card.plate} card={card} delay={200 + si * 120 + ci * 80} highlight={si === 1 && ci === 0} />
            ))}
          </StageColumn>
        ))}
        <span className="pointer-events-none absolute top-[118px] left-[252px] z-10 hidden w-[224px] lg:block" style={{ animation: "card-travel 7s cubic-bezier(.45,0,.25,1) infinite", animationDelay: "1.5s", opacity: 0 }}>
          <PipelineCard card={t.cards[1][0]} highlight />
        </span>
      </div>
      <style>{`@keyframes card-travel { 0%, 10% { opacity: 0; transform: translate(0,0) rotate(0); } 16% { opacity: 1; transform: translate(0,-4px) rotate(-1.5deg); } 55% { opacity: 1; transform: translate(246px,-4px) rotate(1.5deg); } 62%, 100% { opacity: 0; transform: translate(246px,0) rotate(0); } }`}</style>
    </AppShell>
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
