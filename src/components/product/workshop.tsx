"use client";

import clsx from "clsx";
import { Check, Package, Receipt, Sparkles, Timer, Users, Wrench } from "lucide-react";
import { useLang } from "@/components/lang-provider";
import { defineCopy } from "@/lib/i18n";
import { BrandLogo, LogoTile, Pill, Plate, delay } from "@/components/product/kit";

type LineKind = "labour" | "part" | "sublet";

const copy = defineCopy({
  nl: {
    number: "WO-1042",
    car: "Volkswagen Golf",
    customer: "Klantauto · Sanne de Vries",
    status: "In behandeling",
    lines: [
      ["labour", "Grote onderhoudsbeurt", "2,0 u", "€ 170,00"],
      ["part", "Oliefilter · uit voorraad", "1 st", "€ 14,95"],
      ["part", "Motorolie 5W-30", "4,5 l", "€ 58,50"],
      ["sublet", "Uitlijnen · Bandencentrum Oost", "1", "€ 65,00"],
    ] as [LineKind, string, string, string][],
    kinds: { labour: "Arbeid", part: "Onderdeel", sublet: "Uitbesteed" },
    totals: [
      ["Kostprijs", "€ 171,40"],
      ["Verkoop", "€ 308,45"],
      ["Marge", "€ 137,05"],
    ],
    timer: "Jeroen klokt",
    invoice: "Factuur maken",
    board: "Planbord · vandaag",
    mechanics: [
      ["Jeroen", [[0, 3, "Golf", true], [4, 2, "Polo", false]]],
      ["Ahmed", [[1, 2, "308 · APK", false], [4, 3, "Tesla", false]]],
    ] as [string, [number, number, string, boolean][]][],
    recognised: "Inkoopfactuur herkend",
    recognisedBody: "Fource · € 48,20 · op kenteken gekoppeld aan WO-1042",
    stock: "Remblokken onder minimum",
    reorder: "Bestellen",
  },
  en: {
    number: "WO-1042",
    car: "Volkswagen Golf",
    customer: "Customer car · Sanne de Vries",
    status: "In progress",
    lines: [
      ["labour", "Major service", "2.0 h", "€170.00"],
      ["part", "Oil filter · from stock", "1 pc", "€14.95"],
      ["part", "Engine oil 5W-30", "4.5 l", "€58.50"],
      ["sublet", "Wheel alignment · Tyre Centre East", "1", "€65.00"],
    ] as [LineKind, string, string, string][],
    kinds: { labour: "Labour", part: "Part", sublet: "Sublet" },
    totals: [
      ["Cost", "€171.40"],
      ["Price", "€308.45"],
      ["Margin", "€137.05"],
    ],
    timer: "Jeroen clocked in",
    invoice: "Create invoice",
    board: "Planning board · today",
    mechanics: [
      ["Jeroen", [[0, 3, "Golf", true], [4, 2, "Polo", false]]],
      ["Ahmed", [[1, 2, "308 · MOT", false], [4, 3, "Tesla", false]]],
    ] as [string, [number, number, string, boolean][]][],
    recognised: "Purchase invoice recognised",
    recognisedBody: "Fource · €48.20 · linked to WO-1042 by plate",
    stock: "Brake pads below minimum",
    reorder: "Reorder",
  },
});

const KIND_ICON = { labour: Wrench, part: Package, sublet: Users };
const KIND_TONE = { labour: "bg-brand/10 text-brand", part: "bg-[#fef3c7] text-[#92400e]", sublet: "bg-[#f3e8ff] text-[#6b21a8]" };

