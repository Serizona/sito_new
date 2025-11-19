import { Metadata } from "next";
import { SupportPageContent } from "@/components/SupportPageContent";

export const metadata: Metadata = {
  title: "Support | IntusAI",
  description: "Find documentation or reach the IntusAI team for tailored help.",
};


export default function SupportPage() {
  return <SupportPageContent />;
}

