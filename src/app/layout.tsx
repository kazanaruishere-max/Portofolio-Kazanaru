import type { Metadata, Viewport } from "next";
import { JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";
import { Cursor, GrainOverlay, SmoothScroll } from "@/components/ui";
import { PageTransition } from "@/components/PageTransition";
import { ClientErrorCapture } from "@/components/ClientErrorCapture";
import { LanguageProvider } from "@/lib/lang";
import "./globals.css";

const clashDisplay = localFont({
  src: "./fonts/ClashDisplay-Variable.woff2",
  variable: "--font-clash-display",
  display: "swap",
  weight: "200 700",
});

const satoshi = localFont({
  src: "./fonts/Satoshi-Variable.woff2",
  variable: "--font-satoshi",
  display: "swap",
  weight: "300 900",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Azka Syahirull · AI Developer",
    template: "%s · Azka Syahirull",
  },
  description:
    "AI Developer asal Indonesia · membangun AI untuk dampak nyata: keamanan finansial, anti-fraud, dan quantitative trading.",
  keywords: [
    "AI Developer",
    "Azka Syahirull",
    "AI Engineering",
    "RAG",
    "LLM",
    "Quantitative Trading",
    "Next.js",
    "Rust",
    "Indonesia",
  ],
  creator: "Azka Syahirull",
  authors: [{ name: "Azka Syahirull", url: "https://github.com/kazanaruishere-max" }],
  metadataBase: new URL("https://azkasyahirull.dev"),
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: "Azka Syahirull · AI Developer",
    title: "Azka Syahirull · AI Developer",
    description:
      "AI Developer asal Indonesia · membangun AI untuk dampak nyata: keamanan finansial, anti-fraud, dan quantitative trading.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Azka Syahirull · AI Developer",
    description:
      "AI Developer asal Indonesia · membangun AI untuk dampak nyata.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Azka Syahirull",
  url: "https://azkasyahirull.dev",
  jobTitle: "AI Developer",
  description:
    "AI Developer asal Indonesia · membangun AI untuk dampak nyata: keamanan finansial, anti-fraud, dan quantitative trading.",
  email: "azkasyahirull10@gmail.com",
  sameAs: ["https://github.com/kazanaruishere-max"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`dark ${clashDisplay.variable} ${satoshi.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-dvh bg-bg text-text antialiased">
        <LanguageProvider>
          <SmoothScroll>
            <PageTransition>{children}</PageTransition>
            <GrainOverlay />
            <Cursor />
          </SmoothScroll>
          <ClientErrorCapture />
        </LanguageProvider>
      </body>
    </html>
  );
}
