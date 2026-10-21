// Scheduled Function (agenda em netlify.toml): mantém o projeto Supabase Free ativo.
// Roda só no deploy de produção publicado; previews e branch deploys não disparam o agendamento.
import { pingDatabase } from "../../src/db/keepalive";

export default async function supabaseKeepalive() {
  try {
    await pingDatabase();
    return new Response(null, { status: 204 });
  } catch (error) {
    // Só o código do erro: a mensagem do pg pode trazer host ou usuário da conexão.
    console.error("Supabase keep-alive failed", { code: (error as NodeJS.ErrnoException).code ?? "unknown" });
    return new Response(null, { status: 500 });
  }
}
