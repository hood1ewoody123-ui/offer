"use client";

import { StandalonePortfolioView } from "@/standalone/client-cases/client-cases-view";
import {
  cleaningReferencesFaceWalls,
  cleaningReferencesPageConfig,
  cleaningReferencesSubCases,
} from "./data";

export function StandaloneCleaningReferencesView() {
  return (
    <StandalonePortfolioView
      config={cleaningReferencesPageConfig}
      subCases={cleaningReferencesSubCases}
      faceWalls={cleaningReferencesFaceWalls}
      lowercaseTitles={false}
    />
  );
}
