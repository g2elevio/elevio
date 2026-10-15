# Preparação local

## Pré-requisitos

- Node.js 22.12 ou superior (`node -v`). O Vitest 5 não roda em versões anteriores.
- pnpm 10 (`corepack enable` ativa a versão de `packageManager`).
- PostgreSQL só é necessário a partir da captura de leads.

## Primeira execução

```bash
pnpm install
pnpm dev
```

Abra http://localhost:3000. O pnpm pode avisar sobre scripts de build ignorados (`esbuild`, `sharp`); a base funciona sem aprová-los.

Variáveis de ambiente ficam em `.env.local` (ignorado pelo Git), a partir de `.env.example`:

| Variável | Uso | Obrigatória hoje |
|---|---|---|
| `DATABASE_URL` | Conexão PostgreSQL da aplicação | Não (só com a tabela de leads) |
| `DATABASE_URL_UNPOOLED` | Conexão direta para migrations, se o provedor exigir | Não |
| `LOG_LEVEL` | Nível do Pino (padrão `info`) | Não |

## Banco

1. Use um PostgreSQL local (por exemplo `docker run -e POSTGRES_PASSWORD=dev -p 5432:5432 postgres:17`) ou um banco de desenvolvimento no provedor escolhido. Nunca use o banco de produção para testes.
2. Defina `DATABASE_URL=postgres://...` em `.env.local`.
3. Depois de mudar o schema em `src/db/schema/`, rode `pnpm db:generate`, revise o SQL em `drizzle/` e aplique com `pnpm db:migrate`.

## Verificar

```bash
pnpm check
```

Roda lint, tipos, self-check das regras, testes e build. Nenhum desses passos conecta ao banco; o teste com banco real será documentado junto da captura de leads.

## Agentes

Leia [AGENTS.md](../AGENTS.md). [CLAUDE.md](../CLAUDE.md) importa as mesmas instruções. Consulte [setup.md](setup.md) para skills locais, integrações e escopos configurados. O Claude Code pede confiança para o servidor Context7 de `.mcp.json` na primeira abertura; se você já tiver o Context7 global, pode recusar o do projeto.

## Dificuldades conhecidas

- `tsc` reclama de `LayoutProps` ou `PageProps` inexistentes: os tipos de rota ainda não foram gerados. Use `pnpm typecheck` (que roda `next typegen` antes) ou `pnpm dev`/`pnpm build`.
