import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "../components/SmoothScroll";
import ParticleBackground from "../components/ParticleBackground";
import CustomCursor from "../components/CustomCursor";
import CommandPalette from "../components/CommandPalette";
import AiAssistant from "../components/AiAssistant";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Premium SEO Metadata definition
export const metadata: Metadata = {
  title: "Siddharth Gavali | Aspiring Software Developer Portfolio",
  description: "Personal portfolio of Siddharth Gavali, computer science engineering student specializing in Java, full-stack web, and mobile app developments (StudentSync, LendFlow). Discover technical skills, experiences, and academic achievements.",
  keywords: ["Siddharth Gavali", "Software Developer", "StudentSync", "LendFlow", "KIT Kolhapur", "Computer Science Engineering", "Portfolio"],
  authors: [{ name: "Siddharth Gavali" }],
  creator: "Siddharth Gavali",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://siddharth-gavali.vercel.app",
    title: "Siddharth Gavali | Aspiring Software Developer Portfolio",
    description: "Technical portfolio of Siddharth Gavali. Features projects like StudentSync attendance tracker, LendFlow lender dashboard, coding profiles, and experience milestones.",
    siteName: "Siddharth Gavali Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Siddharth Gavali | Aspiring Software Developer Portfolio",
    description: "Technical portfolio of Siddharth Gavali. Features projects like StudentSync attendance tracker, LendFlow lender dashboard, coding profiles, and experience milestones.",
  },
};

export const viewport: Viewport = {
  themeColor: "#030303",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      data-theme="dark" // Default Dark Mode
    >
      <body className="min-h-full flex flex-col relative">
        <SmoothScroll>
          {/* Global Visual Enhancements */}
          <ParticleBackground />
          <CustomCursor />
          <CommandPalette />
          
          {/* Main App Page Router Content */}
          <div className="flex flex-col flex-1 relative z-10 w-full">
            {children}
          </div>

          <AiAssistant />
        </SmoothScroll>
      </body>
    </html>
  );
}
