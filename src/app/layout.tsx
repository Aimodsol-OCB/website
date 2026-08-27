import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-display", weight: ["500","600","700"] });
const inter = Inter({ subsets: ["latin"], variable: "--font-body" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", weight: ["400","500"] });

export const metadata: Metadata = {
  title: "Digiflow — Software Architecture Studio",
  description: "Digiflow designs and builds full-stack web, mobile, blockchain, and automation systems — architected by senior engineers.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} bg-[#0E1B2E] text-[#EDEFF2] font-[family-name:var(--font-body)] antialiased`}>
        {children}
      </body>
    </html>
  );
}