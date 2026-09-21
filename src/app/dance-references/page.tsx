import type { Metadata } from "next";
import { StandaloneDanceReferencesView } from "@/standalone/dance-references/dance-references-view";

export const metadata: Metadata = {
  title: "Референсы для школы танцев",
  description: "Подборка визуальных и digital-направлений для школы танцев.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function DanceReferencesPage() {
  return <StandaloneDanceReferencesView />;
}
