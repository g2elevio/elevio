# Elevio

Site institucional da Elevio, empresa de soluções digitais para pequenas e médias empresas. O visitante entende o que a Elevio resolve, simula o ganho com automação e pede um diagnóstico gratuito pelo formulário ou pelo WhatsApp. Escopo completo em [PRODUCT.md](PRODUCT.md).

## Executar

Requer Node.js 22.12 ou superior e pnpm 10.

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm check        # lint, tipos, regras locais, testes e build
```

A página e os checks rodam sem banco. Para enviar o formulário de diagnóstico, configure um PostgreSQL em `DATABASE_URL` (`.env.local`) e aplique as migrations; veja [docs/onboarding.md](docs/onboarding.md).

## Documentação

- [Produto e escopo](PRODUCT.md).
- [Preparação local](docs/onboarding.md).
- [Estrutura e decisões técnicas](docs/architecture.md).
- [Design e acessibilidade](docs/design.md).
- [Checks de qualidade](docs/quality.md).
- [Instruções para agentes](AGENTS.md).
- [Setup e evidências](docs/setup.md).

## Próxima entrega

Sobre, FAQ e rodapé (aguardam dados da Elevio) e publicação na Vercel. Detalhes em [PRODUCT.md](PRODUCT.md#próxima-entrega).
