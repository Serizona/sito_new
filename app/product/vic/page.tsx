import { Metadata } from "next";
import { ProductPageContent } from "@/components/ProductPageContent";

export const metadata: Metadata = {
  title: "VirtualClone (ViC) — Visual Intelligence for Care | IntusAI",
  description:
    "Upload DICOM/NRRD, automatic anonymization and AI segmentation to get a clean, interactive 3D patient twin fast.",
};

export default function ProductPage() {
  return <ProductPageContent />;
}

