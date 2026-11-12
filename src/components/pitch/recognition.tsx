"use client";

import { useState } from "react";
import { AlertTriangle, Car, ClipboardList, Clock, FileText, Globe, KeyRound, MessagesSquare } from "lucide-react";
import { motion } from "./animation";
import { useT } from "./lang";
import { Slide } from "./slide";
import { useOnScreen } from "./ui";

const icons = [Car, MessagesSquare, ClipboardList, KeyRound, Globe, FileText, Clock, AlertTriangle];

export function RecognitionSlide({ firstName }: { firstName?: string }) {
  const t = useT();
  const [ref, on] = useOnScreen<HTMLDivElement>();
  const [checked, setChecked] = useState<Set<number>>(new Set());

  const points = [
    t("Je voorraad staat in Excel, en niet iedereen werkt met dezelfde versie", "Your stock lives in Excel, and not everyone has the same version"),
    t("Klantvragen komen binnen op meerdere WhatsApp-telefoons en mailboxen", "Customer questions arrive on several WhatsApp phones and mailboxes"),
    t("Intake en aflevering gaan op papier, zonder foto's of naam erbij", "Intake and delivery happen on paper, without photos or names"),
    t("Bij aflevering mist er weleens iets, zoals een tweede sleutel", "Something sometimes goes missing at delivery, like a second key"),
    t("Een nieuwe prijs zet je per advertentiesite met de hand door", "You update a new price on every listing site by hand"),
    t("Contracten worden geprint, getekend en weer gescand", "Contracts are printed, signed and scanned back in"),
    t("Auto's staan langer stil dan nodig tussen intake en verkoopklaar", "Cars sit idle longer than needed between intake and sale-ready"),
    t("Niemand weet precies wie de volgende stap heeft", "Nobody knows exactly who has the next step"),
  ];

  const toggle = (i: number) =>
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  return (
    <Slide id="herkenning" variant="subtle">
      <div ref={ref}>
        <div className="mb-10 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={on ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] text-ink"
          >
            {firstName ? t(`${firstName}, hoeveel herken je er?`, `${firstName}, how many do you recognise?`) : t("Hoeveel van deze punten herken je?", "How many of these do you recognise?")}
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 12 }} animate={on ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }} className="mx-auto mt-3 max-w-xl text-[15px] text-muted sm:text-base">
            {t("Klik op de punten die gelden voor jouw autobedrijf.", "Click the points that apply to your dealership.")}
          </motion.p>
        </div>

        <div className="mx-auto grid max-w-3xl gap-3">
          {points.map((text, i) => {
            const isChecked = checked.has(i);
            const Icon = icons[i];
            return (
              <motion.button
                key={text}
                initial={{ opacity: 0, x: -16 }}
                animate={on ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.06 }}
                onClick={() => toggle(i)}
                className={`group flex items-center gap-4 rounded-xl border px-5 py-4 text-left transition-all ${isChecked ? "border-brand/30 bg-brand/5 shadow-sm" : "border-line bg-white hover:border-brand/20 hover:shadow-sm"}`}
              >
                <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg transition-all ${isChecked ? "bg-brand text-white" : "bg-canvas text-muted group-hover:text-brand"}`}>
                  {isChecked ? (
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M3 7l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : (
                    <Icon className="h-4 w-4" strokeWidth={1.7} />
                  )}
                </span>
                <span className={`text-sm font-medium sm:text-base ${isChecked ? "text-ink" : "text-muted"}`}>{text}</span>
              </motion.button>
            );
          })}
        </div>

        <motion.div initial={{ opacity: 0 }} animate={on ? { opacity: 1 } : {}} transition={{ delay: 0.8 }} className="mt-8 text-center">
          {checked.size > 0 ? (
            <motion.p key={checked.size} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-sm font-semibold text-brand">
              {t(`${checked.size} van ${points.length} geselecteerd`, `${checked.size} of ${points.length} selected`)}
              {checked.size >= 3 && (
                <span className="ml-2 text-ink">
                  {t("VINVARO lost dit voor je op.", "VINVARO solves this for you.")}{" "}
                  <button onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })} className="underline underline-offset-2 transition-colors hover:text-brand">
                    {t("Plan een demo", "Book a demo")}
                  </button>
                </span>
              )}
            </motion.p>
          ) : (
            <p className="text-xs text-muted">{t("Selecteer de punten die je herkent", "Select the points you recognise")}</p>
          )}
        </motion.div>
      </div>
    </Slide>
  );
}
