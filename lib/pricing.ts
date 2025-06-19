export type BillingCycle = "annual" | "monthly";

/** The single Studio plan. Client guests are never billed. */
export const studioPlan = {
  annualPerSeat: 12,
  monthlyPerSeat: 15,
  trialDays: 14,
} as const;

export interface SeatQuote {
  seats: number;
  guests: number;
  cycle: BillingCycle;
  perSeat: number;
  /** Amount per month in dollars. */
  monthly: number;
  /** Amount per year in dollars. */
  yearly: number;
}

/**
 * Prices a workspace. Only team members with a seat are billed; client guests are free and
 * unlimited, so they are reported but never multiplied into the total.
 */
export function quoteSeats(seats: number, guests: number, cycle: BillingCycle): SeatQuote {
  if (!Number.isInteger(seats) || seats < 1)
    throw new RangeError("A workspace needs at least one seat");
  if (!Number.isInteger(guests) || guests < 0)
    throw new RangeError("Guest count must be zero or more");

  const perSeat = cycle === "annual" ? studioPlan.annualPerSeat : studioPlan.monthlyPerSeat;
  const monthly = seats * perSeat;
  return { seats, guests, cycle, perSeat, monthly, yearly: monthly * 12 };
}

/** Yearly saving of annual billing over month-to-month, for the same number of seats. */
export function annualSavings(seats: number): number {
  return (studioPlan.monthlyPerSeat - studioPlan.annualPerSeat) * 12 * seats;
}
