const SERVICES = [
  {
    title: "Automação e agente de IA no WhatsApp",
    benefits: [
      "Responde na hora, inclusive fora do horário comercial",
      "Tira dúvidas frequentes e agenda sem ocupar a equipe",
      "Passa para um atendente quando a conversa pede",
    ],
  },
  {
    title: "CRM",
    benefits: [
      "Todos os contatos e conversas num só lugar",
      "Lembretes de follow-up para nenhum cliente ficar sem retorno",
      "Funil visível para saber em que etapa cada venda está",
    ],
  },
  {
    title: "Landing pages",
    benefits: [
      "Páginas rápidas no celular, feitas para converter",
      "Uma oferta clara por página, com chamada direta para o WhatsApp",
    ],
  },
  {
    title: "Funis de venda",
    benefits: [
      "Sequência planejada do primeiro contato até o fechamento",
      "Mensagens certas para quem ainda está decidindo",
    ],
  },
  {
    title: "Gestão de tráfego",
    benefits: [
      "Campanhas no Google e na Meta para o público da sua região",
      "Conversões medidas para investir no que dá retorno",
    ],
  },
  {
    title: "Dashboard de resultados",
    benefits: [
      "Leads, vendas e investimento num painel simples",
      "Decisões com base em números da sua própria operação",
    ],
  },
] as const;

export function Services() {
  return (
    <section aria-labelledby="servicos-titulo" className="flex flex-col gap-6">
      <div className="flex max-w-2xl flex-col gap-2">
        <h2 id="servicos-titulo" className="text-2xl font-semibold sm:text-3xl">
          Uma solução integrada, não peças soltas
        </h2>
        <p className="text-lg leading-relaxed">
          Cada serviço funciona sozinho, mas o resultado aparece quando atendimento, vendas e anúncios conversam entre si.
        </p>
      </div>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((service) => (
          <li key={service.title} className="rounded-xl border border-neutral-300 p-5 dark:border-neutral-700">
            <h3 className="text-lg font-semibold">{service.title}</h3>
            <ul className="mt-3 flex flex-col gap-2">
              {service.benefits.map((benefit) => (
                <li key={benefit} className="flex gap-2 leading-relaxed">
                  <span aria-hidden="true" className="font-bold text-emerald-700 dark:text-emerald-400">✓</span>
                  {benefit}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </section>
  );
}
