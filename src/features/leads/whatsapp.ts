import { site } from "@/lib/site";

export const WHATSAPP_URL = `https://wa.me/${site.whatsappNumber}`;

export function buildWhatsappUrl(lead: { name: string; segment: string }) {
  const text = `Olá! Sou ${lead.name}, do segmento ${lead.segment}. Acabei de pedir meu diagnóstico gratuito pelo site.`;
  return `${WHATSAPP_URL}?text=${encodeURIComponent(text)}`;
}
