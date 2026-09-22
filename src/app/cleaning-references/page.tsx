import type { Metadata } from "next";
import { StandaloneCleaningReferencesView } from "@/standalone/cleaning-references/cleaning-references-view";

export const metadata: Metadata = {
  title: "Референсы сайтов",
  description: "Подборка визуальных и digital-направлений.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function CleaningReferencesPage() {
  return <StandaloneCleaningReferencesView />;
}
