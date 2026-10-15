# Código e arquitetura

## Stack efetiva

| Peça | Versão observada | Observação |
|---|---|---|
| Next.js | 16.4.2 | App Router, Turbopack, `src/`, alias `@/*` |
| React / React DOM | 19.3.0 | |
| TypeScript | 5.9.3 | `strict` |
| Tailwind CSS | 4.3.3 | Via `@tailwindcss/turbopack` |
| Drizzle ORM / drizzle-kit | 0.45.4 / 0.31.11 | PostgreSQL, driver `pg` 8.23.1 |
| Zod | 4.6.7 | Ambiente e entradas |
| Pino | 10.4.0 | Logger do servidor |
| Vitest | 5.0.5 | Ambiente Node |
| Node.js | 22.12+ | Exigência do Vitest 5; `@types/node` 22 |
| pnpm | 10.28.0 | `packageManager` no `package.json` |

Versões exatas ficam no `pnpm-lock.yaml`.

## Mapa do código

```text
src/
├── app/
│   ├── layout.tsx      # HTML pt-BR, fontes Geist, metadata base
│   ├── page.tsx        # landing page (hoje: marcador "em construção")
│   └── globals.css     # Tailwind e tokens de cor
├── db/
│   ├── index.ts        # getDb(): pool pg lazy, limitado, reaproveitado no HMR
│   ├── index.test.ts   # ciclo de vida do pool, sem conexão real
│   └── schema/index.ts # schema Drizzle (ainda sem tabelas)
└── lib/
    ├── env-schema.ts   # schemas Zod de ambiente, erro sem vazar valores
    ├── env.ts          # leitura de ambiente (server-only)
    ├── logger.ts       # Pino com redação de segredos (server-only)
    ├── utils.ts        # cn() para classes Tailwind
    └── *.test.ts       # testes de ambiente e redação de logs
eslint-rules/           # regras locais de qualidade e baseline Next
scripts/verify-quality-rules.mjs
drizzle.config.ts       # geração de SQL em drizzle/
vitest.config.mts
```

`drizzle/` passa a existir quando a primeira tabela for gerada.

## Fronteiras e fluxo

O fluxo planejado para o MVP (ainda não implementado):

1. A landing page é composta por Server Components estáticos. Simulador, formulário, acordeão do FAQ e disparo de eventos de analytics são os únicos componentes de cliente.
2. O formulário envia para uma Server Action em um módulo da funcionalidade de leads. Ela valida com Zod, grava via `getDb()` e devolve um resultado seguro (sem dados internos).
3. O cliente, ao receber sucesso, abre `wa.me` com a mensagem pré-preenchida e dispara os eventos de conversão.

Regras já aplicadas pelo lint: arquivos em `src/app` e `src/components` não importam `@/db`; `console` direto é proibido (usar o logger no servidor); `update`/`delete` do Drizzle exigem `where`.

## Dados e migrations

- Schema em `src/db/schema/`, sem tabelas até a entrega de captura de leads. Tipos derivados com `$inferSelect`/`$inferInsert`.
- `getDb()` valida `DATABASE_URL` e só cria o pool (máx. 5 conexões, timeouts curtos) no primeiro uso. Build, lint e testes não precisam de banco.
- `pnpm db:generate` gera SQL em `drizzle/` sem conectar. Revise o SQL e aplique com `pnpm db:migrate` só no destino autorizado; `DATABASE_URL_UNPOOLED` é usada para migrations quando o provedor exigir conexão direta.
- Em Vercel Functions, revisar a orientação vigente de pooling (`attachDatabasePool`) ao escolher o provedor.

## Decisões

| Decisão | Motivo | Alternativa | Revisar quando |
|---|---|---|---|
| PostgreSQL + Drizzle para leads | Requisito de "lugar consultável"; padrão do toolkit; provedores com plano gratuito | Google Sheets ou CRM via API | Se a equipe preferir operar os leads direto num CRM |
| Server Action em vez de rota de API | Um único formulário interno; menos código | Route Handler | Se outro cliente precisar enviar leads |
| Página estática com ilhas de cliente | Meta de LCP < 2,5 s em 4G | Página inteira como Client Component | Não previsto |
| Vercel como host preferido | Integração nativa com Next, plano gratuito | Netlify, Cloudflare Pages | Ao confirmar termos de uso comercial do plano gratuito |

Fonte dos defaults: Vibe Coding Toolkit, revisão registrada em [setup.md](setup.md).

## Manutenção

Atualize este mapa ao alterar diretórios, dependências relevantes, contratos ou fronteiras. Registre comportamento comprovado; o fluxo planejado acima vira descrição do implementado quando a captura de leads existir.
