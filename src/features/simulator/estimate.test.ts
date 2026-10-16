import { describe, expect, it } from "vitest";
import { estimateSales } from "./estimate";

describe("estimateSales", () => {
  it("applies the automation uplift to the visitor's own conversion rate", () => {
    expect(estimateSales(100, 10)).toEqual({ withoutAutomation: 10, withAutomation: 12, extra: 2 });
    expect(estimateSales(500, 20)).toEqual({ withoutAutomation: 100, withAutomation: 120, extra: 20 });
  });

  it("keeps inputs inside the offered ranges", () => {
    expect(estimateSales(5000, 90)).toEqual(estimateSales(500, 50));
    expect(estimateSales(0, 0)).toEqual(estimateSales(10, 1));
    expect(estimateSales(100, Number.NaN)).toEqual(estimateSales(100, 1));
  });

  it("never shows fewer sales with automation", () => {
    for (let leads = 10; leads <= 500; leads += 10) {
      for (let rate = 1; rate <= 50; rate += 1) {
        expect(estimateSales(leads, rate).extra).toBeGreaterThanOrEqual(0);
      }
    }
  });
});
