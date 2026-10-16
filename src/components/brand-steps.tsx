import { cn } from "@/lib/utils";

// Arte do banner da marca: três degraus em perspectiva nas cores do logo (a ideia de "elevar" do slogan).
// Puramente decorativa; o tamanho, a posição e o esmaecimento vêm de quem usa.
export function BrandSteps({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 640 630" aria-hidden="true" focusable="false" className={cn("pointer-events-none", className)}>
      <polygon points="40,630 220,450 640,450 460,630" fill="#7c3aed" />
      <polygon points="230,436 410,256 640,256 460,436" fill="#4f6bf5" />
      <polygon points="420,242 600,62 640,62 640,242" fill="#22d3ee" />
    </svg>
  );
}
