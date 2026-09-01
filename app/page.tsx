import { Metadata } from "next";
import { HomePageContent } from "@/components/HomePageContent";

export const metadata: Metadata = {
  title: "Intus.AI — Imaging Intelligence",
  description:
    "We turn medical images into decisions. Discover VirtualClone (ViC), AI segmentation and crisp 3D for surgical planning.",
};

export default function Home() {
  return <HomePageContent />;
}

