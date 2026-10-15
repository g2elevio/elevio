import { describe, expect, it } from "vitest";
import { leadSchema, normalizeBrazilianPhone } from "./validation";

describe("normalizeBrazilianPhone", () => {
  it.each([
    ["(45) 99996-8287", "5545999968287"],
    ["45999968287", "5545999968287"],
    ["+55 45 99996-8287", "5545999968287"],
    ["(11) 3456-7890", "551134567890"],
  ])("accepts %s", (input, expected) => {
    expect(normalizeBrazilianPhone(input)).toBe(expected);
  });

  it.each([
    ["99996-8287", "missing DDD"],
    ["(20) 99996-8287", "unused DDD"],
    ["(45) 89996-8287", "9-digit number not starting with 9"],
    ["(45) 9996-828", "too short"],
    ["(45) 6996-8287", "8-digit number that is not a landline"],
    ["", "empty"],
  ])("rejects %s (%s)", (input) => {
    expect(normalizeBrazilianPhone(input)).toBeNull();
  });
});

describe("leadSchema", () => {
  const valid = {
    name: "  Maria Souza ",
    whatsapp: "(45) 99996-8287",
    segment: "Odontologia",
    challenge: "Atendimento lento no WhatsApp",
    consent: "on",
  };

  it("trims the name and normalizes the WhatsApp", () => {
    expect(leadSchema.parse(valid)).toMatchObject({ name: "Maria Souza", whatsapp: "5545999968287" });
  });

  it("requires consent", () => {
    const result = leadSchema.safeParse({ ...valid, consent: undefined });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0]?.path).toEqual(["consent"]);
  });

  it("rejects segments and challenges outside the offered options", () => {
    const result = leadSchema.safeParse({ ...valid, segment: "Hacker", challenge: "" });
    expect(result.error?.issues.map((issue) => issue.path[0])).toEqual(["segment", "challenge"]);
  });
});
