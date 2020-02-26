import { Injectable, InjectionToken, Injector, isDevMode } from '@angular/core';
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

      const paths = (routeConfig?.paths) || [];
      const isDisabled = routeConfig?.disabled;
      const matchers = routeConfig?.matchers;

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
    return route; // if route doesn't have a name, just pass the original route
  }

  /**
   * Creates a single `UrlMatcher` based on given matchers and factories of matchers.
   * 
   * @param route Route object
   * @param matchersOrFactories `UrlMatcher`s or injection tokens with a factory functions
   *  that create UrlMatchers using given route.
   */
  private resolveUrlMatchers(
    route: Route,
    matchersOrFactories: RouteConfig['matchers']
  ): UrlMatcher {
    const matchers: UrlMatcher[] = matchersOrFactories.map(matcherOrFactory => {
      return typeof matcherOrFactory === 'function'
        ? matcherOrFactory // matcher
        : this.resolveUrlMatcherFactory(route, matcherOrFactory); // factory injection token
    });
    return this.urlMatcherService.combine(matchers);
  }

  /**
   * Creates an `UrlMatcher` using the injection token with a factory function.
   * The factory is feeded with the given route.
   *
   * @param route Route object
   * @param factoryToken injection token with a factory function that will create an UrlMatcher using given route
   */
  private resolveUrlMatcherFactory(
    route: Route,
    factoryToken: InjectionToken<UrlMatcherFactory>
  ): UrlMatcher {
    const factory = this.injector.get(factoryToken);
    return factory(route);
  }

  /**
   * Returns the name of Route stored in its property `data.cxRoute`
   * @param route
   */
  protected getRouteName(route: Route): string {
    return route.data && route.data.cxRoute;
  }

  private validateRouteConfig(
    routeConfig: RouteConfig,
    routeName: string,
    route: Route
  ) {
    if (isDevMode()) {
      // - null value of routeConfig or routeConfig.paths means explicit switching off the route - it's valid config
      // - routeConfig with defined `matchers` is valid, even if `paths` are undefined
      if(routeConfig === null || routeConfig.paths === null || routeConfig?.matchers) {
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
