import { Metadata } from "next";
import { AnatomyExplorerPageContent } from "@/components/AnatomyExplorerPageContent";

export const metadata: Metadata = {
  title: "ViC – Anatomy Explorer | Intus.AI",
  description:
    "Interactive 3D thoraco-abdominal anatomy for education and communication: teaching cases, training material and patient communication. Not a medical device.",
};

export default function AnatomyExplorerPage() {
  return <AnatomyExplorerPageContent />;
}
