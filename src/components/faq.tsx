import { Plus } from "lucide-react";
import { site } from "@/lib/site";
import { SectionHeading } from "./section-heading";

// Respostas sem preço, prazo ou condição fixa: esses valores dependem da proposta de cada cliente.
const QUESTIONS = [
  {
    question: "Quanto custa?",
    answer:
      "Depende do que a sua empresa precisa. Depois do diagnóstico, você recebe uma proposta com o escopo e o investimento, sem surpresa no meio do caminho.",
  },
  {
    question: "O diagnóstico gratuito tem algum compromisso?",
    answer:
      "Não. É uma conversa para entender como seus clientes chegam hoje e onde as vendas se perdem. Depois você decide se quer seguir com a proposta.",
  },
  {
    question: "Em quanto tempo fica pronto?",
    answer:
      "O prazo varia com o tamanho do projeto. Ele é definido na proposta, junto com a ordem do que entra primeiro, para você começar a ver resultado pelo que mais pesa nas vendas.",
  },
  {
    question: "Existe contrato ou fidelidade?",
    answer:
      "As condições, como duração e forma de pagamento, ficam escritas na proposta. Você conhece tudo antes de fechar qualquer compromisso.",
  },
  {
    question: "Preciso entender de tecnologia?",
    answer:
      "Não. A Elevio cuida da parte técnica. Você só precisa conhecer o seu negócio e acompanhar os resultados com a gente.",
  },
  {
    question: "O agente de IA substitui minha equipe?",
    answer:
      "Não. Ele responde na hora as dúvidas mais comuns e organiza os contatos, e passa a conversa para uma pessoa da sua equipe quando o atendimento pede.",
  },
  {
    question: "Para quais segmentos vocês trabalham?",
    answer:
      "Para pequenas e médias empresas que recebem clientes pela internet ou pelo WhatsApp, como clínicas, estética, odontologia, advocacia, imobiliárias, prestadores de serviço, comércio local e empresas B2B.",
  },
  {
    question: `Vocês atendem fora de ${site.city}?`,
    answer:
      "Sim. O atendimento é remoto, então trabalhamos com empresas de qualquer cidade do Brasil.",
  },
] as const;

export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-titulo" className="container-page grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
      <div className="lg:sticky lg:top-28 lg:self-start">
        <SectionHeading
          id="faq-titulo"
          eyebrow="Dúvidas"
          title={
            <>
              Perguntas <span className="text-gradient">frequentes</span>
            </>
          }
        >
          <p>Não encontrou o que procurava? Chame a gente no WhatsApp, respondemos com prazer.</p>
        </SectionHeading>
      </div>
      <div className="flex flex-col gap-3">
        {QUESTIONS.map((item, index) => (
          <details
            key={item.question}
            data-reveal
            style={{ "--d": `${(index % 4) * 70}ms` } as React.CSSProperties}
            className="group glass rounded-2xl transition-colors duration-300 open:border-brand-cyan/30 open:bg-white/6 hover:border-white/20"
          >
            <summary className="flex cursor-pointer list-none items-center gap-4 rounded-2xl p-5 text-lg font-bold [&::-webkit-details-marker]:hidden">
              <span className="flex-1">{item.question}</span>
              <span
                aria-hidden="true"
                className="flex size-8 shrink-0 items-center justify-center rounded-full border border-white/15 text-brand-cyan transition-transform duration-300 group-open:rotate-45 group-open:bg-brand-cyan/10"
              >
                <Plus className="size-4" />
              </span>
            </summary>
            <p className="px-5 pb-5 leading-relaxed text-muted">{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
