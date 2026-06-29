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
    <html lang="en" className="h-full bg-white antialiased">
      <body className="min-h-full bg-white text-pntrsw-navy">{children}</body>
    </html>
  );
}
