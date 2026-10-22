// Origem do lead vinda do link (?utm_source=instagram&utm_campaign=bio). Só o link: sem cookie nem armazenamento.
export const UTM_FIELDS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;

const MAX_LENGTH = 100;

type Params = { get(name: string): FormDataEntryValue | string | null };

// Opcional e tolerante: vazio, longo demais ou com caracteres de controle vira null e nunca impede o envio.
function clean(value: FormDataEntryValue | string | null) {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!trimmed || trimmed.length > MAX_LENGTH || /[\u0000-\u001f\u007f]/.test(trimmed)) return null;
  return trimmed;
}

export function readUtm(params: Params) {
  return {
    utmSource: clean(params.get("utm_source")),
    utmMedium: clean(params.get("utm_medium")),
    utmCampaign: clean(params.get("utm_campaign")),
    utmContent: clean(params.get("utm_content")),
    utmTerm: clean(params.get("utm_term")),
  };
}
