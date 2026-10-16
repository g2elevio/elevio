import { site } from "@/lib/site";

export const WHATSAPP_URL = `https://wa.me/${site.whatsappNumber}`;

function withText(text: string) {
  return `${WHATSAPP_URL}?text=${encodeURIComponent(text)}`;
}

export const WHATSAPP_CONTACT_URL = withText("Olá! Vim pelo site da Elevio e quero saber mais.");

export function buildWhatsappUrl(lead: { name: string; segment: string }) {
  return withText(
    `Olá! Sou ${lead.name}, do segmento ${lead.segment}. Acabei de pedir meu diagnóstico gratuito pelo site.`,
  );
}
