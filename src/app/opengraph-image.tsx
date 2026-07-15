import { ImageResponse } from "next/og";
import { SITE_NAME } from "@/lib/site";

export const alt = `${SITE_NAME} — Software Engineer`;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

const BONE = "#F5F5F0";
const JET = "#0a0a0a";
const OXBLOOD = "#8B0000";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: BONE,
          color: JET,
          padding: "64px 72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ width: 56, height: 3, backgroundColor: OXBLOOD }} />
          <div
            style={{
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: 8,
              textTransform: "uppercase",
              color: OXBLOOD,
            }}
          >
            Software Engineer
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 128,
            fontWeight: 900,
            lineHeight: 0.95,
            letterSpacing: -6,
            textTransform: "uppercase",
          }}
        >
          <div style={{ display: "flex" }}>Sonam</div>
          <div style={{ display: "flex" }}>
            Sherpa
            <span style={{ color: OXBLOOD }}>_</span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: `3px solid ${JET}`,
            paddingTop: 28,
            fontSize: 22,
            fontWeight: 700,
            letterSpacing: 6,
            textTransform: "uppercase",
          }}
        >
          <div style={{ display: "flex" }}>React · Next.js · TypeScript</div>
          <div style={{ display: "flex", color: OXBLOOD }}>Australia</div>
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
