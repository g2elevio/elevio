import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

// RLS ligado e sem políticas: a API pública do Supabase não lê nem grava esta tabela.
// A aplicação conecta como dona da tabela e não é afetada.
export const leads = pgTable("leads", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  whatsapp: text("whatsapp").notNull(),
  segment: text("segment").notNull(),
  challenge: text("challenge").notNull(),
  consentText: text("consent_text").notNull(),
  consentedAt: timestamp("consented_at", { withTimezone: true }).notNull(),
  // Origem vinda do link (UTM). Opcional. O CRM (elevio-crm) copia estas colunas: avise antes de mudar.
  utmSource: text("utm_source"),
  utmMedium: text("utm_medium"),
  utmCampaign: text("utm_campaign"),
  utmContent: text("utm_content"),
  utmTerm: text("utm_term"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
}).enableRLS();

export type NewLead = typeof leads.$inferInsert;
