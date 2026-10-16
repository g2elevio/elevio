import { site } from "@/lib/site";

// Dados estruturados de empresa local só com fatos fornecidos pela Elevio. CNPJ, e-mail e endereço completo
// entram quando existirem (pendência em PRODUCT.md).
export function BusinessJsonLd({ url }: { url: string }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: site.name,
    description:
      "Soluções digitais para pequenas e médias empresas: automação e agente de IA no WhatsApp, CRM, landing pages, funis de venda e gestão de tráfego.",
    url,
    telephone: `+${site.whatsappNumber}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: site.city,
      addressRegion: site.state,
      addressCountry: "BR",
    },
    areaServed: { "@type": "Country", name: "Brasil" },
    founder: site.founders.map((name) => ({ "@type": "Person", name, jobTitle: "Engenheiro de Software" })),
  };

  return (
    <script
      type="application/ld+json"
      // Escapa "<" para o JSON não fechar a tag <script> (recomendação da documentação do Next.js).
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
    />
  );
}
