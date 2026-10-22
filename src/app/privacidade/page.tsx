import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { getGaMeasurementId } from "@/lib/env";
import { site } from "@/lib/site";
import { WHATSAPP_CONTACT_URL } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Política de privacidade | Elevio",
  description: "Como a Elevio coleta, usa e protege os dados enviados pelo site.",
  alternates: { canonical: "/privacidade" },
};

// Texto-base escrito a partir do que o site faz hoje. Revisar com apoio jurídico (pendência em PRODUCT.md)
// e atualizar quando entrarem Meta Pixel, CNPJ e e-mail de contato. A parte do Google Analytics só aparece
// quando GA_MEASUREMENT_ID está definido, junto com o aviso de cookies.
const UPDATED_AT = "22 de outubro de 2026";

export default function PrivacyPage() {
  const analytics = Boolean(getGaMeasurementId());
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-8 px-4 pt-32 pb-20 leading-relaxed text-muted sm:px-6 [&_a]:text-brand-cyan">
      <div className="flex flex-col gap-4">
        <Link href="/" prefetch={false} className="flex w-fit items-center gap-2 underline-offset-4 hover:underline">
          <ArrowLeft aria-hidden="true" className="size-4" />
          Voltar para a página inicial
        </Link>
        <p className="eyebrow">LGPD</p>
        <h1 className="text-4xl font-extrabold text-foreground sm:text-5xl">
          Política de <span className="text-gradient">privacidade</span>
        </h1>
        <p className="text-subtle">Última atualização: {UPDATED_AT}</p>
      </div>

      <Section title="Quem somos">
        <p>
          A {site.name} é uma empresa de soluções digitais para pequenas e médias empresas, com sede em {site.city} (
          {site.state}). Somos a controladora dos dados pessoais enviados por este site, nos termos da Lei Geral de
          Proteção de Dados (Lei nº 13.709/2018, LGPD).
        </p>
      </Section>

      <Section title="Quais dados coletamos">
        <p>Quando você pede o diagnóstico gratuito pelo formulário, coletamos:</p>
        <ul className="list-disc pl-6">
          <li>nome;</li>
          <li>número de WhatsApp;</li>
          <li>segmento da sua empresa e principal dificuldade, escolhidos numa lista;</li>
          <li>o texto do consentimento que você aceitou, com a data e a hora do aceite;</li>
          <li>
            a origem da sua visita, quando o link que você usou trouxer essa informação (parâmetros como{" "}
            <code>utm_source</code> e <code>utm_campaign</code>, que indicam, por exemplo, se você veio de um anúncio
            ou do nosso Instagram). Isso vem do próprio link; não usamos cookies para isso.
          </li>
        </ul>
        {analytics ? (
          <>
            <p>
              Se você aceitar no aviso de cookies, usamos o Google Analytics, do Google, para medir as visitas e o
              resultado dos nossos anúncios: páginas vistas, origem do acesso (busca, anúncio, rede social), tipo de
              dispositivo, região aproximada e ações como enviar o formulário ou tocar num link do WhatsApp. Para
              isso, o Google Analytics grava cookies no seu navegador, como o <code>_ga</code>. Ele não recebe seu
              nome nem seu WhatsApp, e não usamos esses dados para anúncios personalizados (remarketing).
            </p>
            <p>
              Sem o seu aceite, nada disso é carregado. Você pode mudar a escolha a qualquer momento em
              &quot;Preferências de cookies&quot;, no rodapé do site; ao recusar, apagamos esses cookies do seu
              navegador.
            </p>
          </>
        ) : (
          <p>
            Hoje o site não usa cookies de análise nem de publicidade. Se passarmos a usar ferramentas como Google
            Analytics ou Meta Pixel, esta política será atualizada antes disso, e pediremos seu consentimento quando
            a lei exigir.
          </p>
        )}
      </Section>

      <Section title="Para que usamos">
        <p>
          Usamos esses dados apenas para entrar em contato com você sobre o diagnóstico, entender o cenário da sua
          empresa e, se você quiser, enviar uma proposta. Não vendemos nem alugamos seus dados.
        </p>
        <p>
          A base legal é o seu consentimento (art. 7º, I, da LGPD), dado ao marcar a caixa de autorização antes de
          enviar o formulário{analytics ? " e, para os cookies de análise, ao aceitar o aviso de cookies" : ""}.
        </p>
      </Section>

      <Section title="Contatos por outros canais">
        <p>
          Quando você fala com a {site.name} por outros canais, como Instagram, WhatsApp ou indicação, registramos seu
          nome, o contato que você usou e o assunto no nosso sistema interno de atendimento, só para responder e
          acompanhar a conversa. A base legal é a execução de procedimentos preliminares a um contrato, a seu pedido
          (art. 7º, V, da LGPD). Você pode pedir a exclusão a qualquer momento, como descrito abaixo.
        </p>
      </Section>

      <Section title="Com quem compartilhamos">
        <p>
          Os dados ficam guardados num banco de dados contratado de um provedor de nuvem (Supabase), em servidores
          localizados no Canadá, e o site é servido por um provedor de hospedagem. Esses provedores tratam os dados
          apenas para prestar o serviço à {site.name}.
        </p>
        {analytics ? (
          <p>
            Os dados de navegação, quando você aceita os cookies, são tratados pelo Google (Google Analytics), que
            pode armazená-los fora do Brasil, e guardados pelo prazo de retenção configurado no Google Analytics, de no
            máximo 14 meses.
          </p>
        ) : null}
        <p>
          Depois do envio, o formulário abre o WhatsApp para continuar a conversa. A partir daí, a conversa também segue
          as regras de privacidade do WhatsApp, que é um serviço da Meta.
        </p>
      </Section>

      <Section title="Por quanto tempo guardamos">
        <p>
          Guardamos os dados enquanto forem necessários para o atendimento e a relação comercial com você. Se você
          pedir a exclusão, apagamos os dados, exceto o que a lei nos obrigar a manter.
        </p>
      </Section>

      <Section title="Seus direitos">
        <p>Pela LGPD, você pode pedir a qualquer momento:</p>
        <ul className="list-disc pl-6">
          <li>confirmação de que tratamos seus dados e acesso a eles;</li>
          <li>correção de dados incompletos, inexatos ou desatualizados;</li>
          <li>anonimização, bloqueio ou eliminação de dados desnecessários;</li>
          <li>portabilidade dos dados;</li>
          <li>informação sobre com quem compartilhamos seus dados;</li>
          <li>revogação do consentimento e eliminação dos dados tratados com base nele.</li>
        </ul>
        <p>Você também pode registrar reclamação na Autoridade Nacional de Proteção de Dados (ANPD).</p>
      </Section>

      <Section title="Como falar com a gente">
        <p>
          Para exercer seus direitos ou tirar dúvidas sobre esta política, fale com a {site.name} pelo WhatsApp{" "}
          <a href={WHATSAPP_CONTACT_URL} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">
            {site.whatsappDisplay}
          </a>
          .
        </p>
      </Section>

      <Section title="Segurança">
        <p>
          O acesso aos dados é restrito à equipe da {site.name}, a conexão com o banco é criptografada e os dados
          pessoais não são gravados nos registros técnicos do site.
        </p>
      </Section>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="glass flex flex-col gap-3 rounded-2xl p-6">
      <h2 className="text-xl font-bold text-foreground sm:text-2xl">{title}</h2>
      {children}
    </section>
  );
}
