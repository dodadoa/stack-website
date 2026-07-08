import { readFile } from "node:fs/promises";
import { join } from "node:path";

let cachedLogoDataUrl: string | null = null;

export async function getStackLogoDataUrl() {
  if (!cachedLogoDataUrl) {
    const data = await readFile(join(process.cwd(), "public/assets/LOGO/Stack_logo.png"));
    cachedLogoDataUrl = `data:image/png;base64,${data.toString("base64")}`;
  }

  return cachedLogoDataUrl;
}
