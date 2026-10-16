import { expect, it } from "vitest";
import { buildWhatsappUrl, WHATSAPP_CONTACT_URL } from "./whatsapp";

it("points every link to the Elevio business number with an encoded message", () => {
  const contact = new URL(WHATSAPP_CONTACT_URL);
  expect(contact.origin + contact.pathname).toBe("https://wa.me/5545999968287");
  expect(contact.searchParams.get("text")).toBe("Olá! Vim pelo site da Elevio e quero saber mais.");

  const lead = new URL(buildWhatsappUrl({ name: "Ana & Cia", segment: "Estética" }));
  expect(lead.searchParams.get("text")).toContain("Sou Ana & Cia, do segmento Estética.");
});
