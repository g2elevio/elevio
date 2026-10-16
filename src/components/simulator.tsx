"use client";

import { ArrowRight, Info } from "lucide-react";
import { useId, useState, type CSSProperties } from "react";
import { AUTOMATION_UPLIFT, clamp, estimateSales, LEADS_RANGE, RATE_RANGE } from "@/features/simulator/estimate";
import { SectionHeading } from "./section-heading";

const upliftPercent = Math.round(AUTOMATION_UPLIFT * 100);

export function Simulator() {
  const id = useId();
  const [leads, setLeads] = useState<number>(LEADS_RANGE.initial);
  const [rate, setRate] = useState<number>(RATE_RANGE.initial);
  const result = estimateSales(leads, rate);
  const fill = ((leads - LEADS_RANGE.min) / (LEADS_RANGE.max - LEADS_RANGE.min)) * 100;
  const todayShare = result.withAutomation > 0 ? (result.withoutAutomation / result.withAutomation) * 100 : 0;

  return (
    <section id="simulador" aria-labelledby="simulador-titulo" className="container-page flex flex-col gap-12">
      <SectionHeading
        id="simulador-titulo"
        eyebrow="Simulador"
        title={
          <>
            Simule seu <span className="text-gradient">resultado</span>
          </>
        }
      >
        <p>Informe quantos contatos sua empresa recebe por mês e quantos deles viram venda hoje.</p>
      </SectionHeading>

      <div data-reveal="scale" className="ring-animated rounded-3xl bg-surface/90 shadow-[0_40px_100px_-40px_rgb(79_107_245/0.6)]">
        <div className="grid gap-10 p-6 sm:p-10 md:grid-cols-2">
          <div className="flex flex-col gap-10">
            <div>
              <label htmlFor={`${id}-leads`} className="flex items-baseline justify-between gap-4 font-semibold">
                <span>Leads por mês</span>
                <output htmlFor={`${id}-leads`} className="text-gradient text-4xl font-extrabold tabular-nums">
                  {leads}
                </output>
              </label>
              <input
                id={`${id}-leads`}
                type="range"
                min={LEADS_RANGE.min}
                max={LEADS_RANGE.max}
                step={LEADS_RANGE.step}
                value={leads}
                onChange={(event) => setLeads(Number(event.target.value))}
                style={{ "--fill": `${fill}%` } as CSSProperties}
                className="range mt-5 w-full"
              />
              <div aria-hidden="true" className="mt-2 flex justify-between text-xs text-subtle tabular-nums">
                <span>{LEADS_RANGE.min}</span>
                <span>{LEADS_RANGE.max}</span>
              </div>
            </div>
            <div>
              <label htmlFor={`${id}-rate`} className="font-semibold">De cada 100 contatos, quantos compram hoje?</label>
              <div className="mt-3 flex items-center gap-3">
                <input
                  id={`${id}-rate`}
                  type="number"
                  inputMode="numeric"
                  min={RATE_RANGE.min}
                  max={RATE_RANGE.max}
                  value={rate}
                  onChange={(event) => setRate(Number(event.target.value))}
                  onBlur={() => setRate((value) => clamp(value, RATE_RANGE.min, RATE_RANGE.max))}
                  className="w-28 rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-lg font-semibold tabular-nums transition-colors hover:border-brand-cyan/50"
                />
                <span className="text-lg text-muted">%</span>
              </div>
            </div>
          </div>

          <div aria-live="polite" className="flex flex-col gap-6">
            <dl className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl border border-line bg-white/3 p-5">
                <dt className="text-sm text-muted">Vendas por mês hoje</dt>
                <dd className="mt-1 text-4xl font-extrabold tabular-nums">{result.withoutAutomation}</dd>
              </div>
              <div className="relative overflow-hidden rounded-2xl border border-brand-cyan/30 bg-linear-to-br from-brand-blue/25 to-brand-violet/20 p-5">
                <dt className="text-sm text-foreground">Com automação (estimativa)</dt>
                <dd className="text-gradient mt-1 text-4xl font-extrabold tabular-nums">{result.withAutomation}</dd>
              </div>
            </dl>
            <div aria-hidden="true" className="flex flex-col gap-3">
              <Bar label="Hoje" width={todayShare} className="bg-white/25" />
              <Bar label="Com automação" width={100} className="bg-linear-to-r from-brand-cyan via-brand-blue to-brand-violet" />
            </div>
            <p className="text-lg font-semibold">
              {result.extra > 0
                ? `Cerca de ${result.extra} ${result.extra === 1 ? "venda a mais" : "vendas a mais"} por mês, com o mesmo volume de contatos.`
                : "Com esse volume, a diferença ainda é pequena. O diagnóstico mostra onde estão os maiores ganhos."}
            </p>
            <a href="#diagnostico" className="btn btn-primary mt-auto">
              Quero meu diagnóstico gratuito
              <ArrowRight aria-hidden="true" className="size-5" />
            </a>
          </div>
        </div>
      </div>

      <p className="flex gap-3 text-sm leading-relaxed text-muted">
        <Info aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-brand-cyan" />
        <span>
          Premissa: com resposta imediata e follow-up automático, consideramos um aumento de {upliftPercent}% na sua taxa
          de conversão atual. É uma estimativa para ilustrar o potencial, não uma promessa de resultado. O ganho real
          depende do seu negócio e é avaliado no diagnóstico.
        </span>
      </p>
    </section>
  );
}

function Bar({ label, width, className }: { label: string; width: number; className: string }) {
  return (
    <div className="flex items-center gap-3 text-xs text-subtle">
      <span className="w-24 shrink-0 sm:w-28">{label}</span>
      <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-white/5">
        <div
          className={`h-full rounded-full transition-[width] duration-500 ease-out-soft ${className}`}
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
}
