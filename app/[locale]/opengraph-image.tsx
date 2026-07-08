import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { getDictionary } from "@/lib/dictionaries";
import { defaultLocale, isLocale } from "@/lib/i18n";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

type ImageProps = {
  params: Promise<{ locale: string }>;
};

export default async function Image({ params }: ImageProps) {
  const { locale: localeParam } = await params;
  const locale = isLocale(localeParam) ? localeParam : defaultLocale;
  const dict = getDictionary(locale);

  const fontDir = join(
    process.cwd(),
    "public/assets/FONT/GeneralSans_Complete/OTF",
  );
  const [semibold, bold] = await Promise.all([
    readFile(join(fontDir, "GeneralSans-Semibold.otf")),
    readFile(join(fontDir, "GeneralSans-Bold.otf")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "70px 84px",
          fontFamily: "General Sans",
          background:
            "linear-gradient(180deg, #000000 0%, #0c0647 32%, #191790 62%, #1d7ed1 100%)",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 30,
            fontWeight: 700,
            color: "#ffffff",
            letterSpacing: 6,
          }}
        >
          STACK
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 78,
              fontWeight: 700,
              color: "#c4ff00",
              lineHeight: 1.02,
            }}
          >
            Patch Notes
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 78,
              fontWeight: 700,
              color: "#c4ff00",
              lineHeight: 1.02,
            }}
          >
            That Refuse
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 78,
              fontWeight: 700,
              color: "#c4ff00",
              lineHeight: 1.02,
            }}
          >
            A Settled World
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 28,
            fontWeight: 600,
            color: "#ffffff",
          }}
        >
          {dict.home.locations.map((location) => `${location.date} — ${location.venue}`).join("    /    ")}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "General Sans", data: semibold, weight: 600, style: "normal" },
        { name: "General Sans", data: bold, weight: 700, style: "normal" },
      ],
    },
  );
}
