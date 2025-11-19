import { Metadata } from "next";
import { DatasetPageContent } from "@/components/DatasetPageContent";

export const metadata: Metadata = {
  title: "Dataset | IntusAI",
  description:
    "High-quality abdominal and thoracic surgical imaging datasets for AI development, radiomics and clinical collaborations.",
};

export default function DatasetPage() {
  return <DatasetPageContent />;
}

