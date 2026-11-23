"use client";

import type { ModuleVisualKey } from "@/lib/content";
import { IntelligenceScan, StaffApp, VehicleDossier } from "@/components/product/ops";
import { PipelineBoard } from "@/components/product/hero";
import { AgendaWeek, ContractSign, InboxView, PublishFlow, SalesPipeline } from "@/components/product/sales";
import { MarketGrid, TradeFlow } from "@/components/product/network";
import { PhotoStudio } from "@/components/product/studio";
import { Glovebox, LeadResponder, TrustCheck } from "@/components/product/growth";
import { WorkshopOrder } from "@/components/product/workshop";

export function ModuleVisual({ visual }: { visual: ModuleVisualKey }) {
  switch (visual) {
    case "inventory":
      return <VehicleDossier />;
    case "intake":
      return <PipelineBoard />;
    case "intelligence":
      return <IntelligenceScan />;
    case "studio":
      return <PhotoStudio />;
    case "app":
      return <StaffApp />;
    case "inbox":
      return <InboxView />;
    case "crm":
      return <SalesPipeline />;
    case "agenda":
      return <AgendaWeek />;
    case "contracts":
      return <ContractSign />;
    case "publish":
      return <PublishFlow />;
    case "trade":
      return <TradeFlow />;
    case "market":
      return <MarketGrid />;
    case "workshop":
      return <WorkshopOrder />;
    case "check":
      return <TrustCheck />;
    case "responder":
      return <LeadResponder />;
    case "glovebox":
      return <Glovebox />;
  }
}
