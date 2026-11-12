import type { Metadata, Viewport } from "next";
import "@fontsource/instrument-serif/400.css";
import "@fontsource/instrument-serif/400-italic.css";
import "@fontsource-variable/inter-tight/index.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "WIDUKY — Move Different",
  description:
    "Propuesta conceptual de la futura experiencia digital de WIDUKY Pilates · Los Angeles, California.",
};

export const viewport: Viewport = {
  themeColor: "#f7f3ed",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body className="antialiased">{children}</body>
    </html>
  );
}
