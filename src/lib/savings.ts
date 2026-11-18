/**
 * Time saved with VINVARO, as in the value model: about half the stock sells per month, each sale saves
 * ± 190 minutes (intake, photos and publishing, contract, invoice, RDW, workflows) plus ± 39 hours of
 * fixed admin per month. 140 productive hours and € 4,000 employer cost per FTE.
 */
const SAVED_MIN_PER_SALE = 190;
const SAVED_FIXED_HOURS = 39;
const FTE_HOURS = 140;
const FTE_COST_CENTS = 400000;

export function staffSavings(vehiclesInStock: number) {
  if (vehiclesInStock <= 0) return { fte: 0, cents: 0 };
  const fte = ((vehiclesInStock / 2) * (SAVED_MIN_PER_SALE / 60) + SAVED_FIXED_HOURS) / FTE_HOURS;
  return { fte, cents: Math.round(fte * FTE_COST_CENTS) };
}

/** The example dealer used in copy: 45 vehicles in stock. */
export const EXAMPLE_STOCK = 45;
