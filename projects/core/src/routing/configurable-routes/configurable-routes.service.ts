import { Injectable, InjectionToken, Injector, isDevMode } from '@angular/core';
import { Route, Router, Routes, UrlMatcher } from '@angular/router';
import { UrlMatcherService } from '../services/url-matcher.service';
import { UrlMatcherFactory } from '../url-matcher/url-matcher-factory';
import { RouteConfig } from './routes-config';
import { RoutingConfigService } from './routing-config.service';

@Injectable({ providedIn: 'root' })
export class ConfigurableRoutesService {
  constructor(
    protected injector: Injector,
    protected routingConfigService: RoutingConfigService,
    protected urlMatcherService: UrlMatcherService
  ) {}

  protected initCalled = false; // guard not to call init() more than once

  /**
   * Enhances existing Angular routes using the routing config of Spartacus.
   * Can be called only once.
   */
  init(): void {
    if (!this.initCalled) {
      this.initCalled = true;

      this.configure();
    }
  }

  /**
   * Enhances existing Angular routes using the routing config of Spartacus.
   */
  protected configure(): void {
    // Router could not be injected in constructor due to cyclic dependency with APP_INITIALIZER:
    const router = this.injector.get(Router);
    router.resetConfig(this.configureRoutes(router.config));
  }

  /**
   * Sets the property `path` or `matcher` for the given routes, based on the Spartacus' routing configuration.
   *
   * @param routes list of Angular `Route` objects
   */
  protected configureRoutes(routes: Routes): Routes {
    return routes.map((route) => {
      const configuredRoute = this.configureRoute(route);

      if (route.children && route.children.length) {
        configuredRoute.children = this.configureRoutes(route.children);
      }
      return configuredRoute;
    });
  }

  /**
   * Sets the property `path` or `matcher` of the `Route`, based on the Spartacus' routing configuration.
   * Uses the property `data.cxRoute` to determine the name of the route.
   * It's the same name used as a key in the routing configuration: `routing.routes[ROUTE NAME]`.
   *
   * @param route Angular `Route` object
   */
  protected configureRoute(route: Route): Route {
    const routeName = this.getRouteName(route);
    if (routeName) {
      const routeConfig = this.routingConfigService.getRouteConfig(routeName);
      this.validateRouteConfig(routeConfig, routeName, route);

      if (routeConfig?.disabled) {
        delete route.path;
        return {
          ...route,
          matcher: this.urlMatcherService.getFalsy(),
        };
      } else if (routeConfig?.matchers) {
        delete route.path;
        return {
          ...route,
          matcher: this.resolveUrlMatchers(route, routeConfig?.matchers),
        };
      } else if (routeConfig?.paths?.length === 1) {
        delete route.matcher;
        return { ...route, path: routeConfig?.paths[0] };
      } else {
        delete route.path;
        return {
          ...route,
          matcher: this.urlMatcherService.getFromPaths(
            routeConfig?.paths || []
          ),
        };
      }
    }
    return route; // if route doesn't have a name, just pass the original route
  }

  /**
   * Creates a single `UrlMatcher` based on given matchers and factories of matchers.
   *
   * @param route Route object
   * @param matchersOrFactories `UrlMatcher`s or injection tokens with a factory functions
   *  that create UrlMatchers based on the given route.
   */
  protected resolveUrlMatchers(
    route: Route,
    matchersOrFactories: RouteConfig['matchers']
  ): UrlMatcher {
    const matchers: UrlMatcher[] = matchersOrFactories.map(
      (matcherOrFactory) => {
        return typeof matcherOrFactory === 'function'
          ? matcherOrFactory // matcher
          : this.resolveUrlMatcherFactory(route, matcherOrFactory); // factory injection token
      }
    );
    return this.urlMatcherService.getCombined(matchers);
  }

  /**
   * Creates an `UrlMatcher` based on the given route, using the factory function coming from the given injection token.
   *
   * @param route Route object
   * @param factoryToken injection token with a factory function that will create an UrlMatcher using given route
   */
  protected resolveUrlMatcherFactory(
    route: Route,
    factoryToken: InjectionToken<UrlMatcherFactory>
  ): UrlMatcher {
    const factory = this.injector.get(factoryToken);
    return factory(route);
  }

  /**
   * Returns the name of the Route stored in its property `data.cxRoute`
   * @param route
   */
  protected getRouteName(route: Route): string {
    return route.data && route.data.cxRoute;
  }

  protected validateRouteConfig(
    routeConfig: RouteConfig,
    routeName: string,
    route: Route
  ) {
    if (isDevMode()) {
      // - null value of routeConfig or routeConfig.paths means explicit switching off the route - it's valid config
      // - routeConfig with defined `matchers` is valid, even if `paths` are undefined
      if (
        routeConfig === null ||
        routeConfig?.paths === null ||
        routeConfig?.matchers
      ) {
        return;
      }

      // undefined value of routeConfig or routeConfig.paths is a misconfiguration
      if (!routeConfig?.paths) {
        this.warn(
          `Could not configure the named route '${routeName}'`,
          route,
          `due to undefined config or undefined 'paths' property for this route`
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
