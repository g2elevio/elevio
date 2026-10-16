import { CircleCheck, MessageCircle } from "lucide-react";
import { BrandSteps } from "./brand-steps";
import { LeadForm } from "./lead-form";

const PROMISES = [
  "Diagnóstico gratuito e sem compromisso",
  "Você entende onde as vendas se perdem hoje",
  "A conversa continua no seu WhatsApp",
] as const;

export function DiagnosisCta() {
  return (
    <section id="diagnostico" aria-labelledby="diagnostico-titulo" className="container-page">
      <div
        data-reveal="scale"
        className="ring-animated relative overflow-hidden rounded-[2rem] bg-linear-to-br from-surface-strong via-surface to-background shadow-[0_40px_100px_-60px_rgb(124_58_237/0.6)]"
      >
        <div aria-hidden="true" className="absolute -top-32 -left-32 size-96 rounded-full bg-[radial-gradient(circle,rgb(34_211_238/0.18),transparent_65%)]" />
        <BrandSteps className="absolute -bottom-6 -left-10 hidden w-[28rem] opacity-25 mask-[linear-gradient(20deg,#000_10%,transparent_65%)] lg:block" />
        <div className="relative grid gap-10 p-6 sm:p-10 lg:grid-cols-2 lg:gap-14 lg:p-14">
          <div className="flex flex-col gap-6">
            <p className="eyebrow">Diagnóstico gratuito</p>
            <h2 id="diagnostico-titulo" className="text-3xl leading-[1.1] font-extrabold sm:text-4xl lg:text-5xl">
              Vamos <span className="text-gradient">elevar o seu negócio</span> com tecnologia?
            </h2>
            <p className="text-lg leading-relaxed text-muted">
              Conte um pouco sobre sua empresa. Ao enviar, abrimos o WhatsApp para continuar a conversa.
            </p>
            <ul className="flex flex-col gap-3">
              {PROMISES.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <CircleCheck aria-hidden="true" className="size-5 shrink-0 text-brand-cyan" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-auto flex items-center gap-2 text-sm text-subtle">
              <MessageCircle aria-hidden="true" className="size-4" />
              Prefere conversar direto? Use o botão de WhatsApp no canto da tela.
            </p>
          </div>
          <div className="glass rounded-3xl bg-background/60 p-5 sm:p-7">
            <LeadForm />
          </div>
        </div>
      </div>
    </section>
  );
}
