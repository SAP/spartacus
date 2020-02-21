import { Injectable, Injector, isDevMode } from '@angular/core';
import { Route, Router, Routes, UrlMatcher } from '@angular/router';
import { UrlMatcherService } from '../services/url-matcher.service';
import { UrlMatcherFactory } from '../url-matcher/url-matcher-factory';
import { RouteConfig } from './routes-config';
import { RoutingConfigService } from './routing-config.service';

@Injectable({ providedIn: 'root' })
export class ConfigurableRoutesService {
  constructor(
    private injector: Injector,
    private routingConfigService: RoutingConfigService,
    private urlMatcherService: UrlMatcherService
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

  /**
   * Sets the `path` or `matcher` of the `Route`, based on the Spartacus' configuration of the route.
   */
  private configureRoute(route: Route): Route {
    const routeName = this.getRouteName(route);
    if (routeName) {
      const routeConfig = this.routingConfigService.getRouteConfig(routeName);
      this.validateRouteConfig(routeConfig, routeName, route);

      const paths = (routeConfig && routeConfig.paths) || [];
      const isDisabled = routeConfig && routeConfig.disabled;
      const matchers = routeConfig.matchers;

      if (isDisabled) {
        delete route.path;
        return {
          ...route,
          matcher: this.urlMatcherService.getFalsy(),
        };
      } else if (matchers) {
        delete route.path;
        return { ...route, matcher: this.resolveUrlMatchers(route, matchers) };
      } else if (paths.length === 1) {
        delete route.matcher;
        return { ...route, path: paths[0] };
      } else {
        delete route.path;
        return {
          ...route,
          matcher: this.urlMatcherService.fromPaths(paths),
        };
      }
    }
    return route; // if route doesn't have a Spartacus' name, just pass the original route
  }

  private resolveUrlMatchers(
    route: Route,
    matchersOrFactories: RouteConfig['matchers']
  ): UrlMatcher {
    const matchers: UrlMatcher[] = matchersOrFactories.map(matcherOrFactory => {
      return typeof matcherOrFactory === 'function'
        ? matcherOrFactory // matcher
        : this.resolveUrlMatcherFactory(route, matcherOrFactory); // factory
    });
    return this.urlMatcherService.combine(matchers);
  }

  private resolveUrlMatcherFactory(
    route: Route,
    { deps, factory }: UrlMatcherFactory
  ): UrlMatcher {
    const resolvedDeps = (deps || []).map(dep => this.injector.get(dep));
    const result = factory(...resolvedDeps)(route);
    return result;
  }

  private getRouteName(route: Route): string {
    return route.data && route.data.cxRoute;
  }

  private validateRouteConfig(
    routeConfig: RouteConfig,
    routeName: string,
    route: Route
  ) {
    if (isDevMode()) {
      // route config being undefined is a misconfiguration
      if (routeConfig === undefined) {
        this.warn(
          `Could not configure the named route '${routeName}'`,
          route,
          `due to undefined key '${routeName}' in the routes config`
        );
        return;
      }

      // routeConfig or routeConfig.paths can be null - which means explicit switching off the route
      if (routeConfig === null || routeConfig.paths === null) {
        return;
      }

      // a route with matchers is valid
      if (routeConfig.matchers) {
        return;
      }

      // if no matchers are present and paths are undefined, it's misconfiguration
      if (routeConfig && routeConfig.paths === undefined) {
        this.warn(
          `Could not configure the named route '${routeName}'`,
          route,
          `due to undefined 'paths' for the named route '${routeName}' in the routes config`
        );
        return;
      }
    }
  }

  private warn(...args) {
    if (isDevMode()) {
      console.warn(...args);
    }
  }
}
