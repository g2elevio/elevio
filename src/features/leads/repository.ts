import "server-only";
import { getDb } from "@/db";
import { leads, type NewLead } from "@/db/schema";

export async function saveLead(lead: NewLead) {
  await getDb().insert(leads).values(lead);
}
