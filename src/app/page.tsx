import { LeadForm } from "@/components/lead-form";

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-12 px-4 py-16">
      <section className="flex flex-col gap-4">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Elevio</h1>
        <p className="text-lg leading-relaxed">
          Soluções digitais para pequenas e médias empresas: automação, IA de atendimento, CRM,
          landing pages, funis e tráfego pago.
        </p>
        <p className="text-sm opacity-70">Site em construção.</p>
      </section>
      <section id="diagnostico" aria-labelledby="diagnostico-titulo" className="flex flex-col gap-4">
        <h2 id="diagnostico-titulo" className="text-2xl font-semibold">Peça seu diagnóstico gratuito</h2>
        <p>Conte um pouco sobre sua empresa. Ao enviar, abrimos o WhatsApp para continuar a conversa.</p>
        <LeadForm />
      </section>
    </main>
  );
}
