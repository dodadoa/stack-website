import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
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
              fontSize: 20,
              fontWeight: 700,
              color: "#ffffff",
              letterSpacing: -1,
              lineHeight: 1,
            }}
          >
            S
          </span>
          <span
            style={{
              marginTop: 2,
              width: 12,
              height: 3,
              background: "#c4ff00",
            }}
          />
        </div>
      </div>
    ),
    { ...size },
  );
}
