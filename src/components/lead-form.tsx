"use client";

import { ArrowRight, LoaderCircle } from "lucide-react";
import Link from "next/link";
import { useActionState, useEffect, useId } from "react";
import { submitLead } from "@/features/leads/actions";
import { CHALLENGES, CONSENT_TEXT, SEGMENTS } from "@/features/leads/options";
import { UTM_FIELDS } from "@/features/leads/utm";
import { trackEvent } from "@/lib/analytics";
import type { LeadField, LeadFormState } from "@/features/leads/validation";
import { cn } from "@/lib/utils";

const initialState: LeadFormState = { status: "idle" };

const inputClass =
  "w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-base text-foreground placeholder:text-subtle transition-colors duration-300 hover:border-white/30 focus-visible:border-brand-cyan aria-invalid:border-red-400 [&>option]:bg-surface";

export function LeadForm() {
  const [state, formAction, pending] = useActionState(submitLead, initialState);
  const id = useId();
  const errors = state.status === "error" ? state.fieldErrors : {};
  const values = state.status === "error" ? state.values : {};

  useEffect(() => {
    if (state.status !== "success") return;
    // Conversão sem dados pessoais; o gtag envia por beacon, que sobrevive à navegação para o WhatsApp.
    trackEvent("generate_lead", { transport_type: "beacon" });
    window.location.assign(state.whatsappUrl);
  }, [state]);

  if (state.status === "success") {
    return (
      <div role="status" className="rounded-2xl border border-brand-cyan/40 bg-brand-cyan/5 p-5">
        <p className="font-medium">Pedido recebido! Estamos abrindo o WhatsApp para você.</p>
        <p className="mt-2">
          Se não abrir sozinho,{" "}
          <a className="font-semibold text-brand-cyan underline underline-offset-4" href={state.whatsappUrl}>
            toque aqui para continuar no WhatsApp
          </a>
          .
        </p>
      </div>
    );
  }

  // Origem do link (?utm_source=...), lida na hora do envio: sem cookie e sem guardar nada no navegador.
  const submitWithOrigin = (formData: FormData) => {
    const params = new URLSearchParams(window.location.search);
    for (const name of UTM_FIELDS) {
      const value = params.get(name);
      if (value) formData.set(name, value);
    }
    formAction(formData);
  };

  const field = (name: LeadField) => ({
    id: `${id}-${name}`,
    name,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `${id}-${name}-error` : undefined,
  });
  const error = (name: LeadField) =>
    errors[name] ? (
      <p id={`${id}-${name}-error`} className="mt-1.5 text-sm text-red-300">
        {errors[name]}
      </p>
    ) : null;

  return (
    <form action={submitWithOrigin} noValidate className="flex flex-col gap-4">
      <div>
        <label htmlFor={`${id}-name`} className="mb-1.5 block text-sm font-semibold">Nome</label>
        <input {...field("name")} type="text" autoComplete="name" required maxLength={100} defaultValue={values.name} className={inputClass} />
        {error("name")}
      </div>
      <div>
        <label htmlFor={`${id}-whatsapp`} className="mb-1.5 block text-sm font-semibold">WhatsApp com DDD</label>
        <input {...field("whatsapp")} type="tel" inputMode="tel" autoComplete="tel-national" required placeholder="(45) 99999-9999" defaultValue={values.whatsapp} className={inputClass} />
        {error("whatsapp")}
      </div>
      <div>
        <label htmlFor={`${id}-segment`} className="mb-1.5 block text-sm font-semibold">Segmento</label>
        <select {...field("segment")} required defaultValue={values.segment ?? ""} className={inputClass}>
          <option value="" disabled>Escolha uma opção</option>
          {SEGMENTS.map((segment) => <option key={segment}>{segment}</option>)}
        </select>
        {error("segment")}
      </div>
      <div>
        <label htmlFor={`${id}-challenge`} className="mb-1.5 block text-sm font-semibold">Principal dificuldade</label>
        <select {...field("challenge")} required defaultValue={values.challenge ?? ""} className={inputClass}>
          <option value="" disabled>Escolha uma opção</option>
          {CHALLENGES.map((challenge) => <option key={challenge}>{challenge}</option>)}
        </select>
        {error("challenge")}
      </div>
      <div className="hidden" aria-hidden="true">
        <label htmlFor={`${id}-website`}>Não preencha este campo</label>
        <input id={`${id}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <div>
        <div className="flex items-start gap-3">
          <input {...field("consent")} type="checkbox" required className="mt-0.5 size-5 shrink-0 accent-brand-blue" />
          <label htmlFor={`${id}-consent`} className="text-sm leading-relaxed text-muted">{CONSENT_TEXT}</label>
        </div>
        <p className="mt-1 pl-8 text-sm">
          <Link href="/privacidade" prefetch={false} target="_blank" className="text-brand-cyan underline underline-offset-4">
            Leia a política de privacidade
          </Link>
        </p>
        {error("consent")}
      </div>
      {state.status === "error" ? (
        <p role="alert" className="rounded-xl border border-red-400/40 bg-red-500/10 px-4 py-3 text-sm font-medium text-red-200">{state.message}</p>
      ) : null}
      <button
        type="submit"
        disabled={pending}
        className={cn(
          "btn btn-primary w-full",
          pending && "cursor-wait opacity-70",
        )}
      >
        {pending ? (
          <>
            <LoaderCircle aria-hidden="true" className="size-5 animate-spin" />
            Enviando...
          </>
        ) : (
          <>
            Quero meu diagnóstico gratuito
            <ArrowRight aria-hidden="true" className="size-5" />
          </>
        )}
      </button>
    </form>
  );
}
