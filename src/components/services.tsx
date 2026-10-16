import {
  Bot,
  ChartColumnIncreasing,
  Check,
  ContactRound,
  Filter,
  PanelsTopLeft,
  Target,
  type LucideIcon,
} from "lucide-react";
import { IntegrationFlow } from "./integration-flow";
import { SectionHeading } from "./section-heading";

const SERVICES: { title: string; icon: LucideIcon; benefits: readonly string[] }[] = [
  {
    title: "Automação e agente de IA no WhatsApp",
    icon: Bot,
    benefits: [
      "Responde na hora, inclusive fora do horário comercial",
      "Tira dúvidas frequentes e agenda sem ocupar a equipe",
      "Passa para um atendente quando a conversa pede",
    ],
  },
  {
    title: "CRM",
    icon: ContactRound,
    benefits: [
      "Todos os contatos e conversas num só lugar",
      "Lembretes de follow-up para nenhum cliente ficar sem retorno",
      "Funil visível para saber em que etapa cada venda está",
    ],
  },
  {
    title: "Landing pages",
    icon: PanelsTopLeft,
    benefits: [
      "Páginas rápidas no celular, feitas para converter",
      "Uma oferta clara por página, com chamada direta para o WhatsApp",
    ],
  },
  {
    title: "Funis de venda",
    icon: Filter,
    benefits: [
      "Sequência planejada do primeiro contato até o fechamento",
      "Mensagens certas para quem ainda está decidindo",
    ],
  },
  {
    title: "Gestão de tráfego",
    icon: Target,
    benefits: [
      "Campanhas no Google e na Meta para o público da sua região",
      "Conversões medidas para investir no que dá retorno",
    ],
  },
  {
    title: "Dashboard de resultados",
    icon: ChartColumnIncreasing,
    benefits: [
      "Leads, vendas e investimento num painel simples",
      "Decisões com base em números da sua própria operação",
    ],
  },
];

export function Services() {
  return (
    <section id="servicos" aria-labelledby="servicos-titulo" className="relative">
      <div aria-hidden="true" className="absolute inset-x-0 top-1/3 -z-10 h-128 bg-[radial-gradient(ellipse_at_center,rgb(79_107_245/0.12),transparent_70%)]" />
      <div className="container-page flex flex-col gap-12">
        <SectionHeading
          id="servicos-titulo"
          eyebrow="Soluções"
          align="center"
          title={
            <>
              Uma solução <span className="text-gradient">integrada</span>, não peças soltas
            </>
          }
        >
          <p>Cada serviço funciona sozinho, mas o resultado aparece quando atendimento, vendas e anúncios conversam entre si.</p>
        </SectionHeading>
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map(({ title, icon: Icon, benefits }, index) => (
            <li
              key={title}
              data-reveal
              style={{ "--d": `${(index % 3) * 90}ms` } as React.CSSProperties}
              className="spot glass flex flex-col rounded-2xl p-6"
            >
              <span
                aria-hidden="true"
                className="mb-6 flex size-12 items-center justify-center rounded-xl bg-linear-to-br from-brand-cyan via-brand-blue to-brand-violet text-white shadow-[0_10px_30px_-10px_rgb(79_107_245/0.9)]"
              >
                <Icon className="size-6" />
              </span>
              <h3 className="text-xl font-bold">{title}</h3>
              <ul className="mt-4 flex flex-col gap-2.5">
                {benefits.map((benefit) => (
                  <li key={benefit} className="flex gap-2.5 leading-relaxed text-muted">
                    <Check aria-hidden="true" className="mt-1 size-4 shrink-0 text-brand-cyan" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
        <IntegrationFlow />
      </div>
    </section>
  );
}
