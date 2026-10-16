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
│   ├── layout.tsx      # HTML pt-BR, fontes Geist, metadata base, botão flutuante de WhatsApp
│   ├── page.tsx        # landing page: hero, dores, serviços, como funciona, #diagnostico
│   └── globals.css     # Tailwind e tokens de cor
├── components/
│   ├── how-it-works.tsx # quatro passos (lista ordenada)
│   ├── pain-points.tsx # quatro dores comuns
│   ├── services.tsx    # seis serviços com benefícios
│   ├── hero.tsx        # hero com CTA e mockup do agente de IA no WhatsApp (HTML/CSS, sem imagem)
│   ├── lead-form.tsx   # formulário de diagnóstico (client, useActionState)
│   ├── whatsapp-button.tsx # botão fixo de WhatsApp, em todas as páginas
│   └── whatsapp-icon.tsx
├── db/
│   ├── index.ts        # getDb(): pool pg lazy, limitado, reaproveitado no HMR
│   ├── index.test.ts   # ciclo de vida do pool, sem conexão real
│   └── schema/index.ts # tabela leads (RLS ligado)
├── features/leads/
│   ├── options.ts      # segmentos, dificuldades e texto de consentimento
│   ├── validation.ts   # schema Zod, telefone brasileiro, tipos do estado do formulário
│   ├── repository.ts   # saveLead() (server-only, único ponto que grava leads)
│   ├── actions.ts      # Server Action submitLead
│   └── *.test.ts       # validação e Server Action (repositório mockado)
└── lib/
    ├── env-schema.ts   # schemas Zod de ambiente, erro sem vazar valores
    ├── env.ts          # leitura de ambiente (server-only)
    ├── logger.ts       # Pino com redação de segredos (server-only)
    ├── site.ts         # dados públicos da Elevio (WhatsApp)
    ├── whatsapp.ts     # links wa.me (contato geral e mensagem do lead)
    ├── utils.ts        # cn() para classes Tailwind
    └── *.test.ts       # testes de ambiente e redação de logs
drizzle/                # SQL versionado (0000_create_leads.sql)
eslint-rules/           # regras locais de qualidade e baseline Next
scripts/verify-quality-rules.mjs
drizzle.config.ts       # geração de SQL em drizzle/
vitest.config.mts
```

## Fronteiras e fluxo

Captura de leads (implementada):

1. A página é estática (Server Components: hero, seções de conteúdo, botão de WhatsApp). O único componente de cliente é `LeadForm`; simulador, acordeão do FAQ e analytics também serão ilhas de cliente.
2. `LeadForm` envia para `submitLead` via `useActionState`. A action descarta envios com o campo honeypot preenchido, valida com `leadSchema` e grava com `saveLead`, junto do texto de consentimento e do horário.
3. Em erro de validação, devolve mensagens por campo e os valores digitados (o React reinicia o formulário após a action; os valores voltam por `defaultValue`). Em falha de banco, registra só o código do erro e pede nova tentativa.
4. Em sucesso, o cliente navega para `wa.me/5545999968287` com nome e segmento na mensagem. O evento de conversão entra com a configuração de analytics.

Regras já aplicadas pelo lint: arquivos em `src/app` e `src/components` não importam `@/db`; `console` direto é proibido (usar o logger no servidor); `update`/`delete` do Drizzle exigem `where`.

## Dados e migrations

- Schema em `src/db/schema/`. Tabela `leads`: `id` (uuid), `name`, `whatsapp` (normalizado como 55 + DDD + número), `segment`, `challenge`, `consent_text`, `consented_at`, `created_at`. RLS ligado sem políticas: no Supabase, a API pública (chave anon) não acessa a tabela; a aplicação conecta como dona e não é afetada. Tipos derivados com `$inferInsert`.
- `getDb()` valida `DATABASE_URL` e só cria o pool (máx. 5 conexões, timeouts curtos) no primeiro uso. Build, lint e testes não precisam de banco.
- `pnpm db:generate` gera SQL em `drizzle/` sem conectar. Revise o SQL e aplique com `pnpm db:migrate` só no destino autorizado; `DATABASE_URL_UNPOOLED` é usada para migrations quando o provedor exigir conexão direta.
- Em Vercel Functions, revisar a orientação vigente de pooling (`attachDatabasePool`) ao escolher o provedor.

## Decisões

| Decisão | Motivo | Alternativa | Revisar quando |
|---|---|---|---|
| PostgreSQL + Drizzle para leads, no Supabase | Requisito de "lugar consultável"; padrão do toolkit; Supabase gratuito escolhido em 15/10/2026 e com painel para consultar os leads | Google Sheets ou CRM via API | Se a equipe preferir operar os leads direto num CRM |
| Server Action em vez de rota de API | Um único formulário interno; menos código | Route Handler | Se outro cliente precisar enviar leads |
| Segmento e dificuldade como listas fechadas | Mais rápido no celular e dados comparáveis para qualificar leads | Texto livre | Se muitos leads escolherem "Outro"/"Outra" |
| Honeypot em vez de captcha | Sem custo de conversão nem script de terceiros | Turnstile/reCAPTCHA | Se aparecer spam real |
| Página estática com ilhas de cliente | Meta de LCP < 2,5 s em 4G | Página inteira como Client Component | Não previsto |
| Vercel como host preferido | Integração nativa com Next, plano gratuito | Netlify, Cloudflare Pages | Ao confirmar termos de uso comercial do plano gratuito |

Fonte dos defaults: Vibe Coding Toolkit, revisão registrada em [setup.md](setup.md).

## Manutenção

Atualize este mapa ao alterar diretórios, dependências relevantes, contratos ou fronteiras. Registre comportamento comprovado.
