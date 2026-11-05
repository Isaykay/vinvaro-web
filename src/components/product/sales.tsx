"use client";

import clsx from "clsx";
import { ArrowRight, Building2, CalendarCheck, Check, FileSignature, Globe, Receipt, Send, Sparkles } from "lucide-react";
import { useLang } from "@/components/lang-provider";
import { defineCopy } from "@/lib/i18n";
import { ChannelLogo, type ChannelKind } from "@/components/channel-logo";
import { Mark } from "@/components/ui";
import { AppWindow, BrandLogo, Car, Pill, Plate, delay } from "@/components/product/kit";

const copy = defineCopy({
  nl: {
    tabs: ["Alle", "WhatsApp", "E-mail"],
    threads: [
      ["Mark Jansen", "Is de XC40 nog beschikbaar? Zaterdag proefrit?", "Proefrit", 86, "whatsapp", "09:41"],
      ["Lisa de Boer", "Wat geven jullie voor mijn Polo bij inruil?", "Inruil", 72, "gmail", "09:12"],
      ["Garage Smit B.V.", "Offerte voor drie bestelwagens", "Zakelijk", 64, "outlook", "08:55"],
      ["Ahmed Yilmaz", "Kan ik de EV6 financieren?", "Financiering", 58, "whatsapp", "Gisteren"],
    ] as [string, string, string, number, ChannelKind, string][],
    customer: "Mark Jansen",
    linked: "Gekoppeld aan",
    msg1: "Hoi! Is de Volvo XC40 nog beschikbaar?",
    msg2: "Kan ik zaterdag een proefrit maken?",
    draft: "AI-voorstel",
    draftText: "Hoi Mark, de XC40 Recharge staat nog voor je klaar. Zaterdag om 10:00 of 11:30 kan een proefrit. Welke tijd past jou?",
    send: "Versturen",
    stages: ["Nieuw", "Proefrit", "Offerte", "Gewonnen"],
    deals: [
      ["Lisa de Boer", "volkswagen", "Polo inruil", "€ 4.500"],
      ["Mark Jansen", "volvo", "XC40 Recharge", "€ 38.950"],
      ["Garage Smit B.V.", "renault", "3× Kangoo E-Tech", "€ 92.400"],
      ["Fam. Peters", "peugeot", "308 SW Hybrid", "€ 31.750"],
    ],
    inStage: "d in fase",
    kvkSearch: "Garage Smit",
    kvkResult: "Garage Smit B.V. · KVK 81234567",
    vies: "Btw-nummer geldig",
    week: ["Ma", "Di", "Wo", "Do", "Vr", "Za"],
    appts: [
      [0, 1, 2, "Proefrit XC40", "brand"],
      [1, 3, 2, "Aflevering 308", "ok"],
      [2, 0, 1, "Bezichtiging EV6", "ai"],
      [3, 2, 2, "Proefrit Golf", "brand"],
      [4, 4, 1, "Gesprek Smit", "neutral"],
      [5, 0, 2, "Proefrit XC40", "brand"],
    ] as [number, number, number, string, "brand" | "ok" | "ai" | "neutral"][],
    invited: "Klant uitgenodigd",
    inCal: "In Google-agenda van Sanne",
    contract: "Koopovereenkomst",
    contractNo: "KO-2026-0187",
    parties: [
      ["Verkoper", "Autobedrijf De Vries"],
      ["Koper", "Mark Jansen"],
      ["Voertuig", "Volvo XC40 Recharge"],
    ],
    total: "Koopsom",
    signedBy: "Digitaal getekend door Mark Jansen",
    signed: "Getekend",
    invoice: "Factuur",
    invoiceLines: [
      ["Volvo XC40 Recharge", "€ 38.950,00"],
      ["Afleverpakket", "€ 595,00"],
      ["Inruil VW Polo", "− € 4.500,00"],
    ],
    toPay: "Te betalen",
    toPayValue: "€ 35.045,00",
    vatMargin: "Marge-auto",
    sent: "Verstuurd",
    priceChange: "Nieuwe vraagprijs",
    sold: "Verkocht",
    yourSite: "Jouw website",
    synced: "Bijgewerkt op alle kanalen",
    feedButton: "Proefrit aanvragen",
    carFacts: "2023 · 18.400 km · Automaat",
    oldPrice: "€ 39.950",
    newPrice: "€ 38.950",
  },
  en: {
    tabs: ["All", "WhatsApp", "Email"],
    threads: [
      ["Mark Jansen", "Is the XC40 still available? Test drive Saturday?", "Test drive", 86, "whatsapp", "09:41"],
      ["Lisa de Boer", "What would you offer for my Polo as a trade-in?", "Trade-in", 72, "gmail", "09:12"],
      ["Smit Garage Ltd", "Quote for three vans", "Business", 64, "outlook", "08:55"],
      ["Ahmed Yilmaz", "Can I finance the EV6?", "Financing", 58, "whatsapp", "Yesterday"],
    ] as [string, string, string, number, ChannelKind, string][],
    customer: "Mark Jansen",
    linked: "Linked to",
    msg1: "Hi! Is the Volvo XC40 still available?",
    msg2: "Could I take a test drive on Saturday?",
    draft: "AI suggestion",
    draftText: "Hi Mark, the XC40 Recharge is still available. A test drive on Saturday at 10:00 or 11:30 works. Which time suits you?",
    send: "Send",
    stages: ["New", "Test drive", "Quote", "Won"],
    deals: [
      ["Lisa de Boer", "volkswagen", "Polo trade-in", "€4,500"],
      ["Mark Jansen", "volvo", "XC40 Recharge", "€38,950"],
      ["Smit Garage Ltd", "renault", "3× Kangoo E-Tech", "€92,400"],
      ["The Peters family", "peugeot", "308 SW Hybrid", "€31,750"],
    ],
    inStage: "d in stage",
    kvkSearch: "Garage Smit",
    kvkResult: "Garage Smit B.V. · KVK 81234567",
    vies: "VAT number valid",
    week: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    appts: [
      [0, 1, 2, "Test drive XC40", "brand"],
      [1, 3, 2, "Delivery 308", "ok"],
      [2, 0, 1, "Viewing EV6", "ai"],
      [3, 2, 2, "Test drive Golf", "brand"],
      [4, 4, 1, "Meeting Smit", "neutral"],
      [5, 0, 2, "Test drive XC40", "brand"],
    ] as [number, number, number, string, "brand" | "ok" | "ai" | "neutral"][],
    invited: "Customer invited",
    inCal: "In Sanne's Google Calendar",
    contract: "Sales agreement",
    contractNo: "SA-2026-0187",
    parties: [
      ["Seller", "De Vries Automotive"],
      ["Buyer", "Mark Jansen"],
      ["Vehicle", "Volvo XC40 Recharge"],
    ],
    total: "Purchase price",
    signedBy: "Signed digitally by Mark Jansen",
    signed: "Signed",
    invoice: "Invoice",
    invoiceLines: [
      ["Volvo XC40 Recharge", "€38,950.00"],
      ["Delivery package", "€595.00"],
      ["Trade-in VW Polo", "− €4,500.00"],
    ],
    toPay: "Amount due",
    toPayValue: "€35,045.00",
    vatMargin: "Margin car",
    sent: "Sent",
    priceChange: "New asking price",
    sold: "Sold",
    yourSite: "Your website",
    synced: "Updated on every channel",
    feedButton: "Request a test drive",
    carFacts: "2023 · 18,400 km · Automatic",
    oldPrice: "€39,950",
    newPrice: "€38,950",
  },
});

