"use client";

import Link from "next/link";
import Script from "next/script";
import { useEffect, useState, useSyncExternalStore } from "react";
import {
  disableAnalytics,
  enableAnalytics,
  OPEN_PREFERENCES_EVENT,
  readConsent,
  saveConsent,
  subscribeConsent,
  trackEvent,
} from "@/lib/analytics";

// No servidor a escolha é desconhecida: o aviso só aparece depois da hidratação, sem divergir do HTML.
const unknownOnServer = () => undefined;

export function Analytics({ measurementId }: { measurementId: string }) {
  const consent = useSyncExternalStore(subscribeConsent, readConsent, unknownOnServer);
  const [reopened, setReopened] = useState(false);

  useEffect(() => {
    const open = () => setReopened(true);
    window.addEventListener(OPEN_PREFERENCES_EVENT, open);
    return () => window.removeEventListener(OPEN_PREFERENCES_EVENT, open);
  }, []);

  useEffect(() => {
    if (consent === "granted") enableAnalytics(measurementId);
    else if (consent === "denied") disableAnalytics(measurementId);
  }, [consent, measurementId]);

  // Um único ouvinte cobre todos os links de WhatsApp (botão flutuante, rodapé, política).
  useEffect(() => {
    if (consent !== "granted") return;
    const onClick = (event: MouseEvent) => {
      if (event.target instanceof Element && event.target.closest('a[href^="https://wa.me/"]')) {
        trackEvent("whatsapp_click");
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [consent]);

  const choose = (value: "granted" | "denied") => {
    saveConsent(value);
    setReopened(false);
  };

  return (
    <>
      {consent === "granted" ? (
        <Script id="google-tag" src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`} />
      ) : null}
      {consent === null || reopened ? (
        <section
          aria-label="Aviso de cookies"
          className="fixed inset-x-4 bottom-4 z-55 mx-auto flex max-w-xl flex-col gap-4 rounded-2xl border border-line bg-surface p-5 shadow-[0_16px_40px_-12px_rgb(0_0_0/0.8)] sm:flex-row sm:items-center"
        >
          <p className="text-sm leading-relaxed text-muted">
            Usamos cookies do Google Analytics para medir visitas e o resultado dos nossos anúncios, só se você
            aceitar.{" "}
            <Link href="/privacidade" prefetch={false} className="text-brand-cyan underline underline-offset-4">
              Saiba mais
            </Link>
          </p>
          <div className="flex shrink-0 gap-2">
            <button type="button" onClick={() => choose("denied")} className="btn btn-ghost min-h-10 flex-1 px-4 py-2 text-sm">
              Recusar
            </button>
            <button type="button" onClick={() => choose("granted")} className="btn btn-primary min-h-10 flex-1 px-4 py-2 text-sm">
              Aceitar
            </button>
          </div>
        </section>
      ) : null}
    </>
  );
}
