import { Injectable, Injector } from '@angular/core';
import { Routes, Router, Route } from '@angular/router';
import { ServerConfig } from '../../config/server-config/server-config';
import { RoutingConfigService } from './routing-config.service';
import { UrlMatcherFactoryService } from './url-matcher-factory.service';

@Injectable({ providedIn: 'root' })
export class ConfigurableRoutesService {
  constructor(
    private config: ServerConfig,
    private injector: Injector,
    private routingConfigService: RoutingConfigService,
    private urlMatcherFactory: UrlMatcherFactoryService
  ) {}

  private initCalled = false; // guard not to call init() more than once

  /**
   * Configures all existing Routes in the Router
   */
  init(): void {
    if (!this.initCalled) {
      this.initCalled = true;
      this.configureRouter();
    }
  }

  private configureRouter() {
    // Router could not be injected in constructor due to cyclic dependency with APP_INITIALIZER:
    const router = this.injector.get(Router);

    const configuredRoutes = this.configureRoutes(router.config);

    router.resetConfig(configuredRoutes);
  }

  private configureRoutes(routes: Routes): Routes {
    const result = [];
    routes.forEach(route => {
      const configuredRoute = this.configureRoute(route);

      if (route.children && route.children.length) {
        configuredRoute.children = this.configureRoutes(route.children);
      }
      result.push(configuredRoute);
    });
    return result;
  }

  private configureRoute(route: Route): Route {
    if (this.getRouteName(route)) {
      const paths = this.getConfiguredPaths(route);
      switch (paths.length) {
        case 0:
          delete route.path;
          return {
            ...route,
            matcher: this.urlMatcherFactory.getFalsyUrlMatcher(),
          };

        case 1:
          delete route.matcher;
          return { ...route, path: paths[0] };

        default:
          delete route.path;
          return {
            ...route,
            matcher: this.urlMatcherFactory.getMultiplePathsUrlMatcher(paths),
          };
      }
    }
    return route; // if route doesn't have a name, just pass the original route
  }

  private getRouteName(route: Route): string {
    return route.data && route.data.cxRoute;
  }

  private getConfiguredPaths(route: Route): string[] {
    const routeName = this.getRouteName(route);
    const routeConfig = this.routingConfigService.getRouteConfig(routeName);
    if (routeConfig === undefined) {
      this.warn(
        `Could not configure the named route '${routeName}'`,
        route,
        `due to undefined key '${routeName}' in the routes config`
      );
      return [];
    }
    if (routeConfig && routeConfig.paths === undefined) {
      this.warn(
        `Could not configure the named route '${routeName}'`,
        route,
        `due to undefined 'paths' for the named route '${routeName}' in the routes config`
      );
      return [];
    }

    // routeConfig or routeConfig.paths can be null - which means switching off the route
    return (routeConfig && routeConfig.paths) || [];
  }

  private warn(...args) {
    if (!this.config.production) {
      console.warn(...args);
    }
  }
}
