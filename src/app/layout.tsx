/**
 * EXPORT-SPECIFIC COPY
 *
 * Minimal root layout for the independent client-cases app.
 * Derived from the source project's root layout (Inter + --font-inter)
 * plus standalone metadata. Does NOT include the main-site header/nav.
 */

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  weight: "400",
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Кейсы — клиентская презентация",
  description: "Самостоятельная презентационная страница кейсов",
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`h-full ${inter.variable}`}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
