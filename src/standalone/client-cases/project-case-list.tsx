"use client";

import { useState } from "react";
import type { StandaloneSubCase } from "./data";

type ProjectCaseListProps = {
  subCases: StandaloneSubCase[];
  activeId: string;
  onSelect: (id: string) => void;
  onShowMore?: (id: string) => void;
  lowercaseTitles?: boolean;
};

export function StandaloneProjectCaseList({
  subCases,
  activeId,
  onSelect,
  onShowMore,
  lowercaseTitles = true,
}: ProjectCaseListProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <ul className="scc-case-list m-0 flex w-full list-none flex-col gap-3 p-0">
      {subCases.map((subCase) => {
        const isActive = subCase.id === activeId;
        const isOpen = openId === subCase.id;
        const hasDescription = Boolean(subCase.description);

        return (
          <li key={subCase.id} className="scc-case-item">
            <div
              className={`scc-case-row grid w-full grid-cols-[18px_1fr_auto] items-center gap-x-[28px]${
                isActive ? " is-active" : ""
              }`}
            >
              <button
                type="button"
                onClick={() => {
                  onSelect(subCase.id);
                  if (!hasDescription) return;
                  setOpenId((current) =>
                    current === subCase.id ? null : subCase.id,
                  );
                }}
                aria-expanded={hasDescription ? isOpen : undefined}
                className={`col-span-2 grid min-h-11 grid-cols-[18px_1fr] items-center gap-x-[28px] border-0 bg-transparent p-0 text-left leading-none${
                  lowercaseTitles ? " lowercase" : ""
                }`}
              >
                <span
                  className="block h-[18px] w-[18px] shrink-0 rounded-full"
                  style={{
                    backgroundColor: isActive
                      ? "var(--color-foreground)"
                      : "var(--color-muted)",
                  }}
                  aria-hidden
                />

                <span
                  className={
                    isActive
                      ? "text-[var(--color-foreground)]"
                      : "text-[var(--color-muted)]"
                  }
                >
                  {subCase.title}
                </span>
              </button>

              {onShowMore ? (
                <button
                  type="button"
                  className="scc-case-more border-0 bg-transparent p-0 text-left lowercase leading-none"
                  onClick={() => onShowMore(subCase.id)}
                  tabIndex={isActive ? 0 : -1}
                  aria-hidden={!isActive}
                >
                  ещё
                </button>
              ) : (
                <span className="scc-case-more">ещё</span>
              )}
            </div>

            {hasDescription ? (
              <div
                className={`scc-case-desc${isOpen ? " is-open" : ""}`}
                aria-hidden={!isOpen}
              >
                <div className="scc-case-desc__inner">
                  <p className="scc-case-desc__text">{subCase.description}</p>
                </div>
              </div>
            ) : null}
          </li>
        );
      })}
    </ul>
  );
}
