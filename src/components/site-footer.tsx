import { MapPin } from "lucide-react";
import Link from "next/link";
import { site } from "@/lib/site";
import { WHATSAPP_CONTACT_URL } from "@/lib/whatsapp";
import { CookiePreferencesButton } from "./cookie-preferences-button";
import { Logo } from "./logo";
import { WhatsappIcon } from "./whatsapp-icon";

const linkClass = "w-fit text-muted transition-colors duration-300 hover:text-foreground";

// CNPJ e e-mail ainda não foram fornecidos (pendência em PRODUCT.md): entram aqui quando existirem.
export function SiteFooter({ showCookiePreferences }: { showCookiePreferences: boolean }) {
  return (
    <footer className="relative z-1 mt-auto overflow-hidden border-t border-line bg-surface/40">
      <div aria-hidden="true" className="divider-glow absolute inset-x-0 top-0" />
      <div aria-hidden="true" className="absolute -bottom-40 left-1/2 h-80 w-3xl -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgb(79_107_245/0.18),transparent_70%)]" />
      {/* pb-24 deixa o fim do rodapé livre do botão flutuante de WhatsApp. */}
      <div className="container-page relative grid gap-10 pt-14 pb-24 sm:grid-cols-[1.4fr_1fr_1fr]">
        <div className="flex flex-col gap-4">
          <Logo />
          <p className="max-w-xs leading-relaxed text-muted">
            Elevando o seu negócio através da tecnologia. Soluções digitais para pequenas e médias empresas.
          </p>
          <p className="flex items-center gap-2 text-muted">
            <MapPin aria-hidden="true" className="size-4 text-brand-cyan" />
            {site.city}, {site.state}
          </p>
        </div>
        <nav aria-label="Seções" className="flex flex-col gap-2.5">
          <p className="mb-1 text-sm font-bold text-foreground">Navegação</p>
          <Link href="/#servicos" prefetch={false} className={linkClass}>Soluções</Link>
          <Link href="/#simulador" prefetch={false} className={linkClass}>Simulador</Link>
          <Link href="/#como-funciona" prefetch={false} className={linkClass}>Processo</Link>
          <Link href="/#faq" prefetch={false} className={linkClass}>Dúvidas</Link>
        </nav>
        <nav aria-label="Contato e privacidade" className="flex flex-col gap-2.5">
          <p className="mb-1 text-sm font-bold text-foreground">Contato</p>
          <a href={WHATSAPP_CONTACT_URL} target="_blank" rel="noopener noreferrer" className={`${linkClass} flex items-center gap-2`}>
            <WhatsappIcon className="size-4 text-emerald-400" />
            WhatsApp: {site.whatsappDisplay}
          </a>
          <Link href="/privacidade" prefetch={false} className={linkClass}>
            Política de privacidade
          </Link>
          {showCookiePreferences ? <CookiePreferencesButton className={`${linkClass} cursor-pointer text-left`} /> : null}
        </nav>
        <p className="border-t border-line pt-6 text-sm text-subtle sm:col-span-3">
          © {new Date().getFullYear()} {site.name}. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
