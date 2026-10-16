import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { site } from "@/lib/site";
import { WHATSAPP_CONTACT_URL } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Política de privacidade | Elevio",
  description: "Como a Elevio coleta, usa e protege os dados enviados pelo site.",
  alternates: { canonical: "/privacidade" },
};

// Texto-base escrito a partir do que o site faz hoje. Revisar com apoio jurídico (pendência em PRODUCT.md)
// e atualizar quando entrarem analytics, CNPJ e e-mail de contato.
const UPDATED_AT = "16 de outubro de 2026";

export default function PrivacyPage() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-8 px-4 pt-32 pb-20 leading-relaxed text-muted sm:px-6 [&_a]:text-brand-cyan">
      <div className="flex flex-col gap-4">
        <Link href="/" className="flex w-fit items-center gap-2 underline-offset-4 hover:underline">
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
          <li>o texto do consentimento que você aceitou, com a data e a hora do aceite.</li>
        </ul>
        <p>
          Hoje o site não usa cookies de análise nem de publicidade. Se passarmos a usar ferramentas como Google
          Analytics ou Meta Pixel, esta política será atualizada antes disso, e pediremos seu consentimento quando a
          lei exigir.
        </p>
      </Section>

      <Section title="Para que usamos">
        <p>
          Usamos esses dados apenas para entrar em contato com você sobre o diagnóstico, entender o cenário da sua
          empresa e, se você quiser, enviar uma proposta. Não vendemos nem alugamos seus dados.
        </p>
        <p>
          A base legal é o seu consentimento (art. 7º, I, da LGPD), dado ao marcar a caixa de autorização antes de
          enviar o formulário.
        </p>
      </Section>

      <Section title="Com quem compartilhamos">
        <p>
          Os dados ficam guardados num banco de dados contratado de um provedor de nuvem (Supabase), em servidores
          localizados no Canadá, e o site é servido por um provedor de hospedagem. Esses provedores tratam os dados
          apenas para prestar o serviço à {site.name}.
        </p>
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
