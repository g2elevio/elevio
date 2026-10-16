import { WhatsappIcon } from "./whatsapp-icon";

const conversation = [
  { from: "client", text: "Oi! Vocês atendem no sábado?" },
  { from: "agent", text: "Olá! Atendemos de segunda a sábado. Quer que eu veja um horário para você?" },
  { from: "client", text: "Quero, de manhã." },
  { from: "agent", text: "Tenho quinta às 9h ou sábado às 10h. Qual prefere?" },
] as const;

export function Hero() {
  return (
    <section aria-labelledby="hero-titulo" className="grid gap-10 md:grid-cols-[1.2fr_1fr] md:items-center">
      <div className="flex flex-col gap-5">
        <p className="text-sm font-semibold tracking-wide text-emerald-700 uppercase dark:text-emerald-400">
          Automação, IA e marketing digital para PMEs
        </p>
        <h1 id="hero-titulo" className="text-3xl leading-tight font-semibold tracking-tight sm:text-4xl">
          Responda cada cliente na hora e pare de perder vendas no WhatsApp.
        </h1>
        <p className="text-lg leading-relaxed">
          A Elevio conecta atendimento com IA, CRM, site e anúncios num só processo, para sua empresa saber de onde
          vêm os clientes e não deixar nenhum contato esfriar.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <a
            href="#diagnostico"
            className="rounded-lg bg-emerald-700 px-5 py-3 text-center text-base font-semibold text-white hover:bg-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
          >
            Quero meu diagnóstico gratuito
          </a>
        </div>
      </div>
      <figure className="mx-auto w-full max-w-sm">
        <div className="overflow-hidden rounded-2xl border border-neutral-300 bg-[#efeae2] text-neutral-900 shadow-lg">
          <div className="flex items-center gap-3 bg-emerald-800 px-4 py-3 text-white">
            <WhatsappIcon className="size-6" />
            <div>
              <p className="text-sm font-semibold">Sua empresa</p>
              <p className="text-xs opacity-80">Agente de IA · online</p>
            </div>
          </div>
          <ol className="flex flex-col gap-2 p-4 text-sm">
            {conversation.map((message, index) => (
              <li
                key={index}
                className={
                  message.from === "client"
                    ? "max-w-[85%] self-end rounded-lg rounded-tr-none bg-[#d9fdd3] px-3 py-2"
                    : "max-w-[85%] self-start rounded-lg rounded-tl-none bg-white px-3 py-2"
                }
              >
                <span className="sr-only">{message.from === "client" ? "Cliente: " : "Agente de IA: "}</span>
                {message.text}
              </li>
            ))}
          </ol>
        </div>
        <figcaption className="mt-2 text-center text-xs opacity-70">
          Exemplo ilustrativo de um agente de IA respondendo no WhatsApp.
        </figcaption>
      </figure>
    </section>
  );
}
