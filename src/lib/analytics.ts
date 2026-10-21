// Google Analytics 4 com consentimento prévio (LGPD): o gtag.js só é carregado depois do aceite,
// e sem aceite trackEvent não faz nada. Roda só no navegador.

export type Consent = "granted" | "denied";

type Gtag = (...args: unknown[]) => void;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: Gtag;
  }
}

const STORAGE_KEY = "elevio-cookie-consent";
const CHANGE_EVENT = "elevio:consent-change";
export const OPEN_PREFERENCES_EVENT = "elevio:consent-open";

// Fallback quando o navegador bloqueia o localStorage: a escolha vale até fechar a aba.
let memoryConsent: Consent | null = null;

export function readConsent(): Consent | null {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "granted" || stored === "denied") return stored;
  } catch {}
  return memoryConsent;
}

export function saveConsent(consent: Consent) {
  memoryConsent = consent;
  try {
    window.localStorage.setItem(STORAGE_KEY, consent);
  } catch {}
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function subscribeConsent(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener(CHANGE_EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(CHANGE_EVENT, onChange);
  };
}

export function openConsentPreferences() {
  window.dispatchEvent(new Event(OPEN_PREFERENCES_EVENT));
}

function setDisabled(measurementId: string, disabled: boolean) {
  (window as unknown as Record<string, unknown>)[`ga-disable-${measurementId}`] = disabled;
}

export function enableAnalytics(measurementId: string) {
  setDisabled(measurementId, false);
  if (window.gtag) return;
  const dataLayer = (window.dataLayer ??= []);
  window.gtag = function gtag() {
    // O gtag.js espera o objeto arguments, não um array.
    // eslint-disable-next-line prefer-rest-params
    dataLayer.push(arguments);
  };
  // Mede visitas e conversões de anúncios; remarketing (ad_personalization) fica desligado.
  window.gtag("consent", "default", {
    analytics_storage: "granted",
    ad_storage: "granted",
    ad_user_data: "granted",
    ad_personalization: "denied",
  });
  window.gtag("js", new Date());
  window.gtag("config", measurementId);
}

export function disableAnalytics(measurementId: string) {
  setDisabled(measurementId, true);
  delete window.gtag;
  clearAnalyticsCookies();
}

// Cookies do Google Analytics e do Google Ads, gravados no domínio do site ou num domínio pai.
function clearAnalyticsCookies() {
  const names = document.cookie
    .split(";")
    .map((cookie) => cookie.split("=")[0]?.trim() ?? "")
    .filter((name) => /^(_ga|_ga_.+|_gid|_gat.*|_gcl_.+)$/.test(name));
  const labels = window.location.hostname.split(".");
  for (const name of names) {
    document.cookie = `${name}=; Max-Age=0; path=/`;
    for (let i = 0; i < labels.length - 1; i++) {
      document.cookie = `${name}=; Max-Age=0; path=/; domain=.${labels.slice(i).join(".")}`;
    }
  }
}

// Nunca envie dados pessoais (nome, WhatsApp) nos parâmetros.
export function trackEvent(name: string, params?: Record<string, string>) {
  window.gtag?.("event", name, params);
}
