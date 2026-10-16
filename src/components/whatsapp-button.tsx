import { WHATSAPP_CONTACT_URL } from "@/lib/whatsapp";
import { WhatsappIcon } from "./whatsapp-icon";

export function WhatsappButton() {
  return (
    <div className="group fixed right-4 bottom-4 z-50 flex items-center gap-3">
      <span
        aria-hidden="true"
        className="glass pointer-events-none hidden translate-x-2 rounded-xl bg-surface/90 px-3.5 py-2 text-sm font-semibold whitespace-nowrap opacity-0 transition duration-300 group-focus-within:translate-x-0 group-focus-within:opacity-100 group-hover:translate-x-0 group-hover:opacity-100 sm:block"
      >
        Fale com a gente
      </span>
      <a
        href={WHATSAPP_CONTACT_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar com a Elevio no WhatsApp"
        className="relative flex size-14 items-center justify-center rounded-full bg-emerald-600 text-white shadow-[0_12px_32px_-8px_rgb(5_150_105/0.8)] transition-transform duration-300 hover:scale-105"
      >
        <span aria-hidden="true" className="absolute inset-0 animate-ping-soft rounded-full bg-emerald-500/50" />
        <WhatsappIcon className="relative size-8" />
      </a>
    </div>
  );
}
