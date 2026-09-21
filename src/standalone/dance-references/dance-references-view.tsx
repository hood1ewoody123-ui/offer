"use client";

import { StandalonePortfolioView } from "@/standalone/client-cases/client-cases-view";
import {
  danceReferencesFaceWalls,
  danceReferencesPageConfig,
  danceReferencesSubCases,
} from "./data";

export function StandaloneDanceReferencesView() {
  return (
    <StandalonePortfolioView
      config={danceReferencesPageConfig}
      subCases={danceReferencesSubCases}
      faceWalls={danceReferencesFaceWalls}
      lowercaseTitles={false}
    />
  );
}
