import { getStackLogoDataUrl } from "@/lib/stackLogo";
import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
  const logo = await getStackLogoDataUrl();

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
        <img src={logo} width={148} height={26} alt="" />
      </div>
    ),
    { ...size },
  );
}
