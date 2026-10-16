import { Hourglass, Snowflake, TrendingDown, UsersRound, type LucideIcon } from "lucide-react";
import { SectionHeading } from "./section-heading";

const PAINS: { title: string; text: string; icon: LucideIcon; tint: string }[] = [
  {
    title: "Leads que esfriam",
    text: "O contato chega pelo anúncio ou pelo Instagram, mas ninguém responde a tempo e ele fecha com o concorrente.",
    icon: Snowflake,
    tint: "from-brand-cyan/25 text-brand-cyan",
  },
  {
    title: "Atendimento lento",
    text: "As mesmas perguntas de preço, horário e endereço tomam o dia da equipe, e quem está pronto para comprar fica esperando.",
    icon: Hourglass,
    tint: "from-brand-blue/30 text-[#93a5ff]",
  },
  {
    title: "Contatos perdidos",
    text: "As conversas ficam espalhadas em vários celulares, sem histórico e sem follow-up. Ninguém sabe quem precisa de retorno.",
    icon: UsersRound,
    tint: "from-brand-violet/30 text-brand-lilac",
  },
  {
    title: "Anúncios sem retorno",
    text: "Você investe em tráfego pago, mas não sabe quantas vendas vieram dele nem qual campanha vale a pena manter.",
    icon: TrendingDown,
    tint: "from-fuchsia-500/25 text-fuchsia-300",
  },
];

export function PainPoints() {
  return (
    <section aria-labelledby="dores-titulo" className="container-page grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
      <div className="lg:sticky lg:top-28 lg:self-start">
        <SectionHeading
          id="dores-titulo"
          eyebrow="O problema"
          title={
            <>
              Onde sua empresa pode estar <span className="text-gradient">perdendo vendas</span>
            </>
          }
        >
          <p>Se algum destes parece familiar, o problema não é falta de clientes. É o caminho entre o primeiro contato e a venda.</p>
        </SectionHeading>
      </div>
      <ul className="grid gap-5 sm:grid-cols-2">
        {PAINS.map(({ title, text, icon: Icon, tint }, index) => (
          <li
            key={title}
            data-reveal
            style={{ "--d": `${index * 90}ms` } as React.CSSProperties}
            className="spot glass rounded-2xl p-6"
          >
            <span
              aria-hidden="true"
              className={`mb-5 flex size-12 items-center justify-center rounded-xl border border-white/10 bg-linear-to-br to-transparent ${tint}`}
            >
              <Icon className="size-6" />
            </span>
            <h3 className="text-xl font-bold">{title}</h3>
            <p className="mt-2 leading-relaxed text-muted">{text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
