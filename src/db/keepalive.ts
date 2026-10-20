import { Client } from "pg";
// Imports relativos e sem server-only: este módulo também roda na Scheduled Function da Netlify, fora do Next.
import { databaseUrlSchema, parseEnv } from "../lib/env-schema";

// O Supabase Free pausa projetos sem atividade de usuário no banco por 7 dias. Uma leitura real numa tabela
// do app conta como atividade; a projeção constante não devolve dados pessoais.
export const KEEPALIVE_QUERY = "select 1 from leads limit 1";

export async function pingDatabase(databaseUrl = process.env.DATABASE_URL) {
  const client = new Client({
    connectionString: parseEnv("DATABASE_URL", databaseUrl, databaseUrlSchema),
    connectionTimeoutMillis: 5_000,
    query_timeout: 10_000,
  });
  await client.connect();
  try {
    await client.query(KEEPALIVE_QUERY);
  } finally {
    await client.end();
  }
}
