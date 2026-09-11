"use client";

import { StandalonePortfolioView } from "@/standalone/client-cases/client-cases-view";
import {
  referencesFaceWalls,
  referencesPageConfig,
  referencesSubCases,
} from "./data";

export function StandaloneReferencesView() {
  return (
    <StandalonePortfolioView
      config={referencesPageConfig}
      subCases={referencesSubCases}
      faceWalls={referencesFaceWalls}
      lowercaseTitles={false}
    />
  );
}
