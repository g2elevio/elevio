"use client";

import { useEffect, useRef } from "react";

// Escadaria subindo da esquerda para a direita, das cores da base do logo (violeta) às do topo (ciano):
// a ideia de "elevar" do slogan. Coordenadas no viewBox 1200×800.
const STEPS = [
  { x: 20, y: 640, fill: "#7c3aed" },
  { x: 210, y: 500, fill: "#2a3a9e" },
  { x: 400, y: 360, fill: "#4f6bf5" },
  { x: 590, y: 220, fill: "#3b9ff0" },
  { x: 780, y: 80, fill: "#22d3ee" },
];
const WIDTH = 400;
const HEIGHT = 92;
const SLANT = 92;

const points = ({ x, y }: { x: number; y: number }) =>
  `${x},${y + HEIGHT} ${x + SLANT},${y} ${x + SLANT + WIDTH},${y} ${x + WIDTH},${y + HEIGHT}`;

function Stairs({ lit }: { lit: boolean }) {
  return (
    <svg viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false" className="size-full">
      <defs>
        <linearGradient id={lit ? "steps-stroke-lit" : "steps-stroke"} x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#a78bfa" />
          <stop offset="0.5" stopColor="#818cf8" />
          <stop offset="1" stopColor="#67e8f9" />
        </linearGradient>
      </defs>
      {STEPS.map((step, index) => (
        <polygon
          key={index}
          points={points(step)}
          style={{ "--i": index } as React.CSSProperties}
          fill={step.fill}
          fillOpacity={lit ? 0.55 : 0.1}
          stroke={`url(#${lit ? "steps-stroke-lit" : "steps-stroke"})`}
          strokeOpacity={lit ? 1 : 0.32}
          strokeWidth={lit ? 2.5 : 1.25}
        />
      ))}
    </svg>
  );
}

// Duas camadas iguais: a de baixo, apagada; a de cima, acesa e visível só dentro do círculo de luz.
// Com mouse, a luz segue o cursor; sem mouse (ou parado fora do hero), ela sobe os degraus sozinha via CSS.
export function HeroSteps() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    let x = 0;
    let y = 0;
    const paint = () => {
      frame = 0;
      const rect = element.getBoundingClientRect();
      const inside = y >= rect.top && y <= rect.bottom;
      element.toggleAttribute("data-follow", inside);
      if (!inside) return;
      element.style.setProperty("--hx", `${x - rect.left}px`);
      element.style.setProperty("--hy", `${y - rect.top}px`);
    };
    const onPointerMove = (event: PointerEvent) => {
      x = event.clientX;
      y = event.clientY;
      if (!frame) frame = requestAnimationFrame(paint);
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={ref} aria-hidden="true" className="hero-steps absolute inset-0 mask-[linear-gradient(180deg,#000_70%,transparent)]">
      <div className="absolute inset-0">
        <Stairs lit={false} />
      </div>
      <div className="hero-steps__lit absolute inset-0">
        <Stairs lit />
      </div>
    </div>
  );
}
