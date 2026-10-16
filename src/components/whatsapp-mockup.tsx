import { CalendarCheck, ContactRound, Zap } from "lucide-react";
import type { CSSProperties } from "react";
import { WhatsappIcon } from "./whatsapp-icon";

const conversation = [
  { from: "client", text: "Oi! Vocês atendem no sábado?" },
  { from: "agent", text: "Olá! Atendemos de segunda a sábado. Quer que eu veja um horário para você?" },
  { from: "client", text: "Quero, de manhã." },
  { from: "agent", text: "Tenho quinta às 9h ou sábado às 10h. Qual prefere?" },
] as const;

const delay = (ms: number) => ({ animationDelay: `${ms}ms` }) as CSSProperties;

// Mockup em HTML/CSS (sem imagem, para não pesar no LCP). As mensagens entram em sequência e os selos
// flutuam ao redor; tudo é ilustrativo e a legenda deixa isso claro.
export function WhatsappMockup() {
  return (
    <figure className="relative mx-auto w-full max-w-sm animate-fade-up" style={delay(250)}>
      <div aria-hidden="true" className="absolute -inset-10 -z-10 rounded-full bg-[radial-gradient(circle,rgb(79_107_245/0.35),transparent_65%)]" />
      <div className="animate-float">
        <div className="ring-animated rounded-[1.75rem] bg-surface p-2 shadow-[0_30px_80px_-20px_rgb(79_107_245/0.55)]">
          <div className="overflow-hidden rounded-[1.4rem] bg-[#0b141a]">
            <div className="flex items-center gap-3 bg-[#1f2c34] px-4 py-3 text-white">
              <span className="flex size-9 items-center justify-center rounded-full bg-emerald-600">
                <WhatsappIcon className="size-5" />
              </span>
              <div>
                <p className="text-sm font-semibold">Sua empresa</p>
                <p className="flex items-center gap-1.5 text-xs text-emerald-300">
                  <span aria-hidden="true" className="size-1.5 rounded-full bg-emerald-400" />
                  Agente de IA · online
                </p>
              </div>
            </div>
            <ol className="flex flex-col gap-2 bg-[radial-gradient(rgb(255_255_255/0.04)_1px,transparent_1px)] bg-size-[14px_14px] p-4 text-sm">
              {conversation.map((message, index) => (
                <li
                  key={index}
                  style={delay(700 + index * 650)}
                  className={
                    message.from === "client"
                      ? "max-w-[85%] animate-message-in self-end rounded-xl rounded-tr-sm bg-[#005c4b] px-3 py-2 text-white"
                      : "max-w-[85%] animate-message-in self-start rounded-xl rounded-tl-sm bg-[#202c33] px-3 py-2 text-[#e9edef]"
                  }
                >
                  <span className="sr-only">{message.from === "client" ? "Cliente: " : "Agente de IA: "}</span>
                  {message.text}
                </li>
              ))}
              <li aria-hidden="true" style={delay(3400)} className="flex animate-message-in gap-1 self-start rounded-xl rounded-tl-sm bg-[#202c33] px-3 py-3">
                {[0, 150, 300].map((ms) => (
                  <span key={ms} style={delay(ms)} className="size-1.5 animate-typing rounded-full bg-[#8696a0]" />
                ))}
              </li>
            </ol>
          </div>
        </div>
      </div>

      <FloatingChip className="-top-5 right-2 sm:-right-6" icon={<Zap className="size-4 text-brand-cyan" />} wait={1200}>
        Resposta na hora
      </FloatingChip>
      <FloatingChip className="top-[70%] -right-16 hidden xl:block" icon={<ContactRound className="size-4 text-brand-lilac" />} wait={2000}>
        Contato salvo no CRM
      </FloatingChip>
      <FloatingChip className="bottom-18 left-2 sm:bottom-6 sm:-left-8" icon={<CalendarCheck className="size-4 text-emerald-300" />} wait={2800}>
        Horário agendado
      </FloatingChip>

      <figcaption className="mt-10 text-center text-xs text-subtle">
        Exemplo ilustrativo de um agente de IA respondendo no WhatsApp.
      </figcaption>
    </figure>
  );
}

function FloatingChip({
  className,
  icon,
  wait,
  children,
}: {
  className: string;
  icon: React.ReactNode;
  wait: number;
  children: React.ReactNode;
}) {
  return (
    <div aria-hidden="true" className={`absolute ${className} animate-fade-up`} style={delay(wait)}>
      <div
        className="flex animate-float items-center gap-2 rounded-full border border-white/12 bg-surface-strong px-3.5 py-2 text-xs font-semibold whitespace-nowrap shadow-[0_12px_30px_-12px_rgb(0_0_0/0.8)]"
        style={delay(wait / 2)}
      >
        {icon}
        {children}
      </div>
    </div>
  );
}
