"use client";

import { useCallback, useRef, useState, type MouseEvent, type ReactNode } from "react";
import { AnimatePresence } from "motion/react";
import { Star } from "lucide-react";
import { Mark } from "@/components/brand-mark";
import { Plate } from "@/components/product/kit";
import { motion } from "./animation";
import { useT, type T } from "./lang";
import { Arrow, Chip, Heading, Lead, Logo, ease, make, useOnScreen, type Tone } from "./ui";

function Browser({ url, children }: { url: string; children: ReactNode }) {
  return (
    <div className="overflow-hidden rounded-[14px] bg-white shadow-card">
      <div className="flex h-8 items-center gap-3 border-b border-line bg-canvas px-3">
        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <span key={i} className="h-2 w-2 rounded-full bg-line-strong" />
          ))}
        </div>
        <span className="mx-auto flex items-center gap-1.5 rounded-md bg-white px-2.5 py-0.5 font-mono text-[11px] text-muted ring-1 ring-line">
          <Mark className="h-2 w-auto text-ink" />
          {url}
        </span>
        <span className="w-8" />
      </div>
      {children}
    </div>
  );
}

function WorkspacePreview({ t }: { t: T }) {
  const rows: { name: string; make: string; plate: string; stage: string; tone: Tone }[] = [
    { name: "Volvo XC40 Recharge", make: "volvo", plate: "P-771-RD", stage: t("Gereserveerd", "Reserved"), tone: "orange" },
    { name: "Kia EV6 GT-Line", make: "kia", plate: "T-114-NB", stage: t("Beschikbaar", "Available"), tone: "green" },
    { name: "BMW 320e Touring", make: "bmw", plate: "S-208-KL", stage: t("Inspectie", "Inspection"), tone: "brand" },
    { name: "VW Golf 1.5 eTSI", make: "volkswagen", plate: "R-512-FX", stage: t("Intake", "Intake"), tone: "purple" },
  ];
  return (
    <Browser url="app.vinvaro.com">
      <div>
        <p className="border-b border-line px-4 py-2 font-mono text-[10px] tracking-[0.06em] text-subtle uppercase">{t("Voertuigen in behandeling", "Vehicles in progress")}</p>
        {rows.map((r) => (
          <div key={r.plate} className="flex items-center gap-2.5 border-b border-line px-4 py-2 last:border-0">
            <Logo src={make(r.make)} size={16} contain />
            <span className="min-w-0 flex-1 truncate text-[11.5px] font-medium text-ink">{r.name}</span>
            <Plate size="xs">{r.plate}</Plate>
            <Chip tone={r.tone}>{r.stage}</Chip>
          </div>
        ))}
      </div>
    </Browser>
  );
}

function MarketPreview({ t }: { t: T }) {
  const cars = [
    { make: "volvo", name: "Volvo XC60", price: "€ 44.950" },
    { make: "toyota", name: "Yaris Cross", price: "€ 29.450" },
    { make: "kia", name: "Kia EV6", price: "€ 37.950" },
  ];
  return (
    <Browser url="app.vinvaro.com/markt">
      <div className="p-4">
        <p className="text-[13px] font-semibold text-ink">{t("Zoek je volgende auto", "Find your next car")}</p>
        <p className="font-mono text-[10.5px] text-subtle">{t("248 auto's bij aangesloten autobedrijven", "248 cars at participating dealers")}</p>
        <div className="mt-3 grid grid-cols-3 gap-2">
          {cars.map((c) => (
            <div key={c.name} className="rounded-lg bg-canvas p-2 ring-1 ring-line">
              <span className="flex items-center gap-1">
                <Logo src={make(c.make)} size={14} contain />
                <span className="truncate text-[10px] text-muted">{c.name}</span>
              </span>
              <p className="mt-1 font-mono text-[13px] font-semibold text-ink">{c.price}</p>
            </div>
          ))}
        </div>
        <div className="mt-2 flex items-center gap-2 rounded-lg bg-ask-50 px-2.5 py-2 ring-1 ring-ask/15">
          <Star className="h-3.5 w-3.5 fill-[#f5a524] text-[#f5a524]" />
          <span className="flex-1 text-[11.5px] text-ink">{t("4,6 · 37 reviews bij dit autobedrijf", "4.6 · 37 reviews for this dealer")}</span>
          <span className="rounded-md bg-brand px-2 py-0.5 text-[10.5px] font-medium text-white">{t("Proefrit", "Test drive")}</span>
        </div>
      </div>
    </Browser>
  );
}

