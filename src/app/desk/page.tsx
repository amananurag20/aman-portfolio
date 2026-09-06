import type { Metadata } from "next";
import DeveloperDesk from "@/components/desk/DeveloperDesk";

export const metadata: Metadata = {
  title: "Developer Desk | Aman Anurag",
  description: "Explore Aman Anurag’s AI, React Native, Electron, and backend projects through an interactive 3D desk and a 30-second guided tour.",
  alternates: { canonical: "https://aman-portfolio-sigma-eight.vercel.app/desk" },
  openGraph: { title: "Developer Desk | Aman Anurag", description: "Four devices. Real projects. Explore the engineering behind the work.", url: "https://aman-portfolio-sigma-eight.vercel.app/desk", type: "website" },
};

export default function DeskPage() { return <DeveloperDesk />; }
