/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/** Options for the default OCC-backed base-site resolver. */
export interface DefaultBaseSiteResolverOptions {
  /** OCC backend base URL, for example `https://api.example.com`. */
  occBaseUrl: string;
  /** OCC API prefix. Default: `/occ/v2`. */
  occApiPrefix?: string;
  /** Value returned when no base-site URL pattern matches. Default: `null`. */
  defaultBaseSite?: string | null;
  /** In-memory base-sites cache lifetime in milliseconds. Default: `60_000`. */
  cacheTtlMs?: number;
  /**
   * Maximum number of cold-cache callers allowed to await the shared OCC
   * request. Additional callers fail fast. Default: `10`.
   */
  concurrencyLimit?: number;
  /** OCC request timeout in milliseconds. Default: `3_000`. */
  timeoutMs?: number;
}

/** Resolves a storefront request URL to an OCC base-site uid. */
export interface BaseSiteResolver {
  resolve(requestUrl: string): Promise<string | null>;
}

/** Thrown when the cold-cache concurrency limit has been reached. */
export class ConcurrencyLimitError extends Error {
  constructor(message = 'Base-site resolver concurrency limit exceeded') {
    super(message);
    this.name = 'ConcurrencyLimitError';
  }
}

/** Thrown when OCC cannot provide a usable base-sites response. */
export class OccUnavailableError extends Error {
  constructor(
    message = 'OCC base-sites request failed',
    options?: ErrorOptions
  ) {
    super(message, options);
    this.name = 'OccUnavailableError';
  }
}
