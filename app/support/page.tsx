import { Metadata } from "next";
import { SupportPageContent } from "@/components/SupportPageContent";

export const metadata: Metadata = {
  title: "Support | Intus.AI",
  description: "Find documentation or reach the Intus.AI team for tailored help.",
};


export default function SupportPage() {
  return <SupportPageContent />;
}

