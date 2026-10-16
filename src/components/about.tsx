import { Code, HeartHandshake, MapPin, type LucideIcon } from "lucide-react";
import { site } from "@/lib/site";
import { BrandSteps } from "./brand-steps";
import { SectionHeading } from "./section-heading";

function initials(name: string) {
  const parts = name.split(" ");
  return `${parts[0]?.charAt(0) ?? ""}${parts.at(-1)?.charAt(0) ?? ""}`;
}

// Diferenciais a partir de fatos já fornecidos (fundadores engenheiros, sede e atendimento remoto).
const VALUES: { title: string; text: string; icon: LucideIcon }[] = [
  {
    title: "Engenharia de software de verdade",
    text: "Cada automação e integração é construída como software, não só montada com ferramentas prontas.",
    icon: Code,
  },
  {
    title: "Feito para o seu processo",
    text: "Pensado para o jeito que sua equipe trabalha, fácil de manter e pronto para crescer com a empresa.",
    icon: HeartHandshake,
  },
  {
    title: `De ${site.city} para o Brasil`,
    text: "Nascemos no oeste do Paraná e atendemos remotamente empresas de qualquer cidade.",
    icon: MapPin,
  },
];

export function About() {
  return (
    <section id="sobre" aria-labelledby="sobre-titulo" className="container-page grid gap-12 lg:grid-cols-2 lg:gap-16">
      <div className="flex flex-col gap-8">
        <SectionHeading
          id="sobre-titulo"
          eyebrow="Sobre"
          title={
            <>
              Quem está por trás da <span className="text-gradient">Elevio</span>
            </>
          }
        >
          <p>
            A Elevio nasceu em {site.city} ({site.state}) e foi fundada por dois engenheiros de software. Em vez de só
            juntar ferramentas prontas, construímos cada automação, integração e página como software: pensado para o
            seu processo, fácil de manter e pronto para crescer com a sua empresa.
          </p>
        </SectionHeading>
        <ul className="flex flex-col gap-5">
          {VALUES.map(({ title, text, icon: Icon }, index) => (
            <li
              key={title}
              data-reveal="left"
              style={{ "--d": `${index * 100}ms` } as React.CSSProperties}
              className="flex gap-4"
            >
              <span
                aria-hidden="true"
                className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-brand-cyan"
              >
                <Icon className="size-5" />
              </span>
              <div>
                <h3 className="font-bold">{title}</h3>
                <p className="mt-1 leading-relaxed text-muted">{text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div data-reveal="scale" className="relative self-center overflow-hidden rounded-3xl border border-line bg-linear-to-br from-surface-strong via-surface to-background p-6 sm:p-8">
        <BrandSteps className="absolute -top-16 -right-16 w-80 opacity-20 mask-[linear-gradient(200deg,#000_20%,transparent_70%)]" />
        <p className="eyebrow relative">Fundadores</p>
        <ul className="relative mt-6 flex flex-col gap-4">
          {site.founders.map((name) => (
            <li key={name} className="spot glass flex items-center gap-4 rounded-2xl bg-background/50 p-5">
              <span
                aria-hidden="true"
                className="flex size-14 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-brand-cyan via-brand-blue to-brand-violet p-0.5"
              >
                <span className="flex size-full items-center justify-center rounded-full bg-surface-strong text-lg font-extrabold">
                  {initials(name)}
                </span>
              </span>
              <div>
                <h3 className="text-lg font-bold">{name}</h3>
                <p className="text-muted">Engenheiro de Software e fundador</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
