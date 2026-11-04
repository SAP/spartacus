/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/** Options for the default base-site resolver. */
export interface BaseSiteResolverOptions {
  /** Base-site uids for local resolution; omit or leave empty to use OCC. */
  pathBaseSiteIds?: string[];
  /**
   * OCC backend base URL, supplied directly or extracted from the
   * `occ-backend-base-url` meta tag in HTML content. Choose one source.
   * Local resolution with nonempty `pathBaseSiteIds` needs no OCC address.
   */
  occBaseUrl?:
    | { value: string; extractFromHtmlMetaTag?: never }
    | { value?: never; extractFromHtmlMetaTag: string };
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
  /** Uses OCC URL-pattern matching when no base-site IDs are supplied. */
  readonly supportsOccResolution: boolean;
  /**
   * Returns the leading path segment of `requestUrl` when it matches a known
   * uid, otherwise `null`. Never performs I/O.
   */
  resolveFromPath(requestUrl: string): string | null;
  /**
   * Contacts OCC to match `requestUrl` against the base-site URL patterns.
   * When `pathBaseSiteId` is provided, only that uid can match.
   * Returns the matched uid, or `null` if none matches.
   */
  resolveFromOcc(
    requestUrl: string,
    pathBaseSiteId?: string
  ): Promise<string | null>;
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
