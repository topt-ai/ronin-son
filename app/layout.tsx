import type { Metadata } from "next";
import { Cormorant, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Grain from "@/components/Grain";
import CursorTrail from "@/components/CursorTrail";

const cormorant = Cormorant({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "RONIN & SON · Some things are still made by hand",
  description:
    "The birth of a katana in five chapters. A fictional artisan forge house, told as a scroll driven story.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${cormorant.variable} ${inter.variable} ${jetbrains.variable} antialiased`}
      >
        {/* Keeps content visible if JS never runs (js-reveal hides for SplitText) */}
        <noscript>
          <style>{`.js-reveal { visibility: visible !important; }`}</style>
        </noscript>
        <SmoothScroll />
        <CursorTrail />
        {children}
        <Grain />
      </body>
    </html>
  );
}
