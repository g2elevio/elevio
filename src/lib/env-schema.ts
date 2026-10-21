import { z } from "zod";

export const databaseUrlSchema = z.string().refine((value) => {
  try {
    const url = new URL(value);
    return ["postgres:", "postgresql:"].includes(url.protocol) && Boolean(url.hostname);
  } catch {
    return false;
  }
});

export const siteUrlSchema = z.url({ protocol: /^https?$/ });

// ID de medição do GA4: público por natureza (vai no HTML), por isso não precisa de NEXT_PUBLIC_.
export const gaMeasurementIdSchema = z.string().regex(/^G-[A-Z0-9]+$/).optional();

export const logLevelSchema = z.enum(["trace", "debug", "info", "warn", "error", "fatal", "silent"]).default("info");

export function parseEnv<T>(key: string, value: unknown, schema: z.ZodType<T>): T {
  const result = schema.safeParse(value);
  // Zod issues can include input values; expose only the variable name.
  if (!result.success) throw new Error(`Invalid or missing environment variable: ${key}`);
  return result.data;
}
