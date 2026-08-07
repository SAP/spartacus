/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * SPIKE — not production code.
 * Approach (a): Pure Node — no Angular involved.
 *
 * Shared contract implemented by the base-site resolver. Each spike approach
 * lives on its own branch/worktree and provides its own implementation.
 */

export interface BaseSiteResolverConfig {
  /** OCC backend base URL, e.g. https://backend.com — from process.env['CX_BASE_URL'] */
  occBaseUrl: string;
  /** OCC API prefix. Default: '/occ/v2' */
  occPrefix?: string;
  /** Abort timeout for OCC calls in ms. Default: 3000 (matches OptimizedSsrEngine default) */
  timeoutMs?: number;
  /**
   * Max number of OCC calls allowed in flight at once. When this many resolves
   * are already fetching, further calls fail fast with `ConcurrencyLimitError`
   * instead of queueing. Bounds pressure on the Node event loop and sockets.
   * Default: 10 (matches OptimizedSsrEngine's `concurrency` default).
   */
  maxConcurrentOccCalls?: number;
  /**
   * baseSiteId returned by resolve() when no urlPattern matches the request URL.
   * Supplied by the consuming app (its configured `context.baseSite[0]`), so the
   * framework stays app-agnostic. When omitted, resolve() returns null on no match.
   */
  defaultBaseSite?: string;
}

/** Thrown when OCC is unreachable, errored, or timed out. */
export class OccUnavailableError extends Error {
  constructor(message = 'OCC base-sites request failed') {
    super(message);
    this.name = 'OccUnavailableError';
  }
}

/** Thrown when the in-flight OCC call limit is exceeded (load shedding). */
export class ConcurrencyLimitError extends Error {
  constructor(message = 'OCC call concurrency limit exceeded') {
    super(message);
    this.name = 'ConcurrencyLimitError';
  }
}

export interface BaseSiteResolver {
  /**
   * Resolve the baseSiteId for the given absolute request URL.
   *
   * Returns the matched site's uid, or the configured `defaultBaseSite` when no
   * urlPattern matches (null when no match and no default). Both are normal
   * resolution results.
   *
   * Throws (does not return) on failure:
   * - `ConcurrencyLimitError` when the in-flight OCC call limit is exceeded.
   * - `OccUnavailableError` when the OCC call fails or times out.
   *
   * The consuming app maps these to an HTTP response (e.g. 503); the framework
   * itself carries no HTTP knowledge.
   */
  resolve(requestUrl: string): Promise<string | null>;
}
