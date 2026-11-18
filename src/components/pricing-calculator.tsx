"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { Check } from "lucide-react";
import { getContent } from "@/lib/content";
import { defineCopy, numberLocale } from "@/lib/i18n";
import { track } from "@/lib/analytics";
import { useLang } from "@/components/lang-provider";
import { Icon } from "@/components/app-icons";
import { Mark } from "@/components/ui";
import { IntegrationLogo, LogoTile } from "@/components/product/kit";
import { PortalCatalog } from "@/components/portal-catalog";

const copy = defineCopy({
  nl: {
    title: "Reken je maandbedrag uit",
    lead: "Schuif met je eigen aantallen. Zo berekent VINVARO ook je factuur.",
    sliders: {
      stock_vehicles: "Voertuigen in voorraad",
      marketplaces: "Gekoppelde marktplaatsen",
      rdw_transactions: "RDW-acties per maand",
    } as Record<string, string>,
    hints: {
      stock_vehicles: "Elke auto die open in je voorraad staat. Verkocht en afgesloten telt niet meer mee.",
      marketplaces: "Elke marktplaats die je koppelt om advertenties op te publiceren.",
      rdw_transactions: "Geschat op ± 1 per auto in voorraad: vrijwaren bij inkoop en overschrijven bij verkoop. Leges en je RDW-provider betaal je apart.",
    } as Record<string, string>,
    planned: "gepland",
    free: "gratis",
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
    inPlan: "Inbegrepen",
    publishTitle: "Publiceren",
    publishHint: "Je eigen website, de VINVARO-netwerken en meer dan 185 portals.",
    includedAll: "Alles inbegrepen",
    freeTitle: "Gratis inbegrepen",
    soon: "binnenkort",
  },
  en: {
    title: "Work out your monthly amount",
    lead: "Slide to your own numbers. This is also how VINVARO calculates your invoice.",
    sliders: {
      stock_vehicles: "Vehicles in stock",
      marketplaces: "Connected marketplaces",
      rdw_transactions: "RDW transactions per month",
    } as Record<string, string>,
    hints: {
      stock_vehicles: "Every car that's open in your stock. Sold and closed cars no longer count.",
      marketplaces: "Every marketplace you connect to publish listings to.",
      rdw_transactions: "Estimated at about 1 per vehicle in stock: indemnifying on purchase and transferring on sale. Statutory fees and your RDW provider are billed separately.",
    } as Record<string, string>,
    planned: "planned",
    free: "free",
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
    inPlan: "Included",
    publishTitle: "Publishing",
    publishHint: "Your own website, the VINVARO networks and more than 185 portals.",
    includedAll: "Everything included",
    freeTitle: "Included for free",
    soon: "soon",
  },
});

const ranges: Record<string, { max: number; step: number; initial: number }> = {
  stock_vehicles: { max: 5000, step: 1, initial: 45 },
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
  const channels = integrations.filter((i) => i.category === integrationCategories[0] && i.slug);
  const marketplaceOptions = channels.filter((i) => i.slug !== "vinvaro");
  const morePortals = integrations.find((i) => i.category === integrationCategories[0] && !i.slug);
  const [values, setValues] = useState<Record<string, number>>(Object.fromEntries(Object.entries(ranges).map(([k, r]) => [k, r.initial])));
  const interacted = useRef(false);
  const touchPricing = (label?: string, value?: string | number | boolean) => {
    if (!interacted.current) {
      interacted.current = true;
      track("pricing_start");
    }
    if (label) track("pricing_change", { label, value: value == null ? undefined : String(value) });
  };

  useEffect(() => {
    if (!interacted.current) return;
    const timer = window.setTimeout(() => {
      track("pricing_estimate", {
        stock_vehicles: values.stock_vehicles,
      });
    }, 800);
    return () => window.clearTimeout(timer);
  }, [values]);

  const money = (cents: number) =>
    new Intl.NumberFormat(numberLocale[lang], { style: "currency", currency: "EUR", minimumFractionDigits: cents % 100 ? 2 : 0, maximumFractionDigits: 2 }).format(cents / 100);
  const num = (n: number) => new Intl.NumberFormat(numberLocale[lang]).format(n);

  const quantity = (key: string) => values[key] ?? 0;
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
            const setValue = (n: number) => {
              const next = Math.max(0, Math.round(n) || 0);
              setValues((v) => ({ ...v, [key]: next }));
              touchPricing();
            };
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
                  <div className="space-y-6 border-t border-line pt-5">
                    <div>
                      <span className="flex items-baseline justify-between gap-3">
                        <span className="text-[14px] font-medium">{t.publishTitle}</span>
                        <span className="text-[12px] font-medium text-ok">{t.inPlan}</span>
                      </span>
                      <span className="mt-0.5 block text-[12.5px] leading-snug text-muted">{t.publishHint}</span>
                      <div className="mt-3 flex flex-wrap items-center gap-3">
                        <span className="flex -space-x-2">
                          <IntegrationLogo slug="site" className="size-8 rounded-full ring-2 ring-surface" size={15} />
                          <LogoTile slug="vinvaro" className="size-8 rounded-full ring-2 ring-surface" size={15} />
                          {marketplaceOptions.map((m) => (
                            <span key={m.slug} title={m.name}>
                              <LogoTile slug={m.slug!} className="size-8 rounded-full border-line ring-2 ring-surface" size={16} />
                            </span>
                          ))}
                        </span>
                        {morePortals && (
                          <PortalCatalog className="inline-flex h-8 items-center rounded-full border border-brand/30 bg-brand-50 px-3 text-[12.5px] font-medium text-brand hover:border-brand">
                            {morePortals.name}
                          </PortalCatalog>
                        )}
                      </div>
                    </div>
                    <div>
                      <span className="text-[14px] font-medium">{t.freeTitle}</span>
                      <ul className="mt-2.5 grid grid-cols-2 gap-x-4 gap-y-2 text-[13px]">
                        {pricing.free.map((f) => (
                          <li key={f} className="flex items-center gap-2">
                            <Check className="size-3.5 shrink-0 text-ok" strokeWidth={2.5} />
                            <span className="truncate">{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </Fragment>
            );
          })}

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
