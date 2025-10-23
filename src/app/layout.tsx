import type { Metadata, Viewport } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { DemoModeButton } from "@/components/ui/demo-mode-button";
import { AmbientAudioToggle } from "@/components/ui/ambient-audio-toggle";
import { ThemeToggle } from "@/components/ui/theme-toggle";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk"
});

export const metadata: Metadata = {
  metadataBase: new URL("https://agentic-7afb9777.vercel.app"),
  title: "Chess Trainer AI — Master Openings Smarter, Faster, Forever",
  description:
    "Cinematic, AI-powered chess training platform with spaced repetition, immersive 3D visualizations, and offline-first experience.",
  manifest: "/manifest.webmanifest",
  icons: [
    { rel: "icon", url: "/icon.svg" },
    { rel: "apple-touch-icon", url: "/icon.svg" }
  ],
  openGraph: {
    title: "Chess Trainer AI",
    description:
      "Master chess openings and tactics with AI-powered spaced repetition, cinematic 3D training, and offline-first experience.",
    url: "https://agentic-7afb9777.vercel.app",
    siteName: "Chess Trainer AI",
    images: [
      {
        url: "/og-cover.png",
        width: 1200,
        height: 630,
        alt: "Chess Trainer AI cinematic landing"
      }
    ]
  }
};

export const viewport: Viewport = {
  themeColor: "#060712",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${spaceGrotesk.variable} font-sans relative min-h-screen`}> 
        <Providers>
          <div className="fixed z-50 top-6 right-6 flex items-center gap-3">
            <AmbientAudioToggle />
            <ThemeToggle />
          </div>
          <DemoModeButton />
          {children}
        </Providers>
      </body>
    </html>
  );
}
