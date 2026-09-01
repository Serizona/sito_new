import { Metadata } from "next";
import { SurgicalPlanningPageContent } from "@/components/SurgicalPlanningPageContent";

export const metadata: Metadata = {
  title: "ViC – Surgical Planning | Intus.AI",
  description:
    "DICOM/NRRD are AI-segmented and turned into an interactive 3D model, designed to support pre-operative planning. Class IIa medical device software undergoing CE certification.",
};

export default function SurgicalPlanningPage() {
  return <SurgicalPlanningPageContent />;
}
