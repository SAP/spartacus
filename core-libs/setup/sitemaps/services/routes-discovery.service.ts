/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable } from '@angular/core';
import { RoutingConfig, SemanticPathService } from '@spartacus/core';
import {
  ROUTE_PARAMS_ENUMERATOR,
  RouteParamsEnumerator,
  RouteParamsEnumeratorContext,
} from '../model/route-params-enumerator';
import { defaultSitemapConfig, SitemapConfig } from '../config/sitemap-config';
import { DiscoveredRoute, RoutesDiscoveryOptions } from '../model/sitemap.model';

/**
 * Service for discovering all valid URLs from Spartacus routing configuration.
 *
 * This service:
 * 1. Iterates over routes from RoutingConfig
 * 2. For each route, finds matching ROUTE_PARAMS_ENUMERATOR
 * 3. Gets all parameter combinations from the enumerator
 * 4. Uses SemanticPathService to build concrete URLs
 *
 * Static routes (no params) use StaticRouteParamsEnumerator as fallback.
 * Dynamic routes (with params) need a specific enumerator or are skipped.
 */
@Injectable()
export class RoutesDiscoveryService {
  protected routingConfig = inject(RoutingConfig);
  protected semanticPathService = inject(SemanticPathService);
  protected sitemapConfig = inject(SitemapConfig);

  protected enumerators: RouteParamsEnumerator[] =
    inject(ROUTE_PARAMS_ENUMERATOR, { optional: true }) ?? [];

  protected readonly PATH_PARAM_PATTERN = /:\w+/;

  /**
   * Discovers all valid URLs for the given context and options.
   */
  async discoverRoutes(
    context: RouteParamsEnumeratorContext,
    options: RoutesDiscoveryOptions = {}
  ): Promise<DiscoveredRoute[]> {
    const routes = this.routingConfig.routing?.routes || {};
    const globalProtected = this.routingConfig.routing?.protected ?? false;
    const discovered: DiscoveredRoute[] = [];

    const resolvedOptions = this.resolveOptions(options);

    for (const [routeName, routeConfig] of Object.entries(routes)) {
      if (
        !this.shouldIncludeRoute(
          routeName,
          routeConfig,
          resolvedOptions,
          globalProtected
        )
      ) {
        continue;
      }

      const paths = routeConfig?.paths;
      if (!paths || paths.length === 0) {
        continue;
      }

      const hasParams = paths.some((path) =>
        this.PATH_PARAM_PATTERN.test(path)
      );

      const enumerator = this.findEnumerator(routeName, hasParams);
      if (!enumerator) {
        continue;
      }

      const result = await enumerator.enumerate(context);

      for (const params of result.params) {
        const path = this.buildPath(routeName, params);
        if (path !== null) {
          discovered.push({ cxRoute: routeName, params, path });
        }
      }
    }

    console.log(
      `[Sitemap] RoutesDiscoveryService: Discovered ${discovered.length} URLs`
    );

    return discovered;
  }

  protected resolveOptions(
    options: RoutesDiscoveryOptions
  ): Required<
    Omit<RoutesDiscoveryOptions, 'include' | 'exclude'>
  > &
    Pick<RoutesDiscoveryOptions, 'include' | 'exclude'> {
    const routesCfg = this.sitemapConfig.sitemap?.routes;
    const defaultCfg = defaultSitemapConfig.sitemap!.routes!;

    return {
      include: options.include,
      exclude: options.exclude,
      includeAuthFlowRoutes:
        options.includeAuthFlowRoutes ??
        routesCfg?.includeAuthFlowRoutes ??
        defaultCfg.includeAuthFlowRoutes!,
      includeProtectedRoutes:
        options.includeProtectedRoutes ??
        routesCfg?.includeProtectedRoutes ??
        defaultCfg.includeProtectedRoutes!,
    };
  }

  protected shouldIncludeRoute(
    routeName: string,
    routeConfig: any,
    options: ReturnType<typeof this.resolveOptions>,
    globalProtected: boolean
  ): boolean {
    if (options.include && !options.include.includes(routeName)) {
      return false;
    }

    const configExcludes = this.sitemapConfig.sitemap?.routes?.excludes ?? [];
    if (
      options.exclude?.includes(routeName) ||
      configExcludes.includes(routeName)
    ) {
      return false;
    }

    if (routeConfig?.disabled) {
      return false;
    }

    if (routeConfig?.authFlow && !options.includeAuthFlowRoutes) {
      return false;
    }

    const isRouteProtected =
      routeConfig?.protected === true ||
      (globalProtected && routeConfig?.protected !== false);

    if (isRouteProtected && !options.includeProtectedRoutes) {
      return false;
    }

    return true;
  }

  /**
   * Finds enumerator: exact cxRoute match first, then '*' fallback for static routes.
   */
  protected findEnumerator(
    routeName: string,
    hasParams: boolean
  ): RouteParamsEnumerator | undefined {
    const exactMatch = this.enumerators.find((e) => e.cxRoute === routeName);
    if (exactMatch) {
      return exactMatch;
    }

    if (!hasParams) {
      return this.enumerators.find((e) => e.cxRoute === '*');
    }

    return undefined;
  }

  protected buildPath(
    routeName: string,
    params: Record<string, unknown>
  ): string | null {
    try {
      const urlSegments = this.semanticPathService.transform({
        cxRoute: routeName,
        params,
      });

      return (urlSegments as string[]).filter((s) => s !== '/').join('/');
    } catch (error) {
      console.warn(
        `[Sitemap] RoutesDiscoveryService: Failed to build path for '${routeName}':`,
        error
      );
      return null;
    }
  }
}

