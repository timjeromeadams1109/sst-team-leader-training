import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
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
        <header className="sticky top-0 z-50 bg-sst-dark text-white shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <a href="/" className="flex items-center gap-3">
                <div className="w-8 h-8 bg-sst-orange rounded flex items-center justify-center font-bold text-sm">
                  SST
                </div>
                <div className="hidden sm:block">
                  <div className="text-sm font-bold tracking-wide">
                    SIMPSON STRONG-TIE
                  </div>
                  <div className="text-xs text-gray-400">
                    Team Leader Training
                  </div>
                </div>
              </a>
              <nav className="flex items-center gap-4 text-sm">
                <a
                  href="/academy"
                  className="text-gray-300 hover:text-sst-orange transition-colors"
                >
                  Academy
                </a>
                <a
                  href="/resources"
                  className="text-gray-300 hover:text-sst-orange transition-colors"
                >
                  Documents
                </a>
              </nav>
            </div>
          </div>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="bg-sst-dark text-gray-400 py-8 mt-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-center sm:text-left">
                <div className="text-sm font-semibold text-white">
                  Simpson Strong-Tie
                </div>
                <div className="text-xs mt-1">
                  &ldquo;We help people build safer, stronger homes and
                  buildings.&rdquo;
                </div>
              </div>
              <div className="text-xs text-gray-500">
                BARC: Be Customer Focused · Act with Integrity · Respect Others
                · Continuously Improve
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
