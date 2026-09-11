"use client";

import { useMemo, useState, type CSSProperties } from "react";
import { StandaloneCollectionWallStrip } from "./collection-wall-strip";
import type {
  StandalonePageConfig,
  StandaloneSubCase,
  StandaloneWall,
} from "./data";
import {
  standaloneClientCasesConfig,
  standaloneFaceWalls,
  standaloneSubCases,
} from "./data";
import { StandaloneProjectCaseList } from "./project-case-list";
import { StandaloneShowreelFullscreen } from "./showreel-fullscreen";

type StandalonePortfolioViewProps = {
  config: StandalonePageConfig;
  subCases: StandaloneSubCase[];
  faceWalls: StandaloneWall[];
  lowercaseTitles?: boolean;
};

function videoSrcForCase(
  subCases: StandaloneSubCase[],
  id: string,
): string | null {
  const wall = subCases.find((item) => item.id === id)?.walls[0];
  return wall?.type === "video" ? wall.src : null;
}

export function StandalonePortfolioView({
  config,
  subCases,
  faceWalls,
  lowercaseTitles = true,
}: StandalonePortfolioViewProps) {
  const defaultId = config.defaultSubCaseId;

  const [activeSubCaseId, setActiveSubCaseId] = useState(defaultId);
  const [seek, setSeek] = useState<{ id: string; gen: number } | null>(null);
  const [openSrc, setOpenSrc] = useState<string | null>(null);

  const walls = useMemo(() => faceWalls, [faceWalls]);

  const selectCase = (id: string) => {
    setActiveSubCaseId(id);
    setSeek((prev) => ({ id, gen: (prev?.gen ?? 0) + 1 }));
  };

  const openShowMore = (id: string) => {
    const src = videoSrcForCase(subCases, id);
    if (!src) return;
    setActiveSubCaseId(id);
    setSeek((prev) => ({ id, gen: (prev?.gen ?? 0) + 1 }));
    setOpenSrc(src);
  };

  const wallSizeStyle = {
    "--scc-wall-height": `calc(var(--scc-wall-width) * ${config.wallSize.height} / ${config.wallSize.width})`,
  } as CSSProperties;

  return (
    <div className="standalone-client-cases scc-root min-h-dvh" style={wallSizeStyle}>
      <div className="scc-body">
        <StandaloneCollectionWallStrip
          walls={walls}
          paused={Boolean(openSrc)}
          seek={seek}
          onFrontChange={setActiveSubCaseId}
        />

        <div className="scc-collection-copy">
          <p className="scc-intro m-0 text-left">
            {config.collectionDescription}
          </p>

          <div className="mt-7">
            <StandaloneProjectCaseList
              subCases={subCases}
              activeId={activeSubCaseId}
              onSelect={selectCase}
              onShowMore={openShowMore}
              lowercaseTitles={lowercaseTitles}
            />
          </div>
        </div>
      </div>

      {openSrc && (
        <StandaloneShowreelFullscreen
          src={openSrc}
          loop
          onClose={() => setOpenSrc(null)}
        />
      )}
    </div>
  );
}

/**
 * STANDALONE CLIENT CASES PAGE
 *
 * Independent one-off page.
 * Not part of the primary website flow.
 * Do not propagate page-specific UI/content/responsive decisions
 * back into the main website unless explicitly requested.
 */
export function StandaloneClientCasesView() {
  return (
    <StandalonePortfolioView
      config={standaloneClientCasesConfig}
      subCases={standaloneSubCases}
      faceWalls={standaloneFaceWalls}
    />
  );
}