# Preparação local

## Pré-requisitos

- Node.js 22.12 ou superior (`node -v`). O Vitest 5 não roda em versões anteriores.
- pnpm 10 (`corepack enable` ativa a versão de `packageManager`).
- PostgreSQL é necessário só para enviar o formulário de diagnóstico; checks e navegação funcionam sem banco.

## Primeira execução

```bash
pnpm install
pnpm dev
```

Abra http://localhost:3000. O pnpm pode avisar sobre scripts de build ignorados (`esbuild`, `sharp`); a base funciona sem aprová-los.

Variáveis de ambiente ficam em `.env.local` (ignorado pelo Git), a partir de `.env.example`:

| Variável | Uso | Obrigatória hoje |
|---|---|---|
| `DATABASE_URL` | Conexão PostgreSQL da aplicação | Para enviar o formulário |
| `DATABASE_URL_UNPOOLED` | Conexão direta para migrations, se o provedor exigir | Não |
| `LOG_LEVEL` | Nível do Pino (padrão `info`) | Não |
| `GA_MEASUREMENT_ID` | ID de medição do GA4 (`G-...`), lido no build. Vazio desliga Google Analytics, aviso de cookies e o trecho de analytics da política | Não; defina na Netlify (escopo Builds) para ativar |
| `SITE_URL` | Endereço público usado em Open Graph, sitemap e dados estruturados | Sim na Netlify (o fallback automático só existe na Vercel); localmente, `http://localhost:3000`. Use o domínio próprio |

## Banco

### Local

1. Suba um PostgreSQL (por exemplo `docker run -e POSTGRES_PASSWORD=dev -p 5432:5432 postgres:17`).
2. Defina `DATABASE_URL=postgresql://postgres:dev@localhost:5432/postgres` em `.env.local`.
3. Rode `pnpm db:migrate` para criar a tabela `leads`.

Depois de mudar o schema em `src/db/schema/`, rode `pnpm db:generate`, revise o SQL em `drizzle/` e aplique com `pnpm db:migrate`.

### Supabase (produção)

1. Crie um projeto no plano gratuito. Em **Connect**, copie duas strings de conexão do pooler (Supavisor):
   - **Transaction pooler** (porta 6543) para `DATABASE_URL`: é a indicada para funções serverless, como as da Netlify.
   - **Session pooler** (porta 5432) para `DATABASE_URL_UNPOOLED`: usada pelo `pnpm db:migrate`. A conexão direta (`db.<projeto>.supabase.co`) só aceita IPv6 no plano gratuito.
2. Acrescente `?uselibpqcompat=true&sslmode=require` às duas URLs. Com só `sslmode=require`, o driver `pg` atual exige verificação completa do certificado e falha contra a CA do Supabase. Para verificação completa, baixe o certificado do painel e use `sslmode=verify-full&sslrootcert=...`.
3. Aplique a migration no projeto, de um destes jeitos:
   - **Pelo GitHub (sem rodar nada localmente):** em Settings → Secrets and variables → Actions do repositório, crie o secret `DATABASE_URL_UNPOOLED` com a URL do Session pooler (senha preenchida e o sufixo do passo 2). Depois, em Actions → **Migrar banco** → Run workflow.
   - **Localmente:** `DATABASE_URL_UNPOOLED=... pnpm db:migrate` (ou com as URLs em `.env.local`).

   Confira, no Table Editor, que `leads` aparece com RLS ligado. Rode o mesmo passo a cada nova migration.
4. Configure `DATABASE_URL` nas variáveis de ambiente do host. Nunca exponha as URLs em `NEXT_PUBLIC_*`.
5. Os leads ficam no Table Editor do Supabase (tabela `leads`, ordene por `created_at`).

A tabela tem RLS ligado e nenhuma política, de propósito: a chave pública (anon) do Supabase não consegue ler os leads. Não crie políticas para `anon`.

## Verificar

```bash
pnpm check
```

Roda lint, tipos, self-check das regras, testes e build. Nenhum desses passos conecta ao banco: os testes da Server Action usam o repositório mockado.

Para conferir o fluxo completo com banco: `pnpm db:migrate`, `pnpm build && pnpm start`, envie o formulário em http://localhost:3000/#diagnostico e confira o registro em `leads`. O navegador deve abrir `wa.me/5545999968287` com nome e segmento na mensagem.

## Agentes

Leia [AGENTS.md](../AGENTS.md). [CLAUDE.md](../CLAUDE.md) importa as mesmas instruções. Consulte [setup.md](setup.md) para skills locais, integrações e escopos configurados. O Claude Code pede confiança para o servidor Context7 de `.mcp.json` na primeira abertura; se você já tiver o Context7 global, pode recusar o do projeto.

## Dificuldades conhecidas

- `tsc` reclama de `LayoutProps` ou `PageProps` inexistentes: os tipos de rota ainda não foram gerados. Use `pnpm typecheck` (que roda `next typegen` antes) ou `pnpm dev`/`pnpm build`.
