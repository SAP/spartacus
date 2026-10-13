/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  DefaultBaseSiteResolver,
  StaticBaseSite,
  extractOccBaseUrlFromHtml,
} from '@spartacus/setup/ssr/base-site';

export interface StorefrontBaseSiteResolverOptions {
  indexHtmlPaths: readonly string[];
  readFile: (path: string) => string;
  occApiPrefix?: string;
  /**
   * Authoritative, statically configured base-site list. When provided, the
   * resolver matches against it in memory and never calls OCC.
   */
  baseSites?: StaticBaseSite[];
  warn: (message: string) => void;
}

/** Resolves the OCC URL used to create the process-wide base-site resolver. */
export function resolveOccBaseUrl(
  indexHtmlPaths: readonly string[],
  readFile: (path: string) => string
): string | null {
  for (const indexHtmlPath of indexHtmlPaths) {
    try {
      const extractedUrl = extractOccBaseUrlFromHtml(readFile(indexHtmlPath));
      if (extractedUrl) {
        return extractedUrl;
      }
    } catch {
      // Try the next generated index file.
    }
  }

  return null;
}

/** Creates the demo's resolver, or degrades gracefully when OCC is unconfigured. */
export function createStorefrontBaseSiteResolver(
  options: StorefrontBaseSiteResolverOptions
): DefaultBaseSiteResolver | undefined {
  if (options.baseSites?.length) {
    return new DefaultBaseSiteResolver({ baseSites: options.baseSites });
  }

  const occBaseUrl = resolveOccBaseUrl(
    options.indexHtmlPaths,
    options.readFile
  );

  if (!occBaseUrl) {
    options.warn(
      'SSR base-site detection is disabled because no OCC base URL is configured.'
    );
    return undefined;
  }

  return new DefaultBaseSiteResolver({
    occBaseUrl,
    occApiPrefix: options.occApiPrefix,
  });
}
