const PAINS = [
  {
    title: "Leads que esfriam",
    text: "O contato chega pelo anúncio ou pelo Instagram, mas ninguém responde a tempo e ele fecha com o concorrente.",
  },
  {
    title: "Atendimento lento",
    text: "As mesmas perguntas de preço, horário e endereço tomam o dia da equipe, e quem está pronto para comprar fica esperando.",
  },
  {
    title: "Contatos perdidos",
    text: "As conversas ficam espalhadas em vários celulares, sem histórico e sem follow-up. Ninguém sabe quem precisa de retorno.",
  },
  {
    title: "Anúncios sem retorno",
    text: "Você investe em tráfego pago, mas não sabe quantas vendas vieram dele nem qual campanha vale a pena manter.",
  },
] as const;

export function PainPoints() {
  return (
    <section aria-labelledby="dores-titulo" className="flex flex-col gap-6">
      <div className="flex max-w-2xl flex-col gap-2">
        <h2 id="dores-titulo" className="text-2xl font-semibold sm:text-3xl">
          Onde sua empresa pode estar perdendo vendas
        </h2>
        <p className="text-lg leading-relaxed">Se algum destes parece familiar, o problema não é falta de clientes.</p>
      </div>
      <ul className="grid gap-4 sm:grid-cols-2">
        {PAINS.map((pain) => (
          <li key={pain.title} className="rounded-xl border border-neutral-300 p-5 dark:border-neutral-700">
            <h3 className="text-lg font-semibold">{pain.title}</h3>
            <p className="mt-2 leading-relaxed">{pain.text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
