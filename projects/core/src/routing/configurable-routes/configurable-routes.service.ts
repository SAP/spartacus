import { Injectable } from '@angular/core';
import { Routes, Router, Route } from '@angular/router';
import { ServerConfig } from '../../config/server-config/server-config';
import { RoutesConfigLoader } from './routes-config-loader';
import { RoutesTranslations, RouteTranslation } from './routes-config';

type ConfigurableRouteKey = 'cxPath' | 'cxRedirectTo';

@Injectable()
export class ConfigurableRoutesService {
  constructor(
    private readonly config: ServerConfig,
    private readonly router: Router,
    private readonly loader: RoutesConfigLoader
  ) {}

  private readonly DEFAULT_LANGUAGE_CODE = 'default';

  private currentLanguageCode: string = this.DEFAULT_LANGUAGE_CODE;

  private get routesTranslations() {
    return this.loader.routesConfig.translations;
  }

  private get currentRoutesTranslations(): RoutesTranslations {
    return this.routesTranslations[
      this.currentLanguageCode
    ] as RoutesTranslations;
  }

  translateRouterConfig(languageCode: string) {
    if (this.routesTranslations[languageCode] === undefined) {
      this.warn(
        `There are no translations in routes config for language code '${languageCode}'.`,
        `The default routes translations will be used instead: `,
        this.routesTranslations.default
      );
      this.currentLanguageCode = this.DEFAULT_LANGUAGE_CODE;
    } else {
      this.currentLanguageCode = languageCode;
    }

    let translatedRoutes = this.translateRoutes(
      this.router.config,
      this.currentRoutesTranslations
    );
    translatedRoutes = this.moveWildcardRouteToEnd(translatedRoutes);

    this.router.resetConfig(translatedRoutes);
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
    const nonWildcardRoutes = routes.filter(route => route.path !== '**');
    const firstWildcardRouteIndex = routes.findIndex(
      route => route.path === '**'
    );

    if (firstWildcardRouteIndex !== -1) {
      const wildcardRoute = routes[firstWildcardRouteIndex];
      return nonWildcardRoutes.concat([wildcardRoute]);
    }
    return nonWildcardRoutes;
  }

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
    return null;
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
