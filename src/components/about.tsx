import { site } from "@/lib/site";

const FOUNDERS = [
  { name: "Gabriel Fávero Heller", initials: "GH" },
  { name: "Gabriel Felipe Kuhn Schiestl", initials: "GS" },
] as const;

export function About() {
  return (
    <section aria-labelledby="sobre-titulo" className="flex flex-col gap-6">
      <div className="flex max-w-2xl flex-col gap-3">
        <h2 id="sobre-titulo" className="text-2xl font-semibold sm:text-3xl">Quem está por trás da Elevio</h2>
        <p className="text-lg leading-relaxed">
          A Elevio nasceu em {site.city} ({site.state}) e foi fundada por dois engenheiros de software. Em vez de
          só juntar ferramentas prontas, construímos cada automação, integração e página como software: pensado
          para o seu processo, fácil de manter e pronto para crescer com a sua empresa.
        </p>
      </div>
      <ul className="grid gap-4 sm:grid-cols-2">
        {FOUNDERS.map((founder) => (
          <li
            key={founder.name}
            className="flex items-center gap-4 rounded-xl border border-neutral-300 p-5 dark:border-neutral-700"
          >
            <span
              aria-hidden="true"
              className="flex size-12 shrink-0 items-center justify-center rounded-full bg-emerald-700 font-semibold text-white"
            >
              {founder.initials}
            </span>
            <div>
              <h3 className="text-lg font-semibold">{founder.name}</h3>
              <p>Engenheiro de Software e fundador</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
