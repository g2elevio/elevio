# Elevio

Site institucional da Elevio, empresa de soluções digitais para pequenas e médias empresas. O visitante entende o que a Elevio resolve, simula o ganho com automação e pede um diagnóstico gratuito pelo formulário ou pelo WhatsApp. Escopo completo em [PRODUCT.md](PRODUCT.md).

## Executar

Requer Node.js 22.12 ou superior e pnpm 10.

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm check        # lint, tipos, regras locais, testes e build
```

A página atual não precisa de banco nem de credenciais. A gravação de leads (próxima entrega) usa PostgreSQL via `DATABASE_URL` em `.env.local`; veja [docs/onboarding.md](docs/onboarding.md).

## Documentação

- [Produto e escopo](PRODUCT.md).
- [Preparação local](docs/onboarding.md).
- [Estrutura e decisões técnicas](docs/architecture.md).
- [Design e acessibilidade](docs/design.md).
- [Checks de qualidade](docs/quality.md).
- [Instruções para agentes](AGENTS.md).
- [Setup e evidências](docs/setup.md).

## Próxima entrega

Captura de leads de ponta a ponta: tabela `leads`, Server Action com validação Zod e formulário que grava o lead e abre o WhatsApp com nome e segmento. Depende do número de WhatsApp comercial e de um banco PostgreSQL de desenvolvimento. Detalhes em [PRODUCT.md](PRODUCT.md#próxima-entrega).
