# Elevio

Site institucional da Elevio, empresa de soluções digitais para pequenas e médias empresas: automação, IA de atendimento, CRM, landing pages, funis e tráfego pago. O visitante entende o que a empresa resolve, simula o ganho que pode ter e pede um diagnóstico gratuito. Interface em português, mobile-first, MVP focado em captar leads qualificados via formulário de diagnóstico e WhatsApp.

## Problema e objetivo

Pequenas e médias empresas perdem vendas por falhas que não enxergam: demoram a responder leads, não fazem follow-up, os contatos ficam espalhados no WhatsApp, o site não converte e o tráfego pago não é medido. O dono sabe que "precisa melhorar o digital", mas não sabe por onde começar, e cada fornecedor vende uma peça solta.

O site precisa mostrar a solução de forma integrada, gerar confiança sem um portfólio extenso e transformar visita em pedido de diagnóstico.

## Público e papéis

- **Principal:** donos e gestores de PMEs que dependem de clientes vindos da internet ou do WhatsApp (clínicas, estética, odontologia, advocacia, imobiliárias, prestadores de serviço e comércio local). Têm pouco tempo, pouco conhecimento técnico e decidem pelo celular.
- **Secundário:** empresas de serviço B2B que querem prospecção e automação de follow-up.
- **Foco geográfico (opcional):** oeste do Paraná no início, com atendimento remoto para todo o Brasil.

Não há login nem papéis no MVP: todo visitante é anônimo. A equipe da Elevio consulta os leads fora do site (ver Requisitos).

## Fluxos da versão inicial

1. **Pedir diagnóstico:** visitante clica em "Quero meu diagnóstico gratuito" no hero, preenche nome, WhatsApp, segmento e principal dificuldade, aceita o consentimento LGPD e envia. O lead é gravado e o navegador abre o WhatsApp da Elevio com mensagem pré-preenchida contendo nome e segmento.
2. **Simular resultado:** visitante clica em "Simular meu resultado", move o slider de leads por mês e vê, em tempo real, vendas estimadas com e sem automação, com aviso de que é uma estimativa. Do simulador, segue para o formulário.
3. **Contato direto:** em qualquer seção, o botão flutuante de WhatsApp abre a conversa com a Elevio.

## MVP

Uma única landing page, nesta ordem:

1. **Hero:** promessa de resultado em uma frase, dois CTAs ("Quero meu diagnóstico gratuito" e "Simular meu resultado") e mockup de um agente de IA respondendo no WhatsApp.
2. **Diagnóstico de dores:** três ou quatro problemas comuns (leads que esfriam, atendimento lento, contatos perdidos, anúncios sem retorno).
3. **Serviços:** seis cards (automação e agente de IA no WhatsApp, CRM, landing pages, funis de venda, gestão de tráfego, dashboard de resultados), cada um com dois ou três benefícios.
4. **Simulador:** slider de leads por mês que estima vendas com e sem automação, com premissas conservadoras e aviso de estimativa.
5. **Como funciona:** quatro passos (diagnóstico, plano, implementação, acompanhamento).
6. **Sobre:** quem está por trás e o diferencial técnico (engenharia de software de verdade, não só ferramentas no-code).
7. **FAQ:** de seis a oito perguntas em acordeão (preço, prazo, contrato, se precisa saber de tecnologia, segmentos atendidos).
8. **CTA final com formulário:** nome, WhatsApp, segmento e principal dificuldade, com consentimento LGPD; ao enviar, redireciona ao WhatsApp com mensagem pré-preenchida.
9. **Elementos fixos:** botão flutuante de WhatsApp e rodapé com contato, CNPJ e link para a política de privacidade.

Página de apoio necessária: **política de privacidade** publicada (exigência LGPD).

## Fora de escopo

Blog, ferramentas gratuitas (raio-X do site, análise de persuasão), chat de IA no site, portfólio, área do cliente, CMS e páginas individuais por serviço.

## Requisitos

- **Idioma e dispositivos:** pt-BR, mobile-first, sem rolagem horizontal a partir de 360 px.
- **Desempenho:** LCP abaixo de 2,5 s em 4G; nota 90 ou mais em Performance no Lighthouse mobile. Scripts de terceiros (GA4, Meta Pixel) não podem bloquear a renderização.
- **Sem números inventados:** nenhuma métrica, depoimento ou logo de cliente sem fonte real. Até existirem cases, a confiança vem do simulador, da transparência do processo e da apresentação dos fundadores. Dados falsos destroem credibilidade e podem configurar propaganda enganosa.
- **Simulador:** premissas conservadoras, explícitas na interface, e aviso de que o resultado é estimativo.
- **Formulário:** valida WhatsApp no formato brasileiro, exige consentimento LGPD explícito, valida tudo no servidor e protege contra envio duplicado.
- **Leads:** gravados em lugar consultável pela equipe, não só no WhatsApp. Guardar o registro do consentimento (data e texto aceito) junto do lead.
- **LGPD:** consentimento explícito no formulário e política de privacidade publicada. Dados pessoais não vão para logs.
- **SEO básico:** meta tags, Open Graph, dados estruturados de LocalBusiness e sitemap.
- **Analytics:** GA4 e Meta Pixel com eventos de conversão (envio do formulário e cada clique no WhatsApp), preparados para tráfego pago.
- **Acessibilidade:** FAQ operável por teclado, contraste mínimo AA, foco visível, campos com rótulo e erros junto do campo.
- **Hospedagem:** custo baixo ou nulo no início (Vercel, Netlify ou Cloudflare Pages).

