import { ImageResponse } from "next/og";

// Imagem de compartilhamento a partir do banner da marca: fundo escuro, degraus nas cores do logo e o slogan.
export const alt = "Elevio: elevando o seu negócio através da tecnologia. Automação, sites, CRM e tráfego para PMEs.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", background: "#0b1220" }}>
        <svg width="640" height="630" viewBox="0 0 640 630" style={{ position: "absolute", right: 0, top: 0 }}>
          <polygon points="40,630 220,450 640,450 460,630" fill="#7c3aed" />
          <polygon points="230,436 410,256 640,256 460,436" fill="#4f6bf5" />
          <polygon points="420,242 600,62 640,62 640,242" fill="#22d3ee" />
        </svg>
        <div style={{ display: "flex", flexDirection: "column", padding: "72px 80px", color: "white" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <svg width="52" height="56" viewBox="0 0 100 108">
              <polygon points="0,58 0,22 18,0 100,0 81,22 22,22 22,40" fill="#22d3ee" />
              <polygon points="42,42 90,42 70,64 42,64" fill="#4f6bf5" />
              <polygon points="42,42 42,64 21,85 0,85" fill="#2a3a9e" />
              <polygon points="0,85 100,85 79,108 0,108" fill="#7c3aed" />
            </svg>
            <div style={{ fontSize: 40, fontWeight: 700, letterSpacing: -1.2 }}>Elevio</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", marginTop: 80, fontSize: 64, fontWeight: 800, letterSpacing: -2, lineHeight: 1.08 }}>
            <div>Elevando o seu</div>
            <div>negócio através</div>
            <div style={{ color: "#22d3ee" }}>da tecnologia.</div>
          </div>
          <div style={{ marginTop: 28, fontSize: 26, color: "#c9d3e6", maxWidth: 560, lineHeight: 1.4 }}>
            Automação, sites, CRM e tráfego, a partir de um diagnóstico gratuito.
          </div>
        </div>
      </div>
    ),
    size,
  );
}
