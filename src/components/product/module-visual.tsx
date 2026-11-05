"use client";

import type { ModuleVisualKey } from "@/lib/content";
import { IntelligenceScan, StaffApp, VehicleDossier, WorkflowRun } from "@/components/product/ops";
import { AgendaWeek, ContractSign, InboxView, PublishFlow, SalesPipeline } from "@/components/product/sales";

export function ModuleVisual({ visual }: { visual: ModuleVisualKey }) {
  switch (visual) {
    case "inventory":
      return <VehicleDossier />;
    case "intake":
      return <WorkflowRun />;
    case "intelligence":
      return <IntelligenceScan />;
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
  }
}
