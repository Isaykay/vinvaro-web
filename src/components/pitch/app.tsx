"use client";

import { useLang } from "@/components/lang-provider";
import { MobileCapture, MobileDashboard, MobileInbox, MobilePublish, MobileSign, MobileVehicle } from "@/components/product/mobile";
import { StoreBadges } from "@/components/store-badges";
import { motion } from "./animation";
import { useT } from "./lang";
import { Slide } from "./slide";
import { Check, Fit, Heading, Lead, ease, useOnScreen } from "./ui";

export function AppSlide() {
  const t = useT();
  const lang = useLang();
  const [ref, on] = useOnScreen<HTMLDivElement>();

  const screens = [
    { Screen: MobileDashboard, label: t("Overzicht", "Overview") },
    { Screen: MobileVehicle, label: t("Dossier", "Dossier") },
    { Screen: MobileCapture, label: t("Intake", "Intake") },
    { Screen: MobileInbox, label: "Inbox" },
    { Screen: MobileSign, label: t("Tekenen", "Sign") },
    { Screen: MobilePublish, label: t("Publiceren", "Publish") },
  ];

  return (
    <Slide id="app" variant="white">
      <div ref={ref}>
        <Heading on={on} center>
          {t("VINVARO app voor ", "VINVARO app for ")}
          <span className="text-brand">iOS & Android</span>
        </Heading>
        <Lead on={on} center>
          {t(
            "Je team legt vast waar het werk gebeurt. Foto's maken, workflows doorlopen, klanten antwoorden en laten tekenen, ook zonder bereik.",
            "Your team captures where the work happens. Take photos, run workflows, answer customers and get signatures, even without signal.",
          )}
        </Lead>

        <div className="-mx-6 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4 [scrollbar-width:none] md:mx-auto md:max-w-6xl md:justify-center md:overflow-visible md:px-0">
          {screens.map(({ Screen, label }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 30 }}
              animate={on ? { opacity: 1, y: i % 2 ? 24 : 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 + i * 0.07, ease }}
              className="w-[55vw] shrink-0 snap-center md:w-[160px] lg:w-[172px]"
            >
              <Fit width={248}>
                <Screen />
              </Fit>
              <p className="mt-3 text-center font-mono text-[11px] tracking-[0.08em] text-subtle uppercase">{label}</p>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={on ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.7 }} className="mt-10 flex flex-col items-center gap-4">
          <StoreBadges lang={lang} />
          <div className="flex items-center gap-4 text-[13px] text-muted">
            {[t("Gratis voor je hele team", "Free for your whole team"), t("Werkt ook offline", "Works offline too")].map((x) => (
              <span key={x} className="flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-ok" />
                {x}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </Slide>
  );
}
