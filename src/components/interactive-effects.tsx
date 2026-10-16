"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

// Efeitos globais num só componente de cliente, sem dependências:
// - revela [data-reveal] ao entrar na tela;
// - marca o <html> com data-scrolled para o cabeçalho ganhar fundo;
// - luz que segue o cursor no fundo e dentro dos cartões .spot (só com mouse).
// Roda de novo a cada troca de rota para observar os elementos da nova página.
export function InteractiveEffects() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;

    const revealObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-in");
          revealObserver.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );
    document.querySelectorAll("[data-reveal]:not(.is-in)").forEach((el) => revealObserver.observe(el));

    const onScroll = () => root.toggleAttribute("data-scrolled", window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const spots = finePointer ? Array.from(document.querySelectorAll<HTMLElement>(".spot")) : [];
    let frame = 0;
    let pointerX = 0;
    let pointerY = 0;

    const paint = () => {
      frame = 0;
      root.style.setProperty("--cx", `${pointerX}px`);
      root.style.setProperty("--cy", `${pointerY}px`);
      for (const card of spots) {
        const rect = card.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > window.innerHeight) continue;
        card.style.setProperty("--mx", `${pointerX - rect.left}px`);
        card.style.setProperty("--my", `${pointerY - rect.top}px`);
      }
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      pointerX = event.clientX;
      pointerY = event.clientY;
      root.setAttribute("data-pointer", "");
      if (!frame) frame = requestAnimationFrame(paint);
    };
    const onPointerLeave = () => root.removeAttribute("data-pointer");

    if (finePointer) {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      root.addEventListener("pointerleave", onPointerLeave);
    }

    return () => {
      revealObserver.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onPointerMove);
      root.removeEventListener("pointerleave", onPointerLeave);
      cancelAnimationFrame(frame);
    };
  }, [pathname]);

  return <div aria-hidden="true" className="cursor-glow" />;
}
