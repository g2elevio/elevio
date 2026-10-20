# Qualidade

## Comandos

| Comando | O que prova |
|---|---|
| `pnpm lint` | ESLint com presets Next (core web vitals e TypeScript) e regras locais |
| `pnpm typecheck` | Gera os tipos de rota do Next (`next typegen`) e roda `tsc --noEmit` em modo strict |
| `pnpm lint:rules` | Self-check das regras em `eslint-rules/` (cada regra dispara e aceita os casos esperados) |
| `pnpm test` | Vitest em Node: validação de ambiente sem vazar valores, redação de logs, ciclo de vida do pool |
| `pnpm build` | Build de produção do Next, incluindo geração estática |
| `pnpm check` | Todos os anteriores, em sequência |

Rode `pnpm check` antes de entregar qualquer mudança. Durante o trabalho, `pnpm test:watch` ou `pnpm vitest run caminho/do/teste` para um teste específico.

## Regras de base

- TypeScript strict e presets oficiais do Next.
- Teto de 350 linhas por arquivo.
- Logger estruturado no servidor; sem `console` direto. Dados de leads nunca vão para logs.
- `src/app` e `src/components` não importam o cliente de banco.
- Drizzle: `update`/`delete` exigem `where`; revisar queries e SQL gerado.
- Entradas e ambiente validados com Zod; erros públicos sem detalhes internos.

## Estratégia de testes

- Lógica pura com regra de negócio ganha testes Vitest. Hoje: telefone brasileiro e `leadSchema` (`validation.test.ts`); Server Action com repositório mockado (`actions.test.ts`): gravação com consentimento, link `wa.me`, erros por campo com valores preservados, honeypot e falha de banco sem dados pessoais no log. O cálculo do simulador entra com ele. Keep-alive do Supabase (`keepalive.test.ts`): rejeita `DATABASE_URL` ausente sem conectar, executa a consulta e fecha a conexão também em caso de erro.
- A gravação real não tem teste automatizado: foi verificada contra um PostgreSQL 16 local com navegador (ver [setup.md](setup.md)). Repita esse roteiro, descrito em [onboarding.md](onboarding.md#verificar), ao mudar schema ou action.
- Testes de DOM e E2E entram quando os fluxos de formulário e simulador existirem e precisarem deles.
- Critérios de produto (Lighthouse 90+, 360 px, teclado, contraste AA) são verificados manualmente ou com Lighthouse até haver automação.

## Revisão após implementação ou correção

Ao concluir um ciclo de implementação ou correção, sugira de 3 a 8 ciclos posteriores de code review, com quantidade proporcional ao risco, focos complementares e prompt de continuação preenchido. Essa faixa é convenção do projeto; revisões adicionais dependem de pedido do usuário.

Cada ciclo verifica o estado atual e o código conectado, registra achados com severidade, local e evidência e reavalia correções autorizadas com os checks afetados. Termine com verificação integrada e riscos residuais.

## Dependências e entrega

Rode `pnpm audit --prod` (dependências de produção) e `pnpm audit` (todas). O estado atual está em [setup.md](setup.md). Lint e build aprovados não significam auditoria zerada.

O workflow `Migrar banco` (`.github/workflows/db-migrate.yml`) só roda manualmente e só aplica migrations; não é um check de CI.

Checks são comandos explícitos. Hooks Git, bloqueios de push e exigências de branch não fazem parte do padrão.
