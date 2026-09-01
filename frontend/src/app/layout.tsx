import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lumina | Catálogo Espiritual & Intencional",
  description: "Descubra produtos energéticos através da sua real intenção e momento espiritual.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-spiritual-50 text-spiritual-900 antialiased flex flex-col justify-between">
        {children}
      </body>
    </html>
  );
}
