import { Injectable, isDevMode } from '@angular/core';
import { RouteLoadStrategy, RoutingConfig } from './config/routing-config';
import { RouteConfig } from './routes-config';

@Injectable({ providedIn: 'root' })
export class RoutingConfigService {
  /**
   * Reversed routing config for quick lookup of the route name by the configured path.
   */
  protected routeNamesByPath: { [path: string]: string };

  constructor(protected config: RoutingConfig) {}

  /**
   * Returns the route config for the given route name.
   */
  getRouteConfig(routeName: string): RouteConfig {
    const routeConfig = this.config?.routing?.routes;

    const result = routeConfig && routeConfig[routeName];
    if (!routeConfig || result === undefined) {
      this.warn(`No path was configured for the named route '${routeName}'!`);
    }
    return result;
  }

  private warn(...args) {
    if (isDevMode()) {
      console.warn(...args);
    }
  }

  /**
   * Returns the configured route loading strategy.
   */
  getLoadStrategy(): RouteLoadStrategy {
    return this.config?.routing?.loadStrategy ?? RouteLoadStrategy.ALWAYS;
  }

  /**
   * Returns the route name of the configured path.
   *
   * For example, when the config is:
   * ```
   * routing: {
   *   routes: {
   *      addressBook: { paths: ['my-account/address-book'] }
   *   }
   * }
   * ```
   *
   * the `getRouteName('my-account/address-book')` returns `'addressBook'`.
   */
  getRouteName(path: string) {
    if (!this.routeNamesByPath) {
      this.initRouteNamesByPath();
    }
    return this.routeNamesByPath[path];
  }

  /**
   * Initializes the property `routeNamesByPath`.
   *
   * The original config allows for reading configured path by the route name.
   * But this method builds up a structure with a 'reversed config'
   * to read quickly the route name by the path.
   */
  protected initRouteNamesByPath() {
    this.routeNamesByPath = {};

    for (const [routeName, routeConfig] of Object.entries(
      this.config?.routing?.routes
    )) {
      routeConfig?.paths?.forEach((path) => {
        if (isDevMode() && this.routeNamesByPath[path]) {
          console.error(
            `The same path '${path}' is configured for two different route names: '${this.routeNamesByPath[path]}' and '${routeName}`
          );
        }
        this.routeNamesByPath[path] = routeName;
      });
    }
  }
}
