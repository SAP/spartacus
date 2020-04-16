import { Injectable, isDevMode } from '@angular/core';
import { RouteConfig } from './routes-config';
import { RouteLoadStrategy, RoutingConfig } from './config/routing-config';

@Injectable({ providedIn: 'root' })
export class RoutingConfigService {
  constructor(protected config: RoutingConfig) {}

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

  getLoadStrategy(): RouteLoadStrategy {
    return this.config?.routing?.loadStrategy ?? RouteLoadStrategy.ALWAYS;
  }
}
