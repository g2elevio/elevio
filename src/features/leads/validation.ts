import { z } from "zod";
import { CHALLENGES, SEGMENTS } from "./options";

// DDDs em uso no Brasil (Anatel).
const VALID_DDDS = new Set([
  11, 12, 13, 14, 15, 16, 17, 18, 19, 21, 22, 24, 27, 28, 31, 32, 33, 34, 35, 37, 38,
  41, 42, 43, 44, 45, 46, 47, 48, 49, 51, 53, 54, 55, 61, 62, 63, 64, 65, 66, 67, 68, 69,
  71, 73, 74, 75, 77, 79, 81, 82, 83, 84, 85, 86, 87, 88, 89, 91, 92, 93, 94, 95, 96, 97, 98, 99,
]);

/** Normaliza um telefone brasileiro para 55 + DDD + número, ou null se inválido. */
export function normalizeBrazilianPhone(value: string): string | null {
  let digits = value.replace(/\D/g, "");
  if ((digits.length === 12 || digits.length === 13) && digits.startsWith("55")) digits = digits.slice(2);
  if (!VALID_DDDS.has(Number(digits.slice(0, 2)))) return null;
  const number = digits.slice(2);
  const isMobile = number.length === 9 && number.startsWith("9");
  const isLandline = number.length === 8 && /^[2-5]/.test(number);
  return isMobile || isLandline ? `55${digits}` : null;
}

export const leadSchema = z.object({
  name: z.string().trim().min(2, "Informe seu nome.").max(100, "Use no máximo 100 caracteres."),
  whatsapp: z.string().transform((value, ctx) => {
    const normalized = normalizeBrazilianPhone(value);
    if (!normalized) {
      ctx.addIssue({ code: "custom", message: "Informe um WhatsApp válido com DDD, como (45) 99999-9999." });
      return z.NEVER;
    }
    return normalized;
  }),
  segment: z.enum(SEGMENTS, { error: "Escolha o segmento da sua empresa." }),
  challenge: z.enum(CHALLENGES, { error: "Escolha a principal dificuldade." }),
  consent: z.literal("on", { error: "Precisamos do seu consentimento para entrar em contato." }),
});

export type LeadInput = z.output<typeof leadSchema>;
export type LeadField = keyof z.input<typeof leadSchema>;

export type LeadFormState =
  | { status: "idle" }
  | {
      status: "error";
      message: string;
      fieldErrors: Partial<Record<LeadField, string>>;
      values: Partial<Record<Exclude<LeadField, "consent">, string>>;
    }
  | { status: "success"; whatsappUrl: string };
