import { expect, it } from "vitest";
import { readUtm } from "./utm";

it("reads the UTM parameters from the link", () => {
  const utm = readUtm(new URLSearchParams("utm_source=instagram&utm_medium=bio&utm_campaign=+lancamento+"));

  expect(utm).toEqual({
    utmSource: "instagram",
    utmMedium: "bio",
    utmCampaign: "lancamento",
    utmContent: null,
    utmTerm: null,
  });
});

it("drops empty, oversized and control-character values instead of failing", () => {
  const params = new URLSearchParams();
  params.set("utm_source", "   ");
  params.set("utm_medium", "x".repeat(101));
  params.set("utm_campaign", "a\u0000b");

  expect(readUtm(params)).toEqual({
    utmSource: null,
    utmMedium: null,
    utmCampaign: null,
    utmContent: null,
    utmTerm: null,
  });
});