export function LaunchSlide() {
  const t = useT();
  const [ref, on] = useOnScreen<HTMLDivElement>();
  const [launch, setLaunch] = useState<{ label: string; x: number; y: number } | null>(null);
  const tabs = useRef<Record<string, Window | null>>({});

  const handleLaunch = useCallback((e: MouseEvent<HTMLAnchorElement>, key: string, url: string, label: string) => {
    e.preventDefault();
    setLaunch({ label, x: e.clientX, y: e.clientY });
    window.setTimeout(() => {
      const existing = tabs.current[key];
      if (existing && !existing.closed) existing.focus();
      else {
        const win = window.open(url, `vinvaro-${key}`);
        tabs.current[key] = win;
        win?.focus();
      }
    }, 1150);
    window.setTimeout(() => setLaunch(null), 2600);
  }, []);

  const cards = [
    {
      key: "app",
      title: t("Werkplek", "Workspace"),
      desc: t(
        "Voor je team. Voorraad, workflows, inbox, verkoop, contracten en publiceren op één plek, in de browser en in de app.",
        "For your team. Stock, workflows, inbox, sales, contracts and publishing in one place, in the browser and in the app.",
      ),
      url: "https://app.vinvaro.com/login",
      preview: <WorkspacePreview t={t} />,
      cta: t("Open de werkplek", "Open the workspace"),
    },
    {
      key: "markt",
      title: t("VINVARO Marktplaats", "VINVARO Marketplace"),
      desc: t(
        "Voor je kopers. Het aanbod van alle aangesloten autobedrijven, tegen vraagprijs en met je reputatie bij elke auto.",
        "For your buyers. The stock of every participating dealer, at asking price and with your reputation on every car.",
      ),
      url: "https://app.vinvaro.com/markt",
      preview: <MarketPreview t={t} />,
      cta: t("Open de Marktplaats", "Open the Marketplace"),
    },
  ];

  return (
    <section id="live" className="slide-section pitch-grid relative overflow-hidden bg-canvas">
      <div ref={ref} className="relative z-10 mx-auto w-full max-w-6xl px-6 py-24">
        <Heading on={on} center>
          {t("Ervaar het ", "Experience it ")}
          <span className="text-brand">live</span>
        </Heading>
        <Lead on={on} center>
          {t("VINVARO heeft een werkplek voor je team en een openbare marktplaats voor je kopers.", "VINVARO has a workspace for your team and a public marketplace for your buyers.")}
        </Lead>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {cards.map((c, i) => (
            <motion.a
              key={c.key}
              href={c.url}
              onClick={(e: MouseEvent<HTMLAnchorElement>) => handleLaunch(e, c.key, c.url, c.title)}
              initial={{ opacity: 0, y: 28 }}
              animate={on ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.12, ease }}
              whileHover={{ y: -6 }}
              className="group flex flex-col overflow-hidden rounded-[22px] bg-white shadow-card transition-shadow hover:shadow-float"
            >
              <div className="relative m-2 flex h-[260px] items-center overflow-hidden rounded-[16px] bg-canvas px-6 py-5">
                <div
                  className="pointer-events-none absolute inset-0 opacity-70"
                  style={{ backgroundImage: "radial-gradient(rgb(11 15 20 / 0.07) 1px, transparent 1px)", backgroundSize: "14px 14px" }}
                />
                <div className="relative mx-auto w-full max-w-[380px] transition-transform duration-300 group-hover:scale-[1.02]">{c.preview}</div>
              </div>
              <div className="flex flex-1 flex-col px-7 pt-3 pb-7">
                <div className="flex items-center gap-2.5">
                  <h3 className="text-[24px] text-ink">{c.title}</h3>
                  <Chip tone="green">Live</Chip>
                </div>
                <p className="mt-2 flex-1 text-[14px] leading-[1.6] text-muted">{c.desc}</p>
                <span className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-brand text-[15px] font-medium text-white shadow-[0_1px_0_rgb(255_255_255/0.18)_inset,0_8px_20px_-10px_rgb(37_99_235/0.8)] transition-[gap] group-hover:gap-3">
                  {c.cta}
                  <Arrow className="h-4 w-4" />
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {launch && (
          <motion.div key="portal" className="fixed inset-0 z-[100] flex items-center justify-center" initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
            <motion.div
              className="absolute rounded-full bg-white"
              style={{ left: launch.x, top: launch.y, width: 60, height: 60, marginLeft: -30, marginTop: -30 }}
              initial={{ scale: 0 }}
              animate={{ scale: 70 }}
              transition={{ duration: 1, ease: [0.65, 0, 0.35, 1] }}
            />
            <motion.div className="relative z-10 flex flex-col items-center gap-5" initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.55, duration: 0.5 }}>
              <div className="flex h-20 w-20 items-center justify-center rounded-[22px] bg-ink text-white shadow-float">
                <Mark width={44} />
              </div>
              <div className="text-center">
                <p className="text-[20px] font-semibold tracking-[-0.02em] text-ink">{launch.label}</p>
                <p className="mt-2 flex items-center justify-center gap-1.5 text-[14px] text-muted">
                  {t("Openen", "Opening")}
                  {[0, 1, 2].map((i) => (
                    <motion.span key={i} className="inline-block h-1.5 w-1.5 rounded-full bg-brand" animate={{ opacity: [0.2, 1, 0.2] }} transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }} />
                  ))}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
