import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Aman Anurag — Senior Full Stack Engineer",
  description:
    "Senior Full Stack Engineer building scalable web, mobile, desktop, AI, and real-time products.",
  keywords: [
    "Aman Anurag",
    "Senior Full Stack Engineer",
    "React Developer",
    "Node.js Developer",
    "AI Engineer",
    "Electron Developer",
  ],
  authors: [{ name: "Aman Anurag" }],
  alternates: {
    canonical: "https://aman-portfolio-sigma-eight.vercel.app/",
  },
  openGraph: {
    title: "Aman Anurag — Senior Full Stack Engineer",
    description:
      "Product and platform engineering across web, mobile, desktop, real-time systems, and applied AI.",
    url: "https://aman-portfolio-sigma-eight.vercel.app/",
    siteName: "Aman Anurag",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Aman Anurag — Senior Full Stack Engineer",
    description:
      "Product and platform engineering across web, mobile, desktop, real-time systems, and applied AI.",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#050505",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
