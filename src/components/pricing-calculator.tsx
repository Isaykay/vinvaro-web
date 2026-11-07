"use client";

import { Fragment, useState } from "react";
import clsx from "clsx";
import { getContent } from "@/lib/content";
import { defineCopy, numberLocale } from "@/lib/i18n";
import { useLang } from "@/components/lang-provider";
import { Icon } from "@/components/app-icons";
import { Mark } from "@/components/ui";
import { LogoTile } from "@/components/product/kit";

const copy = defineCopy({
  nl: {
    title: "Reken je maandbedrag uit",
    lead: "Schuif met je eigen aantallen. Zo berekent VINVARO ook je factuur.",
    sliders: {
      stock_vehicles: "Voertuigen in voorraad",
      marketplaces: "Gekoppelde marktplaatsen",
      ai_actions: "AI-acties per maand",
      photo_edits: "Foto-bewerkingen per maand",
      sign_requests: "Digitale ondertekeningen per maand",
      kvk_lookups: "KVK-opvragingen per maand",
    } as Record<string, string>,
    hints: {
      stock_vehicles: "Elke auto die open in je voorraad staat. Verkocht en afgesloten telt niet meer mee.",
      marketplaces: "Elke marktplaats die je koppelt om advertenties op te publiceren.",
      ai_actions: "Elke keer dat AI iets voor je doet: een bericht labelen, een lead scoren of een conceptantwoord schrijven.",
      photo_edits: "Een AI-bewerking in de foto-editor, zoals achtergrond weg, studio-achtergrond, auto-retouche of kenteken afdekken.",
      sign_requests: "Een koopovereenkomst of ander contract dat je digitaal laat ondertekenen.",
      kvk_lookups: "Bedrijfsgegevens ophalen uit het Handelsregister door een bedrijfsnaam of KVK-nummer in te typen.",
    } as Record<string, string>,
    planned: "gepland",
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
      photo_edits: "Photo edits per month",
      sign_requests: "E-sign requests per month",
      kvk_lookups: "KVK lookups per month",
    } as Record<string, string>,
    hints: {
      stock_vehicles: "Every car that's open in your stock. Sold and closed cars no longer count.",
      marketplaces: "Every marketplace you connect to publish listings to.",
      ai_actions: "Every time AI does something for you: labelling a message, scoring a lead or writing a reply draft.",
      photo_edits: "One AI edit in the photo editor, such as removing the background, a studio background, auto-retouch or covering the plate.",
      sign_requests: "A purchase agreement or other contract you send out to be signed digitally.",
      kvk_lookups: "Fetching company details from the trade register by typing a company name or KVK number.",
    } as Record<string, string>,
    planned: "planned",
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
  stock_vehicles: { max: 5000, step: 1, initial: 45 },
  ai_actions: { max: 100000, step: 50, initial: 800 },
  photo_edits: { max: 25000, step: 10, initial: 300 },
  sign_requests: { max: 2000, step: 1, initial: 20 },
  kvk_lookups: { max: 5000, step: 5, initial: 30 },
};

/** Sliders run on a quadratic curve so small dealers keep precision while large ones can reach the top. */
const CURVE = 2;
const SLIDER_STEPS = 1000;
const toValue = (pos: number, r: { max: number; step: number }) => Math.round((r.max * (pos / SLIDER_STEPS) ** CURVE) / r.step) * r.step;
const toPos = (value: number, r: { max: number }) => Math.round(SLIDER_STEPS * Math.min(value / r.max, 1) ** (1 / CURVE));

export function PricingCalculator() {
  const lang = useLang();
  const t = copy[lang];
  const { pricing, integrations, integrationCategories } = getContent(lang);
  const marketplaceOptions = integrations.filter((i) => i.category === integrationCategories[0] && i.slug);
  const [values, setValues] = useState<Record<string, number>>(Object.fromEntries(Object.entries(ranges).map(([k, r]) => [k, r.initial])));
  const [marketplaces, setMarketplaces] = useState<string[]>(["mobilede", "autoscout24"]);
  const [feed, setFeed] = useState(true);
  const marketItem = pricing.items.find((i) => i.key === "marketplaces")!;
  const toggleMarketplace = (slug: string) => setMarketplaces((m) => (m.includes(slug) ? m.filter((s) => s !== slug) : [...m, slug]));

  const money = (cents: number) =>
    new Intl.NumberFormat(numberLocale[lang], { style: "currency", currency: "EUR", minimumFractionDigits: cents % 100 ? 2 : 0, maximumFractionDigits: 2 }).format(cents / 100);
  const num = (n: number) => new Intl.NumberFormat(numberLocale[lang]).format(n);

  const quantity = (key: string) => (key === "website_feed" ? (feed ? 1 : 0) : key === "marketplaces" ? marketplaces.length : (values[key] ?? 0));
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
            const fill = (toPos(value, r) / SLIDER_STEPS) * 100;
            const setValue = (n: number) => setValues((v) => ({ ...v, [key]: Math.max(0, Math.round(n) || 0) }));
            return (
              <Fragment key={key}>
                <div>
                  <span className="flex items-center justify-between gap-3">
                    <label htmlFor={`calc-${key}`} className="text-[14px] font-medium">
                      {t.sliders[key]}
                    </label>
                    <input
                      type="number"
                      inputMode="numeric"
                      min={0}
                      step={r.step}
                      value={value}
                      onChange={(e) => setValue(Number(e.target.value))}
                      aria-label={t.sliders[key]}
                      className="w-24 rounded-md border border-transparent bg-transparent px-1.5 py-0.5 text-right text-[15px] font-semibold tabular-nums [appearance:textfield] hover:border-line focus:border-brand focus:outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                    />
                  </span>
                  <span className="block max-w-[46ch] text-[12.5px] leading-snug text-muted">{t.hints[key]}</span>
                  <input
                    id={`calc-${key}`}
                    type="range"
                    min={0}
                    max={SLIDER_STEPS}
                    step={1}
                    value={toPos(value, r)}
                    onChange={(e) => setValue(toValue(Number(e.target.value), r))}
                    aria-valuetext={num(value)}
                    className="mt-2.5 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-sunken accent-brand [&::-webkit-slider-thumb]:size-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-brand [&::-webkit-slider-thumb]:shadow-[0_0_0_4px_rgb(37_99_235/0.18)]"
                    style={{ background: `linear-gradient(to right, var(--color-brand) ${fill}%, var(--color-sunken) ${fill}%)` }}
                  />
                  <span className="mt-1 block text-[12px] text-subtle">
                    {money(item.unitPriceCents)} / {item.unit}
                    {item.included ? ` · ${t.included(num(item.included))}` : ""}
                  </span>
                </div>
                {key === "stock_vehicles" && (
                  <div>
                    <span className="flex items-baseline justify-between gap-3">
                      <span className="text-[14px] font-medium">{t.sliders.marketplaces}</span>
                      <span className="text-[15px] font-semibold tabular-nums">{num(marketplaces.length)}</span>
                    </span>
                    <span className="mt-0.5 block max-w-[46ch] text-[12.5px] leading-snug text-muted">{t.hints.marketplaces}</span>
                    <div className="mt-2.5 flex flex-wrap gap-2">
                      {marketplaceOptions.map((m) => {
                        const on = marketplaces.includes(m.slug!);
                        return (
                          <button
                            key={m.slug}
                            type="button"
                            onClick={() => toggleMarketplace(m.slug!)}
                            aria-pressed={on}
                            className={clsx(
                              "flex items-center gap-2 rounded-full border py-1 pr-3 pl-1 text-[13px] font-medium transition-colors",
                              on ? "border-brand bg-brand-50 text-ink" : "border-line bg-canvas text-muted hover:border-line-strong",
                            )}
                          >
                            <LogoTile slug={m.slug!} className={clsx("size-6 rounded-full border-0", !on && "opacity-60 grayscale")} size={14} />
                            {m.name}
                            {m.status === "planned" && <span className="text-[11px] font-normal text-subtle">· {t.planned}</span>}
                          </button>
                        );
                      })}
                    </div>
                    <span className="mt-1.5 block text-[12px] text-muted">
                      {money(marketItem.unitPriceCents)} / {marketItem.unit}
                    </span>
                  </div>
                )}
              </Fragment>
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
