import { About } from "@/components/about";
import { BusinessJsonLd } from "@/components/business-json-ld";
import { Faq } from "@/components/faq";
import { Hero } from "@/components/hero";
import { HowItWorks } from "@/components/how-it-works";
import { LeadForm } from "@/components/lead-form";
import { PainPoints } from "@/components/pain-points";
import { Services } from "@/components/services";
import { Simulator } from "@/components/simulator";
import { getSiteUrl } from "@/lib/env";

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-20 px-4 pt-12 pb-16">
      <BusinessJsonLd url={getSiteUrl().href} />
      <Hero />
      <PainPoints />
      <Services />
      <Simulator />
      <HowItWorks />
      <About />
      <Faq />
      <section
        id="diagnostico"
        aria-labelledby="diagnostico-titulo"
        className="mx-auto flex w-full max-w-xl scroll-mt-6 flex-col gap-4"
      >
        <h2 id="diagnostico-titulo" className="text-2xl font-semibold sm:text-3xl">Peça seu diagnóstico gratuito</h2>
        <p>Conte um pouco sobre sua empresa. Ao enviar, abrimos o WhatsApp para continuar a conversa.</p>
        <LeadForm />
      </section>
    </main>
  );
}
