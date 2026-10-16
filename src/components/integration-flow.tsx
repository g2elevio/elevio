import { ChartColumnIncreasing, ContactRound, Megaphone, MessageCircle, type LucideIcon } from "lucide-react";
import { Fragment } from "react";
import { BrandSteps } from "./brand-steps";

const FLOW: { label: string; icon: LucideIcon }[] = [
  { label: "Anúncio", icon: Megaphone },
  { label: "Atendimento com IA", icon: MessageCircle },
  { label: "CRM e follow-up", icon: ContactRound },
  { label: "Resultado medido", icon: ChartColumnIncreasing },
];

// Banner que resume a proposta: o caminho do cliente conectado de ponta a ponta.
export function IntegrationFlow() {
  return (
    <div
      data-reveal="scale"
      className="ring-animated relative overflow-hidden rounded-3xl bg-linear-to-br from-surface-strong to-surface px-6 py-10 sm:px-10"
    >
      <BrandSteps className="absolute -right-10 -bottom-10 w-72 opacity-15 mask-[linear-gradient(90deg,transparent,#000_60%)] sm:w-96" />
      <p className="relative max-w-xl text-2xl leading-snug font-extrabold sm:text-3xl">
        Do primeiro clique à venda, <span className="text-gradient">tudo conectado</span>.
      </p>
      <ol className="relative mt-8 flex flex-col gap-3 md:flex-row md:items-center md:gap-0">
        {FLOW.map(({ label, icon: Icon }, index) => (
          <Fragment key={label}>
            {index > 0 ? (
              <li
                aria-hidden="true"
                className="ml-6 h-6 w-px bg-linear-to-b from-brand-cyan to-brand-violet md:mx-2 md:h-px md:w-auto md:flex-1 md:animate-flow md:bg-[linear-gradient(90deg,var(--brand-cyan),var(--brand-violet),var(--brand-cyan))] md:bg-size-[200%_100%]"
              />
            ) : null}
            <li className="glass flex items-center gap-3 rounded-full bg-background/60 px-4 py-2.5 text-sm font-semibold whitespace-nowrap">
              <Icon aria-hidden="true" className="size-4 text-brand-cyan" />
              <span className="sr-only">Etapa {index + 1}: </span>
              {label}
            </li>
          </Fragment>
        ))}
      </ol>
    </div>
  );
}
