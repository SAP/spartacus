import { inject, InjectionToken } from '@angular/core';
import { Route } from '@angular/router';
import {
  DEFAULT_URL_MATCHER,
  UrlMatcherFactory,
  UrlMatcherService,
} from '@spartacus/core';
import { getSuffixUrlMatcher } from '../../cms-structure/routing/suffix-routes/suffix-url-matcher';

export function getProductDetailsUrlMatcherFactory(
  service: UrlMatcherService,
  defaultMatcherFactory: UrlMatcherFactory
): UrlMatcherFactory {
  const factory = (route: Route) => {
    const defaultMatcher = defaultMatcherFactory(route);
    const suffixPDPMatcher = getSuffixUrlMatcher({
      marker: 'p',
      paramName: 'productCode',
    });
    return service.getCombined([defaultMatcher, suffixPDPMatcher]);
  };
  return factory;
}

/**
 * Injection token with url matcher factory for PDP.
 * The provided url matcher matches both:
 * - the configured `paths` from routing config and
 * - custom pattern  `** / p / :productCode`
 *
 * If the this matcher doesn't fit the requirements, it can be replaced with the DEFAULT_URL_MATCHER
 * or additional matchers can be added for a specific route.
 *
 * Note: Matchers will "match" a route, but do not contribute to the creation of the route, nor do they guard routes.
 */
export const PRODUCT_DETAILS_URL_MATCHER =
  new InjectionToken<UrlMatcherFactory>('PRODUCT_DETAILS_URL_MATCHER', {
    providedIn: 'root',
    factory: () =>
      getProductDetailsUrlMatcherFactory(
        inject(UrlMatcherService),
        inject(DEFAULT_URL_MATCHER)
      ),
  });
