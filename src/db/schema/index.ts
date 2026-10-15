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
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
}).enableRLS();

export type NewLead = typeof leads.$inferInsert;
