"use client";

import { ArrowRight, Building2, Check, Search, Star } from "lucide-react";
import { useLang } from "@/components/lang-provider";
import { defineCopy } from "@/lib/i18n";
import { Mark } from "@/components/ui";
import { BrandLogo, Car, Pill, Plate, delay } from "@/components/product/kit";

const copy = defineCopy({
  nl: {
    seller: "Garage Hendriks",
    buyer: "Jouw autobedrijf",
    car: "Porsche Macan S",
    facts: "2020 · 61.800 km · PDK",
    tradePrice: "Handelsprijs",
    price: "€ 57.500",
    offer: "Bod",
    offerValue: "€ 56.000",
    counter: "Tegenbod",
    counterValue: "€ 57.000",
    accepted: "Akkoord · € 57.000",
    stock: "Staat in je voorraad",
    stockBody: "Inkoop € 57.000 · 3 foto's",
    rating: "4,9",
    deals: "12 deals",
    search: "Zoek op merk of model",
    filters: ["SUV", "Hybride", "Tot € 40.000"],
    results: "248 auto's",
    cars: [
      ["volvo", "Volvo XC60", "2022 · 54.300 km", "€ 44.950", "Van den Berg"],
      ["toyota", "Toyota Yaris Cross", "2023 · 19.400 km", "€ 29.450", "Noordkaap"],
      ["kia", "Kia EV6", "2022 · 39.100 km", "€ 37.950", "De Brug"],
    ] as [string, string, string, string, string][],
    reviews: "4,6 · 37 reviews",
  },
  en: {
    seller: "Garage Hendriks",
    buyer: "Your dealership",
    car: "Porsche Macan S",
    facts: "2020 · 61,800 km · PDK",
    tradePrice: "Trade price",
    price: "€57,500",
    offer: "Offer",
    offerValue: "€56,000",
    counter: "Counter",
    counterValue: "€57,000",
    accepted: "Agreed · €57,000",
    stock: "Now in your stock",
    stockBody: "Purchase €57,000 · 3 photos",
    rating: "4.9",
    deals: "12 deals",
    search: "Search by make or model",
    filters: ["SUV", "Hybrid", "Up to €40,000"],
    results: "248 cars",
    cars: [
      ["volvo", "Volvo XC60", "2022 · 54,300 km", "€44,950", "Van den Berg"],
      ["toyota", "Toyota Yaris Cross", "2023 · 19,400 km", "€29,450", "Noordkaap"],
      ["kia", "Kia EV6", "2022 · 39,100 km", "€37,950", "De Brug"],
    ] as [string, string, string, string, string][],
    reviews: "4.6 · 37 reviews",
  },
});

