import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#010004",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              fontSize: 104,
              fontWeight: 700,
              color: "#ffffff",
              letterSpacing: -4,
              lineHeight: 1,
            }}
          >
            S
          </span>
          <span
            style={{
              marginTop: 12,
              width: 64,
              height: 14,
              background: "#c4ff00",
            }}
          />
        </div>
      </div>
    ),
    { ...size },
  );
}
