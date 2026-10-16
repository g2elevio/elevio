import { ChartLine, Map, Rocket, SearchCheck, type LucideIcon } from "lucide-react";
import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";
import { SectionHeading } from "./section-heading";

// Cada passo fica um degrau acima do anterior (no desktop), com a cor do logo de baixo (violeta) para cima (ciano).
const STEPS: { title: string; text: string; icon: LucideIcon; tread: string; lift: string }[] = [
  {
    title: "Diagnóstico",
    text: "Uma conversa gratuita para entender como seus clientes chegam hoje e onde as vendas se perdem.",
    icon: SearchCheck,
    tread: "from-brand-violet to-brand-violet/60",
    lift: "lg:mt-36",
  },
  {
    title: "Plano",
    text: "Você recebe um plano com as prioridades: o que fazer primeiro e o que pode ficar para depois.",
    icon: Map,
    tread: "from-brand-navy to-brand-blue/70",
    lift: "lg:mt-24",
  },
  {
    title: "Implementação",
    text: "Colocamos o plano em prática: automações, CRM, páginas e campanhas, integrados ao jeito que sua equipe já trabalha.",
    icon: Rocket,
    tread: "from-brand-blue to-[#3b9ff0]",
    lift: "lg:mt-12",
  },
  {
    title: "Acompanhamento",
    text: "Acompanhamos os resultados com você e ajustamos o que não estiver funcionando.",
    icon: ChartLine,
    tread: "from-[#3b9ff0] to-brand-cyan",
    lift: "lg:mt-0",
  },
];

export function HowItWorks() {
  return (
    <section id="como-funciona" aria-labelledby="como-funciona-titulo" className="container-page flex flex-col gap-14">
      <SectionHeading
        id="como-funciona-titulo"
        eyebrow="Processo"
        title={
          <>
            Um degrau de cada vez, <span className="text-gradient">do diagnóstico ao resultado</span>
          </>
        }
      >
        <p>Você sabe o que vai acontecer em cada etapa, antes de fechar qualquer compromisso.</p>
      </SectionHeading>
      <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:items-start">
        {STEPS.map(({ title, text, icon: Icon, tread, lift }, index) => (
          <li
            key={title}
            data-reveal
            style={{ "--d": `${index * 140}ms` } as CSSProperties}
            className={cn("glass relative overflow-hidden rounded-2xl", lift)}
          >
            {/* Pisada do degrau: faixa inclinada na cor do passo. */}
            <div aria-hidden="true" className={cn("mr-3 ml-6 h-3 skew-x-[-40deg] rounded-b-sm bg-linear-to-r", tread)} />
            <div className="flex flex-col gap-3 p-6">
              <div className="flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="flex size-11 items-center justify-center rounded-xl border border-white/10 bg-surface-strong text-brand-cyan"
                >
                  <Icon className="size-5" />
                </span>
                <span className="text-sm font-semibold text-subtle">Passo {index + 1}</span>
              </div>
              <h3 className="text-xl font-bold">{title}</h3>
              <p className="leading-relaxed text-muted">{text}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
