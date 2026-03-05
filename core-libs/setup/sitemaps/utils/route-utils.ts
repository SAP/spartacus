/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { RoutesConfig } from '@spartacus/core';

/**
 * Converts a string to a URL-safe slug.
 *
 * This mirrors the logic from Spartacus ProductNameNormalizer.normalizeSlug()
 * to ensure generated URLs match what the storefront would generate.
 *
 * @see projects/core/src/occ/adapters/product/converters/product-name-normalizer.ts
 */
export function slugify(text: string): string {
  // Reserved characters that should be replaced in URLs
  // See https://developers.google.com/maps/documentation/urls/url-encoding
  const reservedChars = ` !*'();:@&=+$,/?%#[]`;
  const slugChar = '-';

  const slugRegex = new RegExp(
    `[${reservedChars.split('').join('\\')}]`,
    'g'
  );
  const sanitizeMultipleSlugChars = new RegExp(`${slugChar}+`, 'g');

  // Remove HTML tags, trim, lowercase, replace reserved chars
  return text
    .replace(/<[^>]*>/g, '') // Remove HTML tags (same as normalize())
    .trim()
    .toLowerCase()
    .replace(slugRegex, slugChar)
    .replace(sanitizeMultipleSlugChars, slugChar);
}

/**
 * Generates a URL path for the given route name and parameters.
 *
 * This function mirrors SemanticPathService.transform() but works in Node.js context.
 * It uses routing configuration exported from Angular via SSR-Bridge.
 *
 * @param routesConfig - Routes configuration from Angular RoutingConfig
 * @param routeName - Name of the route (e.g., 'product', 'category')
 * @param params - Route parameters to fill in the path
 * @returns Generated URL path with leading slash, or undefined if route not found
 *
 * @example
 * ```typescript
 * const routes = SITEMAP_SHARED_STATE.routingConfig;
 * const url = transformRoute(routes, 'product', { code: '123', name: 'Camera' });
 * // Returns: '/product/123/camera'
 * ```
 */
export function transformRoute(
  routesConfig: RoutesConfig | null | undefined,
  routeName: string,
  params: Record<string, string | undefined> = {}
): string | undefined {
  if (!routesConfig) {
    console.warn('[transformRoute] Routes config is null or undefined');
    return undefined;
  }

  const routeConfig = routesConfig[routeName];

  if (!routeConfig || !routeConfig.paths || routeConfig.paths.length === 0) {
    console.warn(`[transformRoute] Route '${routeName}' not found in configuration`);
    return undefined;
  }

  // Find first path that can be filled with given params
  for (const pathPattern of routeConfig.paths) {
    const result = fillPath(pathPattern, params, routeConfig.paramsMapping);
    if (result !== null) {
      return '/' + result;
    }
  }

  // Fallback: use first path and try to fill what we can (partial fill)
  const fallbackPath = fillPath(routeConfig.paths[0], params, routeConfig.paramsMapping, true);
  return fallbackPath ? '/' + fallbackPath : undefined;
}

/**
 * Fills path pattern with parameters.
 *
 * @param pathPattern - Path pattern with :param placeholders (e.g., 'product/:productCode/:name')
 * @param params - Parameters to fill
 * @param paramsMapping - Parameter name mappings (e.g., { productCode: 'code' })
 * @param allowPartial - If true, returns path even if some params are missing
 * @returns Filled path string, or null if required params are missing
 */
function fillPath(
  pathPattern: string,
  params: Record<string, string | undefined>,
  paramsMapping?: Record<string, string>,
  allowPartial = false
): string | null {
  const segments = pathPattern.split('/');
  const result: string[] = [];

  for (const segment of segments) {
    if (segment.startsWith(':')) {
      // This is a parameter
      const paramName = segment.slice(1);

      // paramsMapping maps: route param name -> input param name
      // e.g., { productCode: 'code' } means for :productCode, use params.code
      const mappedName = paramsMapping?.[paramName] || paramName;

      // Try to get value from params using the mapped name first, then original
      const value = params[mappedName] ?? params[paramName];

      if (value !== undefined && value !== null && value !== '') {
        // Slugify the value for URL safety
        result.push(slugify(String(value)));
      } else if (allowPartial) {
        // Skip this segment for partial fills
        continue;
      } else {
        // Required param missing - this path cannot be used
        return null;
      }
    } else {
      // Static segment - keep as-is
      result.push(segment);
    }
  }

  return result.join('/');
}

/**
 * Returns the first configured path pattern for a route.
 */
export function getPathPattern(
  routesConfig: RoutesConfig | null | undefined,
  routeName: string
): string | undefined {
  return routesConfig?.[routeName]?.paths?.[0];
}

