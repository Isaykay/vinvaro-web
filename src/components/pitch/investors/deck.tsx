"use client";

import { useMemo } from "react";
import { AiSlide } from "../ai";
import { AnimationProvider } from "../animation";
import { SlideControls, useSlideNavigation } from "../controls";
import { DashboardSlide } from "../dashboard";
import { PitchLangProvider, useT } from "../lang";
import { PitchNavigation } from "../nav";
import { ProblemSlide } from "../problem";
import { WorkflowSlide } from "../workflow";
import { GrowthSlide, PotentialSlide, RevenueSlide } from "./business";
import { CompetitionSlide, InvestorHero, MarketSlide } from "./market";
import { ClosingSlide, GtmSlide, RoundSlide } from "./round";

function Deck() {
  const t = useT();
  const navigate = useSlideNavigation();
  const slides = useMemo(
    () => [
      { id: "hero", label: t("Intro", "Intro") },
      { id: "probleem", label: t("Probleem", "Problem") },
      { id: "oplossing", label: t("Oplossing", "Solution") },
      { id: "dashboard", label: "Product" },
      { id: "ai", label: "AI" },
      { id: "markt", label: t("Markt", "Market") },
      { id: "concurrentie", label: t("Concurrentie", "Competition") },
      { id: "verdienmodel", label: t("Verdienmodel", "Model") },
      { id: "potentieel", label: t("Potentieel", "Potential") },
      { id: "groei", label: t("Groei", "Growth") },
      { id: "gtm", label: "Go-to-market" },
      { id: "ronde", label: t("Ronde", "Round") },
      { id: "contact", label: "Contact" },
    ],
    [t],
  );

  return (
    <div className="pitch">
      <PitchNavigation slides={slides} />
      <main>
        <InvestorHero />
        <ProblemSlide />
        <WorkflowSlide />
        <DashboardSlide />
        <AiSlide />
        <MarketSlide />
        <CompetitionSlide />
        <RevenueSlide />
        <PotentialSlide />
        <GrowthSlide />
        <GtmSlide />
        <RoundSlide />
        <ClosingSlide />
      </main>
      <SlideControls navigate={navigate} />
    </div>
  );
}

export function InvestorDeck() {
  return (
    <PitchLangProvider>
      <AnimationProvider>
        <Deck />
      </AnimationProvider>
    </PitchLangProvider>
  );
}
