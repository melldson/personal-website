import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import { Desktop } from "@/components/Desktop";
import { SITE } from "@/lib/content";
import "./globals.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: SITE.title,
  description: SITE.oneLiner,
  applicationName: SITE.title,
  authors: [{ name: SITE.name }],
  robots: { index: true, follow: true },
  alternates: {
    types: {
      "text/markdown": "/md/about",
    },
  },
  openGraph: {
    title: SITE.title,
    description: SITE.oneLiner,
    siteName: SITE.title,
    type: "website",
    locale: "en",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistMono.variable} h-full antialiased`}>
      <body className={`${geistMono.className} min-h-full antialiased`}>
        <Desktop>{children}</Desktop>
      </body>
    </html>
  );
}
