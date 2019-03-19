import { Injectable, Injector } from '@angular/core';
import { Routes, Router, Route } from '@angular/router';
import { ServerConfig } from '../../config/server-config/server-config';
import {
  RoutesTranslations,
  RouteTranslation,
  RoutesConfig
} from './routes-config';
import { RoutesConfigLoader } from './routes-config-loader';

type ConfigurableRouteKey = 'cxPath' | 'cxRedirectTo';

@Injectable()
export class ConfigurableRoutesService {
  constructor(
    private config: ServerConfig,
    private injector: Injector,
    private routesConfigLoader: RoutesConfigLoader
  ) {}

  private readonly currentLanguageCode = 'en'; // TODO: hardcoded! should be removed when more languages are supported by localized routes

  private allRoutesTranslations: RoutesConfig['translations'];

  private get currentRoutesTranslations(): RoutesTranslations {
    return this.allRoutesTranslations[
      this.currentLanguageCode
    ] as RoutesTranslations;
  }

  private initCalled = false; // guard not to call init() more than once

  /**
   * Initializes service with given translations and translates all existing Routes in the Router.
   */
  async init(): Promise<void> {
    if (!this.initCalled) {
      this.initCalled = true;
      await this.routesConfigLoader.load();
      this.allRoutesTranslations = this.routesConfigLoader.routesConfig.translations;
      this.translateRouterConfig();
    }
  }

  private translateRouterConfig() {
    // Router could not be injected in constructor due to cyclic dependency with APP_INITIALIZER:
    const router = this.injector.get(Router);

    let translatedRoutes = this.translateRoutes(
      router.config,
      this.currentRoutesTranslations
    );
    translatedRoutes = this.moveWildcardRouteToEnd(translatedRoutes);

    router.resetConfig(translatedRoutes);
  }

  /**
   * Move the Route with double asterisk (**) to the end of the list.
   * If there are more Routes with **, only the first will be left and other removed.
   *
   * Reason: When some custom Routes are injected after Spartacus' ones,
   *          then the Spartacus' wildcard Route needs being moved to the end -
   *          even after custom Routes - to make custom Routes discoverable.
   *          More than one wildcard Route is a sign of bad config, so redundant copies are removed.
   */
  private moveWildcardRouteToEnd(routes: Routes): Routes {
    const firstWildcardRoute = routes.find(route => route.path === '**');
    return firstWildcardRoute
      ? routes.filter(route => route.path !== '**').concat(firstWildcardRoute)
      : routes;
  }

  /**
   * Returns the list of routes translations for given list of nested routes
   * using given object of routes translations.
   */
  getNestedRoutesTranslations(
    nestedRouteNames: string[],
    routesTranslations: RoutesTranslations = this.currentRoutesTranslations
  ): RouteTranslation[] {
    return this.getNestedRoutesTranslationsRecursive(
      nestedRouteNames,
      routesTranslations,
      []
    );
  }

  private getNestedRoutesTranslationsRecursive(
    nestedRoutesNames: string[],
    routesTranslations: RoutesTranslations,
    accResult: RouteTranslation[]
  ): RouteTranslation[] {
    if (!nestedRoutesNames.length) {
      return accResult;
    }
    const [routeName, ...remainingRouteNames] = nestedRoutesNames;
    const translation = this.getRouteTranslation(routeName, routesTranslations);
    if (!translation) {
      return null;
    }

    if (remainingRouteNames.length) {
      const childrenTranslations = this.getChildrenRoutesTranslations(
        routeName,
        routesTranslations
      );
      if (!childrenTranslations) {
        this.warn(
          `No children routes translations were configured for page '${routeName}' in language '${
            this.currentLanguageCode
          }'!`
        );
        return null;
      }

      return this.getNestedRoutesTranslationsRecursive(
        remainingRouteNames,
        childrenTranslations,
        accResult.concat(translation)
      );
    }
    return accResult.concat(translation);
  }

  private getChildrenRoutesTranslations(
    routeName: string,
    routesTranslations: RoutesTranslations
  ): RoutesTranslations {
    const routeTranslation = this.getRouteTranslation(
      routeName,
      routesTranslations
    );
    return routeTranslation && routeTranslation.children;
  }

