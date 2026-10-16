import { Hero } from "@/components/hero";
import { LeadForm } from "@/components/lead-form";

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-16 px-4 pt-12 pb-28">
      <Hero />
      <section
        id="diagnostico"
        aria-labelledby="diagnostico-titulo"
        className="mx-auto flex w-full max-w-xl scroll-mt-6 flex-col gap-4"
      >
        <h2 id="diagnostico-titulo" className="text-2xl font-semibold">Peça seu diagnóstico gratuito</h2>
        <p>Conte um pouco sobre sua empresa. Ao enviar, abrimos o WhatsApp para continuar a conversa.</p>
        <LeadForm />
      </section>
    </main>
  );
}
