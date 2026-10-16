# Design e acessibilidade

## Direção

- Público: donos e gestores de PMEs, com pouco tempo e pouco conhecimento técnico, decidindo pelo celular.
- Idioma pt-BR, linguagem direta e sem jargão. Cada seção responde "o que eu ganho com isso".
- Mobile-first: o desenho parte de 360 px e cresce para desktop.
- Tom visual (direção, ainda não implementada): sóbrio e confiável, com destaque para os CTAs de diagnóstico. A identidade visual da Elevio (logo, cores, tipografia) está pendente em `PRODUCT.md`.
- Confiança vem de transparência, não de números: simulador com premissas visíveis, processo em quatro passos e pessoas reais na seção Sobre. Nenhuma métrica, depoimento ou logo sem fonte.

## Sistema existente

- Tokens de cor em `src/app/globals.css` (`--background`, `--foreground`, com variante escura por `prefers-color-scheme`). São os valores padrão do scaffold e serão substituídos pela identidade da Elevio.
- Fontes: Geist e Geist Mono via `next/font` em `src/app/layout.tsx`.
- Helper `cn` em `src/lib/utils.ts` para compor classes Tailwind.
- `src/components/hero.tsx`: título, subtítulo, CTA para `#diagnostico` e mockup de conversa no WhatsApp feito em HTML/CSS (sem imagem, para não pesar no LCP), com legenda de exemplo ilustrativo e falas identificadas para leitores de tela.
- `src/components/whatsapp-button.tsx`: botão fixo de 56 px no canto inferior direito, verde `emerald-700` com ícone branco e `aria-label`. A página tem respiro inferior (`pb-28`) para o botão não cobrir o envio do formulário.
- `src/components/lead-form.tsx`: formulário de diagnóstico. Campos com rótulo visível, erros por campo ligados via `aria-describedby`, `aria-invalid` nos campos com erro, mensagem geral com `role="alert"`, botão desabilitado durante o envio e checkbox de consentimento desmarcado. Cores provisórias (verde `emerald-700`) até a identidade visual.

## Interação

Use HTML semântico, navegação por teclado, foco visível e contraste AA. Dê nome a controles e campos. Erros de validação ficam junto do campo; o envio do formulário mostra estado de espera e bloqueia duplo envio. Respeite `prefers-reduced-motion`.

Requisitos específicos do MVP:

- FAQ em acordeão operável por teclado (preferir `<details>/<summary>` ou botão com `aria-expanded`).
- Slider do simulador com rótulo, valor anunciado e alternativa de digitação se o controle nativo não bastar.
- Botão flutuante de WhatsApp sempre visível no mobile, sem cobrir o botão de envio do formulário.
- Consentimento LGPD como checkbox desmarcado por padrão, com link para a política.

## Layout e revisão

- Breakpoints Tailwind padrão; nenhuma rolagem horizontal a partir de 360 px.
- Estados a cobrir: envio em andamento, erro de validação por campo, erro de servidor e sucesso (antes do redirecionamento ao WhatsApp).
- Revisão de UI: rodar a skill `web-design-guidelines` e o Lighthouse mobile (meta 90+ em Performance) antes de concluir cada seção.
- Verificado com Playwright a 360 px e 1280 px: sem rolagem horizontal, CTA do hero rola até o formulário, botão de WhatsApp visível no topo e no fim da página sem sobrepor o botão de envio. Ainda sem auditoria Lighthouse nem revisão `web-design-guidelines`.

## Manutenção

Mudanças visuais e de interação atualizam a fonte de tokens/componentes e esta orientação quando houver alteração de regra.
