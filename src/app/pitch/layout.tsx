import type { Metadata, Viewport } from "next";
import { Geist_Mono, Inter } from "next/font/google";
import "./pitch.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://vinvaro.com"),
  title: "VINVARO voor autobedrijven: presentatie",
  description: "Hoe VINVARO voorraad, klanten en processen van een autobedrijf samenbrengt in één werkplek.",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = { themeColor: "#ffffff" };

export default function PitchLayout({ children }: LayoutProps<"/pitch">) {
  return (
    <html lang="nl-NL" className={`${inter.variable} ${geistMono.variable} antialiased`}>
      <body className="font-sans text-ink">{children}</body>
    </html>
  );
}
