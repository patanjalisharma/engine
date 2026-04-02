import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { PT_Sans } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const ptSans = PT_Sans({
  subsets: ["latin"],
  weight: ["400", "700"], // PT Sans mainly uses these
  variable: "--font-pt-sans",
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mini Engine",
  description: "Made by Patanjali Sharma",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${ptSans.variable}  h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
