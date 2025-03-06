import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const geistSans = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rango na Mão",
  description: "Sistema de delivery",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.className}`}>
        {children}
      </body>
    </html>
  );
}
