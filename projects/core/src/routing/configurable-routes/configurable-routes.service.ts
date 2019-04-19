import { Injectable, Injector } from '@angular/core';
import { Routes, Router, Route } from '@angular/router';
import { ServerConfig } from '../../config/server-config/server-config';
import {
  RoutesTranslations,
  RouteTranslation,
  RoutesConfig,
} from './routes-config';
import { RoutesConfigLoader } from './routes-config-loader';
import { PathsUrlMatcherFactory } from './paths-url-matcher-factory';

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

    const translatedRoutes = this.translateRoutes(
      router.config,
      this.currentRoutesTranslations
    );

    router.resetConfig(translatedRoutes);
  }

  getRouteTranslation(routeName: string): RouteTranslation {
    const routesTranslations = this.currentRoutesTranslations;

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

  private translateRoutes(
    routes: Routes,
    routesTranslations: RoutesTranslations
  ): Routes {
    const result = [];
    routes.forEach(route => {
      const translatedRoute = this.translateRoute(route, routesTranslations);
      if (!translatedRoute) {
        // if there are no configured paths for this route, remove it
        return;
      }

      if (route.children && route.children.length) {
        const translatedChildrenRoutes = this.translateRoutes(
          route.children,
          routesTranslations
        );

        translatedRoute.children = translatedChildrenRoutes;
      }
      result.push(translatedRoute);
    });
    return result;
  }

  private translateRoute(
    route: Route,
    routesTranslations: RoutesTranslations
  ): Route {
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

    return route; // if nothing is configurable, just pass the original route
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
  ): Route {
    const paths = this.getTranslatedPaths(route, 'cxPath', routesTranslations);
    if (!paths.length) {
      return null;
    }
    return { ...route, matcher: PathsUrlMatcherFactory.get(paths) };
  }

  private translateRouteRedirectTo(
    route: Route,
    translations: RoutesTranslations
  ): Route {
    const translatedPaths = this.getTranslatedPaths(
      route,
      'cxRedirectTo',
      translations
    );
    return translatedPaths.length
      ? { ...route, redirectTo: translatedPaths[0] } // take the first path from list by convention
      : route;
  }

  private getTranslatedPaths(
    route: Route,
    key: ConfigurableRouteKey,
    routesTranslations: RoutesTranslations
  ): string[] {
    const routeName = this.getConfigurable(route, key);
    const translation = this.getRouteTranslation(routeName);
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
