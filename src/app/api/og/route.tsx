import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#111111",
          padding: "60px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Orange top bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "6px",
            backgroundColor: "#FF5308",
          }}
        />

        {/* Subtle background glow */}
        <div
          style={{
            position: "absolute",
            top: "0",
            right: "0",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(255,83,8,0.08) 0%, transparent 70%)",
          }}
        />

        {/* SST Logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            paddingBlockEnd: "60px",
          }}
        >
          <div
            style={{
              width: "56px",
              height: "56px",
              backgroundColor: "#FF5308",
              borderRadius: "14px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: "20px",
              fontWeight: "bold",
            }}
          >
            SST
          </div>
          <div style={{ color: "#848484", fontSize: "18px" }}>
            SIMPSON STRONG-TIE
          </div>
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: "64px",
            fontWeight: "bold",
            color: "white",
            lineHeight: 1.1,
            paddingBlockEnd: "8px",
          }}
        >
          Team Leader
        </div>
        <div
          style={{
            fontSize: "64px",
            fontWeight: "bold",
            color: "#FF5308",
            lineHeight: 1.1,
            paddingBlockEnd: "30px",
          }}
        >
          Training Academy
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: "24px",
            color: "#848484",
            paddingBlockEnd: "40px",
          }}
        >
          TPS & WCM Certified | 3 Tiers | Voice-Enabled
        </div>

        {/* Tier badges */}
        <div style={{ display: "flex", gap: "16px", paddingBlockEnd: "auto" }}>
          {[
            { label: "Foundation", color: "#22C55E" },
            { label: "Developing", color: "#F59E0B" },
            { label: "Advanced", color: "#8B5CF6" },
          ].map((tier) => (
            <div
              key={tier.label}
              style={{
                padding: "8px 20px",
                borderRadius: "20px",
                backgroundColor: tier.color + "20",
                color: tier.color,
                fontSize: "16px",
                fontWeight: "bold",
              }}
            >
              {tier.label}
            </div>
          ))}
        </div>

        {/* Bottom quote */}
        <div style={{ color: "#555", fontSize: "14px", fontStyle: "italic" }}>
          &ldquo;Great companies are built with great people.&rdquo; — Barc
          Simpson, Founder
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
