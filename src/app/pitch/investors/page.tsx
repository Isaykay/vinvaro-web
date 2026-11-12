import type { Metadata } from "next";
import { Suspense } from "react";
import { InvestorDeck } from "@/components/pitch/investors/deck";
import { hasInvestorAccess } from "./access";
import { PasswordGate } from "./gate";

export const metadata: Metadata = { title: "VINVARO: investeerderspresentatie" };

async function Gate() {
  return (await hasInvestorAccess()) ? <InvestorDeck /> : <PasswordGate />;
}

export default function InvestorPitchPage() {
  return (
    <Suspense>
      <Gate />
    </Suspense>
  );
}
