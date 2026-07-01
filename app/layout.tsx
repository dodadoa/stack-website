import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PATCH NOTES THAT REFUSE A SETTLED WORLD",
  description:
    "Exhibition programme at TCDC Bangkok / Goethe-Institut Thailand, 4, 11–12 July 2026.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="gradient-page min-h-full bg-pntrsw-stone text-pntrsw-body">{children}</body>
    </html>
  );
}
