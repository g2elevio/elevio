import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { WhatsappButton } from "@/components/whatsapp-button";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Elevio | Soluções digitais para pequenas e médias empresas",
  description:
    "Automação, IA de atendimento no WhatsApp, CRM, landing pages, funis e tráfego pago para PMEs. Peça um diagnóstico gratuito.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <WhatsappButton />
      </body>
    </html>
  );
}
