import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  id: string;
  eyebrow: string;
  title: ReactNode;
  children?: ReactNode;
  align?: "start" | "center";
  className?: string;
};

// Cabeçalho padrão das seções: sobretítulo em mono, título com destaque em gradiente e texto de apoio.
export function SectionHeading({ id, eyebrow, title, children, align = "start", className }: SectionHeadingProps) {
  return (
    <div
      data-reveal
      className={cn("flex max-w-2xl flex-col gap-4", align === "center" && "mx-auto items-center text-center", className)}
    >
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={id} className="text-3xl leading-[1.12] font-extrabold sm:text-4xl lg:text-[2.75rem]">
        {title}
      </h2>
      {children ? <div className="text-lg leading-relaxed text-muted">{children}</div> : null}
    </div>
  );
}
