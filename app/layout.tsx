import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-main",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-sub",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "MG Auto | Quality Pre-Owned Cars Philippines",
  description:
    "Browse quality pre-owned cars for sale in the Philippines. Fully inspected, roadworthy certified vehicles with complete service history.",
  keywords: "used cars philippines, pre-owned cars, quality cars for sale, MG Auto",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#0a0a0a] text-[#f5f5f5]">
        {children}
      </body>
    </html>
  );
}
