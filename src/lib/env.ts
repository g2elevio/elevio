import "server-only";
import { databaseUrlSchema, gaMeasurementIdSchema, logLevelSchema, parseEnv, siteUrlSchema } from "./env-schema";

export function getDatabaseUrl() {
  return parseEnv("DATABASE_URL", process.env.DATABASE_URL, databaseUrlSchema);
}

// Sem ID, o site não carrega o Google Analytics nem mostra o aviso de cookies.
export function getGaMeasurementId() {
  return parseEnv("GA_MEASUREMENT_ID", process.env.GA_MEASUREMENT_ID || undefined, gaMeasurementIdSchema);
}

export function getLogLevel() {
  return parseEnv("LOG_LEVEL", process.env.LOG_LEVEL, logLevelSchema);
}

// Endereço público do site para URLs absolutas (Open Graph, sitemap, JSON-LD).
// SITE_URL vence; na Vercel, sem domínio próprio, usa o domínio de produção do projeto.
export function getSiteUrl() {
  const vercelHost = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  const value = process.env.SITE_URL || (vercelHost ? `https://${vercelHost}` : "http://localhost:3000");
  return new URL(parseEnv("SITE_URL", value, siteUrlSchema));
}
