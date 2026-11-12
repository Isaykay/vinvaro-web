"use client";

import { useState } from "react";
import { AnimatePresence } from "motion/react";
import { useLang } from "@/components/lang-provider";
import { getContent } from "@/lib/content";
import { motion } from "./animation";
import { useT } from "./lang";
import { Slide } from "./slide";
import { Card, Heading, Tick, ease, useOnScreen } from "./ui";

export function FeaturesSlide() {
  const t = useT();
  const { platform, securityControls } = getContent(useLang());
  const [ref, on] = useOnScreen<HTMLDivElement>();
  const [activeId, setActiveId] = useState("vehicles");
  const titles = (...slugs: string[]) => slugs.flatMap((slug) => platform.find((p) => p.slug === slug)?.points.map((p) => p.title) ?? []);

  const categories = [
    { id: "vehicles", label: t("Voorraad & dossier", "Stock & dossier"), desc: t("Eén voertuig, één complete geschiedenis", "One vehicle, one complete history"), items: titles("voorraad") },
    { id: "workflows", label: t("Workflows", "Workflows"), desc: t("Van intake tot aflevering, elke stap vastgelegd", "From intake to delivery, every step recorded"), items: titles("intake-en-aflevering") },
    { id: "sales", label: t("Inbox & verkoop", "Inbox & sales"), desc: t("Van aanvraag tot getekende deal", "From inquiry to signed deal"), items: titles("inbox", "crm-en-verkoop") },
    { id: "finance", label: t("Contracten & publiceren", "Contracts & publishing"), desc: t("Getekend, gefactureerd en overal online", "Signed, invoiced and online everywhere"), items: titles("contracten-en-facturen", "publiceren") },
    { id: "ai", label: t("AI & Fotostudio", "AI & Photo studio"), desc: t("AI die helpt controleren, niet die beslist", "AI that helps you check, not AI that decides"), items: titles("intelligence", "fotostudio") },
    { id: "team", label: t("Team & beveiliging", "Team & security"), desc: t("Rollen, rechten en de app op de werkvloer", "Roles, permissions and the app on the floor"), items: [...titles("team-app"), ...securityControls.map((c) => c.title)] },
  ];
  const active = categories.find((c) => c.id === activeId) ?? categories[0];

  return (
    <Slide id="functies" variant="white">
      <div ref={ref}>
        <Heading on={on} center>
          {t("Alles wat je nodig hebt, ", "Everything you need, ")}
          <span className="text-brand">{t("ingebouwd", "built in")}</span>
        </Heading>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={on ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mx-auto mt-10 flex w-fit flex-wrap justify-center gap-1 rounded-full bg-white p-1 shadow-card"
        >
          {categories.map((c) => {
            const current = c.id === activeId;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => setActiveId(c.id)}
                className={`flex items-center gap-2 rounded-full px-4 py-2 text-[13.5px] font-medium transition-colors ${current ? "bg-brand text-white shadow-[0_4px_14px_-4px_rgba(37,99,235,0.6)]" : "text-muted hover:bg-sunken hover:text-ink"}`}
              >
                {c.label}
                <span className={`rounded-full px-1.5 font-mono text-[11px] ${current ? "bg-white/20 text-white" : "bg-sunken text-subtle"}`}>{c.items.length}</span>
              </button>
            );
          })}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={on ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.25, ease }} className="mx-auto mt-6 max-w-5xl">
          <Card className="overflow-hidden shadow-float">
            <AnimatePresence mode="wait">
              <motion.div key={active.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                <div className="flex items-baseline justify-between gap-4 border-b border-line bg-canvas px-6 py-4">
                  <h3 className="text-[17px] text-ink">{active.label}</h3>
                  <p className="text-right text-[13px] text-muted">{active.desc}</p>
                </div>
                <div className="grid gap-x-6 px-6 py-4 sm:grid-cols-2 lg:grid-cols-3">
                  {active.items.map((item, i) => (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2, delay: i * 0.02 }}
                      className="flex items-center gap-2.5 border-b border-line py-2.5 text-[14px] text-ink"
                    >
                      <Tick />
                      {item}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </Card>
        </motion.div>
      </div>
    </Slide>
  );
}
