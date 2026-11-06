"use client";

import { useState } from "react";
import clsx from "clsx";
import { getContent } from "@/lib/content";
import { defineCopy, numberLocale } from "@/lib/i18n";
import { useLang } from "@/components/lang-provider";
import { Icon } from "@/components/app-icons";
import { Mark } from "@/components/ui";

const copy = defineCopy({
  nl: {
    title: "Reken je maandbedrag uit",
    lead: "Schuif met je eigen aantallen. Zo berekent VINVARO ook je factuur.",
    sliders: {
      stock_vehicles: "Voertuigen in voorraad",
      marketplaces: "Gekoppelde marktplaatsen",
      ai_actions: "AI-acties per maand",
      sign_requests: "Digitale ondertekeningen per maand",
      kvk_lookups: "KVK-opvragingen per maand",
    } as Record<string, string>,
    feed: "Websitefeed op je eigen site",
    estimate: "Indicatie per maand",
    plan: "Dealer-plan",
    included: (n: string) => `${n} inbegrepen`,
    unlimited: "onbeperkt",
    subtotal: "Subtotaal excl. btw",
    vat: (r: number) => `Btw ${r}%`,
    total: "Totaal incl. btw",
    perVehicle: (v: string) => `≈ ${v} per voertuig in voorraad`,
    trial: "Eerste 30 dagen gratis",
  },
  en: {
    title: "Work out your monthly amount",
    lead: "Slide to your own numbers. This is also how VINVARO calculates your invoice.",
    sliders: {
      stock_vehicles: "Vehicles in stock",
      marketplaces: "Connected marketplaces",
      ai_actions: "AI actions per month",
      sign_requests: "E-sign requests per month",
      kvk_lookups: "KVK lookups per month",
    } as Record<string, string>,
    feed: "Website feed on your own site",
    estimate: "Monthly estimate",
    plan: "Dealer plan",
    included: (n: string) => `${n} included`,
    unlimited: "unlimited",
    subtotal: "Subtotal excl. VAT",
    vat: (r: number) => `VAT ${r}%`,
    total: "Total incl. VAT",
    perVehicle: (v: string) => `≈ ${v} per vehicle in stock`,
    trial: "First 30 days free",
  },
});

const ranges: Record<string, { max: number; step: number; initial: number }> = {
  stock_vehicles: { max: 300, step: 1, initial: 45 },
  marketplaces: { max: 4, step: 1, initial: 2 },
  ai_actions: { max: 5000, step: 50, initial: 800 },
  sign_requests: { max: 120, step: 1, initial: 20 },
  kvk_lookups: { max: 300, step: 5, initial: 30 },
};

