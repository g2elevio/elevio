import { About } from "@/components/about";
import { BusinessJsonLd } from "@/components/business-json-ld";
import { DiagnosisCta } from "@/components/diagnosis-cta";
import { Faq } from "@/components/faq";
import { Hero } from "@/components/hero";
import { HowItWorks } from "@/components/how-it-works";
import { PainPoints } from "@/components/pain-points";
import { Segments } from "@/components/segments";
import { Services } from "@/components/services";
import { Simulator } from "@/components/simulator";
import { getSiteUrl } from "@/lib/env";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col gap-24 pb-24 sm:gap-32">
      <BusinessJsonLd url={getSiteUrl().href} />
      <div className="flex flex-col">
        <Hero />
        <Segments />
      </div>
      <PainPoints />
      <Services />
      <Simulator />
      <HowItWorks />
      <About />
      <Faq />
      <DiagnosisCta />
    </main>
  );
}
