import { InjectionToken } from '@angular/core';
import { UrlMatcherFactory, UrlMatcherService } from '@spartacus/core';
export declare function getProductListingUrlMatcherFactory(service: UrlMatcherService, defaultMatcherFactory: UrlMatcherFactory): UrlMatcherFactory;
/**
 * Injection token with url matcher factory for PLP.
 * The provided url matcher matches both:
 * - the configured `paths` from routing config and
 * - custom pattern  `** / c / :categoryCode`
 *
 * If the this matcher doesn't fit the requirements, it can be replaced with the DEFAULT_URL_MATCHER
 * or additional matchers can be added for a specific route.
 *
 * Note: Matchers will "match" a route, but do not contribute to the creation of the route, nor do they guard routes.
 */
export declare const PRODUCT_LISTING_URL_MATCHER: InjectionToken<UrlMatcherFactory>;
