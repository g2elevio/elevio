import { ImageResponse } from "next/og";

// Imagem provisória de compartilhamento, só com texto, até existir a identidade visual da Elevio.
export const alt = "Elevio: soluções digitais para pequenas e médias empresas";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "#047857",
          color: "white",
        }}
      >
        <div style={{ fontSize: 96, fontWeight: 700 }}>Elevio</div>
        <div style={{ marginTop: 24, fontSize: 44, lineHeight: 1.3 }}>
          Responda cada cliente na hora e pare de perder vendas no WhatsApp.
        </div>
      </div>
    ),
    size,
  );
}
