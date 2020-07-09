import { Injectable } from '@angular/core';
import { logger } from '../../util/logging.service';
import { RouteLoadStrategy, RoutingConfig } from './config/routing-config';
import { RouteConfig } from './routes-config';

@Injectable({ providedIn: 'root' })
export class RoutingConfigService {
  constructor(protected config: RoutingConfig) {}

  getRouteConfig(routeName: string): RouteConfig {
    const routeConfig = this.config?.routing?.routes;

    const result = routeConfig && routeConfig[routeName];
    if (!routeConfig || result === undefined) {
      logger.warn(`No path was configured for the named route '${routeName}'!`);
    }
    return result;
  }

  getLoadStrategy(): RouteLoadStrategy {
    return this.config?.routing?.loadStrategy ?? RouteLoadStrategy.ALWAYS;
  }
}
