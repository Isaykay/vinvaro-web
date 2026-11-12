"use client";

import { useInView } from "motion/react";
import { useRef } from "react";
import { Handshake, MonitorPlay, Repeat2, Rocket, Users } from "lucide-react";
import { Mark } from "@/components/brand-mark";
import { motion } from "../animation";
import { useT } from "../lang";
import { Slide } from "../slide";
import { Card, Heading, Label, Lead, ease, useOnScreen } from "../ui";
import { useLang } from "@/components/lang-provider";
import { round } from "./data";
import { euro } from "./model";

export function GtmSlide() {
  const t = useT();
  const [ref, on] = useOnScreen<HTMLDivElement>();
  const loop = [t("Meer dealers", "More dealers"), t("Meer auto's op het Handelsplein", "More cars on the trade network"), t("Meer kopers op de Marktplaats", "More buyers on the Marketplace"), t("Meer reden om aan te sluiten", "More reason to join")];
  const channels = [
    { icon: Repeat2, title: t("Overstapdienst", "Switching service"), body: t("Wij importeren voorraad en relaties en zetten workflows klaar. Live binnen een paar dagen.", "We import stock and contacts and set up workflows. Live within a few days.") },
    { icon: MonitorPlay, title: t("Demo op eigen voorraad", "Demo on their own stock"), body: t("30 minuten, met de auto's van de dealer zelf. Daarna 30 dagen gratis.", "30 minutes, with the dealer's own cars. Then 30 days free.") },
    { icon: Handshake, title: t("Partners", "Partners"), body: t("Autoboeker en Autus Finance zitten al in het product en openen de deur naar boekhouders en financiers.", "Autoboeker and Autus Finance are already in the product and open doors to accountants and lenders.") },
    { icon: Users, title: t("Gratis netwerk", "Free network"), body: t("Handelsplein en Marktplaats trekken dealers aan die nog geen klant zijn.", "The trade network and Marketplace attract dealers who aren't customers yet.") },
  ];
  const r = 108;
  return (
    <Slide id="gtm" variant="subtle">
      <div ref={ref}>
        <Heading on={on} center>
          {t("Groeien via ", "Growing through ")}
          <span className="text-brand">{t("het netwerk", "the network")}</span>
        </Heading>
        <Lead on={on} center>
          {t("Elke nieuwe dealer maakt VINVARO waardevoller voor de volgende.", "Every new dealer makes VINVARO more valuable for the next.")}
        </Lead>

        <div className="mt-10 grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={on ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.7, delay: 0.2, ease }} className="relative mx-auto h-[340px] w-[340px]">
            <svg viewBox="0 0 340 340" className="absolute inset-0 h-full w-full">
              <circle cx="170" cy="170" r={r} fill="none" stroke="#bfdbfe" strokeWidth="2" strokeDasharray="6 8" />
              <motion.circle
                cx="170"
                cy="170"
                r={r}
                fill="none"
                stroke="#2563eb"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeDasharray={`60 ${2 * Math.PI * r}`}
                animate={on ? { strokeDashoffset: [0, -2 * Math.PI * r] } : {}}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              />
            </svg>
            <div className="absolute top-1/2 left-1/2 flex h-[84px] w-[84px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[24px] bg-ink text-white shadow-float">
              <Mark width={44} />
            </div>
            {loop.map((label, i) => {
              const angle = (i / loop.length) * Math.PI * 2 - Math.PI / 2;
              return (
                <motion.span
                  key={label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={on ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.5 + i * 0.15, ease }}
                  className="absolute w-[150px] -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white px-3 py-2 text-center text-[12.5px] leading-snug font-medium text-ink shadow-card"
                  style={{ left: 170 + Math.cos(angle) * r * 1.18, top: 170 + Math.sin(angle) * r * 1.18 }}
                >
                  {label}
                </motion.span>
              );
            })}
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-2">
            {channels.map((c, i) => (
              <motion.div key={c.title} initial={{ opacity: 0, y: 16 }} animate={on ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.3 + i * 0.08, ease }}>
                <Card className="h-full p-5">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-50 text-brand">
                    <c.icon className="h-[18px] w-[18px]" />
                  </span>
                  <h3 className="mt-3 text-[16px] text-ink">{c.title}</h3>
                  <p className="mt-1.5 text-[13.5px] leading-[1.55] text-muted">{c.body}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Slide>
  );
}

const colors = ["#2563eb", "#3b82f6", "#93c5fd", "#dbeafe"];

/** Donut slices for the use-of-funds split, starting at twelve o'clock. */
const arcs = round.allocation.reduce<{ angle: number; paths: { d: string; color: string }[] }>(
  (acc, a, i) => {
    const sweep = (a.pct / 100) * 360;
    const start = (acc.angle * Math.PI) / 180;
    const end = ((acc.angle + sweep) * Math.PI) / 180;
    const R = 150;
    const d = `M 170 170 L ${170 + R * Math.cos(start)} ${170 + R * Math.sin(start)} A ${R} ${R} 0 ${sweep > 180 ? 1 : 0} 1 ${170 + R * Math.cos(end)} ${170 + R * Math.sin(end)} Z`;
    return { angle: acc.angle + sweep, paths: [...acc.paths, { d, color: colors[i % colors.length] }] };
  },
  { angle: -90, paths: [] },
).paths;

export function RoundSlide() {
  const t = useT();
  const [ref, on] = useOnScreen<HTMLDivElement>();
  const lang = useLang();
  const money = (eur: number) => euro(lang, eur * 100, true);
  const postMoney = round.raise / round.equity;
  const percent = new Intl.NumberFormat(lang === "nl" ? "nl-NL" : "en-GB", { style: "percent", maximumFractionDigits: 1 }).format(round.equity);

  return (
    <Slide id="ronde" variant="white">
      <div ref={ref}>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <Heading on={on}>
            {t("De ronde & ", "The round & ")}
            <span className="text-brand">{t("waar het naartoe gaat", "where it goes")}</span>
          </Heading>
          <Lead on={on} className="max-w-sm lg:mt-0 lg:pb-1.5 lg:text-right">
            {t("Het product staat. Het kapitaal gaat naar klanten winnen en het netwerk laten groeien.", "The product is built. The capital goes into winning customers and growing the network.")}
          </Lead>
        </div>

        <div className="mt-10 grid items-center gap-12 lg:grid-cols-2">
          <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={on ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.8, delay: 0.2, ease }} className="relative mx-auto w-full max-w-[360px]">
            <svg viewBox="0 0 340 340" className="w-full">
              {arcs.map((a, i) => (
                <motion.path key={i} d={a.d} fill={a.color} initial={{ opacity: 0 }} animate={on ? { opacity: 1 } : {}} transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }} />
              ))}
              <circle cx="170" cy="170" r="88" fill="white" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-[12px] text-muted">{t("Ronde", "Round")}</span>
              <span className="text-[30px] leading-tight font-semibold tracking-[-0.03em] text-ink">{money(round.raise)}</span>
              <span className="text-[12px] text-muted">
                {t("voor", "for")} {percent}
              </span>
              <span className="mt-0.5 max-w-[150px] text-center text-[11px] leading-snug text-subtle">{t(round.tranches[0], round.tranches[1])}</span>
            </div>
          </motion.div>

          <div className="space-y-3">
            {round.allocation.map((a, i) => (
              <motion.div key={a.label[0]} initial={{ opacity: 0, x: 20 }} animate={on ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.4, delay: 0.3 + i * 0.08, ease }}>
                <Card className="flex items-center gap-4 p-4">
                  <span className="h-8 w-8 shrink-0 rounded-lg" style={{ backgroundColor: colors[i % colors.length] }} />
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center justify-between">
                      <span className="text-[14.5px] font-semibold text-ink">{t(a.label[0], a.label[1])}</span>
                      <span className="font-mono text-[14px] font-semibold text-ink">{a.pct}%</span>
                    </span>
                    <span className="block text-[12.5px] text-muted">{t(a.desc[0], a.desc[1])}</span>
                  </span>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={on ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.7, ease }} className="mt-10 grid gap-4 sm:grid-cols-3">
          {[
            { label: t("Ronde", "Round"), value: money(round.raise), sub: t(round.tranches[0], round.tranches[1]) },
            { label: t("Aandelen", "Equity"), value: percent, sub: t("voor de investeerder", "for the investor") },
            { label: t("Waardering", "Valuation"), value: money(postMoney), sub: t(`post-money · ${money(postMoney - round.raise)} pre-money`, `post-money · ${money(postMoney - round.raise)} pre-money`) },
          ].map((x) => (
            <div key={x.label} className="rounded-[18px] bg-brand p-5 text-center text-white shadow-[0_8px_24px_-12px_rgb(37_99_235/0.6)]">
              <Label className="!text-white/60">{x.label}</Label>
              <p className="mt-1.5 text-[22px] font-semibold tracking-[-0.02em]">{x.value}</p>
              <p className="mt-0.5 text-[12px] text-white/65">{x.sub}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </Slide>
  );
}

export function ClosingSlide() {
  const t = useT();
  const ref = useRef(null);
  const on = useInView(ref, { once: true, margin: "-80px" });
  return (
    <section id="contact" className="slide-section bg-obsidian-glow relative overflow-hidden">
      <div className="bg-grid-dark mask-fade-radial pointer-events-none absolute inset-0" />
      <Mark className="pointer-events-none absolute -right-16 -bottom-24 h-[380px] w-auto text-white/[0.03]" />
      <div ref={ref} className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center px-6 py-24 text-center">
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={on ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.5 }} className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 text-white ring-1 ring-white/15">
          <Rocket className="h-7 w-7" />
        </motion.div>
        <motion.h2 initial={{ opacity: 0, y: 20 }} animate={on ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.1 }} className="text-[clamp(2rem,5vw,3.75rem)] leading-[1.05] text-white">
          {t("Bouw met ons het besturingssysteem voor de ", "Build the operating system for the ")}
          <span className="bg-gradient-to-r from-white via-brand-300 to-white bg-clip-text text-transparent">{t("autohandel", "car trade")}</span>
        </motion.h2>
        <motion.p initial={{ opacity: 0, y: 16 }} animate={on ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }} className="mt-5 max-w-xl text-lg text-white/65">
          {t("Het product draait, de rails voor het netwerk liggen er. Nu opschalen.", "The product runs, the network's rails are laid. Now it's time to scale.")}
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={on ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.4 }} className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
          <a href="mailto:info@vinvaro.com?subject=VINVARO%20investering" className="inline-flex items-center gap-2.5 rounded-full bg-white px-8 py-3.5 text-sm font-bold text-ink shadow-xl">
            {t("Plan een gesprek", "Schedule a call")}
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 7h10m0 0L8 3m4 4L8 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a href="https://vinvaro.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-8 py-3.5 text-sm font-semibold text-white">
            vinvaro.com
          </a>
        </motion.div>
        <p className="mt-10 text-xs text-white/30">{t("Vertrouwelijk. Niet doorsturen zonder toestemming.", "Confidential. Do not forward without permission.")}</p>
      </div>
    </section>
  );
}
