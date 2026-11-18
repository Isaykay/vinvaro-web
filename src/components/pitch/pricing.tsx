"use client";

import { useState } from "react";
import { useLang } from "@/components/lang-provider";
import { getContent } from "@/lib/content";
import { numberLocale } from "@/lib/i18n";
import { staffSavings } from "@/lib/savings";
import { motion } from "./animation";
import { useT } from "./lang";
import { Slide } from "./slide";
import { Card, Check, Heading, Label, Lead, Tick, ease, useOnScreen } from "./ui";

type Scenario = { label: string; vehicles: number };

export function PricingSlide() {
  const t = useT();
  const lang = useLang();
  const { pricing, platform } = getContent(lang);
  const [ref, on] = useOnScreen<HTMLDivElement>();
  const [tab, setTab] = useState<"pricing" | "example">("pricing");
  const [presetIdx, setPresetIdx] = useState(1);
  const [custom, setCustom] = useState({ vehicles: 80 });

  const unit = (key: string) => pricing.items.find((i) => i.key === key)!.unitPriceCents;
  const money = (cents: number, decimals = cents % 100 !== 0) =>
    new Intl.NumberFormat(numberLocale[lang], { style: "currency", currency: "EUR", minimumFractionDigits: decimals ? 2 : 0, maximumFractionDigits: decimals ? 2 : 0 }).format(cents / 100);
  const num = (n: number) => n.toLocaleString(numberLocale[lang]);

  const included = [
    t("Alle modules, geen losse add-ons", "Every module, no separate add-ons"),
    t("Onbeperkt gebruikers", "Unlimited users"),
    t("Onbeperkt partners", "Unlimited partners"),
    t("Publiceren naar je website en 185+ portals", "Publishing to your website and 185+ portals"),
    t("RDW-acties: vrijwaren, tenaamstellen, B2B, km-stand", "RDW: indemnify, registration, B2B, odometer"),
    t("AI, Fotostudio, ondertekenen en KVK", "AI, Photo studio, e-signing and KVK"),
    t("Hulp bij de overstap en import", "Help with switching and import"),
  ];

  const presets: Scenario[] = [
    { label: t("Klein autobedrijf", "Small dealership"), vehicles: 25 },
    { label: t("Middelgroot autobedrijf", "Mid-size dealership"), vehicles: 60 },
    { label: t("Meerdere vestigingen", "Multiple branches"), vehicles: 150 },
  ];
  const isCustom = presetIdx === -1;
  const scenario: Scenario = isCustom ? { label: t("Aangepast", "Custom"), ...custom } : presets[presetIdx];
  const describe = (s: Scenario) => t(`${num(s.vehicles)} auto's in voorraad`, `${num(s.vehicles)} cars in stock`);
  const savings = staffSavings(scenario.vehicles);
  const fte = (n: number) => n.toLocaleString(numberLocale[lang], { minimumFractionDigits: 1, maximumFractionDigits: 1 });

  const lines = [
    { name: t("Dealer-plan", "Dealer plan"), formula: t("Alle modules voor het hele bedrijf", "Every module for the whole business"), cents: pricing.basePriceCents, brand: true },
    { name: t("Voertuigen in voorraad", "Vehicles in stock"), formula: `${num(scenario.vehicles)} × ${money(unit("stock_vehicles"))}`, cents: scenario.vehicles * unit("stock_vehicles") },
    {
      name: t("Publiceren", "Publishing"),
      formula: t("Je website, VINVARO Marktplaats en Handelsplein, en 185+ portals zoals Marktplaats, AutoTrack en AutoScout24", "Your website, VINVARO Marketplace and Trade network, and 185+ portals such as Marktplaats, AutoTrack and AutoScout24"),
      cents: 0,
    },
    {
      name: t("RDW, AI en ondertekenen", "RDW, AI and e-signing"),
      formula: t("Vrijwaren, tenaamstellen, B2B en km-stand · AI-agent en Fotostudio · digitaal ondertekenen · KVK en VIES", "Indemnify, registration, B2B and odometer · AI agent and Photo studio · e-signing · KVK and VIES"),
      cents: 0,
    },
    {
      name: t("Gebruikers, partners en netwerken", "Users, partners and networks"),
      formula: t("Onbeperkt gebruikers en partners · Handelsplein en Marktplaats zonder transactiekosten", "Unlimited users and partners · trade network and Marketplace without transaction fees"),
      cents: 0,
    },
  ];
  const total = lines.reduce((n, l) => n + l.cents, 0);
  const max = Math.max(...lines.map((l) => l.cents));

  const ListItem = ({ children, tone }: { children: string; tone: "brand" | "ok" }) => (
    <li className="flex items-center gap-2.5 border-b border-line py-2 text-[14px] text-ink last:border-0">
      <Tick tone={tone} />
      {children}
    </li>
  );

  return (
    <Slide id="prijzen" variant="white">
      <div ref={ref}>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Heading on={on}>
              {t("Simpel en ", "Simple and ")}
              <span className="text-brand">{t("transparant tarief", "transparent pricing")}</span>
            </Heading>
            <Lead on={on}>{t("Eén plan voor je hele bedrijf. Je betaalt voor je voorraad, niet voor je team.", "One plan for your whole business. You pay for your stock, not your team.")}</Lead>
          </div>
          <div className="flex w-fit gap-1 rounded-full bg-white p-1 shadow-card">
            {(["pricing", "example"] as const).map((k) => (
              <button
                key={k}
                type="button"
                onClick={() => setTab(k)}
                className={`rounded-full px-5 py-2 text-[13.5px] font-medium transition-colors ${tab === k ? "bg-brand text-white shadow-[0_4px_14px_-4px_rgba(37,99,235,0.6)]" : "text-muted hover:bg-sunken hover:text-ink"}`}
              >
                {k === "pricing" ? t("Prijs", "Pricing") : t("Rekenvoorbeeld", "Example")}
              </button>
            ))}
          </div>
        </div>

        {tab === "pricing" ? (
          <motion.div key="p" initial={{ opacity: 0, y: 16 }} animate={on ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.15, ease }} className="mt-10 grid items-stretch gap-5 lg:grid-cols-[0.9fr_1.1fr]">
            <Card className="relative flex h-full flex-col overflow-hidden p-8 shadow-[0_0_0_1.5px_#2563eb,0_24px_64px_-24px_rgb(37_99_235/0.45)]">
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-brand-50 to-white" />
              <div className="relative flex flex-1 flex-col">
                <Label>{t("Dealer-plan · per autobedrijf", "Dealer plan · per dealership")}</Label>
                <p className="mt-3 flex items-baseline gap-2">
                  <span className="text-[72px] leading-none font-semibold tracking-[-0.05em] text-ink">{money(pricing.basePriceCents)}</span>
                  <span className="text-[17px] text-muted">{t("/maand", "/month")}</span>
                </p>
                <p className="mt-2 text-[14px] text-muted">
                  {t("plus", "plus")} <span className="font-semibold text-ink">{money(unit("stock_vehicles"))}</span> {t("per voertuig in voorraad, excl. btw", "per vehicle in stock, excl. VAT")}
                </p>
                <ul className="mt-5">
                  {included.map((x) => (
                    <ListItem key={x} tone="ok">
                      {x}
                    </ListItem>
                  ))}
                </ul>
                <div className="mt-auto flex flex-wrap gap-2 pt-6">
                  {[t(`${pricing.trialDays} dagen gratis proberen`, `${pricing.trialDays}-day free trial`), t("Gebruikers altijd gratis", "Users always free")].map((x) => (
                    <span key={x} className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[12.5px] font-medium text-ok ring-1 ring-ok/20">
                      <Check className="h-3 w-3" />
                      {x}
                    </span>
                  ))}
                </div>
              </div>
            </Card>

            <div className="flex h-full flex-col gap-5">
              <Card className="flex flex-1 flex-col justify-center p-6">
                <Label className="mb-2">{t("Alle modules inbegrepen", "Every module included")}</Label>
                <ul className="grid gap-x-6 sm:grid-cols-2">
                  {platform.slice(0, 10).map((m) => (
                    <ListItem key={m.slug} tone="brand">
                      {m.name}
                    </ListItem>
                  ))}
                </ul>
              </Card>
              <div className="grid gap-5 sm:grid-cols-2">
                {[
                  {
                    title: t("Publiceren", "Publishing"),
                    sub: t("Je website, de VINVARO-netwerken en 185+ portals zoals Marktplaats, AutoTrack, AutoScout24 en mobile.de.", "Your website, the VINVARO networks and 185+ portals such as Marktplaats, AutoTrack, AutoScout24 and mobile.de."),
                    price: t("Inbegrepen", "Included"),
                    unit: t("geen kosten per kanaal", "no fee per channel"),
                  },
                  {
                    title: t("Bespaard op personeel", "Saved on staff"),
                    sub: t("Bij 45 auto's in voorraad, op basis van ± 3 uur per verkochte auto en minder dubbel werk.", "With 45 cars in stock, based on ± 3 hours per car sold and less double work."),
                    price: `≈ ${fte(staffSavings(45).fte)} fte`,
                    unit: t(`± ${money(Math.round(staffSavings(45).cents / 10000) * 10000, false)} / mnd`, `± ${money(Math.round(staffSavings(45).cents / 10000) * 10000, false)} / mo`),
                  },
                ].map((a) => (
                  <Card key={a.title} className="flex items-start justify-between gap-4 p-5">
                    <div className="min-w-0">
                      <p className="text-[15px] font-semibold tracking-[-0.02em] text-ink">{a.title}</p>
                      <p className="mt-1.5 text-[13px] leading-[1.5] text-muted">{a.sub}</p>
                    </div>
                    <div className="shrink-0 text-right">
                      <p className="font-mono text-[17px] leading-none font-semibold text-ok">{a.price}</p>
                      <p className="mt-1.5 font-mono text-[10.5px] whitespace-nowrap text-subtle">{a.unit}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div key="c" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease }} className="mt-10">
            <div className="flex flex-wrap gap-2">
              {presets.map((p, i) => (
                <button
                  key={p.label}
                  type="button"
                  onClick={() => setPresetIdx(i)}
                  className={`rounded-2xl px-4 py-3 text-left transition-shadow ${presetIdx === i ? "bg-white shadow-[0_0_0_1.5px_#2563eb,0_8px_24px_-12px_rgb(37_99_235/0.5)]" : "bg-white shadow-card hover:shadow-float"}`}
                >
                  <span className="block text-[14px] font-semibold text-ink">{p.label}</span>
                  <span className="block font-mono text-[11px] text-muted">{describe(p)}</span>
                </button>
              ))}
              <div onClick={() => setPresetIdx(-1)} className={`flex cursor-pointer items-end gap-3 rounded-2xl bg-white px-4 py-3 ${isCustom ? "shadow-[0_0_0_1.5px_#2563eb]" : "shadow-card"}`}>
                <span className="text-[14px] font-semibold text-ink">{t("Aangepast", "Custom")}</span>
                {[
                  { l: t("Auto's", "Cars"), v: custom.vehicles, set: (v: number) => setCustom((c) => ({ ...c, vehicles: v })), w: "w-20" },
                ].map((f) => (
                  <label key={f.l} className="flex flex-col font-mono text-[10px] tracking-[0.06em] text-subtle uppercase">
                    {f.l}
                    <input
                      type="number"
                      min={0}
                      value={f.v}
                      onFocus={() => setPresetIdx(-1)}
                      onChange={(e) => {
                        f.set(Math.max(0, parseInt(e.target.value) || 0));
                        setPresetIdx(-1);
                      }}
                      className={`mt-0.5 ${f.w} rounded-md bg-canvas px-2 py-1 font-mono text-[13px] text-ink ring-1 ring-line focus:ring-brand focus:outline-none`}
                    />
                  </label>
                ))}
              </div>
            </div>

            <Card className="mt-5 overflow-hidden">
              {lines.map((l, i) => (
                <motion.div key={`${l.name}-${presetIdx}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.06 }} className={`border-b border-line px-5 py-4 last:border-0 ${l.brand ? "bg-brand-50/60" : ""}`}>
                  <div className="flex items-center gap-3">
                    <span className={`text-[15px] font-semibold tracking-[-0.02em] ${l.brand ? "text-brand" : "text-ink"}`}>{l.name}</span>
                    {l.cents === 0 && <span className="rounded-full bg-ok px-2 py-0.5 font-mono text-[10px] font-medium text-white">{t("GRATIS", "FREE")}</span>}
                    <span className="ml-auto font-mono text-[16px] font-semibold text-ink">
                      {money(l.cents, false)}
                      <span className="text-[12px] font-normal text-muted">{t("/mnd", "/mo")}</span>
                    </span>
                  </div>
                  <div className="mt-2.5 h-2 overflow-hidden rounded-full bg-sunken">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(l.cents / (max * 1.05)) * 100}%` }}
                      transition={{ duration: 0.8, delay: 0.2 + i * 0.08, ease }}
                      className={`h-full rounded-full ${l.brand ? "bg-brand" : "bg-line-strong"}`}
                    />
                  </div>
                  <p className="mt-1.5 font-mono text-[11px] text-subtle">{l.formula}</p>
                </motion.div>
              ))}
            </Card>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-2 rounded-[18px] bg-ok-50 px-5 py-4 ring-1 ring-ok/20">
              <p className="text-[15px] text-ok">
                {t("Totaal", "Total")} <span className="font-mono text-[18px] font-semibold">{money(total, false)}</span> {t("per maand voor je hele team", "per month for your whole team")}
              </p>
              <p className="font-mono text-[11px] text-ok/80">
                {scenario.vehicles > 0 && <>≈ {money(Math.round(total / scenario.vehicles))} {t("per auto in voorraad", "per car in stock")} · </>}
                {describe(scenario)}
              </p>
            </div>
            {scenario.vehicles > 0 && (
              <div className="mt-3 flex flex-wrap items-center justify-between gap-2 rounded-[18px] bg-ink px-5 py-4 text-white">
                <p className="text-[15px] text-white/85">
                  {t("Bespaard op personeel", "Saved on staff")} <span className="font-mono text-[18px] font-semibold text-[#7ee2a8]">≈ {fte(savings.fte)} fte</span>
                </p>
                <p className="font-mono text-[11px] text-white/80">
                  ± {money(Math.round(savings.cents / 10000) * 10000, false)} {t("loonkosten per maand", "payroll per month")}
                  {savings.cents > total && ` · ${Math.round(savings.cents / total)}× ${t("terugverdiend", "return")}`}
                </p>
              </div>
            )}
            <p className="mt-4 text-center text-[12px] text-subtle">
              {t(
                "* Bedragen exclusief btw, op basis van de VINVARO-prijslijst. Alles is inbegrepen; AI-agent en Fotostudio bij normaal gebruik (100 + 20 berichten en 100 + 30 foto’s per auto). Je RDW-provider, RDW-leges en eventuele portalabonnementen betaal je zelf. Besparing is een indicatie (± 3 uur per verkochte auto, € 4.000 per fte).",
                "* Amounts excluding VAT, based on the VINVARO price list. Everything is included; AI agent and Photo studio with normal use (100 + 20 messages and 100 + 30 photos per car). Your RDW provider, statutory RDW fees and any portal subscriptions are paid by you. Savings are an estimate (± 3 hours per car sold, €4,000 per FTE).",
              )}
            </p>
          </motion.div>
        )}
      </div>
    </Slide>
  );
}
