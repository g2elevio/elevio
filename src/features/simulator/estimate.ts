// Premissa da Elevio, exibida na tela: resposta imediata e follow-up automático
// aumentam a taxa de conversão atual em 20% (relativo). Estimativa, não promessa.
export const AUTOMATION_UPLIFT = 0.2;

export const LEADS_RANGE = { min: 10, max: 500, step: 10, initial: 100 } as const;
export const RATE_RANGE = { min: 1, max: 50, initial: 10 } as const;

export function clamp(value: number, min: number, max: number) {
  if (Number.isNaN(value)) return min;
  return Math.min(max, Math.max(min, value));
}

/** Vendas mensais estimadas a partir de leads por mês e taxa de conversão atual (em %). */
export function estimateSales(leadsPerMonth: number, conversionPercent: number) {
  const leads = clamp(leadsPerMonth, LEADS_RANGE.min, LEADS_RANGE.max);
  const rate = clamp(conversionPercent, RATE_RANGE.min, RATE_RANGE.max) / 100;
  const withoutAutomation = Math.round(leads * rate);
  const withAutomation = Math.round(leads * rate * (1 + AUTOMATION_UPLIFT));
  return { withoutAutomation, withAutomation, extra: withAutomation - withoutAutomation };
}
