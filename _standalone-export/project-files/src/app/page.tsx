/**
 * EXPORT-SPECIFIC COPY
 *
 * In the new independent project this is the root page `/`.
 * Source route in the old monorepo was `/client-cases`.
 */

import { StandaloneClientCasesView } from "@/standalone/client-cases/client-cases-view";

/**
 * STANDALONE CLIENT CASES PAGE
 *
 * Independent one-off page.
 * Not part of the primary website flow.
 */
export default function HomePage() {
  return <StandaloneClientCasesView />;
}
