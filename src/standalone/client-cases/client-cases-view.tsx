"use client";

import { useMemo, useState, type CSSProperties } from "react";
import { StandaloneCollectionWallStrip } from "./collection-wall-strip";
import {
  standaloneClientCasesConfig,
  standaloneFaceWalls,
  standaloneSubCases,
} from "./data";
import { StandaloneProjectCaseList } from "./project-case-list";
import { StandaloneShowreelFullscreen } from "./showreel-fullscreen";

function videoSrcForCase(id: string): string | null {
  const wall = standaloneSubCases.find((item) => item.id === id)?.walls[0];
  return wall?.type === "video" ? wall.src : null;
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
  const config = standaloneClientCasesConfig;
  const subCases = standaloneSubCases;
  const defaultId = config.defaultSubCaseId;

  const [activeSubCaseId, setActiveSubCaseId] = useState(defaultId);
  const [seek, setSeek] = useState<{ id: string; gen: number } | null>(null);
  const [openSrc, setOpenSrc] = useState<string | null>(null);

  const walls = useMemo(() => standaloneFaceWalls, []);

  const selectCase = (id: string) => {
    setActiveSubCaseId(id);
    setSeek((prev) => ({ id, gen: (prev?.gen ?? 0) + 1 }));
  };

  const openShowMore = (id: string) => {
    const src = videoSrcForCase(id);
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