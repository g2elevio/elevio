import { beforeEach, expect, it, vi } from "vitest";
import { submitLead } from "./actions";
import { saveLead } from "./repository";
import { logger } from "@/lib/logger";

vi.mock("./repository", () => ({ saveLead: vi.fn() }));
vi.mock("@/lib/logger", () => ({ logger: { error: vi.fn() } }));

const idle = { status: "idle" } as const;

function form(fields: Record<string, string>) {
  const data = new FormData();
  for (const [key, value] of Object.entries(fields)) data.set(key, value);
  return data;
}

const valid = {
  name: "Maria Souza",
  whatsapp: "(45) 99996-8287",
  segment: "Odontologia",
  challenge: "Atendimento lento no WhatsApp",
  consent: "on",
};

beforeEach(() => vi.mocked(saveLead).mockReset());

it("saves the lead with the consent record and returns the prefilled WhatsApp link", async () => {
  const result = await submitLead(idle, form(valid));

  expect(saveLead).toHaveBeenCalledWith(
    expect.objectContaining({ name: "Maria Souza", whatsapp: "5545999968287", consentedAt: expect.any(Date) }),
  );
  expect(result.status).toBe("success");
  const url = new URL(result.status === "success" ? result.whatsappUrl : "");
  expect(url.origin + url.pathname).toBe("https://wa.me/5545999968287");
  expect(url.searchParams.get("text")).toContain("Maria Souza, do segmento Odontologia");
});

it("returns field errors and the typed values without saving", async () => {
  const result = await submitLead(idle, form({ ...valid, whatsapp: "123", consent: "" }));

  expect(saveLead).not.toHaveBeenCalled();
  expect(result).toMatchObject({
    status: "error",
    fieldErrors: { whatsapp: expect.any(String), consent: expect.any(String) },
    values: { name: "Maria Souza", whatsapp: "123" },
  });
});

it("ignores submissions that fill the hidden honeypot field", async () => {
  const result = await submitLead(idle, form({ ...valid, website: "spam.example" }));

  expect(saveLead).not.toHaveBeenCalled();
  expect(result.status).toBe("success");
});

it("logs database failures without personal data and asks the visitor to retry", async () => {
  vi.mocked(saveLead).mockRejectedValueOnce(Object.assign(new Error("connection refused"), { code: "ECONNREFUSED" }));

  const result = await submitLead(idle, form(valid));

  expect(result.status).toBe("error");
  expect(logger.error).toHaveBeenCalledWith({ code: "ECONNREFUSED" }, "Failed to save lead");
  expect(JSON.stringify(vi.mocked(logger.error).mock.calls)).not.toMatch(/Maria|99996/);
});
