import { Route } from '@angular/router';
import { RoutingConfigService } from '../configurable-routes';
import { UrlMatcherService } from '../services/url-matcher.service';
import { UrlMatcherFactory } from './url-matcher-factory';

export const defaultUrlMatcherFactory: UrlMatcherFactory = {
  deps: [RoutingConfigService, UrlMatcherService],
  factory: (
    routingConfigService: RoutingConfigService,
    urlMatcherService: UrlMatcherService
  ) => (route: Route) => {
    const routeName = route.data && route.data['cxRoute'];
    const routeConfig = routingConfigService.getRouteConfig(routeName);
    const paths = (routeConfig && routeConfig.paths) || [];
    return urlMatcherService.fromPaths(paths);
  },
};
