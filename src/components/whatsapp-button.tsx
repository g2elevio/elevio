import { WHATSAPP_CONTACT_URL } from "@/lib/whatsapp";
import { WhatsappIcon } from "./whatsapp-icon";

export function WhatsappButton() {
  return (
    <a
      href={WHATSAPP_CONTACT_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar com a Elevio no WhatsApp"
      className="fixed right-4 bottom-4 z-50 flex size-14 items-center justify-center rounded-full bg-emerald-700 text-white shadow-lg hover:bg-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
    >
      <WhatsappIcon className="size-8" />
    </a>
  );
}
