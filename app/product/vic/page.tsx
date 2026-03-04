import { Metadata } from "next";
import { ProductPageContent } from "@/components/ProductPageContent";

export const metadata: Metadata = {
  title: "VirtualClone (ViC) | IntusAI",
  description:
    "Upload DICOM/NRRD, automatic anonymization and AI segmentation to get a clean, interactive 3D patient twin fast.",
};

export default function ProductPage() {
  return <ProductPageContent />;
}

