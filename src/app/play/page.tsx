import type { Metadata } from "next";
import PortfolioRunner from "@/components/runner/PortfolioRunner";

export const metadata: Metadata = {
  title: "Aman: Career Rush — Play the Portfolio",
  description: "An original 3D portfolio runner with a 45-second Recruiter Run and Endless Mode. Collect Python, RAG, Electron, and React Native skills and discover Aman Anurag's engineering work.",
  alternates: { canonical: "https://aman-portfolio-sigma-eight.vercel.app/play" },
  openGraph: { title: "Aman: Career Rush", description: "Run a 3D city and explore the engineer behind the work.", url: "https://aman-portfolio-sigma-eight.vercel.app/play" },
  twitter: { card: "summary", title: "Aman: Career Rush", description: "Run a 3D city and explore the engineer behind the work." },
};

export default function PlayPage() { return <PortfolioRunner />; }