/** Two dealers negotiating on the Handelsplein; the car ends up in the buyer's stock. */
export function TradeFlow() {
  const t = copy[useLang()];
  return (
    <div className="grid items-center gap-5 md:grid-cols-[1fr_1fr]">
      <div className="rounded-2xl bg-surface p-4 shadow-float">
        <div className="bg-stage relative overflow-hidden rounded-xl px-5 pt-6 pb-2">
          <Car className="relative w-full animate-float" />
        </div>
        <div className="mt-3 flex items-center gap-2.5">
          <BrandLogo make="porsche" className="size-8" />
          <span className="min-w-0 flex-1">
            <span className="block text-[13px] font-semibold">{t.car}</span>
            <span className="block text-[11px] text-muted">{t.facts}</span>
          </span>
          <Plate>LM-117-M</Plate>
        </div>
        <div className="mt-3 flex items-center justify-between rounded-xl bg-canvas px-3 py-2.5 ring-1 ring-line">
          <span>
            <span className="block text-[10.5px] text-muted">{t.tradePrice}</span>
            <span className="block text-[17px] font-semibold tracking-[-0.02em] tabular-nums">{t.price}</span>
          </span>
          <span className="text-right">
            <span className="flex items-center justify-end gap-1 text-[12px] font-semibold">
              <Building2 className="size-3.5 text-muted" /> {t.seller}
            </span>
            <span className="flex items-center justify-end gap-1 text-[11px] text-muted">
              <Star className="size-3 fill-[#f5a524] text-[#f5a524]" /> {t.rating} · {t.deals}
            </span>
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-2.5">
        <div className="flex animate-toast-in items-center justify-between gap-3 self-end rounded-2xl rounded-br-md bg-brand px-3.5 py-2.5 text-white shadow-float" style={delay(0.3)}>
          <span className="text-[11px] opacity-80">{t.buyer}</span>
          <span className="text-[13px] font-semibold tabular-nums">
            {t.offer} {t.offerValue}
          </span>
        </div>
        <div className="flex animate-toast-in items-center justify-between gap-3 self-start rounded-2xl rounded-bl-md bg-surface px-3.5 py-2.5 shadow-float ring-1 ring-line" style={delay(0.8)}>
          <span className="text-[11px] text-muted">{t.seller}</span>
          <span className="text-[13px] font-semibold tabular-nums">
            {t.counter} {t.counterValue}
          </span>
        </div>
        <div className="flex animate-toast-in items-center gap-2 self-end" style={delay(1.3)}>
          <Pill tone="ok">
            <Check className="size-3" strokeWidth={3} /> {t.accepted}
          </Pill>
        </div>
        <div className="mt-2 flex animate-toast-in items-center gap-3 rounded-2xl bg-surface p-3.5 shadow-float" style={delay(1.8)}>
          <span className="flex size-10 items-center justify-center rounded-xl bg-ok text-white">
            <ArrowRight className="size-4" strokeWidth={2.5} />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-[13px] font-semibold">{t.stock}</span>
            <span className="block text-[11px] text-muted">{t.stockBody}</span>
          </span>
          <Mark className="h-3 w-auto text-ink" />
        </div>
      </div>
    </div>
  );
}

/** The public VINVARO marketplace: search over every participating dealer, at asking price. */
export function MarketGrid() {
  const t = copy[useLang()];
  return (
    <div className="rounded-2xl bg-surface p-4 shadow-float ring-1 ring-ink/5">
      <div className="flex items-center gap-2 rounded-xl bg-canvas px-3 py-2.5 ring-1 ring-line">
        <Search className="size-4 text-muted" />
        <span className="text-[12.5px] text-muted">{t.search}</span>
        <span className="ml-auto text-[11px] font-medium text-ink-2">{t.results}</span>
      </div>
      <div className="mt-2.5 flex flex-wrap gap-1.5">
        {t.filters.map((f) => (
          <Pill key={f} tone="brand">
            {f}
          </Pill>
        ))}
      </div>
      <div className="mt-3 grid gap-2.5 sm:grid-cols-3">
        {t.cars.map(([make, name, facts, price, dealer], i) => (
          <div key={name} className="animate-toast-in overflow-hidden rounded-xl ring-1 ring-line" style={delay(0.2 + i * 0.2)}>
            <div className="bg-stage px-3 pt-4 pb-1">
              <Car className="w-full" />
            </div>
            <div className="grid gap-1 p-2.5">
              <span className="flex items-center gap-1.5">
                <BrandLogo make={make} className="size-5" />
                <span className="truncate text-[12px] font-semibold">{name}</span>
              </span>
              <span className="text-[10.5px] text-muted">{facts}</span>
              <span className="text-[14px] font-bold tabular-nums">{price}</span>
              <span className="flex items-center gap-1 text-[10.5px] text-muted">
                <Building2 className="size-3" /> {dealer}
              </span>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-3 flex items-center gap-1.5 text-[11.5px] text-muted">
        <Star className="size-3.5 fill-[#f5a524] text-[#f5a524]" /> {t.reviews}
      </p>
    </div>
  );
}
