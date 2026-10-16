"use client";

import { useId, useState } from "react";
import { AUTOMATION_UPLIFT, clamp, estimateSales, LEADS_RANGE, RATE_RANGE } from "@/features/simulator/estimate";

const upliftPercent = Math.round(AUTOMATION_UPLIFT * 100);

export function Simulator() {
  const id = useId();
  const [leads, setLeads] = useState<number>(LEADS_RANGE.initial);
  const [rate, setRate] = useState<number>(RATE_RANGE.initial);
  const result = estimateSales(leads, rate);

  return (
    <section id="simulador" aria-labelledby="simulador-titulo" className="flex scroll-mt-6 flex-col gap-6">
      <div className="flex max-w-2xl flex-col gap-2">
        <h2 id="simulador-titulo" className="text-2xl font-semibold sm:text-3xl">Simule seu resultado</h2>
        <p className="text-lg leading-relaxed">
          Informe quantos contatos sua empresa recebe por mês e quantos deles viram venda hoje.
        </p>
      </div>
      <div className="grid gap-6 rounded-xl border border-neutral-300 p-5 md:grid-cols-2 dark:border-neutral-700">
        <div className="flex flex-col gap-6">
          <div>
            <label htmlFor={`${id}-leads`} className="flex justify-between font-medium">
              <span>Leads por mês</span>
              <output htmlFor={`${id}-leads`} className="font-semibold">{leads}</output>
            </label>
            <input
              id={`${id}-leads`}
              type="range"
              min={LEADS_RANGE.min}
              max={LEADS_RANGE.max}
              step={LEADS_RANGE.step}
              value={leads}
              onChange={(event) => setLeads(Number(event.target.value))}
              className="mt-3 w-full accent-emerald-700"
            />
          </div>
          <div>
            <label htmlFor={`${id}-rate`} className="font-medium">De cada 100 contatos, quantos compram hoje?</label>
            <div className="mt-2 flex items-center gap-2">
              <input
                id={`${id}-rate`}
                type="number"
                inputMode="numeric"
                min={RATE_RANGE.min}
                max={RATE_RANGE.max}
                value={rate}
                onChange={(event) => setRate(Number(event.target.value))}
                onBlur={() => setRate((value) => clamp(value, RATE_RANGE.min, RATE_RANGE.max))}
                className="w-24 rounded-lg border border-neutral-400 bg-white px-3 py-2 text-base text-neutral-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
              />
              <span>%</span>
            </div>
          </div>
        </div>
        <div aria-live="polite" className="flex flex-col gap-3">
          <dl className="grid grid-cols-2 gap-3">
            <div className="rounded-lg bg-neutral-100 p-4 text-neutral-900">
              <dt className="text-sm">Vendas por mês hoje</dt>
              <dd className="text-3xl font-semibold">{result.withoutAutomation}</dd>
            </div>
            <div className="rounded-lg bg-emerald-50 p-4 text-emerald-900">
              <dt className="text-sm">Com automação (estimativa)</dt>
              <dd className="text-3xl font-semibold">{result.withAutomation}</dd>
            </div>
          </dl>
          <p className="font-medium">
            {result.extra > 0
              ? `Cerca de ${result.extra} ${result.extra === 1 ? "venda a mais" : "vendas a mais"} por mês, com o mesmo volume de contatos.`
              : "Com esse volume, a diferença ainda é pequena. O diagnóstico mostra onde estão os maiores ganhos."}
          </p>
          <a
            href="#diagnostico"
            className="rounded-lg bg-emerald-700 px-5 py-3 text-center text-base font-semibold text-white hover:bg-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
          >
            Quero meu diagnóstico gratuito
          </a>
        </div>
      </div>
      <p className="text-sm leading-relaxed opacity-80">
        Premissa: com resposta imediata e follow-up automático, consideramos um aumento de {upliftPercent}% na sua taxa
        de conversão atual. É uma estimativa para ilustrar o potencial, não uma promessa de resultado. O ganho real
        depende do seu negócio e é avaliado no diagnóstico.
      </p>
    </section>
  );
}