export function PricingCalculator() {
  const lang = useLang();
  const t = copy[lang];
  const { pricing } = getContent(lang);
  const [values, setValues] = useState<Record<string, number>>(Object.fromEntries(Object.entries(ranges).map(([k, r]) => [k, r.initial])));
  const [feed, setFeed] = useState(true);

  const money = (cents: number) =>
    new Intl.NumberFormat(numberLocale[lang], { style: "currency", currency: "EUR", minimumFractionDigits: cents % 100 ? 2 : 0, maximumFractionDigits: 2 }).format(cents / 100);
  const num = (n: number) => new Intl.NumberFormat(numberLocale[lang]).format(n);

  const quantity = (key: string) => (key === "website_feed" ? (feed ? 1 : 0) : (values[key] ?? 0));
  const lines = pricing.items
    .filter((i) => i.unitPriceCents > 0)
    .map((i) => {
      const qty = quantity(i.key);
      const billable = i.included === null ? 0 : Math.max(qty - i.included, 0);
      return { item: i, qty, billable, amount: Math.round(billable * i.unitPriceCents) };
    });
  const subtotal = pricing.basePriceCents + lines.reduce((n, l) => n + l.amount, 0);
  const vat = Math.round((subtotal * pricing.vatRate) / 100);
  const vehicles = values.stock_vehicles || 0;

  return (
    <div className="grid gap-4 rounded-[22px] border border-line bg-surface p-4 shadow-float sm:p-6 lg:grid-cols-[1fr_0.95fr] lg:gap-8">
      <div className="p-2">
        <p className="text-[19px] font-semibold tracking-[-0.02em]">{t.title}</p>
        <p className="mt-1 text-[14px] text-muted">{t.lead}</p>
        <div className="mt-6 space-y-5">
          {Object.entries(ranges).map(([key, r]) => {
            const item = pricing.items.find((i) => i.key === key)!;
            const value = values[key];
            return (
              <label key={key} className="block">
                <span className="flex items-baseline justify-between gap-3">
                  <span className="text-[14px] font-medium">{t.sliders[key]}</span>
                  <span className="text-[15px] font-semibold tabular-nums">{num(value)}</span>
                </span>
                <input
                  type="range"
                  min={0}
                  max={r.max}
                  step={r.step}
                  value={value}
                  onChange={(e) => setValues((v) => ({ ...v, [key]: Number(e.target.value) }))}
                  className="mt-2.5 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-sunken accent-brand [&::-webkit-slider-thumb]:size-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-brand [&::-webkit-slider-thumb]:shadow-[0_0_0_4px_rgb(37_99_235/0.18)]"
                  style={{ background: `linear-gradient(to right, var(--color-brand) ${(value / r.max) * 100}%, var(--color-sunken) ${(value / r.max) * 100}%)` }}
                />
                <span className="mt-1 block text-[12px] text-muted">
                  {money(item.unitPriceCents)} / {item.unit}
                  {item.included ? ` · ${t.included(num(item.included))}` : ""}
                </span>
              </label>
            );
          })}
          <button
            type="button"
            onClick={() => setFeed(!feed)}
            aria-pressed={feed}
            className="flex w-full items-center justify-between rounded-xl border border-line bg-canvas px-3.5 py-3 text-left"
          >
            <span>
              <span className="block text-[14px] font-medium">{t.feed}</span>
              <span className="block text-[12px] text-muted">{money(pricing.items.find((i) => i.key === "website_feed")!.unitPriceCents)} / feed</span>
            </span>
            <span className={clsx("relative h-6 w-10 rounded-full transition-colors", feed ? "bg-brand" : "bg-line-strong")}>
              <span className={clsx("absolute top-0.5 size-5 rounded-full bg-white shadow transition-all", feed ? "left-[18px]" : "left-0.5")} />
            </span>
          </button>
        </div>
      </div>

      <div className="rounded-[16px] border border-line bg-canvas p-5 sm:p-6">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-[12px] font-semibold tracking-[0.12em] text-muted uppercase">
            <Mark className="h-2.5 w-auto text-ink" /> {t.estimate}
          </span>
          <span className="rounded-[6px] bg-ok-50 px-2 py-0.5 text-[11.5px] font-medium text-ok">{t.trial}</span>
        </div>
        <ul className="mt-5 divide-y divide-line text-[13.5px]">
          <li className="flex items-center justify-between py-2.5">
            <span className="font-medium">{t.plan}</span>
            <span className="tabular-nums">{money(pricing.basePriceCents)}</span>
          </li>
          {pricing.items
            .filter((i) => i.unitPriceCents === 0)
            .map((i) => (
              <li key={i.key} className="flex items-center justify-between py-2.5 text-muted">
                <span>
                  {i.name} <span className="text-subtle">· {t.unlimited}</span>
                </span>
                <span className="tabular-nums">{money(0)}</span>
              </li>
            ))}
          {lines.map(({ item, qty, billable, amount }) => (
            <li key={item.key} className={clsx("flex items-center justify-between gap-3 py-2.5", amount === 0 && "text-muted")}>
              <span className="min-w-0">
                <span className="block truncate">{item.name}</span>
                <span className="block text-[11.5px] text-subtle tabular-nums">
                  {num(qty)} {item.included ? `· ${t.included(num(item.included))}` : ""} {billable > 0 && `· ${num(billable)} × ${money(item.unitPriceCents)}`}
                </span>
              </span>
              <span className="shrink-0 tabular-nums">{money(amount)}</span>
            </li>
          ))}
        </ul>
        <div className="mt-2 space-y-1.5 border-t border-line-strong pt-3 text-[13.5px]">
          <div className="flex justify-between">
            <span className="text-muted">{t.subtotal}</span>
            <span className="font-semibold tabular-nums">{money(subtotal)}</span>
          </div>
          <div className="flex justify-between text-muted">
            <span>{t.vat(pricing.vatRate)}</span>
            <span className="tabular-nums">{money(vat)}</span>
          </div>
        </div>
        <div className="mt-4 rounded-xl bg-ink px-4 py-3.5 text-white">
          <div className="flex items-baseline justify-between">
            <span className="text-[13px] text-white/65">{t.total}</span>
            <span key={subtotal} className="animate-row-in text-[26px] font-semibold tracking-[-0.03em] tabular-nums">
              {money(subtotal + vat)}
            </span>
          </div>
          {vehicles > 0 && (
            <p className="mt-1 flex items-center gap-1.5 text-[12px] text-white/55">
              <Icon name="vehicle" size={13} /> {t.perVehicle(money(Math.round(subtotal / vehicles)))}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
