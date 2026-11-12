"use client";

import { useCallback, useEffect, useMemo } from "react";
import { AiSlide } from "./ai";
import { AnimationProvider } from "./animation";
import { AppSlide } from "./app";
import { BenefitsSlide } from "./benefits";
import { ComparisonSlide } from "./comparison";
import { ContactSlide } from "./contact";
import { DashboardSlide } from "./dashboard";
import { FeaturesSlide } from "./features";
import { HeroSlide } from "./hero";
import { HowSlide } from "./how";
import { IntegrationsSlide } from "./integrations";
import { PitchLangProvider, useT } from "./lang";
import { LaunchSlide } from "./launch";
import { PitchNavigation } from "./nav";
import { PricingSlide } from "./pricing";
import { ProblemSlide } from "./problem";
import { RecognitionSlide } from "./recognition";
import { WorkflowSlide } from "./workflow";

type Audience = { companyName?: string; firstName?: string };

function Deck({ companyName, firstName }: Audience) {
  const t = useT();
  const personal = Boolean(companyName || firstName);

  const slides = useMemo(
    () => [
      { id: "hero", label: t("Home", "Home") },
      { id: "probleem", label: t("Probleem", "Problem") },
      { id: "oplossing", label: t("Oplossing", "Solution") },
      { id: "hoe", label: t("Hoe", "How") },
      { id: "ai", label: "AI" },
      { id: "voordelen", label: t("Voordelen", "Benefits") },
      { id: "dashboard", label: t("Platform", "Platform") },
      { id: "app", label: "App" },
      { id: "functies", label: t("Functies", "Features") },
      { id: "koppelingen", label: t("Koppelingen", "Integrations") },
      { id: "vergelijking", label: t("Vergelijking", "Comparison") },
      { id: "prijzen", label: t("Prijzen", "Pricing") },
      ...(personal ? [{ id: "contact", label: t("Demo", "Demo") }] : [{ id: "live", label: t("Live demo", "Live demo") }]),
    ],
    [t, personal],
  );

  const navigate = useCallback(
    (direction: 1 | -1) => {
      const ids = [...slides.map((s) => s.id), ...(personal ? ["herkenning"] : [])];
      const sections = ids
        .map((id) => document.getElementById(id))
        .filter((el): el is HTMLElement => el !== null)
        .sort((a, b) => a.offsetTop - b.offsetTop);
      const threshold = window.innerHeight * 0.3;
      const target = direction === 1 ? sections.find((el) => el.getBoundingClientRect().top > threshold) : sections.findLast((el) => el.getBoundingClientRect().top < -threshold);
      target?.scrollIntoView({ behavior: "smooth" });
    },
    [slides, personal],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.code === "Space" || e.code === "ArrowDown") {
        e.preventDefault();
        navigate(1);
      } else if (e.code === "ArrowUp") {
        e.preventDefault();
        navigate(-1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navigate]);

  return (
    <div className="pitch">
      <PitchNavigation slides={slides} />
      <main>
        <HeroSlide companyName={companyName} firstName={firstName} />
        <ProblemSlide firstName={firstName} />
        <WorkflowSlide />
        <HowSlide />
        <AiSlide />
        <BenefitsSlide companyName={companyName} />
        <DashboardSlide />
        <AppSlide />
        <FeaturesSlide />
        <IntegrationsSlide />
        <ComparisonSlide />
        <PricingSlide />
        {personal ? (
          <>
            <RecognitionSlide firstName={firstName} />
            <ContactSlide companyName={companyName} firstName={firstName} />
          </>
        ) : (
          <LaunchSlide />
        )}
      </main>

      <div className="fixed right-6 bottom-6 z-50 hidden flex-col items-center gap-1.5 md:flex">
        {([-1, 1] as const).map((direction) => (
          <button
            key={direction}
            onClick={() => navigate(direction)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-white/90 text-muted shadow-md backdrop-blur-sm transition-all hover:border-brand/30 hover:text-brand hover:shadow-lg"
            aria-label={direction === -1 ? t("Vorige slide", "Previous slide") : t("Volgende slide", "Next slide")}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d={direction === -1 ? "M3 9l4-4 4 4" : "M3 5l4 4 4-4"} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        ))}
        <span className="mt-0.5 rounded-md bg-black/5 px-1.5 py-0.5 text-[9px] font-medium text-muted/60 backdrop-blur-sm">{t("spatie ↓", "space ↓")}</span>
      </div>
    </div>
  );
}

export function PitchDeck(props: Audience) {
  return (
    <PitchLangProvider>
      <AnimationProvider>
        <Deck {...props} />
      </AnimationProvider>
    </PitchLangProvider>
  );
}
