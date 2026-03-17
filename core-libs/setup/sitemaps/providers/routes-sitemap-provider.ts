/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable } from '@angular/core';
import { RoutingConfig, SemanticPathService } from '@spartacus/core';
import { SitemapUrlProvider } from '../model/sitemap-url-provider';
import {
  SitemapGenerationContext,
  SitemapProviderResult,
  SitemapUrlEntry,
} from '../model/sitemap.model';

/**
 * Sitemap URL provider for static routes without parameters.
 *
 * This provider iterates over all configured routes from `RoutingConfig`
 * and generates sitemap entries for routes that:
 * - Have no dynamic parameters in their paths (e.g., no `:productCode`)
 * - Are not marked as `authFlow: true` (unless configured to include)
 * - Are not protected (unless configured to include)
 * - Are not in the `excludes` list
 *
 * ## Routes with parameters
 *
 * Routes containing path parameters (`:param`) are automatically skipped
 * because they require specific values that can only be provided by
 * specialized providers (e.g., ProductSitemapProvider for product routes).
 */
@Injectable()
export class RoutesSitemapProvider extends SitemapUrlProvider {
  readonly name = 'routes';

  protected routingConfig = inject(RoutingConfig);
  protected semanticPathService = inject(SemanticPathService);

  /**
   * Pattern to detect path parameters like :productCode, :id, etc.
   */
  protected readonly PATH_PARAM_PATTERN = /:\w+/;

  async getUrls(
    context: SitemapGenerationContext
  ): Promise<SitemapProviderResult> {
    const sitemaps: Record<string, string> = {};
    const files: string[] = [];
    let totalUrls = 0;
    const urlsByLanguage: Record<string, number> = {};

    const hasCurrencyInUrl = context.urlEncodingParams.includes('currency');
    const hasLanguageInUrl = context.urlEncodingParams.includes('language');

    // Collect all valid static routes
    const staticRoutes = this.collectStaticRoutes(context);

    if (staticRoutes.length === 0) {
      console.log(
        '[Sitemap] RoutesSitemapProvider: No static routes found to include'
      );
      return {
        providerName: this.name,
        sitemaps,
        files,
        totalUrls: 0,
        urlsByLanguage,
      };
    }

    console.log(
      `[Sitemap] RoutesSitemapProvider: Found ${staticRoutes.length} static routes: ${staticRoutes.join(', ')}`
    );

    // If language is part of URL encoding, generate per-language
    const languagesToIterate = hasLanguageInUrl
      ? context.languages
      : [context.languages[0] || 'en'];

    // If currency is part of URL encoding, generate per-language-per-currency
    const currenciesToIterate = hasCurrencyInUrl
      ? context.currencies
      : [context.defaultCurrency];

    for (const language of languagesToIterate) {
      for (const currency of currenciesToIterate) {
        const urlPrefix = this.buildUrlPrefix(context, language, currency);
        const entries: SitemapUrlEntry[] = [];

        for (const routeName of staticRoutes) {
          const entry = this.buildRouteEntry(context, routeName, urlPrefix);
          if (entry) {
            entries.push(entry);
          }
        }

        if (entries.length > 0) {
          // Split into multiple files if exceeding maxUrlsPerSitemap
          const chunks = this.chunkEntries(
            entries,
            context.config.maxUrlsPerSitemap
          );

          for (let i = 0; i < chunks.length; i++) {
            const chunk = chunks[i];
            const filename = this.buildFilename(
              hasLanguageInUrl ? language : undefined,
              hasCurrencyInUrl ? currency : undefined,
              chunks.length > 1 ? i + 1 : undefined
            );

            sitemaps[filename] = this.buildSitemapXml(chunk);
            files.push(filename);
            totalUrls += chunk.length;
            urlsByLanguage[language] =
              (urlsByLanguage[language] || 0) + chunk.length;

            console.log(
              `[Sitemap] RoutesSitemapProvider: Generated ${filename}: ${chunk.length} URLs`
            );
          }
        }
      }
    }

    return {
      providerName: this.name,
      sitemaps,
      files,
      totalUrls,
      urlsByLanguage,
    };
  }

