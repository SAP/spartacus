import { inject, InjectionToken } from '@angular/core';
import { Route } from '@angular/router';
import {
  DEFAULT_URL_MATCHER_FACTORY,
  UrlMatcherFactory,
  UrlMatcherService,
} from '@spartacus/core';
import { getSuffixUrlMatcher } from '../../cms-structure/routing/suffix-routes/suffix-url-matcher';

export function getProductListingUrlMatcherFactory(
  service: UrlMatcherService,
  defaultMatcherFactory: UrlMatcherFactory
): UrlMatcherFactory {
  const factory = (route: Route) => {
    const defaultMatcher = defaultMatcherFactory(route);
    const suffixPLPMatcher = getSuffixUrlMatcher({
      marker: 'c',
      paramName: 'categoryCode',
    });
    return service.combine([defaultMatcher, suffixPLPMatcher]);
  };
  return factory;
}

/**
 * Injection token with url matcher factory for PLP.
 * The provided url matcher matches both:
 * - the configured `paths` from routing config and
 * - custom pattern  `** / c / :categoryCode`
 */
export const PRODUCT_LISTING_URL_MATCHER_FACTORY = new InjectionToken<
  UrlMatcherFactory
>('PRODUCT_LISTING_URL_MATCHER_FACTORY', {
  providedIn: 'root',
  factory: () =>
    getProductListingUrlMatcherFactory(
      inject(UrlMatcherService),
      inject(DEFAULT_URL_MATCHER_FACTORY)
    ),
});
