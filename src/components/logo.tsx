import { cn } from "@/lib/utils";

// Símbolo oficial da Elevio em vetor (mesmos polígonos do banner da marca), leve e nítido em qualquer tamanho.
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 108" aria-hidden="true" focusable="false" className={className}>
      <polygon points="0,58 0,22 18,0 100,0 81,22 22,22 22,40" fill="#22d3ee" />
      <polygon points="42,42 90,42 70,64 42,64" fill="#4f6bf5" />
      <polygon points="42,42 42,64 21,85 0,85" fill="#2a3a9e" />
      <polygon points="0,85 100,85 79,108 0,108" fill="#7c3aed" />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark className="h-8 w-auto" />
      <span className="text-2xl font-bold tracking-tight">Elevio</span>
    </span>
  );
}