  /**
   * Collects route names that should be included in the sitemap.
   */
  protected collectStaticRoutes(context: SitemapGenerationContext): string[] {
    const routes = this.routingConfig.routing?.routes || {};
    const routesConfig = context.config.routes;
    const globalProtected = context.globalRoutingProtected ?? false;
    const staticRoutes: string[] = [];

    for (const [routeName, routeConfig] of Object.entries(routes)) {
      // Skip if explicitly excluded
      if (routesConfig.excludes.includes(routeName)) {
        console.log(
          `[Sitemap] RoutesSitemapProvider: Skipping '${routeName}' (in excludes list)`
        );
        continue;
      }

      // Skip disabled routes
      if (routeConfig?.disabled) {
        continue;
      }

      // Skip authFlow routes unless configured to include
      if (routeConfig?.authFlow && !routesConfig.includeAuthFlowRoutes) {
        console.log(
          `[Sitemap] RoutesSitemapProvider: Skipping '${routeName}' (authFlow route)`
        );
        continue;
      }

      // Handle protected routes:
      // A route is protected if:
      // - Route has `protected: true` explicitly, OR
      // - Global `routing.protected` is true AND route doesn't have `protected: false`
      const isRouteProtected =
        routeConfig?.protected === true ||
        (globalProtected && routeConfig?.protected !== false);

      if (isRouteProtected && !routesConfig.includeProtectedRoutes) {
        console.log(
          `[Sitemap] RoutesSitemapProvider: Skipping '${routeName}' (protected route)`
        );
        continue;
      }

      // Skip routes with no paths configured
      const paths = routeConfig?.paths;
      if (!paths || paths.length === 0) {
        continue;
      }

      // Skip routes with dynamic parameters in ANY path
      const hasParams = paths.some((path) =>
        this.PATH_PARAM_PATTERN.test(path)
      );
      if (hasParams) {
        console.log(
          `[Sitemap] RoutesSitemapProvider: Skipping '${routeName}' (has path parameters)`
        );
        continue;
      }

      staticRoutes.push(routeName);
    }

    return staticRoutes;
  }

  /**
   * Builds a sitemap URL entry for a static route.
   */
  protected buildRouteEntry(
    context: SitemapGenerationContext,
    routeName: string,
    urlPrefix: string
  ): SitemapUrlEntry | null {
    try {
      // Use SemanticPathService to transform route name to URL segments
      const urlSegments = this.semanticPathService.transform({
        cxRoute: routeName,
      });

      // transform() returns string[] like ['/', 'terms-and-conditions']
      const routePath = (urlSegments as string[])
        .filter((s) => s !== '/')
        .join('/');

      // Build full URL
      const fullUrl = routePath
        ? `${context.baseUrl}${urlPrefix}/${routePath}`
        : `${context.baseUrl}${urlPrefix}/`;

      return {
        loc: fullUrl,
        changefreq: this.getChangeFrequency(routeName),
        priority: this.getPriority(routeName),
      };
    } catch (error) {
      console.warn(
        `[Sitemap] RoutesSitemapProvider: Failed to build URL for route '${routeName}':`,
        error
      );
      return null;
    }
  }

  /**
   * Returns the change frequency for a route.
   * Override to customize per-route change frequencies.
   */
  protected getChangeFrequency(
    routeName: string
  ): SitemapUrlEntry['changefreq'] {
    if (routeName === 'home') {
      return 'daily';
    }
    return 'monthly';
  }

  /**
   * Returns the priority for a route.
   * Override to customize per-route priorities.
   */
  protected getPriority(routeName: string): number {
    if (routeName === 'home') {
      return 1.0;
    }
    return 0.5;
  }
}

