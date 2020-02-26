import { inject, InjectionToken } from '@angular/core';
import { Route } from '@angular/router';
import {
  DEFAULT_URL_MATCHER_FACTORY,
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
 */
export const PRODUCT_DETAILS_URL_MATCHER_FACTORY = new InjectionToken<
  UrlMatcherFactory
>('PRODUCT_DETAILS_URL_MATCHER_FACTORY', {
  providedIn: 'root',
  factory: () =>
    getProductDetailsUrlMatcherFactory(
      inject(UrlMatcherService),
      inject(DEFAULT_URL_MATCHER_FACTORY)
    ),
});