/** Workshop: a work order with labour, parts and sublet work, the live timer, the planning board and a recognised purchase invoice. */
export function WorkshopOrder() {
  const t = copy[useLang()];
  return (
    <div className="grid items-start gap-4 md:grid-cols-[1.2fr_0.8fr]">
      <div className="rounded-2xl bg-surface p-5 shadow-float">
        <div className="flex items-center gap-3">
          <BrandLogo make="volkswagen" className="size-10" />
          <div className="min-w-0 flex-1">
            <p className="font-mono text-[11px] text-subtle">{t.number}</p>
            <p className="truncate text-[15px] font-semibold tracking-[-0.015em]">{t.car}</p>
            <p className="truncate text-[11.5px] text-muted">{t.customer}</p>
          </div>
          <div className="flex flex-col items-end gap-1.5">
            <Plate>R-512-FX</Plate>
            <Pill tone="brand">{t.status}</Pill>
          </div>
        </div>

        <ul className="mt-4 divide-y divide-line border-y border-line">
          {t.lines.map(([kind, label, qty, amount], i) => {
            const KindIcon = KIND_ICON[kind];
            return (
              <li key={label} className="flex animate-row-in items-center gap-3 py-2.5" style={delay(0.25 + i * 0.18)}>
                <span className={clsx("grid size-7 shrink-0 place-items-center rounded-lg", KIND_TONE[kind])}>
                  <KindIcon className="size-3.5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[12.5px] font-medium">{label}</span>
                  <span className="text-[10.5px] text-subtle">{t.kinds[kind]}</span>
                </span>
                <span className="font-mono text-[11px] text-muted tabular-nums">{qty}</span>
                <span className="w-[72px] text-right text-[12.5px] font-medium tabular-nums">{amount}</span>
              </li>
            );
          })}
        </ul>

        <div className="mt-3 grid grid-cols-3 gap-2">
          {t.totals.map(([label, value], i) => (
            <div key={label} className={clsx("animate-toast-in rounded-xl px-3 py-2", i === 2 ? "bg-[#ecfdf3] text-[#067647]" : "bg-sunken")} style={delay(1 + i * 0.12)}>
              <p className={clsx("text-[10.5px]", i === 2 ? "text-[#067647]/80" : "text-muted")}>{label}</p>
              <p className="text-[14px] font-semibold tabular-nums">{value}</p>
            </div>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="inline-flex h-8 items-center gap-2 rounded-lg bg-sunken px-3 text-[12px] font-medium">
            <span className="size-2 animate-soft-pulse rounded-full bg-[#12b76a]" />
            <Timer className="size-3.5 text-muted" />
            {t.timer}
            <span className="font-mono text-[11.5px] text-ink-2 tabular-nums">01:12:40</span>
          </span>
          <span className="ml-auto inline-flex h-8 items-center gap-1.5 rounded-lg bg-brand px-3 text-[12px] font-semibold text-white">
            <Receipt className="size-3.5" /> {t.invoice}
          </span>
        </div>
      </div>

      <div className="grid gap-3 md:mt-8">
        <div className="animate-toast-in rounded-2xl bg-surface p-4 shadow-float" style={delay(0.5)}>
          <p className="text-[11px] font-semibold tracking-[0.1em] text-subtle uppercase">{t.board}</p>
          <div className="mt-3 space-y-2">
            {t.mechanics.map(([name, blocks]) => (
              <div key={name} className="flex items-center gap-2">
                <span className="w-12 shrink-0 text-[11.5px] font-medium">{name}</span>
                <div className="relative h-8 flex-1 rounded-lg bg-sunken">
                  {blocks.map(([start, span, label, active]) => (
                    <span
                      key={label}
                      className={clsx("absolute inset-y-1 truncate rounded-md px-1.5 text-[10px] leading-6 font-medium", active ? "bg-brand text-white" : "bg-surface text-ink-2 ring-1 ring-line")}
                      style={{ left: `${(start / 8) * 100}%`, width: `calc(${(span / 8) * 100}% - 4px)` }}
                    >
                      {label}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="animate-toast-in rounded-2xl bg-surface p-4 shadow-float" style={delay(1.3)}>
          <div className="flex items-center gap-2">
            <LogoTile slug="fource" className="size-7 rounded-lg" size={18} />
            <Pill tone="ai">
              <Sparkles className="size-2.5" /> {t.recognised}
            </Pill>
          </div>
          <p className="mt-2 text-[12px] leading-snug text-muted">{t.recognisedBody}</p>
        </div>

        <div className="flex animate-toast-in items-center gap-2.5 rounded-2xl bg-surface p-4 text-[12px] shadow-float" style={delay(1.7)}>
          <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-[#fef3c7] text-[#92400e]">
            <Package className="size-3.5" />
          </span>
          <span className="min-w-0 flex-1 font-medium">{t.stock}</span>
          <span className="inline-flex h-7 items-center gap-1 rounded-lg px-2.5 text-[11.5px] font-semibold text-brand ring-1 ring-brand/30">
            <Check className="size-3" strokeWidth={3} /> {t.reorder}
          </span>
        </div>
      </div>
    </div>
  );
}
