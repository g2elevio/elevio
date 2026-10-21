import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import { Analytics } from "@/components/analytics";
import { InteractiveEffects } from "@/components/interactive-effects";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { WhatsappButton } from "@/components/whatsapp-button";
import { getGaMeasurementId, getSiteUrl } from "@/lib/env";
import { site } from "@/lib/site";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const title = "Elevio | Soluções digitais para pequenas e médias empresas";
const description =
  "Automação, IA de atendimento no WhatsApp, CRM, landing pages, funis e tráfego pago para PMEs. Peça um diagnóstico gratuito.";

export const metadata: Metadata = {
  metadataBase: getSiteUrl(),
  title,
  description,
  alternates: { canonical: "/" },
  openGraph: { type: "website", locale: "pt_BR", siteName: site.name, url: "/", title, description },
  twitter: { card: "summary_large_image", title, description },
};

export const viewport: Viewport = {
  themeColor: "#070b17",
  colorScheme: "dark",
};

// Marca que há JavaScript antes da primeira pintura: só então os elementos com data-reveal começam ocultos,
// sem piscar e sem esconder conteúdo de quem navega sem script.
const markJs = "document.documentElement.classList.add('js')";

export default function RootLayout({ children }: LayoutProps<"/">) {
  const gaMeasurementId = getGaMeasurementId();
  return (
    <html
      lang="pt-BR"
      suppressHydrationWarning
      className={`${manrope.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: markJs }} />
      </head>
      <body className="flex min-h-full flex-col">
        <a
          href="#conteudo"
          className="fixed top-3 left-4 z-60 -translate-y-24 rounded-lg bg-brand-cyan px-4 py-2 font-semibold text-background focus:translate-y-0"
        >
          Pular para o conteúdo
        </a>
        <InteractiveEffects />
        <SiteHeader />
        <div id="conteudo" className="relative z-1 flex flex-1 flex-col">
          {children}
        </div>
        <SiteFooter showCookiePreferences={Boolean(gaMeasurementId)} />
        <WhatsappButton />
        {gaMeasurementId ? <Analytics measurementId={gaMeasurementId} /> : null}
      </body>
    </html>
  );
}
