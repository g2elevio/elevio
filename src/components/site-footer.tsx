import Link from "next/link";
import { site } from "@/lib/site";
import { WHATSAPP_CONTACT_URL } from "@/lib/whatsapp";

// CNPJ e e-mail ainda não foram fornecidos (pendência em PRODUCT.md): entram aqui quando existirem.
export function SiteFooter() {
  return (
    <footer className="border-t border-neutral-300 dark:border-neutral-700">
      {/* pb-24 deixa o fim do rodapé livre do botão flutuante de WhatsApp. */}
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 pt-10 pb-24 sm:flex-row sm:justify-between">
        <div className="flex flex-col gap-2">
          <p className="text-lg font-semibold">{site.name}</p>
          <p className="leading-relaxed">Soluções digitais para pequenas e médias empresas.</p>
          <p>
            {site.city}, {site.state}
          </p>
          <p className="text-sm text-neutral-700 dark:text-neutral-300">
            © {new Date().getFullYear()} {site.name}
          </p>
        </div>
        <nav aria-label="Rodapé" className="flex flex-col gap-2">
          <a href={WHATSAPP_CONTACT_URL} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">
            WhatsApp: {site.whatsappDisplay}
          </a>
          <Link href="/privacidade" className="underline underline-offset-4">
            Política de privacidade
          </Link>
        </nav>
      </div>
    </footer>
  );
}
