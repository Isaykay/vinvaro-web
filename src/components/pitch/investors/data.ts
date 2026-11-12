/**
 * Every number in the investor deck that does not come from the product or the price list.
 * `verified: false` renders an "aanname" marker on the slide; confirm a figure, then flip it to true.
 */

export type Figure = { value: string; count: number; label: [nl: string, en: string]; note: [nl: string, en: string]; verified: boolean };

export const market = {
  tam: { count: 20000, value: "± 20.000", label: ["autobedrijven in Nederland", "dealerships in the Netherlands"], note: ["Handel in personenauto's (SBI 45.11), te verifiëren bij CBS/KvK", "Car trade (SBI 45.11), verify with CBS/KvK"], verified: false },
  sam: { count: 7000, value: "± 7.000", label: ["zelfstandige handelaren met 10+ auto's", "independent dealers with 10+ cars"], note: ["Merkonafhankelijk, eigen voorraad en verkoop", "Brand-independent, own stock and sales"], verified: false },
  som: { count: 450, value: "300–600", label: ["klanten binnen 3 jaar", "customers within 3 years"], note: ["4 tot 8% van de SAM", "4 to 8% of the SAM"], verified: false },
  eu: { count: 250000, value: "± 250.000", label: ["autobedrijven in de EU", "dealerships in the EU"], note: ["Upside na Nederland; begin met België en Duitsland", "Upside after the Netherlands; start with Belgium and Germany"], verified: false },
  usedCars: { count: 2000000, value: "± 2 mln", label: ["occasions per jaar verkocht in Nederland", "used cars sold per year in the Netherlands"], note: ["Orde van grootte, BOVAG/RDW", "Order of magnitude, BOVAG/RDW"], verified: false },
} satisfies Record<string, Figure>;

/** Average open stock per dealer in each segment; drives revenue per customer through the real price list. */
export const segments = [
  { key: "small", label: ["Klein", "Small"], vehicles: 25, marketplaces: 1, share: 0.5 },
  { key: "mid", label: ["Middelgroot", "Mid-size"], vehicles: 60, marketplaces: 2, share: 0.35 },
  { key: "large", label: ["Meerdere vestigingen", "Multi-site"], vehicles: 150, marketplaces: 3, share: 0.15 },
] as const;

/** Growth scenario defaults for the revenue slide; the presenter can change them live. */
export const scenario = { newPerMonth: 13, growthPerYear: 0.35, monthlyChurn: 0.012, years: 5 };

/** Year-one ARR the plan aims for, in euros; the growth slide shows whether the scenario lands inside it. */
export const yearOneTarget = { min: 600_000, max: 1_000_000 };

/** The round: amount raised for a share of the company; post- and pre-money follow from these two. Allocation is a draft. */
export const round = {
  raise: 1_200_000,
  equity: 0.425,
  /** How the money comes in; applies to the whole round. */
  tranches: ["in deelbetalingen, gespreid over 3 jaar", "paid in instalments over 3 years"] as [nl: string, en: string],
  allocation: [
    { label: ["Sales & onboarding", "Sales & onboarding"], pct: 40, desc: ["Field sales, overstapdienst en klantsucces", "Field sales, switching service and customer success"] },
    { label: ["Marketing", "Marketing"], pct: 30, desc: ["Merk, content en het VINVARO-netwerk laten groeien", "Brand, content and growing the VINVARO network"] },
    { label: ["Product & AI", "Product & AI"], pct: 15, desc: ["Marktplaatskoppelingen, boekhouding en AI-laag", "Marketplace integrations, accounting and the AI layer"] },
    { label: ["Operatie", "Operations"], pct: 15, desc: ["Juridisch, financieel en support", "Legal, finance and support"] },
  ],
};
