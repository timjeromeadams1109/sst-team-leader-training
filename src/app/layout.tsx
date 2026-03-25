import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { InactivityGuard } from "@/components/layout/InactivityGuard";
import { FloatingChat } from "@/components/layout/FloatingChat";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sst-team-leader-training.vercel.app"),
  title: "SST Team Leader Training | Simpson Strong-Tie",
  description:
    "Simpson Strong-Tie Team Leader Training Academy — Building leaders who build safer, stronger structures. TPS & WCM certified.",
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
  openGraph: {
    title: "SST Team Leader Training Academy",
    description:
      "Build the skills to lead with excellence. 3-tier training grounded in Toyota Production System & World Class Manufacturing.",
    url: "https://sst-team-leader-training.vercel.app",
    siteName: "Simpson Strong-Tie Training",
    images: [
      {
        url: "/api/og",
        width: 1200,
        height: 630,
        alt: "SST Team Leader Training Academy",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SST Team Leader Training Academy",
    description:
      "Build the skills to lead with excellence. TPS & WCM certified training.",
    images: ["/api/og"],
  },
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
        <InactivityGuard />
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingChat />
      </body>
    </html>
  );
}
