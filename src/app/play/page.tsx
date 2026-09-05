import type { Metadata } from "next";
import PortfolioRunner from "@/components/runner/PortfolioRunner";

export const metadata: Metadata = {
  title: "Aman's Next Role — Play the Portfolio",
  description: "A 30-second portfolio runner. Collect Python, RAG, Electron, and React Native skills and discover Aman Anurag's engineering work.",
  alternates: { canonical: "https://aman-portfolio-sigma-eight.vercel.app/play" },
  openGraph: { title: "Aman's Next Role", description: "Play a 30-second runner and explore the engineer behind the work.", url: "https://aman-portfolio-sigma-eight.vercel.app/play" },
  twitter: { card: "summary", title: "Aman's Next Role", description: "Play a 30-second runner and explore the engineer behind the work." },
};

export default function PlayPage() { return <PortfolioRunner />; }
