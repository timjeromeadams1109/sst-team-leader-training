import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SST Team Leader Training | Simpson Strong-Tie",
  description:
    "Simpson Strong-Tie Team Leader Training Academy — Building leaders who build safer, stronger structures.",
  keywords: [
    "Simpson Strong-Tie",
    "team leader training",
    "manufacturing leadership",
    "safety",
    "SQDC",
    "lean manufacturing",
    "TPS",
    "WCM",
  ],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#FF5308",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
