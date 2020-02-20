import { Injectable, Injector, isDevMode } from '@angular/core';
import { Route, Router, Routes, UrlMatcher } from '@angular/router';
import { UrlMatcherService } from '../services/url-matcher.service';
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

    //spike todo remove:
    window['router'] = router;

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
    const routeName = this.getRouteName(route);
    if (routeName) {
      const routeConfig = this.routingConfigService.getRouteConfig(routeName);
      const paths = this.getConfiguredPaths(routeConfig, routeName, route);
      const isDisabled = routeConfig && routeConfig.disabled;
      const matchers = routeConfig.matchers;

      if (isDisabled || !paths.length) {
        delete route.path;
        return {
          ...route,
          matcher: this.urlMatcherService.getFalsyUrlMatcher(),
        };
      } else if (matchers) {
        delete route.path;
        return { ...route, matcher: this.resolveUrlMatchers(matchers) };
      } else if (paths.length === 1) {
        delete route.matcher;
        return { ...route, path: paths[0] };
      } else {
        delete route.path;
        return {
          ...route,
          matcher: this.urlMatcherService.getMultiplePathsUrlMatcher(paths),
        };
      }
    }
    return route; // if route doesn't have a name, just pass the original route
  }

  private resolveUrlMatchers(matchers: RouteConfig['matchers']): UrlMatcher {
    const createdMatchers: UrlMatcher[] = matchers.map(matcher => {
      return typeof matcher === 'function'
        ? matcher
        : this.urlMatcherService.createUrlMatcher(matcher);
    });
    const result = this.urlMatcherService.combineUrlMatchers(createdMatchers);
    return result;
  }

  private getRouteName(route: Route): string {
    return route.data && route.data.cxRoute;
  }

  private getConfiguredPaths(
    routeConfig: RouteConfig,
    routeName: string,
    route: Route
  ): string[] {
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
    if (isDevMode()) {
      console.warn(...args);
    }
  }
}
