/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Route configuration for URL generation.
 * Mirrors Spartacus RoutingConfig structure for Node.js context.
 */
export interface RouteConfig {
  /**
   * URL path patterns with parameters (e.g., 'product/:productCode/:name')
   */
  paths: string[];

  /**
   * Parameter name mappings (e.g., { productCode: 'code' })
   */
  paramsMapping?: Record<string, string>;
}

/**
 * Routes configuration map
 */
export type RoutesConfig = Record<string, RouteConfig>;

/**
 * Default Spartacus routes configuration.
 *
 * **IMPORTANT:** These are the default routes from Spartacus. If your application
 * customizes routing configuration (e.g., pretty URLs, different path patterns),
 * you MUST pass your custom routes configuration to UrlPathService or via
 * SitemapConfig.routes to ensure generated URLs match your actual storefront URLs.
 *
 * @see storefrontlib/cms-structure/routing/default-routing-config.ts
 */
export const DEFAULT_ROUTES_CONFIG: RoutesConfig = {
  home: { paths: [''] },
  product: {
    paths: ['product/:productCode/:name', 'product/:productCode'],
    paramsMapping: { productCode: 'code' },
  },
  category: {
    paths: ['category/:categoryCode'],
    paramsMapping: { categoryCode: 'code' },
  },
  search: { paths: ['search/:query'] },
  brand: { paths: ['Brands/:brandName/c/:brandCode'] },
};

/**
 * Node.js service for generating semantic URLs.
 *
 * This service mirrors the functionality of Spartacus SemanticPathService
 * but works in Node.js/Express context without Angular DI.
 *
 * **IMPORTANT:** If your application customizes routing, you must pass
 * your custom routes configuration to ensure URL correctness:
 *
 * @example
 * ```typescript
 * // Option 1: Pass routes to constructor
 * const urlService = new UrlPathService({
 *   product: {
 *     paths: ['p/:productCode/:slug'],  // Your custom path
 *     paramsMapping: { productCode: 'code' },
 *   },
 * });
 *
 * // Option 2: Pass routes via SitemapConfig
 * setupSitemaps(server, {
 *   config: {
 *     routes: {
 *       product: { paths: ['p/:productCode/:slug'] },
 *     },
 *   },
 * });
 * ```
 *
 * @example
 * ```typescript
 * const urlService = new UrlPathService();
 *
 * // Generate product URL
 * const url = urlService.transform('product', {
 *   productCode: '12345',
 *   name: 'camera-lens'
 * });
 * // Returns: '/product/12345/camera-lens'
 * ```
 */
export class UrlPathService {
  protected routesConfig: RoutesConfig;

  constructor(customRoutes?: Partial<RoutesConfig>) {
    this.routesConfig = { ...DEFAULT_ROUTES_CONFIG, ...customRoutes };
  }

  /**
   * Generates a URL path for the given route name and parameters.
   *
   * @param routeName - Name of the route (e.g., 'product', 'category')
   * @param params - Route parameters to fill in the path
   * @returns Generated URL path with leading slash, or undefined if route not found
   */
  transform(routeName: string, params: Record<string, string | undefined> = {}): string | undefined {
    const routeConfig = this.routesConfig[routeName];

    if (!routeConfig || !routeConfig.paths || routeConfig.paths.length === 0) {
      console.warn(`[UrlPathService] Route '${routeName}' not found in configuration`);
      return undefined;
    }

    // Try to find a path that can be filled with given params
    for (const pathPattern of routeConfig.paths) {
      const result = this.fillPath(pathPattern, params, routeConfig.paramsMapping);
      if (result !== null) {
        return '/' + result;
      }
    }

    // Fallback: use first path and try to fill what we can
    const fallbackPath = this.fillPath(routeConfig.paths[0], params, routeConfig.paramsMapping, true);
    return fallbackPath ? '/' + fallbackPath : undefined;
  }

  /**
   * Fills path pattern with parameters.
   *
   * @param pathPattern - Path pattern with :param placeholders
   * @param params - Parameters to fill
   * @param paramsMapping - Optional parameter name mappings
   * @param allowPartial - If true, returns path even if some params are missing
   * @returns Filled path string, or null if required params are missing
   */
  protected fillPath(
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
        const mappedName = paramsMapping?.[paramName] || paramName;

        // Try to get value from params using both original and mapped names
        const value = params[paramName] ?? params[mappedName];

        if (value !== undefined && value !== null && value !== '') {
          result.push(this.slugify(String(value)));
        } else if (allowPartial) {
          // Skip this segment for partial fills
          continue;
        } else {
          // Required param missing
          return null;
        }
      } else {
        // Static segment
        result.push(segment);
      }
    }

    return result.join('/');
  }

  /**
   * Converts string to URL-safe slug.
   * Handles special characters, spaces, and unicode.
   */
  protected slugify(text: string): string {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
      .replace(/[^a-z0-9\s-]/g, '') // Remove special chars
      .replace(/\s+/g, '-') // Replace spaces with -
      .replace(/-+/g, '-') // Replace multiple - with single -
      .replace(/^-|-$/g, ''); // Trim - from start/end
  }

  /**
   * Returns the first configured path pattern for a route.
   */
  getPathPattern(routeName: string): string | undefined {
    return this.routesConfig[routeName]?.paths?.[0];
  }

  /**
   * Updates routes configuration.
   * Useful for applying custom routing configurations.
   */
  setRoutes(routes: Partial<RoutesConfig>): void {
    this.routesConfig = { ...this.routesConfig, ...routes };
  }
}

/**
 * Singleton instance for convenience
 */
let defaultUrlPathService: UrlPathService | null = null;

/**
 * Gets or creates the default UrlPathService instance.
 */
export function getUrlPathService(customRoutes?: Partial<RoutesConfig>): UrlPathService {
  if (!defaultUrlPathService || customRoutes) {
    defaultUrlPathService = new UrlPathService(customRoutes);
  }
  return defaultUrlPathService;
}


