import type { Metadata } from "next";
import { AsciiCursor } from "@/components/AsciiCursor";
import { EVENT_TITLE, SITE_NAME, SITE_URL } from "@/lib/seo";
import "./globals.css";

const DESCRIPTION =
  "Exhibition programme at TCDC Bangkok (4 July) and Goethe-Institut Thailand (11–12 July 2026), presented by Stack.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: EVENT_TITLE,
    template: `%s — ${SITE_NAME}`,
  },
  description: DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "Patch Notes That Refuse a Settled World",
    "Stack",
    "media art exhibition Bangkok",
    "TCDC Bangkok",
    "Goethe-Institut Thailand",
    "Southeast Asia contemporary art",
    "digital art and technology exhibition",
    "speculative design exhibition",
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: EVENT_TITLE,
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: EVENT_TITLE,
    description: DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="gradient-page min-h-full bg-pntrsw-stone text-pntrsw-body">
        <AsciiCursor />
        {children}
      </body>
    </html>
  );
}
