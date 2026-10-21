/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  BaseSiteResolverOptions,
  extractOccBaseUrlFromHtml,
} from '@spartacus/setup/ssr/base-site';

export interface StorefrontBaseSiteConfigOptions {
  baseSites: string[];
  indexHtmlPaths: readonly string[];
  readFile: (path: string) => string;
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

/**
 * Produces resolver options for `configureBaseSiteResolver`. Adds `occBaseUrl`
 * when extractable from the index HTML; without it, domain-mode base-site
 * detection is disabled and only path-segment matching is active.
 */
export function createStorefrontBaseSiteConfig(
  options: StorefrontBaseSiteConfigOptions
): BaseSiteResolverOptions {
  const { baseSites, indexHtmlPaths, readFile, warn } = options;

  const occBaseUrl = resolveOccBaseUrl(indexHtmlPaths, readFile);

  if (!occBaseUrl) {
    warn('OCC base URL not found; domain-mode base-site detection is disabled.');
  }

  return occBaseUrl ? { baseSites, occBaseUrl } : { baseSites };
}
