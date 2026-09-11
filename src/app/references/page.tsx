import type { Metadata } from "next";
import { StandaloneReferencesView } from "@/standalone/references/references-view";

export const metadata: Metadata = {
  title: "Референсы",
  description: "Подборка визуальных и digital-направлений для проекта.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ReferencesPage() {
  return <StandaloneReferencesView />;
}
