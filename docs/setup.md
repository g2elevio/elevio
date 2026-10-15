# Setup e evidências

## Origem e contexto

- Data: 15 de outubro de 2026.
- Toolkit: [Vibe Coding Toolkit](https://github.com/soumatheusgomes/vibe-coding-toolkit), revisão `f13bb354363dafef8ce8d8f605856cc9e1cc52cc`, prompt 11 (bootstrap Next.js). Todos os templates vieram dessa revisão.
- Executado por Claude Code em um container de nuvem efêmero (Linux, Node.js 22.22.0, pnpm 10.28.0), não na máquina do desenvolvedor. Por isso, plugins e integrações globais do cliente (Ponytail, Caveman, Superpowers, RTK, Graphify) não puderam ser conferidos onde o projeto será usado; ficam como pendências abaixo.
- Modelo e autenticação: os da sessão, sem delegação a subagentes.

## Decisões e fontes

| Decisão | Motivo e fonte |
|---|---|
| `create-next-app@16.4.2` (canal `latest`) | Versão estável no registry npm em 15/10/2026; flags conferidas com `--help`. Sem React Compiler e Cache Components (não exigidos pelo produto) |
| pnpm | Projeto novo e pnpm disponível, conforme o toolkit |
| `@types/node@22` e `engines.node >=22.12.0` | Vitest 5.0.5 exige Node `^22.12 \|\| ^24 \|\| >=26` e `@types/node ^22 \|\| >=24` (peer dependencies no registry) |
| `@next/env@16.4.2` | Alinhado à versão do Next, como pede o toolkit |
| Drizzle + PostgreSQL mantidos | O produto exige leads em lugar consultável; padrão do toolkit atende com provedor de plano gratuito |
| Schema sem tabelas | O toolkit proíbe tabelas fictícias; a tabela `leads` entra com a captura de leads |
| Perfil ESLint completo (`next-app.config.mjs`) | Há persistência e logger |
| `.gitignore`: `!.env.example` e `graphify-out/` | O scaffold ignorava `.env*`, o que impediria versionar `.env.example` |
| `typecheck` roda `next typegen` antes do `tsc` | Num checkout limpo, `LayoutProps` (tipo gerado pelo Next) não existe e o `tsc` falhava; observado ao validar o clone do repositório |
| `globals.css` usa `--font-sans` | O scaffold carregava Geist mas aplicava Arial no `body` |
| Página inicial trocada por um marcador em pt-BR | Remover conteúdo de exemplo do scaffold sem antecipar seções do MVP |
| Context7 em `.mcp.json` (HTTP, sem token) | Sem conexão Context7 verificável neste ambiente; arquivo do template do toolkit |

Documentação oficial consultada: [instalação Next](https://nextjs.org/docs/app/getting-started/installation), [CLI create-next-app](https://nextjs.org/docs/app/api-reference/cli/create-next-app), [Drizzle PostgreSQL](https://orm.drizzle.team/docs/get-started-postgresql) e metadados do registry npm. O Context7 não foi consultado (bloqueado pela rede deste ambiente, ver Verificações).

## Componentes

| Componente | Ação e motivo | Escopo | Estado e evidência |
|---|---|---|---|
| Next.js 16.4.2, React 19.3.0, Tailwind 4.3.3, TypeScript 5.9.3, ESLint 9.39.5 | Scaffold oficial | Projeto | Validado: `pnpm check` aprovado |
| drizzle-orm 0.45.4, pg 8.23.1, zod 4.6.7, pino 10.4.0, server-only, clsx, tailwind-merge | Núcleo padrão | Projeto | Validado por testes e build |
| drizzle-kit 0.31.11, vitest 5.0.5, eslint-plugin-drizzle 0.2.3, @types/pg | Núcleo de desenvolvimento | Projeto | Validado |
| `templates/next/` | Copiado sem o sufixo `.example`, `.env.example` preservado | Projeto | Validado: 8 testes passam |
| `eslint-rules/` e `scripts/verify-quality-rules.mjs` | Pasta completa copiada | Projeto | Validado: `pnpm lint:rules` ok nas três regras |
| Skills Vercel (8) + `find-skills` | `skills@1.7.2 add ... --agent codex claude-code`; catálogo conferido com `--list` e igual ao do toolkit | Projeto (`.agents/skills/`, links relativos em `.claude/skills/`, `skills-lock.json`) | Arquivos presentes; descoberta pelo cliente pendente |
| Context7 | `.mcp.json` com o servidor HTTP oficial | Projeto (Claude Code) | Configurado sem execução |
| Graphify | `.graphifyignore` copiado; `graphify-out/` ignorado | Projeto | CLI ausente neste ambiente; grafo pendente |
| Ponytail, Caveman, Superpowers, RTK | Acordos registrados em `AGENTS.md` | Cliente do desenvolvedor | Pendente: conferir na máquina de uso |

Skills instaladas: `vercel-react-best-practices`, `vercel-composition-patterns`, `web-design-guidelines`, `writing-guidelines`, `vercel-react-view-transitions`, `vercel-optimize`, `deploy-to-vercel`, `vercel-cli-with-tokens` (de `vercel-labs/agent-skills`) e `find-skills` (de `vercel-labs/skills`). `vercel-react-native-skills` não foi instalada: o produto é só web.

## Documentação criada

`PRODUCT.md`, `README.md`, `AGENTS.md` (preserva o bloco gerado pelo Next no topo), `CLAUDE.md` (uma linha, `@AGENTS.md`), `docs/architecture.md`, `docs/design.md`, `docs/onboarding.md`, `docs/quality.md` e este arquivo. Não havia documentos anteriores além dos gerados pelo scaffold.

## Verificações

| Item | Estado | Evidência |
|---|---|---|
| `pnpm lint` | Validado | Sem erros |
| `pnpm typecheck` | Validado | Sem erros, também em checkout limpo (`pnpm install --frozen-lockfile` + `pnpm check`) |
| `pnpm lint:rules` | Validado | `max-lines`, `no-direct-console`, `no-direct-data-access`: ok |
| `pnpm test` | Validado | 3 arquivos, 8 testes aprovados (mocks; sem banco real) |
| `pnpm build` | Validado | Rotas `/` e `/_not-found` estáticas |
| `pnpm db:generate` | Validado | "0 tables, nothing to migrate", sem conexão |
| HTTP | Validado | `pnpm start -p 3457`: HTTP 200, `lang="pt-BR"`, título da Elevio; processo encerrado |
| `pnpm audit --prod` | Validado | Nenhuma vulnerabilidade conhecida |
| `pnpm audit` (dev) | Pendente | 2 advisories só em desenvolvimento: `esbuild <=0.24.2` (moderado, via `drizzle-kit > @esbuild-kit`; afeta o servidor de dev do esbuild, que o projeto não usa) e `braces <=3.0.3` (alto, via `eslint-config-next > fast-glob > micromatch`; sem versão corrigida publicada). Nenhum downgrade forçado |
| Banco real e migrations | Pendente | Sem banco autorizado; o schema ainda não tem tabelas |
| Context7 | Configurado sem execução | Chamada ao `mcp.context7.com` bloqueada pelo proxy deste ambiente (HTTP 403) |
| Descoberta das skills pelo cliente | Pendente | Arquivos e links presentes; abrir uma sessão nova do Claude Code ou Codex no projeto para conferir |
| Graphify | Pendente | CLI não instalada neste ambiente; rodar `GRAPHIFY_NO_AUTO_REFRESH=1 graphify extract . --code-only --no-cluster` onde existir |

Recursos temporários: o servidor de validação na porta 3457 foi encerrado. Nenhum banco ou serviço externo foi criado.

## Captura de leads (15/10/2026)

| Item | Estado | Evidência |
|---|---|---|
| Migration `0000_create_leads.sql` | Validado em PostgreSQL 16 local | `pnpm db:migrate` aplicado; `\d leads` mostra as 8 colunas e "row security enabled" |
| Fluxo do formulário | Validado em PostgreSQL 16 local | Playwright a 360 px: envio inválido mostra 4 erros por campo e mantém nome/telefone digitados; envio válido grava 1 linha com telefone `5545999968287`, consentimento e horário, e navega para `wa.me/5545999968287?text=Olá! Sou Maria Teste, do segmento Odontologia...` |
| Supabase | Pendente | Projeto ainda não criado; migration não aplicada em produção |
| Evento de conversão no analytics | Pendente | Depende dos IDs de GA4 e Meta Pixel |

Recursos temporários: o cluster PostgreSQL local e o servidor da porta 3458 foram encerrados.

## Pendências e próxima entrega

- Decisões externas do produto: ver a tabela de pendências em [PRODUCT.md](../PRODUCT.md#hipóteses-e-pendências) (WhatsApp, banco, CNPJ, fundadores, premissas do simulador, política de privacidade, IDs de analytics, identidade visual, FAQ).
- Ferramentas do cliente: conferir Ponytail, Caveman, Superpowers, RTK, Graphify e Context7 na máquina de uso e atualizar a tabela de componentes.
- Próxima entrega: hero e botão flutuante de WhatsApp (ver [PRODUCT.md](../PRODUCT.md#próxima-entrega)).
- Code review sugerido para a captura de leads: 4 ciclos, por envolver dados pessoais e LGPD. Focos: (1) validação e segurança da Server Action, (2) LGPD e logs, (3) acessibilidade do formulário, (4) integração e checks. Prompt: "Faça 4 ciclos de code review da captura de leads: validação/segurança da Server Action, LGPD e ausência de dados pessoais em logs, acessibilidade do formulário e integração final. Rode `pnpm check` a cada correção."
