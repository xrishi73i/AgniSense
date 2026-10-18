import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "AgriSense | Smart Irrigation & Agriculture IoT System",
  description:
    "An intelligent soil moisture monitoring and precision irrigation system powered by Raspberry Pi, ADS1115 ADC, and capacitive soil sensing.",
  keywords: [
    "Smart Irrigation",
    "Agriculture IoT",
    "Raspberry Pi",
    "Soil Moisture Sensor",
    "ADS1115",
    "Precision Farming",
    "AgriSense",
  ],
  authors: [{ name: "AgriSense Project Team" }],
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full" data-scroll-behavior="smooth">
      <body className="min-h-full flex flex-col font-sans antialiased bg-[#0b1a13] text-white selection:bg-[#39D98A] selection:text-[#0b1a13]">
        {/* Accessible Skip Link (hidden visually, appears only on keyboard Tab focus) */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-[#39D98A] focus:text-[#0b1a13] focus:font-bold focus:rounded-full focus:shadow-2xl focus:outline-none focus:ring-4 focus:ring-emerald-400 focus:text-sm"
        >
          Skip to main content
        </a>

        <Navbar />
        <main id="main-content" className="flex-1 flex flex-col focus:outline-none" tabIndex={-1}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