  private translateRoutes(
    routes: Routes,
    routesTranslations: RoutesTranslations
  ): Routes {
    const result = [];
    routes.forEach(route => {
      const translatedRouteAliases = this.translateRoute(
        route,
        routesTranslations
      );
      if (route.children && route.children.length) {
        const translatedChildrenRoutes = this.translateChildrenRoutes(
          route,
          routesTranslations
        );
        translatedRouteAliases.forEach(translatedRouteAlias => {
          translatedRouteAlias.children = translatedChildrenRoutes;
        });
      }
      result.push(...translatedRouteAliases);
    });
    return result;
  }

  private translateChildrenRoutes(
    route: Route,
    routesTranslations: RoutesTranslations
  ): Routes {
    if (this.isConfigurable(route, 'cxPath')) {
      const routeName = this.getConfigurable(route, 'cxPath');
      const childrenTranslations = this.getChildrenRoutesTranslations(
        routeName,
        routesTranslations
      );

      if (childrenTranslations === undefined) {
        this.warn(
          `Could not translate children routes of route '${routeName}'`,
          route,
          `due to undefined 'children' key for '${routeName}' route in routes translations`,
          routesTranslations
        );
        return [];
      }

      // null switches off the children routes:
      if (childrenTranslations === null) {
        return [];
      }
      return this.translateRoutes(route.children, childrenTranslations);
    }
    return route.children;
  }

  private translateRoute(
    route: Route,
    routesTranslations: RoutesTranslations
  ): Routes {
    if (this.isConfigurable(route, 'cxPath')) {
      // we assume that 'path' and 'redirectTo' cannot be both configured for one route
      if (this.isConfigurable(route, 'cxRedirectTo')) {
        this.warn(
          `A path should not have set both "cxPath" and "cxRedirectTo" properties! Route: '${route}`
        );
      }
      return this.translateRoutePath(route, routesTranslations);
    }

    if (this.isConfigurable(route, 'cxRedirectTo')) {
      return this.translateRouteRedirectTo(route, routesTranslations);
    }

    return [route]; // if nothing is configurable, just pass the original route
  }

  private isConfigurable(route: Route, key: ConfigurableRouteKey): boolean {
    return !!this.getConfigurable(route, key);
  }

  private getConfigurable(route: Route, key: ConfigurableRouteKey): string {
    return route.data && route.data[key];
  }

  private translateRoutePath(
    route: Route,
    routesTranslations: RoutesTranslations
  ): Route[] {
    return this.getTranslatedPaths(route, 'cxPath', routesTranslations).map(
      translatedPath => {
        return { ...route, path: translatedPath };
      }
    );
  }

  private translateRouteRedirectTo(
    route: Route,
    translations: RoutesTranslations
  ): Route[] {
    const translatedPaths = this.getTranslatedPaths(
      route,
      'cxRedirectTo',
      translations
    );
    return translatedPaths.length
      ? [{ ...route, redirectTo: translatedPaths[0] }] // take the first path from list by convention
      : [];
  }

  private getRouteTranslation(
    routeName: string,
    routesTranslations: RoutesTranslations
  ): RouteTranslation {
    const result = routesTranslations && routesTranslations[routeName];
    if (!routesTranslations || result === undefined) {
      this.warn(
        `No route translation was configured for page '${routeName}' in language '${
          this.currentLanguageCode
        }'!`
      );
    }
    return result;
  }

  private getTranslatedPaths(
    route: Route,
    key: ConfigurableRouteKey,
    routesTranslations: RoutesTranslations
  ): string[] {
    const routeName = this.getConfigurable(route, key);
    const translation = this.getRouteTranslation(routeName, routesTranslations);
    if (translation === undefined) {
      this.warn(
        `Could not translate key '${key}' of route '${routeName}'`,
        route,
        `due to undefined key '${routeName}' in routes translations`,
        routesTranslations
      );
      return [];
    }
    if (translation && translation.paths === undefined) {
      this.warn(
        `Could not translate key '${key}' of route '${routeName}'`,
        route,
        `due to undefined 'paths' key for '${routeName}' route in routes translations`,
        routesTranslations
      );
      return [];
    }

    // translation or translation.paths can be null - which means switching off the route
    return (translation && translation.paths) || [];
  }

  private warn(...args) {
    if (!this.config.production) {
      console.warn(...args);
    }
  }
}
