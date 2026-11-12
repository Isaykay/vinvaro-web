"use client";

import { useMemo } from "react";
import { AiSlide } from "./ai";
import { AnimationProvider } from "./animation";
import { AppSlide } from "./app";
import { BenefitsSlide } from "./benefits";
import { ComparisonSlide } from "./comparison";
import { ContactSlide } from "./contact";
import { SlideControls, useSlideNavigation } from "./controls";
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

  const navigate = useSlideNavigation();

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

      <SlideControls navigate={navigate} />
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
