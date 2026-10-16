import { ArrowRight, Calculator, CircleCheck, Sparkles } from "lucide-react";
import { HeroSteps } from "./hero-steps";
import { WhatsappMockup } from "./whatsapp-mockup";

// Fatos já assumidos no FAQ; nenhum número ou depoimento.
const ASSURANCES = ["Diagnóstico gratuito", "Sem compromisso", "Atendimento em todo o Brasil"] as const;

export function Hero() {
  return (
    <section aria-labelledby="hero-titulo" className="relative isolate overflow-hidden pt-28 pb-20 sm:pt-36 lg:pb-28">
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="absolute -top-48 -left-40 size-[38rem] animate-drift rounded-full bg-[radial-gradient(circle,rgb(79_107_245/0.32),transparent_65%)]" />
        <div className="absolute top-10 -right-40 size-[34rem] animate-drift rounded-full bg-[radial-gradient(circle,rgb(124_58_237/0.3),transparent_65%)] [animation-delay:-6s]" />
        <div className="absolute bottom-0 left-1/3 size-[30rem] animate-drift rounded-full bg-[radial-gradient(circle,rgb(34_211_238/0.16),transparent_65%)] [animation-delay:-12s]" />
        <HeroSteps />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-b from-transparent to-background" />
      </div>

      <div className="container-page grid items-center gap-16 lg:grid-cols-[1.3fr_1fr] lg:gap-10">
        <div className="flex flex-col gap-7">
          <p className="glass inline-flex w-fit animate-fade-up items-center gap-2 rounded-2xl px-4 py-1.5 text-sm font-semibold text-foreground sm:rounded-full">
            <Sparkles aria-hidden="true" className="size-4 text-brand-cyan" />
            Elevando o seu negócio através da tecnologia.
          </p>
          <h1 id="hero-titulo" className="text-[2.35rem] leading-[1.08] font-extrabold sm:text-5xl xl:text-[3.4rem]">
            Responda cada cliente na hora e <span className="text-gradient">pare de perder vendas</span> no WhatsApp.
          </h1>
          <p className="max-w-xl animate-fade-up text-lg leading-relaxed text-muted [animation-delay:120ms] sm:text-xl">
            A Elevio conecta atendimento com IA, CRM, site e anúncios num só processo, para sua empresa saber de onde
            vêm os clientes e não deixar nenhum contato esfriar.
          </p>
          <div className="flex animate-fade-up flex-col gap-3 [animation-delay:220ms] sm:flex-row">
            <a href="#diagnostico" className="btn btn-primary btn-lg">
              Quero meu diagnóstico gratuito
              <ArrowRight aria-hidden="true" className="size-5" />
            </a>
            <a href="#simulador" className="btn btn-ghost">
              <Calculator aria-hidden="true" className="size-5 text-brand-cyan" />
              Simular meu resultado
            </a>
          </div>
          <ul className="flex animate-fade-up flex-wrap gap-x-6 gap-y-2 text-sm text-muted [animation-delay:320ms]">
            {ASSURANCES.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <CircleCheck aria-hidden="true" className="size-4 text-brand-cyan" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <WhatsappMockup />
      </div>
    </section>
  );
}
