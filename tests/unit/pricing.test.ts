import { describe, expect, it } from "vitest";

import { annualSavings, quoteSeats } from "@/lib/pricing";

describe("quoteSeats", () => {
  it("bills team seats and never client guests", () => {
    const withGuests = quoteSeats(8, 40, "annual");
    const withoutGuests = quoteSeats(8, 0, "annual");
    expect(withGuests.monthly).toBe(withoutGuests.monthly);
    expect(withGuests.monthly).toBe(96);
  });

  it("uses the month-to-month rate when billed monthly", () => {
    expect(quoteSeats(5, 0, "monthly")).toMatchObject({ perSeat: 15, monthly: 75, yearly: 900 });
  });

  it("rejects impossible seat counts", () => {
    expect(() => quoteSeats(0, 0, "annual")).toThrow(RangeError);
    expect(() => quoteSeats(2.5, 0, "annual")).toThrow(RangeError);
    expect(() => quoteSeats(3, -1, "annual")).toThrow(RangeError);
  });
});

describe("annualSavings", () => {
  it("is $36 per seat per year", () => {
    expect(annualSavings(1)).toBe(36);
    expect(annualSavings(10)).toBe(360);
  });
});
