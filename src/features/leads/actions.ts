"use server";

import { logger } from "@/lib/logger";
import { CONSENT_TEXT } from "./options";
import { saveLead } from "./repository";
import { leadSchema, type LeadField, type LeadFormState } from "./validation";
import { buildWhatsappUrl, WHATSAPP_URL } from "@/lib/whatsapp";

const TEXT_FIELDS = ["name", "whatsapp", "segment", "challenge"] as const;

export async function submitLead(_previous: LeadFormState, formData: FormData): Promise<LeadFormState> {
  // Campo invisível para pessoas; robôs que o preenchem não geram lead.
  if (formData.get("website")) return { status: "success", whatsappUrl: WHATSAPP_URL };

  const raw = Object.fromEntries(TEXT_FIELDS.map((field) => [field, String(formData.get(field) ?? "")]));

  const parsed = leadSchema.safeParse({ ...raw, consent: formData.get("consent") ?? undefined });
  if (!parsed.success) {
    const fieldErrors: Partial<Record<LeadField, string>> = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0] as LeadField;
      fieldErrors[field] ??= issue.message;
    }
    return { status: "error", message: "Confira os campos destacados.", fieldErrors, values: raw };
  }

  const lead = parsed.data;
  try {
    await saveLead({
      name: lead.name,
      whatsapp: lead.whatsapp,
      segment: lead.segment,
      challenge: lead.challenge,
      consentText: CONSENT_TEXT,
      consentedAt: new Date(),
    });
  } catch (error) {
    logger.error({ code: (error as { code?: string }).code }, "Failed to save lead");
    return {
      status: "error",
      message: "Não conseguimos registrar seu pedido agora. Tente de novo ou fale direto pelo WhatsApp.",
      fieldErrors: {},
      values: raw,
    };
  }

  return { status: "success", whatsappUrl: buildWhatsappUrl(lead) };
}
