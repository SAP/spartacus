/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * SPIKE — not production code.
 * Branch: spike/base-site-detection-approaches
 *
 * Shared contract implemented by all base-site resolver approaches.
 * To switch approaches: comment/uncomment the relevant import block in server.ts.
 */

export interface BaseSiteResolverConfig {
  /** OCC backend base URL, e.g. https://backend.com — from process.env['CX_BASE_URL'] */
  occBaseUrl: string;
  /** OCC API prefix. Default: '/occ/v2' */
  occPrefix?: string;
  /** Abort timeout for OCC calls in ms. Default: 3000 (matches OptimizedSsrEngine default) */
  timeoutMs?: number;
  /** How long to keep the cached base-sites list. Default: 60_000 ms */
  cacheTtlMs?: number;
}

export interface BaseSiteResolver {
  /**
   * One-time warm-up: fetch base-sites from OCC and cache them.
   * Call once at server startup before handling any requests.
   */
  initialize(): Promise<void>;

  /**
   * Resolve the baseSiteId for the given absolute request URL.
   * Returns null when no site matches or when OCC is unreachable.
   */
  resolve(requestUrl: string): Promise<string | null>;

  /** Release resources. */
  destroy(): Promise<void>;
}
