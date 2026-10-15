"use client";

import { useActionState, useEffect, useId } from "react";
import { submitLead } from "@/features/leads/actions";
import { CHALLENGES, CONSENT_TEXT, SEGMENTS } from "@/features/leads/options";
import type { LeadField, LeadFormState } from "@/features/leads/validation";
import { cn } from "@/lib/utils";

const initialState: LeadFormState = { status: "idle" };

const inputClass =
  "w-full rounded-lg border border-neutral-400 bg-white px-3 py-3 text-base text-neutral-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 aria-invalid:border-red-700";

export function LeadForm() {
  const [state, formAction, pending] = useActionState(submitLead, initialState);
  const id = useId();
  const errors = state.status === "error" ? state.fieldErrors : {};
  const values = state.status === "error" ? state.values : {};

  useEffect(() => {
    if (state.status === "success") window.location.assign(state.whatsappUrl);
  }, [state]);

  if (state.status === "success") {
    return (
      <div role="status" className="rounded-lg border border-emerald-700 p-4">
        <p className="font-medium">Pedido recebido! Estamos abrindo o WhatsApp para você.</p>
        <p className="mt-2">
          Se não abrir sozinho,{" "}
          <a className="font-medium underline" href={state.whatsappUrl}>
            toque aqui para continuar no WhatsApp
          </a>
          .
        </p>
      </div>
    );
  }

  const field = (name: LeadField) => ({
    id: `${id}-${name}`,
    name,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `${id}-${name}-error` : undefined,
  });
  const error = (name: LeadField) =>
    errors[name] ? (
      <p id={`${id}-${name}-error`} className="mt-1 text-sm text-red-700 dark:text-red-400">
        {errors[name]}
      </p>
    ) : null;

  return (
    <form action={formAction} noValidate className="flex flex-col gap-4">
      <div>
        <label htmlFor={`${id}-name`} className="mb-1 block font-medium">Nome</label>
        <input {...field("name")} type="text" autoComplete="name" required maxLength={100} defaultValue={values.name} className={inputClass} />
        {error("name")}
      </div>
      <div>
        <label htmlFor={`${id}-whatsapp`} className="mb-1 block font-medium">WhatsApp com DDD</label>
        <input {...field("whatsapp")} type="tel" inputMode="tel" autoComplete="tel-national" required placeholder="(45) 99999-9999" defaultValue={values.whatsapp} className={inputClass} />
        {error("whatsapp")}
      </div>
      <div>
        <label htmlFor={`${id}-segment`} className="mb-1 block font-medium">Segmento</label>
        <select {...field("segment")} required defaultValue={values.segment ?? ""} className={inputClass}>
          <option value="" disabled>Escolha uma opção</option>
          {SEGMENTS.map((segment) => <option key={segment}>{segment}</option>)}
        </select>
        {error("segment")}
      </div>
      <div>
        <label htmlFor={`${id}-challenge`} className="mb-1 block font-medium">Principal dificuldade</label>
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
          <input {...field("consent")} type="checkbox" required className="mt-1 size-5 shrink-0 accent-emerald-700" />
          <label htmlFor={`${id}-consent`} className="text-sm leading-relaxed">{CONSENT_TEXT}</label>
        </div>
        {error("consent")}
      </div>
      {state.status === "error" ? (
        <p role="alert" className="text-sm font-medium text-red-700 dark:text-red-400">{state.message}</p>
      ) : null}
      <button
        type="submit"
        disabled={pending}
        className={cn(
          "rounded-lg bg-emerald-700 px-5 py-3 text-base font-semibold text-white hover:bg-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700",
          pending && "cursor-wait opacity-70",
        )}
      >
        {pending ? "Enviando..." : "Quero meu diagnóstico gratuito"}
      </button>
    </form>
  );
}
