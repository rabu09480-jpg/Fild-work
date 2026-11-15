import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://fieldwork.studio";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Fieldwork — UI/UX Design Studio for Startups & SaaS",
    template: "%s — Fieldwork",
  },
  description:
    "Fieldwork is a senior UI/UX design studio for startups and SaaS companies. Research-led product design, websites and design systems that lift activation, retention and revenue. Book a free discovery call.",
  keywords: [
    "UI/UX design agency",
    "SaaS product design",
    "startup web design",
    "UX research",
    "design systems",
    "conversion-focused landing pages",
  ],
  authors: [{ name: "Fieldwork Studio" }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Fieldwork",
    title: "Fieldwork — UI/UX Design Studio for Startups & SaaS",
    description:
      "Design that turns visitors into customers. Research-led product design for startups and SaaS teams.",
    images: [{ url: "/images/hero.jpg", width: 1200, height: 720, alt: "Fieldwork design studio" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fieldwork — UI/UX Design Studio for Startups & SaaS",
    description: "Design that turns visitors into customers.",
    images: ["/images/hero.jpg"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0c0f0b",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
        />
        <link
          rel="icon"
          href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Ccircle cx='16' cy='16' r='16' fill='%23a6e36e'/%3E%3Cpath d='M16 5v22M5 16h22M8.2 8.2l15.6 15.6M23.8 8.2 8.2 23.8' stroke='%230c0f0b' stroke-width='2.6' stroke-linecap='round'/%3E%3C/svg%3E"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
