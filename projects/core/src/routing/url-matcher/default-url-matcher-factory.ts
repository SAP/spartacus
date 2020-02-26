import { inject, InjectionToken } from '@angular/core';
import { Route } from '@angular/router';
import { RoutingConfigService } from '../configurable-routes';
import { UrlMatcherService } from '../services/url-matcher.service';
import { UrlMatcherFactory } from './url-matcher-factory';

export function getDefaultUrlMatcherFactory(
  routingConfigService: RoutingConfigService,
  urlMatcherService: UrlMatcherService
): UrlMatcherFactory {
  const factory = (route: Route) => {
    const routeName = route.data && route.data['cxRoute'];
    const routeConfig = routingConfigService.getRouteConfig(routeName);
    const paths = (routeConfig && routeConfig.paths) || [];
    return urlMatcherService.getFromPaths(paths);
  };
  return factory;
}

export const DEFAULT_URL_MATCHER_FACTORY = new InjectionToken<
  UrlMatcherFactory
>('DEFAULT_URL_MATCHER_FACTORY', {
  providedIn: 'root',
  factory: () =>
    getDefaultUrlMatcherFactory(
      inject(RoutingConfigService),
      inject(UrlMatcherService)
    ),
});