## Restrições e decisões técnicas

- Next.js 16 (App Router), React 19, TypeScript strict, Tailwind CSS 4, pnpm, Node.js 22.12 ou superior.
- Persistência de leads com Drizzle ORM + PostgreSQL (driver `pg`, runtime Node.js), padrão do toolkit. Provedor escolhido: Supabase (plano gratuito). A tabela `leads` tem RLS ligado e sem políticas, para a API pública do Supabase não expor os leads.
- Formulário simples com recursos nativos + Server Action e validação Zod; sem biblioteca de formulários enquanto não houver necessidade.
- Página majoritariamente estática (Server Components); componentes de cliente só no simulador, no formulário, no acordeão e nos eventos de analytics.
- Hospedagem preferida: Vercel (plano gratuito), por integração nativa com Next.js e pelas skills instaladas. Confirmar se o uso comercial cabe no plano gratuito antes de publicar.

## Hipóteses e pendências

**Hipóteses de produto (medir antes de tratar como fato):**

1. Donos de PME convertem mais com uma oferta de diagnóstico gratuito do que com uma lista de serviços com preço.
2. O simulador de resultado aumenta a taxa de envio do formulário, porque concretiza o ganho.
3. Pedir o WhatsApp em vez do e-mail aumenta a conversão e acelera o primeiro contato.
4. Destacar automação com IA no WhatsApp atrai mais interesse do que tráfego ou landing page isolados.
5. Mostrar uma pessoa real por trás da empresa compensa a falta de portfólio na fase inicial.

Meta sugerida antes de publicar: conversão de visita para formulário acima de 3%, revisada após as primeiras 200 a 300 visitas vindas de anúncio.

**Pendências que só a Elevio pode resolver (o site não inventa esses valores):**

| Pendência | Impacto | Próximo passo |
|---|---|---|
| `DATABASE_URL` (Transaction pooler) configurada no host | Gravação de leads em produção | Configurar ao publicar na Vercel; o banco Supabase já tem a tabela `leads` |
| CNPJ, e-mail e endereço de contato | Rodapé e dados estruturados LocalBusiness | Fornecer os dados reais |
| Fundadores: nomes, foto e trajetória | Seção Sobre | Fornecer texto e foto autorizados |
| Premissas do simulador (taxa de conversão sem e com automação, ticket opcional) | Credibilidade do simulador | Aprovar valores conservadores e a fonte de cada um |
| Texto da política de privacidade | Exigência LGPD | Redigir e, de preferência, revisar com apoio jurídico |
| IDs do GA4 e do Meta Pixel; banner de consentimento de cookies | Analytics e conformidade LGPD | Criar as propriedades e decidir o modelo de consentimento |
| Identidade visual (logo, cores, tipografia) e domínio | Design e SEO | Fornecer a marca ou aprovar uma direção inicial |
| Respostas do FAQ (preço, prazo, contrato) | Seção FAQ | Definir as respostas oficiais |

## Critérios de aceitação

- A página carrega com nota 90 ou mais em Performance no Lighthouse mobile, sem rolagem horizontal a partir de 360 px de largura.
- Os dois CTAs do hero levam, respectivamente, ao formulário e ao simulador.
- O simulador recalcula em tempo real ao mover o slider e exibe o aviso de estimativa.
- O formulário valida o WhatsApp no formato brasileiro, exige o consentimento LGPD, grava o lead e abre o WhatsApp com mensagem pré-preenchida contendo nome e segmento.
- Cada envio de formulário e cada clique no WhatsApp gera um evento rastreável no analytics.
- O FAQ abre e fecha via teclado e tem contraste mínimo AA.
- O botão flutuante de WhatsApp fica visível em todas as seções no mobile.
- Nenhuma métrica, depoimento ou logo de cliente aparece sem fonte real.

Checks técnicos do setup (lint, tipos, testes, build) ficam em [docs/quality.md](docs/quality.md) e não substituem estes critérios.

## Próxima entrega

Já implementado: hero, dores, serviços, como funciona, formulário de diagnóstico gravando no Supabase e botão flutuante de WhatsApp.

O que falta do MVP depende de informações da Elevio (ver pendências): simulador (premissas), Sobre (fundadores), FAQ (respostas oficiais), rodapé (CNPJ e contato) e política de privacidade. Próxima tarefa: **simulador**, assim que as premissas forem aprovadas. Critério: slider de leads por mês recalcula em tempo real as vendas estimadas com e sem automação, mostra as premissas e o aviso de estimativa, e o CTA "Simular meu resultado" entra no hero.

## Manutenção

Atualize este documento quando objetivo, escopo, restrições ou critérios de aceitação mudarem. Decisões técnicas e evidências detalhadas ficam em [docs/architecture.md](docs/architecture.md) e [docs/setup.md](docs/setup.md).
