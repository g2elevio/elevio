<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Elevio

## Produto e stack

- Produto e escopo: `PRODUCT.md`. Site institucional em pt-BR, mobile-first, uma landing page focada em captar leads.
- Stack: Next.js 16.4 (App Router, Turbopack), React 19, TypeScript strict, Tailwind CSS 4, Drizzle ORM + PostgreSQL (`pg`), Zod, Pino, Vitest. Node.js 22.12+ e pnpm 10.
- Setup e validações: `docs/setup.md`.

## Comandos canônicos

- Instalar: `pnpm install`
- Desenvolver: `pnpm dev`
- Lint: `pnpm lint`
- Tipos: `pnpm typecheck`
- Regras locais de lint: `pnpm lint:rules`
- Testes: `pnpm test` (`pnpm test:watch` durante o desenvolvimento)
- Build: `pnpm build`
- Verificar base: `pnpm check`
- Banco: `pnpm db:generate` gera SQL sem conectar; `pnpm db:migrate` aplica somente em destino autorizado.

## Acordos de trabalho

- Leia código e instruções pertinentes antes de editar. Declare hipóteses que alterem comportamento ou escopo.
- Complete o pedido com a menor mudança suficiente. Reutilize padrões, componentes e dependências existentes.
- Preserve alterações locais, validação, tratamento de erros, segurança, acessibilidade e requisitos explícitos.
- Não crie abstrações, arquitetura, opções, dependências ou funcionalidades para necessidades não solicitadas.
- Execute checks adequados. Teste lógica relevante e regressões; mudanças triviais não precisam de testes que apenas reproduzem a implementação.
- Não transforme hipóteses em fatos ou integrações pendentes em resultados simulados.
- Continue trabalho já autorizado. Pergunte somente por informação indispensável ou por ação fora da autorização.
- Publicação, mensagens a terceiros, custos e ações destrutivas dependem de autorização pertinente. Instalar ferramentas não concede essa autorização.

## Regras do produto

- **Nunca invente números, depoimentos, logos de clientes ou cases.** Métricas só com fonte real. Valores ainda não fornecidos (WhatsApp, CNPJ, premissas do simulador, fundadores) ficam como pendência visível em `PRODUCT.md`, não como texto de exemplo publicado.
- Dados de leads (nome, WhatsApp) são dados pessoais: valide no servidor com Zod, grave com o registro de consentimento e nunca os escreva em logs.
- Desempenho é requisito: Server Components por padrão, componentes de cliente pequenos, scripts de analytics sem bloquear a renderização.

## Continuidade de execução

- Durante trabalho autorizado, responda a perguntas de status e retome as ações restantes. Pare se o usuário pedir pausa, cancelar ou mudar o objetivo.
- Um bloqueio impede só tarefas dependentes. Conclua as independentes que ainda forem seguras e autorizadas.
- Se um agente falhar ou ficar com estado incerto, confirme que parou antes de assumir seus arquivos e retome do ponto verificado.
- Não repita tentativa idêntica sem evidência nova. Decisões anteriores não ampliam autorização.
- Sem alternativa segura, informe o bloqueio, o trabalho concluído e o que falta; não apresente pendência como resultado.

## Padrões e documentação

- Persistência: Drizzle ORM + PostgreSQL com `pg` (runtime Node.js). Schema em `src/db/schema/`, SQL em `drizzle/`, conexão única em `src/db/index.ts` (pool limitado e lazy).
- Gere e revise SQL antes de aplicar migrations em destino autorizado; não migre no build ou por request.
- Valide entradas e ambiente com Zod. Use o logger Pino (`@/lib/logger`) no servidor. Apresentação (`src/app`, `src/components`) chama módulos da funcionalidade, sem importar o cliente de banco.
- Prefira tipos inferidos, consultas parametrizadas, projeções explícitas, listagens limitadas e DTOs seguros.
- Consulte fontes oficiais atuais e o canal estável antes de alterar stack/APIs; registre fonte, motivo e resultado em `docs/setup.md`.
- `PRODUCT.md` guarda escopo; `docs/architecture.md`, estrutura e decisões; `docs/design.md`, interface; `docs/onboarding.md`, preparação; `docs/quality.md`, checks. Atualize o documento responsável junto da mudança.

## Ferramentas e estilo

- **Ponytail:** quando instalado no cliente, intensidade `full` para programação. `stop ponytail` desativa o modo.
- **Caveman:** conversa concisa em português, sem perder clareza. Código, documentação e commits com redação normal. `stop caveman` desativa o estilo.
- **Superpowers:** use skills pertinentes, com fluxo proporcional ao escopo. Instruções explícitas e execução já autorizada prevalecem sobre aprovações repetidas.
- **Context7:** documentação atual de APIs e bibliotecas (configurado em `.mcp.json` para Claude Code). Nunca envie segredos ou código privado. Se indisponível, use fontes oficiais e registre a limitação.
- **RTK:** use comandos suportados. Com hook nativo ativo, evite wrapper duplicado.
- **Graphify:** use o grafo existente quando ajudar em perguntas de estrutura; exclusões em `.graphifyignore`.
- **LLMs:** preserve cliente, modelo e autenticação da sessão. Não troque provedor nem ative API paga ou proxy silenciosamente.

Confira instalação e descoberta antes de depender de uma ferramenta; o estado verificado de cada uma está em `docs/setup.md`.

## Skills para Next.js

Instaladas em `.agents/skills/` (links em `.claude/skills/`), registradas em `skills-lock.json`:

- `vercel-react-best-practices`: ao escrever/revisar React/Next, dados e desempenho.
- `vercel-composition-patterns`: em decisões concretas de composição e API de componentes.
- `web-design-guidelines`: revisão de interface e acessibilidade antes de concluir mudanças de UI.
- `writing-guidelines`: revisão de documentação e prosa.
- `vercel-react-view-transitions`: transições solicitadas e compatíveis com as versões.
- `vercel-optimize`: otimização com métricas Vercel disponíveis.
- `deploy-to-vercel`: publicação/preview autorizados.
- `vercel-cli-with-tokens`: operações Vercel com esse método de autenticação escolhido.
- `find-skills`: descoberta quando faltar uma capacidade concreta.

Instalar skills não executa suas ações. Não force animações, cache, deploy ou mudanças de arquitetura só porque uma skill está disponível.

## Git e colaboração

- Não adicione bloqueios de push em `main`, exigência de branch/worktree ou hooks `pre-commit`/`pre-push`.
- Lint, tipos, testes e build são checks explícitos.
- Tarefas paralelas precisam de arquivos distintos e independência na mesma onda.

## Delegação e revisão

- Delegue somente quando isolamento de contexto, especialização ou paralelismo independente compensarem a coordenação.
- Cada tarefa delegada recebe objetivo, contexto mínimo, arquivos permitidos, aceite e checks. Um escritor por arquivo; o coordenador cuida de lockfile e configuração compartilhada.
- Verifique diff e checks antes de aceitar o resultado de um trabalhador.
- Após cada ciclo de implementação ou correção, sugira ao usuário de **3 a 8 ciclos posteriores de code review**, com quantidade e focos conforme risco e escopo, e um prompt copiável com os checks reais. A sugestão não autoriza executar novas rodadas automaticamente.

## Convenções e contexto

- Import alias `@/*` aponta para `src/*`.
- Utilitário de classes: `cn` em `src/lib/utils.ts`.
- Ambiente validado em `src/lib/env.ts` (servidor) com schemas em `src/lib/env-schema.ts`; segredos nunca em `NEXT_PUBLIC_*`.
