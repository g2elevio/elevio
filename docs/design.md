# Design e acessibilidade

## Direção

- Público: donos e gestores de PMEs, com pouco tempo e pouco conhecimento técnico, decidindo pelo celular.
- Idioma pt-BR, linguagem direta e sem jargão. Cada seção responde "o que eu ganho com isso".
- Mobile-first: o desenho parte de 360 px e cresce para desktop.
- Tom visual: tecnológico e acolhedor. Tema escuro com as quatro cores do logo, luz suave que acompanha o cursor, cartões de vidro e movimento discreto que guia a leitura. O motivo visual próprio é o degrau do logo, que traduz o "elevando" do slogan: escadaria no hero, processo em escada, sobretítulo com mini degrau e faixa de cor no topo dos cartões. Sites de outras empresas servem só de inspiração geral; não copiar elementos, efeitos ou layout.
- Slogan oficial (definido pela Elevio em 16/10/2026): "Elevando o seu negócio através da tecnologia." Aparece no selo do hero, no rodapé e na imagem de compartilhamento; o CTA final o retoma ("Vamos elevar o seu negócio com tecnologia?"). A frase "Seu negócio, um degrau acima." do banner de exemplo não é slogan e não deve ser usada.
- Confiança vem de transparência, não de números: simulador com premissas visíveis, processo em quatro passos e pessoas reais na seção Sobre. Nenhuma métrica, depoimento ou logo sem fonte. A seção "Para quem é" lista segmentos atendidos, não clientes.

## Identidade

- Cores (tokens em `src/app/globals.css`, expostos ao Tailwind como `brand-*`, `surface`, `muted`, `subtle`, `line`): ciano `#22d3ee`, azul `#4f6bf5`, marinho `#2a3a9e` e violeta `#7c3aed`, do logo; fundo `#070b17`. Texto em `--foreground`, `--muted` e `--subtle`, todos AA sobre o fundo. Violeta e marinho puros só em superfícies, gradientes e decoração.
- Tipografia: Manrope (títulos em extrabold e texto), a fonte do banner, via `next/font`.
- Logo: `src/components/logo.tsx` redesenha o símbolo em SVG com os polígonos do banner; `src/app/icon.svg` é o ícone do site. `brand-steps.tsx` reaproveita os degraus do banner como arte decorativa (hero, banner de integração, Sobre e CTA final).
- Ícones: `lucide-react`, sempre com `aria-hidden` quando acompanham texto.

## Sistema de componentes e efeitos

- Utilitários em `globals.css`: `container-page`, `text-gradient`, `eyebrow`, `btn` + `btn-primary`/`btn-ghost`/`btn-lg`, `glass`, `spot` (brilho interno que segue o cursor e faixa de cor no topo que cresce no hover), `ring-animated` (borda em gradiente girando) e `divider-glow`. O `eyebrow` desenha um mini degrau nas cores do logo antes do texto.
- `src/components/interactive-effects.tsx` (cliente, um só para a página toda): revela `[data-reveal]` ao entrar na tela (`data-reveal="left"` e `"scale"` mudam a direção; `--d` atrasa em ms), marca `data-scrolled` para o cabeçalho ganhar vidro, e move a luz do cursor e o brilho dos cartões `.spot`. Só usa o cursor em dispositivos com mouse; refaz a observação a cada troca de rota.
- Os elementos com `data-reveal` só começam ocultos quando o script inline do layout marca `html.js` antes da primeira pintura: sem JavaScript, tudo aparece normalmente.
- O hero não usa `data-reveal` no título (LCP): título estático, demais itens com animação CSS curta. A escadaria (`hero-steps.tsx`) é SVG em duas camadas: a apagada e a acesa, visível só num círculo de luz (`--hx`/`--hy`). Com mouse, a luz segue o cursor; sem mouse, sobe os degraus sozinha em CSS.
- `prefers-reduced-motion` zera animações e transições, mantém a escadaria parada e o conteúdo visível.
- `SectionHeading` padroniza sobretítulo, título com trecho em gradiente e texto de apoio.

## Seções

- Cabeçalho fixo (`site-header.tsx`): logo, navegação a partir de `lg` e CTA "Diagnóstico gratuito" sempre visível. Links `/#secao` funcionam também na política de privacidade. Link "Pular para o conteúdo" no layout.
- Hero (`hero.tsx`): selo com o slogan, título com destaque em gradiente, dois CTAs, garantias do FAQ (diagnóstico gratuito, sem compromisso, todo o Brasil) e `whatsapp-mockup.tsx`: conversa em HTML/CSS com mensagens entrando em sequência, indicador de digitação e selos flutuantes decorativos, com legenda de exemplo ilustrativo e falas identificadas para leitores de tela.
- Para quem é (`segments.tsx`): painel com os segmentos do formulário em cartões com ícone, entrando em sequência.
- Dores, Serviços, Como funciona, Sobre e FAQ: cartões `glass`/`spot` com ícones e entrada escalonada. Como funciona é uma escada: cada passo um degrau acima no desktop, com a faixa de cor de violeta a ciano. Serviços termina com o banner `integration-flow.tsx` (anúncio → atendimento com IA → CRM → resultado). FAQ continua em `<details>/<summary>`, sem JavaScript.
- `src/components/simulator.tsx`: slider estilizado (`.range`, preenchimento por `--fill`) com valor em `<output>`, campo da taxa atual (1 a 50%), resultados em `aria-live`, barras comparativas decorativas e a premissa de +20% sempre visível com o aviso de estimativa.
- `diagnosis-cta.tsx` + `lead-form.tsx`: painel final com borda animada e o formulário. Campos com rótulo visível, erros por campo ligados via `aria-describedby`, `aria-invalid`, mensagem geral com `role="alert"`, botão desabilitado com indicador durante o envio e checkbox de consentimento desmarcado, com link para a política (abre em nova aba).
- `whatsapp-button.tsx`: botão fixo de 56 px, `emerald-600` com ícone branco, pulso suave e dica "Fale com a gente" no hover/foco. O rodapé tem respiro inferior (`pb-24`) para o botão não cobrir os links.
- `site-footer.tsx`: logo, slogan, cidade, navegação, WhatsApp e política. CNPJ e e-mail entram quando forem fornecidos.
- `src/app/opengraph-image.tsx`: 1200×630 a partir do banner da marca, com o slogan oficial no lugar da frase do banner e sem o marcador de endereço.
- `src/app/privacidade/page.tsx`: seções em cartões de vidro, com link de volta.

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
- Verificado com Playwright a 360 px e 1280 px: sem rolagem horizontal, CTA do hero rola até o formulário, botão de WhatsApp visível no topo e no fim da página sem sobrepor o botão de envio.
- Identidade visual (16/10/2026) conferida por capturas do build de produção a 360 px e 1280 px: sem rolagem horizontal e sem erros no console. Ainda sem auditoria Lighthouse nem revisão `web-design-guidelines`; refazer as duas depois desta mudança, que acrescentou SVG animado e animações.

## Manutenção

Mudanças visuais e de interação atualizam a fonte de tokens/componentes e esta orientação quando houver alteração de regra.
