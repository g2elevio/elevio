import {
  Briefcase,
  House,
  Scale,
  Sparkles,
  Stethoscope,
  Store,
  ToothbrushSparkles,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import type { CSSProperties } from "react";
import type { SEGMENTS } from "@/features/leads/options";

// Segmentos atendidos (os mesmos do formulário), não clientes nem logos.
const ITEMS: { label: Exclude<(typeof SEGMENTS)[number], "Outro">; icon: LucideIcon }[] = [
  { label: "Clínica ou consultório", icon: Stethoscope },
  { label: "Estética", icon: Sparkles },
  { label: "Odontologia", icon: ToothbrushSparkles },
  { label: "Advocacia", icon: Scale },
  { label: "Imobiliária", icon: House },
  { label: "Prestação de serviços", icon: Wrench },
  { label: "Comércio local", icon: Store },
  { label: "Serviços B2B", icon: Briefcase },
];

export function Segments() {
  return (
    <section aria-labelledby="segmentos-titulo" className="container-page">
      <div className="grid items-center gap-8 rounded-3xl border border-line bg-surface/50 p-4 sm:p-8 lg:grid-cols-[0.8fr_2fr] lg:gap-12">
        <div data-reveal className="flex flex-col gap-2">
          <p className="eyebrow">Para quem é</p>
          <h2 id="segmentos-titulo" className="text-2xl leading-tight font-extrabold">
            Feito para empresas que vendem pelo WhatsApp
          </h2>
        </div>
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {ITEMS.map(({ label, icon: Icon }, index) => (
            <li
              key={label}
              data-reveal
              style={{ "--d": `${index * 60}ms` } as CSSProperties}
              className="spot glass flex flex-col items-start gap-2.5 rounded-2xl p-3.5 text-sm font-semibold sm:flex-row sm:items-center sm:gap-3"
            >
              <span
                aria-hidden="true"
                className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-brand-blue/30 to-brand-violet/20 text-brand-cyan"
              >
                <Icon className="size-4.5" />
              </span>
              {label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
