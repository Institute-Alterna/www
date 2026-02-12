import type { Metadata } from "next";
import { DM_Sans, DM_Mono, Onest } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const onest = Onest({
  variable: "--font-onest",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Alterna",
    template: "%s | Alterna",
  },
  description:
    "Alterna is a fiscally sponsored 501(c)(3) nonprofit developing computer science resources for people of all ages through programmes like AAIMUN and CHS.",
  keywords: [
    "Institute Alterna",
    "Alterna",
    "computer science",
    "nonprofit",
    "AAIMUN",
    "Computing Honour Society",
    "STEM education",
    "student organisation",
  ],
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: "Alterna",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB">
      <body
        className={`${dmSans.variable} ${onest.variable} ${dmMono.variable} antialiased`}
      >
        <a href="#main-content" className="skip-to-content">
          Skip to content
        </a>
        <SpeedInsights />
        <Analytics />
        <Header />
        <main id="main-content" className="pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
