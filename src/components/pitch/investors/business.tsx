"use client";

import { useState } from "react";
import { Banknote, Calculator, Database, Store, Truck } from "lucide-react";
import { Mark } from "@/components/brand-mark";
import { useLang } from "@/components/lang-provider";
import { getContent } from "@/lib/content";
import { motion } from "../animation";
import { useT } from "../lang";
import { Slide } from "../slide";
import { Card, Chip, Heading, Label, Lead, Logo, Tick, ease, logo, useOnScreen } from "../ui";
import { scenario, segments, yearOneTarget } from "./data";
import { blendedMonthlyCents, euro, monthlyRevenueCents } from "./model";

export function RevenueSlide() {
  const t = useT();
  const lang = useLang();
  const { pricing } = getContent(lang);
  const [ref, on] = useOnScreen<HTMLDivElement>();
  const perSegment = segments.map((s) => ({ ...s, cents: monthlyRevenueCents(lang, s.vehicles, s.marketplaces) }));
  const max = Math.max(...perSegment.map((s) => s.cents));
  const blended = blendedMonthlyCents(lang);
  const money = (cents: number) =>
    new Intl.NumberFormat(lang === "nl" ? "nl-NL" : "en-GB", { style: "currency", currency: "EUR", minimumFractionDigits: cents % 100 ? 2 : 0 }).format(cents / 100);

  const recurring = pricing.items.filter((i) => i.kind === "recurring" && i.unitPriceCents > 0);
  const usage = pricing.items.filter((i) => i.kind === "usage");

  return (
    <Slide id="verdienmodel" variant="white">
      <div ref={ref}>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <Heading on={on}>
            {t("Verdienen per auto, ", "Earning per car, ")}
            <span className="text-brand">{t("niet per stoel", "not per seat")}</span>
          </Heading>
          <Lead on={on} className="max-w-sm lg:mt-0 lg:pb-1.5 lg:text-right">
            {t(
              "De omzet groeit mee met de voorraad van de klant. Gebruikers zijn gratis, dus het hele bedrijf gaat erin werken.",
              "Revenue grows with the customer's stock. Users are free, so the whole business ends up working in it.",
            )}
          </Lead>
        </div>

        <div className="mt-10 grid items-stretch gap-5 lg:grid-cols-[0.95fr_1.05fr]">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={on ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.15, ease }}>
            <Card className="h-full p-6">
              <Label>{t("Omzetstromen · live prijslijst", "Revenue streams · live price list")}</Label>
              <div className="mt-3 flex items-baseline justify-between border-b border-line pb-3">
                <span className="text-[15px] font-semibold text-ink">{t("Dealer-plan", "Dealer plan")}</span>
                <span className="font-mono text-[15px] font-semibold text-brand">
                  {money(pricing.basePriceCents)}
                  <span className="text-[11px] font-normal text-subtle">{t(" /mnd", " /mo")}</span>
                </span>
              </div>
              <p className="mt-3 mb-1 font-mono text-[10px] tracking-[0.08em] text-subtle uppercase">{t("Terugkerend", "Recurring")}</p>
              {recurring.map((i) => (
                <div key={i.key} className="flex items-center justify-between border-b border-line py-2 text-[13.5px]">
                  <span className="text-ink-2">{i.name}</span>
                  <span className="font-mono text-[13px] text-ink">
                    {money(i.unitPriceCents)} <span className="text-[11px] text-subtle">/ {i.unit}</span>
                  </span>
                </div>
              ))}
              <p className="mt-4 mb-1 font-mono text-[10px] tracking-[0.08em] text-subtle uppercase">{t("Gebruik boven de bundel", "Usage above the bundle")}</p>
              {usage.map((i) => (
                <div key={i.key} className="flex items-center justify-between border-b border-line py-2 text-[13.5px] last:border-0">
                  <span className="text-ink-2">
                    {i.name} <span className="text-[11.5px] text-subtle">· {i.included} {t("inbegrepen", "included")}</span>
                  </span>
                  <span className="font-mono text-[13px] text-ink">
                    {money(i.unitPriceCents)} <span className="text-[11px] text-subtle">/ {i.unit}</span>
                  </span>
                </div>
              ))}
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={on ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.25, ease }} className="flex flex-col gap-5">
            <Card className="flex-1 p-6">
              <Label>{t("Omzet per klant per segment", "Revenue per customer by segment")}</Label>
              <div className="mt-4 space-y-4">
                {perSegment.map((s, i) => (
                  <div key={s.key}>
                    <div className="flex items-baseline justify-between">
                      <span className="text-[14.5px] font-semibold text-ink">{t(s.label[0], s.label[1])}</span>
                      <span className="font-mono text-[15px] font-semibold text-ink">
                        {euro(lang, s.cents * 12)}
                        <span className="text-[11px] font-normal text-subtle">{t(" /jaar", " /yr")}</span>
                      </span>
                    </div>
                    <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-sunken">
                      <motion.div initial={{ width: 0 }} animate={on ? { width: `${(s.cents / max) * 100}%` } : {}} transition={{ duration: 0.9, delay: 0.4 + i * 0.12, ease }} className="h-full rounded-full bg-brand" />
                    </div>
                    <p className="mt-1.5 font-mono text-[11px] text-subtle">
                      {s.vehicles} {t("auto's", "cars")} · {s.marketplaces} {t("marktplaats", "marketplace")}
                      {s.marketplaces === 1 ? "" : t("en", "s")} · {t("websitefeed", "website feed")} · {euro(lang, s.cents)}
                      {t("/mnd", "/mo")}
                    </p>
                  </div>
                ))}
              </div>
            </Card>
            <div className="grid gap-5 sm:grid-cols-2">
              <Card className="p-5">
                <Label>{t("Gemiddeld per klant", "Average per customer")}</Label>
                <p className="mt-2 text-[28px] leading-none font-semibold tracking-[-0.03em] text-ink">{euro(lang, blended * 12)}</p>
                <p className="mt-1.5 text-[12.5px] text-muted">{t("ARR, gewogen over de segmentmix", "ARR, weighted over the segment mix")}</p>
              </Card>
              <Card className="p-5">
                <Label>{t("Groei binnen de klant", "Growth within the customer")}</Label>
                <ul className="mt-2 space-y-1.5 text-[13px] text-ink-2">
                  {[t("Meer voorraad = meer omzet", "More stock = more revenue"), t("Extra marktplaatsen en feeds", "Extra marketplaces and feeds"), t("AI-gebruik boven de bundel", "AI usage above the bundle")].map((x) => (
                    <li key={x} className="flex items-center gap-2">
                      <Tick size={16} />
                      {x}
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          </motion.div>
        </div>
      </div>
    </Slide>
  );
}

export function PotentialSlide() {
  const t = useT();
  const [ref, on] = useOnScreen<HTMLDivElement>();
  const ideas = [
    {
      icon: (
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-ink text-white">
          <Mark width={18} />
        </span>
      ),
      title: "Handelsplein",
      today: t("Live en gratis: dealers kopen en verkopen onderling, de auto verhuist vanzelf naar de koper.", "Live and free: dealers buy and sell between each other, the car moves to the buyer automatically."),
      next: t("Fee per afgeronde B2B-deal, escrow en betaling via het platform.", "Fee per closed B2B deal, escrow and payment through the platform."),
    },
    {
      icon: <Store className="h-[18px] w-[18px]" />,
      title: "VINVARO Marktplaats",
      today: t("Live en gratis: consumenten zoeken in de voorraad van alle aangesloten dealers.", "Live and free: consumers search the stock of every participating dealer."),
      next: t("Uitgelichte plaatsing, leadpakketten en reviews als vertrouwensmerk.", "Featured placement, lead packages and reviews as a trust mark."),
    },
    {
      icon: <Logo src={logo("autoboeker")} size={36} className="rounded-xl" />,
      title: t("Boekhouding", "Accounting"),
      today: t("Live via Autoboeker: facturen en kosten naar Exact, Twinfield, SnelStart en e-Boekhouden.", "Live via Autoboeker: invoices and costs to Exact, Twinfield, SnelStart and e-Boekhouden."),
      next: t("Bundel met Autoboeker: één pakket voor dealer en boekhouder.", "Bundle with Autoboeker: one package for dealer and accountant."),
    },
    {
      icon: <Truck className="h-[18px] w-[18px]" />,
      title: t("Transport & partners", "Transport & partners"),
      today: t("Live: transporteurs, poetsers en garages vullen hun stap in via een link.", "Live: transporters, valeters and garages complete their step via a link."),
      next: t("Partnermarktplaats met commissie per opdracht.", "Partner marketplace with commission per job."),
    },
    {
      icon: <Database className="h-[18px] w-[18px]" />,
      title: t("Data & taxatie", "Data & valuation"),
      today: t("Elke intake, prijswijziging en verkoop staat gestructureerd in één dossier.", "Every intake, price change and sale is structured in one dossier."),
      next: t("Inkoopadvies, taxatie en doorlooptijd-benchmarks per model.", "Purchase advice, valuation and lead-time benchmarks per model."),
    },
  ];

  return (
    <Slide id="potentieel" variant="subtle">
      <div ref={ref}>
        <Heading on={on} center>
          {t("Van software naar ", "From software to ")}
          <span className="text-brand">{t("netwerk", "network")}</span>
        </Heading>
        <Lead on={on} center>
          {t(
            "Elke auto die door VINVARO gaat, raakt financiering, transport, boekhouding en een koper. De rails liggen er al; dit is wat erbovenop kan.",
            "Every car that goes through VINVARO touches financing, transport, accounting and a buyer. The rails are already there; this is what can go on top.",
          )}
        </Lead>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ideas.map((idea, i) => (
            <motion.div key={idea.title} initial={{ opacity: 0, y: 20 }} animate={on ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.15 + i * 0.07, ease }}>
              <Card className="flex h-full flex-col p-4">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-50 text-brand">{idea.icon}</span>
                  <h3 className="text-[16px] text-ink">{idea.title}</h3>
                </div>
                <div className="mt-3 rounded-xl bg-ok-50/70 px-3 py-2.5 ring-1 ring-ok/15">
                  <Chip tone="green" small>
                    {t("Vandaag", "Today")}
                  </Chip>
                  <p className="mt-1 text-[12.5px] leading-[1.45] text-ink-2">{idea.today}</p>
                </div>
                <div className="mt-2 flex-1 rounded-xl bg-brand-50/60 px-3 py-2.5 ring-1 ring-brand-100">
                  <Chip tone="brand" small>
                    {t("Mogelijk", "Possible")}
                  </Chip>
                  <p className="mt-1 text-[12.5px] leading-[1.45] text-ink-2">{idea.next}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
        <p className="mt-5 text-center text-[12px] text-subtle">{t("* 'Mogelijk' zijn opties op de roadmap, nog niet gelanceerd.", "* 'Possible' items are roadmap options, not launched yet.")}</p>
      </div>
    </Slide>
  );
}

function simulate(newPerMonth: number, growthPerYear: number, monthlyChurn: number, years: number) {
  let customers = 0;
  const out: number[] = [];
  for (let month = 0; month < years * 12; month++) {
    const intake = newPerMonth * (1 + growthPerYear) ** Math.floor(month / 12);
    customers = customers * (1 - monthlyChurn) + intake;
    if (month % 12 === 11) out.push(Math.round(customers));
  }
  return out;
}

export function GrowthSlide() {
  const t = useT();
  const lang = useLang();
  const [ref, on] = useOnScreen<HTMLDivElement>();
  const [perMonth, setPerMonth] = useState(scenario.newPerMonth);
  const [growth, setGrowth] = useState(scenario.growthPerYear);
  const [churn, setChurn] = useState(scenario.monthlyChurn);
  const arpu = blendedMonthlyCents(lang);
  const customers = simulate(perMonth, growth, churn, scenario.years);
  const arr = customers.map((c) => c * arpu * 12);
  const max = Math.max(...arr, 1);
  const onTarget = arr[0] >= yearOneTarget.min * 100 && arr[0] <= yearOneTarget.max * 100;

  const sliders = [
    { label: t("Nieuwe klanten per maand (jaar 1)", "New customers per month (year 1)"), value: perMonth, set: setPerMonth, min: 2, max: 60, step: 1, show: String(perMonth) },
    { label: t("Groei instroom per jaar", "Intake growth per year"), value: growth, set: setGrowth, min: 0, max: 1, step: 0.05, show: `${Math.round(growth * 100)}%` },
    { label: t("Churn per maand", "Churn per month"), value: churn, set: setChurn, min: 0, max: 0.04, step: 0.002, show: `${(churn * 100).toFixed(1).replace(".", lang === "nl" ? "," : ".")}%` },
  ];

  return (
    <Slide id="groei" variant="white">
      <div ref={ref}>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <Heading on={on}>
            {t("Wat het ", "What it ")}
            <span className="text-brand">{t("kan opleveren", "can earn")}</span>
          </Heading>
          <Lead on={on} className="max-w-sm lg:mt-0 lg:pb-1.5 lg:text-right">
            {t("Een scenario, geen prognose. Schuif mee tijdens het gesprek.", "A scenario, not a forecast. Adjust it during the conversation.")}
          </Lead>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={on ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.2, ease }} className="mt-10 grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
          <Card className="p-6">
            <Label className="flex items-center gap-1.5">
              <Calculator className="h-3.5 w-3.5" />
              {t("Aannames", "Assumptions")}
            </Label>
            <div className="mt-4 space-y-5">
              {sliders.map((s) => {
                const fill = ((s.value - s.min) / (s.max - s.min)) * 100;
                return (
                  <label key={s.label} className="block">
                    <span className="flex items-baseline justify-between text-[13.5px]">
                      <span className="font-medium text-ink">{s.label}</span>
                      <span className="font-mono font-semibold text-brand">{s.show}</span>
                    </span>
                    <input
                      type="range"
                      min={s.min}
                      max={s.max}
                      step={s.step}
                      value={s.value}
                      onChange={(e) => s.set(Number(e.target.value))}
                      className="mt-2.5 h-1.5 w-full cursor-pointer appearance-none rounded-full [&::-webkit-slider-thumb]:size-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-brand [&::-webkit-slider-thumb]:shadow-[0_0_0_4px_rgb(37_99_235/0.18)]"
                      style={{ background: `linear-gradient(to right, var(--color-brand) ${fill}%, var(--color-sunken) ${fill}%)` }}
                    />
                  </label>
                );
              })}
            </div>
            <div className="mt-6 rounded-xl bg-canvas p-4 ring-1 ring-line">
              <p className="flex items-center justify-between text-[13px]">
                <span className="text-muted">{t("Gemiddeld per klant", "Average per customer")}</span>
                <span className="font-mono font-semibold text-ink">
                  {euro(lang, arpu)}
                  {t("/mnd", "/mo")}
                </span>
              </p>
              <p className="mt-1 text-[11.5px] text-subtle">{t("Uit de prijslijst en de segmentmix, zonder gebruik boven de bundel.", "From the price list and segment mix, without usage above the bundle.")}</p>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between gap-3">
              <span className="flex items-center gap-2.5">
                <Label>{t("ARR per jaar", "ARR per year")}</Label>
                <Chip tone={onTarget ? "green" : "orange"} small>
                  {t("Doel jaar 1", "Year 1 target")}: {euro(lang, yearOneTarget.min * 100, true)}–{euro(lang, yearOneTarget.max * 100, true)}
                </Chip>
              </span>
              <span className="font-mono text-[12px] text-muted">
                {t("klanten jaar", "customers year")} {scenario.years}: <span className="font-semibold text-ink">{customers[customers.length - 1].toLocaleString(lang === "nl" ? "nl-NL" : "en-GB")}</span>
              </span>
            </div>
            <div className="mt-6 flex h-[260px] items-end gap-4">
              {arr.map((value, i) => (
                <div key={i} className="flex h-full flex-1 flex-col items-center justify-end gap-2">
                  <span className="font-mono text-[12.5px] font-semibold text-ink">{euro(lang, value, true)}</span>
                  <motion.div
                    initial={{ height: 0 }}
                    animate={on ? { height: `${(value / max) * 80}%` } : {}}
                    transition={{ duration: 0.7, delay: 0.3 + i * 0.08, ease }}
                    className={`w-full rounded-t-xl ${i === arr.length - 1 ? "bg-brand" : "bg-brand-100"}`}
                  />
                  <span className="font-mono text-[11px] text-subtle">
                    {t("Jaar", "Year")} {i + 1}
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-4 flex items-center gap-1.5 border-t border-line pt-3 text-[12px] text-subtle">
              <Banknote className="h-3.5 w-3.5" />
              {t("Exclusief omzet uit netwerk, financiering en partners.", "Excluding revenue from the network, financing and partners.")}
            </p>
          </Card>
        </motion.div>
      </div>
    </Slide>
  );
}
