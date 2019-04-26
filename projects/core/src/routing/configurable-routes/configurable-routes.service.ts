import { Injectable, Injector } from '@angular/core';
import { Routes, Router, Route } from '@angular/router';
import { ServerConfig } from '../../config/server-config/server-config';
import { RoutingConfigService } from './routing-config.service';
import { UrlMatcherFactoryService } from './url-matcher-factory.service';

type ConfigurableRouteKey = 'cxPath' | 'cxRedirectTo';

@Injectable()
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
    if (this.isConfigurable(route, 'cxPath')) {
      // we assume that 'path' and 'redirectTo' cannot be both configured for one route
      if (this.isConfigurable(route, 'cxRedirectTo')) {
        this.warn(
          `A path should not have set both "cxPath" and "cxRedirectTo" properties! Route: '${route}`
        );
      }
      return this.configureRoutePath(route);
    }

    if (this.isConfigurable(route, 'cxRedirectTo')) {
      return this.configureRouteRedirectTo(route);
    }

    return route; // if nothing is configurable, just pass the original route
  }

  private isConfigurable(route: Route, key: ConfigurableRouteKey): boolean {
    return !!this.getConfigurable(route, key);
  }

  private getConfigurable(route: Route, key: ConfigurableRouteKey): string {
    return route.data && route.data[key];
  }

  private configureRoutePath(route: Route): Route {
    const paths = this.getConfiguredPaths(route, 'cxPath');
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

  private configureRouteRedirectTo(route: Route): Route {
    const paths = this.getConfiguredPaths(route, 'cxRedirectTo');
    return paths.length
      ? { ...route, redirectTo: paths[0] } // take the first path from list by convention
      : route;
  }

  private getConfiguredPaths(
    route: Route,
    key: ConfigurableRouteKey
  ): string[] {
    const routeName = this.getConfigurable(route, key);
    const routeConfig = this.routingConfigService.getRouteConfig(routeName);
    if (routeConfig === undefined) {
      this.warn(
        `Could not configure the key '${key}' of the named route '${routeName}'`,
        route,
        `due to undefined key for named route '${routeName}' in config`
      );
      return [];
    }
    if (routeConfig && routeConfig.paths === undefined) {
      this.warn(
        `Could not configure the key '${key}' of the named route '${routeName}'`,
        route,
        `due to undefined 'paths' for the named route '${routeName}' in config`
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
