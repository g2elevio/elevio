import { site } from "@/lib/site";

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
    <section aria-labelledby="faq-titulo" className="mx-auto flex w-full max-w-3xl flex-col gap-6">
      <h2 id="faq-titulo" className="text-2xl font-semibold sm:text-3xl">Perguntas frequentes</h2>
      <div className="flex flex-col divide-y divide-neutral-300 border-y border-neutral-300 dark:divide-neutral-700 dark:border-neutral-700">
        {QUESTIONS.map((item) => (
          <details key={item.question} className="group">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-lg font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 [&::-webkit-details-marker]:hidden">
              {item.question}
              <span aria-hidden="true" className="text-2xl leading-none text-emerald-700 transition-transform group-open:rotate-45 motion-reduce:transition-none dark:text-emerald-400">
                +
              </span>
            </summary>
            <p className="pb-4 leading-relaxed">{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
