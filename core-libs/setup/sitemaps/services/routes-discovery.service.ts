/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';
import {
  ParamsMapping,
  RoutingConfig,
  RoutingConfigService,
  SemanticPathService,
} from '@spartacus/core';
import { defaultSitemapConfig, SitemapConfig } from '../config/sitemap-config';
import {
  ANGULAR_ROUTE_ENUMERATOR,
  AngularRouteEnumerator,
} from '../model/angular-route-enumerator';
import {
  ROUTE_PARAMS_ENUMERATOR,
  RouteParamsEnumerator,
  RouteParamsEnumeratorContext,
} from '../model/route-params-enumerator';
import {
  DiscoveredRoute,
  RoutesDiscoveryOptions,
} from '../model/sitemap.model';

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
  protected router = inject(Router);
  protected routingConfig = inject(RoutingConfig);
  protected routingConfigService = inject(RoutingConfigService);
  protected semanticPathService = inject(SemanticPathService);
  protected sitemapConfig = inject(SitemapConfig);

  protected enumerators: RouteParamsEnumerator[] =
    inject(ROUTE_PARAMS_ENUMERATOR, { optional: true }) ?? [];

  protected angularRouteEnumerators: AngularRouteEnumerator[] =
    inject(ANGULAR_ROUTE_ENUMERATOR, { optional: true }) ?? [];

  protected readonly PATH_PARAM_PATTERN = /:\w+/;

  async discoverAllRoutes(
    context: RouteParamsEnumeratorContext,
    options: RoutesDiscoveryOptions = {}
  ): Promise<DiscoveredRoute[]> {
    const semanticRoutes = await this.discoverRoutes(context, options);
    const knownCxRoutes = new Set(semanticRoutes.map((r) => r.cxRoute));
    const angularOnlyRoutes = this.router.config
      .filter(
        (route: Route) =>
          !(route.data?.cxRoute && knownCxRoutes.has(route.data.cxRoute)) &&
          route.path !== '**' &&
          !(route.matcher && !route.path)
      )
      .flatMap((route: Route) => this.extractAngularRoutes(route));

    return [...semanticRoutes, ...angularOnlyRoutes];
  }

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

      const paramsMapping =
        this.routingConfigService.getRouteConfig(routeName)?.paramsMapping;

      for (const params of result.params) {
        const adaptedParams = this.adaptParamsForMapping(params, paramsMapping);
        const path = this.buildPath(routeName, adaptedParams);
        if (path !== null) {
          discovered.push({ cxRoute: routeName, params: adaptedParams, path });
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
  ): Required<Omit<RoutesDiscoveryOptions, 'include' | 'exclude'>> &
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

  /**
   * Adapts enumerator params to account for `paramsMapping` in the route config.
   *
   * Enumerators return params using natural property names from the backend
   * (e.g., `{ code: '123', name: 'Camera' }`). However, when `paramsMapping`
   * is configured (e.g., `{ name: 'slug' }`), `SemanticPathService` looks up
   * the mapped key (`params.slug`) instead of the URL param name (`params.name`).
   *
   * This method bridges the gap: for each mapping entry `{ urlParam: mappedKey }`,
   * if `params` has `urlParam` but not `mappedKey`, it copies the value
   * from `urlParam` to `mappedKey`.
   */
  protected adaptParamsForMapping(
    params: Record<string, unknown>,
    paramsMapping?: ParamsMapping
  ): Record<string, unknown> {
    if (!paramsMapping) {
      return params;
    }

    const adapted = { ...params };

    for (const [urlParamName, mappedKey] of Object.entries(paramsMapping)) {
      if (
        adapted[mappedKey] === undefined &&
        adapted[urlParamName] !== undefined
      ) {
        adapted[mappedKey] = adapted[urlParamName];
      }
    }

    return adapted;
  }

  protected extractAngularRoutes(route: Route): DiscoveredRoute[] {
    if (!route.path) {
      return [];
    }

    // If the route has children, recurse and prepend the parent path
    if (route.children?.length) {
      return route.children.flatMap((child) =>
        this.extractAngularRoutes(child).map((discovered) => ({
          ...discovered,
          path: `${route.path}/${discovered.path}`,
        }))
      );
    }

    // Leaf route — skip if it contains unresolvable parameters like :id
    if (route.path.includes(':')) {
      return [];
    }

    return [
      {
        cxRoute: route.data?.cxRoute ?? route.path,
        params: {},
        path: route.path,
      },
    ];
  }
}
