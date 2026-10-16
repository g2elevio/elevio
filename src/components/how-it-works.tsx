const STEPS = [
  {
    title: "Diagnóstico",
    text: "Uma conversa gratuita para entender como seus clientes chegam hoje e onde as vendas se perdem.",
  },
  {
    title: "Plano",
    text: "Você recebe um plano com as prioridades: o que fazer primeiro e o que pode ficar para depois.",
  },
  {
    title: "Implementação",
    text: "Colocamos o plano em prática: automações, CRM, páginas e campanhas, integrados ao jeito que sua equipe já trabalha.",
  },
  {
    title: "Acompanhamento",
    text: "Acompanhamos os resultados com você e ajustamos o que não estiver funcionando.",
  },
] as const;

export function HowItWorks() {
  return (
    <section aria-labelledby="como-funciona-titulo" className="flex flex-col gap-6">
      <h2 id="como-funciona-titulo" className="text-2xl font-semibold sm:text-3xl">Como funciona</h2>
      <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((step, index) => (
          <li key={step.title} className="flex flex-col gap-2 rounded-xl border border-neutral-300 p-5 dark:border-neutral-700">
            <span
              aria-hidden="true"
              className="flex size-9 items-center justify-center rounded-full bg-emerald-700 font-semibold text-white"
            >
              {index + 1}
            </span>
            <h3 className="text-lg font-semibold">
              <span className="sr-only">Passo {index + 1}: </span>
              {step.title}
            </h3>
            <p className="leading-relaxed">{step.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
