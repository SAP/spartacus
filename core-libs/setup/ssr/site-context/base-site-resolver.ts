/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * SPIKE — not production code.
 * Approach (b): createApplication() / renderApplication() with Spartacus DI.
 *
 * Contract implemented by the base-site resolver.
 */

export interface BaseSiteResolverConfig {
  /** OCC backend base URL, e.g. https://backend.com — from process.env['CX_BASE_URL'] */
  occBaseUrl: string;
  /** OCC API prefix. Default: '/occ/v2' */
  occPrefix?: string;
  /** Abort timeout for OCC calls in ms. Default: 3000 (matches OptimizedSsrEngine default) */
  timeoutMs?: number;
  /**
   * baseSiteId returned by resolve() when no urlPattern matches the request URL.
   * In production this comes from the app's configured `context.baseSite[0]`
   * (SiteContextConfig). When omitted, resolve() returns null on no match.
   */
  defaultBaseSite?: string;
}

export interface BaseSiteResolver {
  /**
   * One-time warm-up hook. Called once at server startup before handling any
   * requests. This resolver is cacheless — each resolve() boots a fresh
   * Angular app and fetches from OCC — so initialize() only warms the
   * platform-server module graph; it does not fetch or cache base-sites.
   */
  initialize(): Promise<void>;

  /**
   * Resolve the baseSiteId for the given absolute request URL.
   *
   * Returns:
   *   - the matched site's uid, or
   *   - the configured `defaultBaseSite` (or null) when the app rendered
   *     cleanly but no urlPattern matched the URL.
   *
   * Throws:
   *   - `OccUnavailableError` when the underlying render times out or fails,
   *     so the Express handler can map it to a 503 instead of silently
   *     serving default content.
   */
  resolve(requestUrl: string): Promise<string | null>;

  /** Release resources. */
  destroy(): Promise<void>;
}

/**
 * Thrown by resolve() when the base-site render/fetch cannot complete
 * (OCC unreachable or timed out). The Express handler maps this to
 * `503 Service Unavailable` + Retry-After rather than serving default content.
 *
 * Note: an OCC error raised *inside* the NgRx effect does NOT surface here —
 * the effect swallows it (catch → return null), so a clean render against a
 * failed OCC still returns `defaultBaseSite`. Only a render timeout or a
 * render-level throw reaches this taxonomy. See the ADR con for details.
 */
export class OccUnavailableError extends Error {
  constructor(message: string, readonly originalError?: unknown) {
    super(message);
    this.name = 'OccUnavailableError';
  }
}
