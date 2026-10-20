import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Logo } from "./logo";

// Links com "/#..." funcionam tanto na página inicial (só rolam) quanto na política de privacidade.
const NAV = [
  { href: "/#servicos", label: "Soluções" },
  { href: "/#simulador", label: "Simulador" },
  { href: "/#como-funciona", label: "Processo" },
  { href: "/#sobre", label: "Sobre" },
  { href: "/#faq", label: "Dúvidas" },
] as const;

export function SiteHeader() {
  return (
    <header className="site-header fixed inset-x-0 top-0 z-50 h-18 border-b border-transparent">
      <div className="container-page flex h-full items-center justify-between gap-6">
        <Link href="/" prefetch={false} aria-label="Elevio, página inicial" className="rounded-lg">
          <Logo />
        </Link>
        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex gap-1">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  prefetch={false}
                  className="block rounded-full px-4 py-2 text-[0.95rem] text-muted transition-colors duration-300 hover:bg-white/5 hover:text-foreground"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <Link href="/#diagnostico" prefetch={false} className="btn btn-primary min-h-10 px-4 py-2 text-sm sm:px-5">
          <span className="sm:hidden">Diagnóstico</span>
          <span className="hidden sm:inline">Diagnóstico gratuito</span>
          <ArrowRight aria-hidden="true" className="size-4" />
        </Link>
      </div>
    </header>
  );
}
