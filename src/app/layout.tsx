import type { Metadata } from "next";
import { Anton, Manrope } from "next/font/google";
import "./globals.css";

const fontAnton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap",
});

const fontManrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Esquina Brava | Escuela de Boxeo",
  description: "Una escuela de boxeo con una identidad visual fuerte.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${fontAnton.variable} ${fontManrope.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground selection:bg-brava-gold selection:text-background">
        <div className="noise-overlay pointer-events-none" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