/** First and last capitalised word, skipping legal suffixes like "B.V." and particles like "de". */
function initials(name: string) {
  const words = name.split(" ").filter((w) => /^[A-Z]/.test(w) && !w.includes("."));
  return `${words[0]?.[0] ?? ""}${words.length > 1 ? words[words.length - 1][0] : ""}`;
}

export function InboxView() {
  const t = copy[useLang()];
  return (
    <AppWindow>
      <div className="grid md:grid-cols-[0.95fr_1.05fr]">
        <div className="border-b border-line md:border-r md:border-b-0">
          <div className="flex gap-1 border-b border-line p-2.5">
            {t.tabs.map((tab, i) => (
              <span key={tab} className={clsx("rounded-lg px-2.5 py-1 text-[11.5px] font-medium", i === 0 ? "bg-ink text-white" : "text-muted")}>
                {tab}
              </span>
            ))}
          </div>
          <ul>
            {t.threads.map(([name, text, label, score, kind, time], i) => (
              <li
                key={name}
                className={clsx("flex animate-row-in gap-3 border-b border-line px-3.5 py-3 last:border-0", i === 0 && "bg-brand-50/60")}
                style={delay(0.15 + i * 0.12)}
              >
                <span className="relative flex size-8 shrink-0 items-center justify-center rounded-full bg-sunken text-[11px] font-semibold text-ink-2">
                  {initials(name)}
                  <span className="absolute -right-1 -bottom-1 flex size-4 items-center justify-center rounded-full bg-surface ring-1 ring-line">
                    <ChannelLogo kind={kind} size={10} />
                  </span>
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-2">
                    <span className="truncate text-[12.5px] font-semibold">{name}</span>
                    <span className="ml-auto shrink-0 font-mono text-[10px] text-subtle">{time}</span>
                  </span>
                  <span className="mt-0.5 block truncate text-[11.5px] text-muted">{text}</span>
                  <span className="mt-1.5 flex items-center gap-1.5">
                    <Pill tone="brand">{label}</Pill>
                    <span className="flex items-center gap-1 text-[10px] text-ask">
                      <Sparkles className="size-2.5" />
                      <span className="h-1 w-10 overflow-hidden rounded-full bg-ask-50">
                        <span className="block h-full origin-left animate-progress rounded-full bg-ask-400" style={{ width: `${score}%`, animationIterationCount: 1, ...delay(0.4 + i * 0.12) }} />
                      </span>
                      {score}
                    </span>
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col bg-[#efeae2]/50 p-4">
          <div className="flex items-center gap-2.5 rounded-xl bg-surface p-2.5 shadow-card">
            <BrandLogo make="volvo" className="size-8" />
            <div className="min-w-0">
              <p className="text-[10px] text-muted">{t.linked}</p>
              <p className="truncate text-[12px] font-semibold">XC40 Recharge</p>
            </div>
            <Plate className="ml-auto">P-771-RD</Plate>
          </div>
          <div className="mt-4 flex flex-col gap-1.5">
            <p className="max-w-[80%] animate-row-in self-start rounded-xl rounded-tl-sm bg-surface px-3 py-2 text-[12px] shadow-sm" style={delay(0.5)}>
              {t.msg1}
            </p>
            <p className="max-w-[80%] animate-row-in self-start rounded-xl rounded-tl-sm bg-surface px-3 py-2 text-[12px] shadow-sm" style={delay(0.8)}>
              {t.msg2}
            </p>
            <span className="flex animate-row-in gap-1 self-start rounded-xl bg-surface px-3 py-2.5 shadow-sm" style={delay(1.1)}>
              {[0, 1, 2].map((i) => (
                <span key={i} className="size-1.5 rounded-full bg-subtle" style={{ animation: "typing 1.2s ease-in-out infinite", animationDelay: `${i * 0.15}s` }} />
              ))}
            </span>
          </div>
          <div className="mt-auto animate-toast-in pt-4" style={delay(1.6)}>
            <div className="rounded-xl bg-surface p-3 shadow-card ring-1 ring-ask/20">
              <p className="flex items-center gap-1.5 text-[11px] font-medium text-ask">
                <Sparkles className="size-3" /> {t.draft}
              </p>
              <p className="mt-1.5 text-[12px] leading-snug text-ink-2">
                {t.draftText}
                <span className="ml-0.5 inline-block h-3.5 w-px translate-y-0.5 animate-blink bg-ink" />
              </p>
              <div className="mt-2.5 flex justify-end">
                <span className="flex h-7 items-center gap-1.5 rounded-lg bg-[#25d366] px-3 text-[11.5px] font-semibold text-white">
                  <Send className="size-3" /> {t.send}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppWindow>
  );
}

export function SalesPipeline() {
  const t = copy[useLang()];
  return (
    <div className="relative">
      <div className="grid grid-cols-2 gap-2.5 md:grid-cols-4">
        {t.stages.map((stage, si) => {
          const [name, make, car, value] = t.deals[si];
          return (
            <div key={stage} className="rounded-2xl bg-surface/70 p-2.5 ring-1 ring-line backdrop-blur">
              <div className="mb-2.5 flex items-center justify-between px-1">
                <span className="flex items-center gap-1.5 text-[12px] font-semibold">
                  <span className={clsx("size-2 rounded-full", ["bg-subtle", "bg-brand", "bg-ask-400", "bg-ok"][si])} />
                  {stage}
                </span>
                <span className="font-mono text-[10.5px] text-subtle">{[5, 3, 4, 7][si]}</span>
              </div>
              <div
                className={clsx("animate-row-in rounded-xl bg-surface p-3 shadow-card", si === 1 && "animate-soft-pulse ring-1 ring-brand/40")}
                style={delay(0.2 + si * 0.15)}
              >
                <div className="flex items-center gap-2">
                  <BrandLogo make={make} className="size-7" />
                  <span className="min-w-0">
                    <span className="block truncate text-[12px] font-semibold">{name}</span>
                    <span className="block truncate text-[11px] text-muted">{car}</span>
                  </span>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-[13px] font-semibold tabular-nums">{value}</span>
                  <span className="font-mono text-[10px] text-subtle">
                    {[1, 2, 4, 0][si]} {t.inStage}
                  </span>
                </div>
              </div>
              <div className="mt-2 h-[52px] rounded-xl border border-dashed border-line-strong/70" />
            </div>
          );
        })}
      </div>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <div className="animate-toast-in rounded-2xl bg-surface p-3.5 shadow-float" style={delay(0.9)}>
          <div className="flex h-9 items-center gap-2 rounded-lg bg-canvas px-3 text-[12px] ring-2 ring-brand">
            <Building2 className="size-3.5 text-subtle" />
            {t.kvkSearch}
            <span className="h-3.5 w-px animate-blink bg-ink" />
          </div>
          <p className="mt-2 flex items-center gap-2 rounded-lg bg-brand-50 px-3 py-2 text-[12px] font-medium text-brand">
            <Check className="size-3.5" strokeWidth={3} /> {t.kvkResult}
          </p>
        </div>
        <div className="flex animate-toast-in items-center gap-3 rounded-2xl bg-surface p-3.5 shadow-float" style={delay(1.3)}>
          <span className="flex size-10 items-center justify-center rounded-xl bg-ok-50 text-ok">
            <Check className="size-5" strokeWidth={2.5} />
          </span>
          <span>
            <span className="block text-[13px] font-semibold">{t.vies}</span>
            <span className="block font-mono text-[11px] text-muted">VIES · NL862345678B01</span>
          </span>
        </div>
      </div>
    </div>
  );
}

export function AgendaWeek() {
  const t = copy[useLang()];
  const hours = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00"];
  const tones = { brand: "bg-brand-50 text-brand ring-brand/25 border-l-brand", ok: "bg-ok-50 text-ok ring-ok/20 border-l-ok", ai: "bg-ask-50 text-ask ring-ask/20 border-l-ask", neutral: "bg-sunken text-ink-2 ring-line border-l-ink-2" };
  return (
    <div className="relative">
      <AppWindow>
        <div className="p-4">
          <div className="grid grid-cols-[40px_repeat(6,1fr)] gap-1">
            <span />
            {t.week.map((d, i) => (
              <span key={d} className={clsx("pb-2 text-center text-[11px] font-semibold", i === 3 ? "text-brand" : "text-muted")}>
                {d} {10 + i}
              </span>
            ))}
            {hours.map((h, row) => (
              <div key={h} className="contents">
                <span className="pt-1 font-mono text-[9.5px] text-subtle">{h}</span>
                {t.week.map((d, col) => {
                  const a = t.appts.find(([c, r]) => c === col && r === row);
                  return (
                    <div key={d} className="relative h-12 rounded-md bg-canvas ring-1 ring-line/60">
                      {a && (
                        <div
                          className={clsx("absolute inset-x-0.5 top-0.5 z-10 animate-row-in rounded-md border-l-[3px] px-1.5 py-1 text-[10px] leading-tight font-medium ring-1", tones[a[4]])}
                          style={{ height: `calc(${a[2] * 100}% + ${(a[2] - 1) * 4}px - 4px)`, ...delay(0.2 + col * 0.1) }}
                        >
                          {a[3]}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </AppWindow>
      <div className="absolute -right-3 -bottom-5 hidden w-[250px] animate-toast-in rounded-2xl bg-surface p-3.5 shadow-float sm:block" style={delay(1.2)}>
        <div className="flex items-center gap-2.5">
          <span className="flex size-9 items-center justify-center rounded-xl bg-brand-50 text-brand">
            <CalendarCheck className="size-4.5" />
          </span>
          <span>
            <span className="block text-[12.5px] font-semibold">{t.invited}</span>
            <span className="block text-[11px] text-muted">{t.inCal}</span>
          </span>
        </div>
      </div>
    </div>
  );
}

export function ContractSign() {
  const t = copy[useLang()];
  return (
    <div className="grid items-start gap-4 md:grid-cols-[1.1fr_0.9fr]">
      <div className="relative rounded-2xl bg-surface p-5 shadow-float">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <FileSignature className="size-4 text-brand" />
            <span className="text-[14px] font-semibold">{t.contract}</span>
          </span>
          <span className="font-mono text-[10.5px] text-subtle">{t.contractNo}</span>
        </div>
        <dl className="mt-4 space-y-2">
          {t.parties.map(([k, v]) => (
            <div key={k} className="flex justify-between text-[12px]">
              <dt className="text-muted">{k}</dt>
              <dd className="font-medium">{v}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-4 space-y-1.5">
          {[100, 92, 96, 70].map((w, i) => (
            <span key={i} className="block h-1.5 rounded-full bg-sunken" style={{ width: `${w}%` }} />
          ))}
        </div>
        <div className="mt-4 flex items-baseline justify-between border-t border-line pt-3">
          <span className="text-[12px] text-muted">{t.total}</span>
          <span className="text-[18px] font-semibold tracking-[-0.03em] tabular-nums">{t.invoiceLines[0][1]}</span>
        </div>
        <div className="relative mt-4 rounded-xl bg-canvas p-3 ring-1 ring-line">
          <svg viewBox="0 0 240 70" className="h-14 w-full" aria-hidden>
            <path
              d="M14 46 C 26 18, 40 20, 42 40 S 56 60, 66 36 C 72 24, 80 26, 82 40 C 84 52, 96 52, 102 36 L 112 24 C 118 44, 130 50, 146 36 C 160 24, 176 34, 196 30"
              fill="none"
              stroke="#1d4ed8"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeDasharray="500"
              className="animate-draw"
              style={{ "--path-length": 500, animationDelay: "0.6s", animationDuration: "2.2s" } as React.CSSProperties}
            />
          </svg>
          <p className="text-[10.5px] text-muted">{t.signedBy}</p>
          <span
            className="absolute top-2 right-3 rotate-[-8deg] animate-toast-in rounded-md border-2 border-ok px-2 py-0.5 font-mono text-[11px] font-bold tracking-[0.12em] text-ok uppercase"
            style={delay(2.6)}
          >
            {t.signed}
          </span>
        </div>
      </div>
      <div className="animate-toast-in rounded-2xl bg-surface p-5 shadow-float md:mt-10" style={delay(1)}>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-[13px] font-semibold">
            <Receipt className="size-4 text-brand" /> {t.invoice} 2026-0412
          </span>
          <Pill tone="ok">
            <Check className="size-2.5" strokeWidth={3} /> {t.sent}
          </Pill>
        </div>
        <ul className="mt-4 space-y-2">
          {t.invoiceLines.map(([k, v], i) => (
            <li key={k} className="flex animate-row-in justify-between text-[12px]" style={delay(1.3 + i * 0.12)}>
              <span className="text-ink-2">{k}</span>
              <span className="font-mono tabular-nums">{v}</span>
            </li>
          ))}
        </ul>
        <div className="mt-3 flex items-center justify-between border-t border-line pt-3">
          <Pill>{t.vatMargin}</Pill>
          <span className="text-right">
            <span className="block text-[10.5px] text-muted">{t.toPay}</span>
            <span className="text-[17px] font-semibold tracking-[-0.03em] tabular-nums">{t.toPayValue}</span>
          </span>
        </div>
      </div>
    </div>
  );
}

export function PublishFlow() {
  const t = copy[useLang()];
  const channels = [
    { name: "mobile.de", color: "#f97316", y: 18 },
    { name: "AutoScout24", color: "#f5c400", y: 50 },
    { name: t.yourSite, color: "#2563eb", y: 82, site: true },
  ];
  return (
    <div className="relative grid items-center gap-6 md:grid-cols-[1.05fr_64px_1fr] md:gap-0">
      <div className="relative z-10 rounded-2xl bg-surface p-4 shadow-float">
        <div className="bg-stage relative overflow-hidden rounded-xl px-5 pt-6 pb-2">
          <Car className="relative w-full animate-float" />
        </div>
        <div className="mt-3 flex items-center gap-2.5">
          <BrandLogo make="volvo" className="size-8" />
          <span className="min-w-0">
            <span className="block text-[13px] font-semibold">XC40 Recharge</span>
            <span className="block text-[11px] text-muted">{t.carFacts}</span>
          </span>
        </div>
        <div className="mt-3 rounded-xl bg-canvas px-3 py-2 ring-1 ring-line">
          <span className="block text-[10.5px] text-muted">{t.priceChange}</span>
          <span className="mt-0.5 flex items-center gap-2 text-[13px] font-semibold whitespace-nowrap tabular-nums">
            <span className="text-subtle line-through">{t.oldPrice}</span>
            <ArrowRight className="size-3 shrink-0 text-subtle" />
            <span className="text-brand">{t.newPrice}</span>
          </span>
        </div>
      </div>

      <svg viewBox="0 0 120 100" preserveAspectRatio="none" className="hidden h-[260px] w-full md:block" aria-hidden>
        {channels.map((c) => (
          <g key={c.name}>
            <path d={`M0 50 C 60 50, 60 ${c.y}, 120 ${c.y}`} fill="none" stroke="#cbd5e1" strokeWidth="0.8" vectorEffect="non-scaling-stroke" />
            <path
              d={`M0 50 C 60 50, 60 ${c.y}, 120 ${c.y}`}
              fill="none"
              stroke={c.color}
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
              strokeDasharray="6 18"
              className="animate-dash"
            />
          </g>
        ))}
      </svg>

      <div className="relative z-10 flex flex-col gap-3">
        {channels.map((c, i) => (
          <div key={c.name} className="flex animate-toast-in items-center gap-3 rounded-2xl bg-surface p-3.5 shadow-float" style={delay(0.4 + i * 0.25)}>
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl ring-1 ring-line" style={{ background: `${c.color}14` }}>
              {c.site ? <Globe className="size-4.5 text-brand" /> : <span className="size-3 rounded-full" style={{ background: c.color }} />}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-[13px] font-semibold">{c.name}</span>
              <span className="block truncate text-[11px] text-muted">{c.site ? t.feedButton : `Online · ${t.newPrice}`}</span>
            </span>
            <span className="flex size-6 items-center justify-center rounded-full bg-ok text-white">
              <Check className="size-3.5" strokeWidth={3} />
            </span>
          </div>
        ))}
        <p className="flex animate-toast-in items-center gap-2 self-start rounded-full bg-ink px-3 py-1.5 text-[11.5px] font-medium text-white" style={delay(1.4)}>
          <Mark className="h-2.5 w-auto" /> {t.synced}
        </p>
      </div>
    </div>
  );
}
