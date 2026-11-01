import { ImageResponse } from "next/og";
import { site } from "@/content/site";

// Generated once at build time (static export) → /twitter-image.png
export const dynamic = "force-static";
export const alt = `${site.name}: Websites, AI chatbots and AWS cloud`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "linear-gradient(135deg, #0b1220 0%, #172554 60%, #3b0764 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 18,
              background: "linear-gradient(135deg, #2563eb, #7c3aed)",
              display: "flex",
            }}
          />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 34, fontWeight: 700 }}>Cloudnest</div>
            <div style={{ fontSize: 18, letterSpacing: 4, color: "#94a3b8" }}>TECHNOLOGY SOLUTIONS</div>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 68, fontWeight: 800, lineHeight: 1.05, letterSpacing: -2 }}>
            Smart Websites. AI Automation. Enterprise-Grade Cloud.
          </div>
          <div style={{ fontSize: 28, color: "#cbd5e1" }}>
            Web development · AI chatbots · AI integrations · AWS cloud | Pune, India
          </div>
        </div>
      </div>
    ),
    size,
  );
}
