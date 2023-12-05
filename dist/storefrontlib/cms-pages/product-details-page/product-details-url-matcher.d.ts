import { InjectionToken } from '@angular/core';
import { UrlMatcherFactory, UrlMatcherService } from '@spartacus/core';
export declare function getProductDetailsUrlMatcherFactory(service: UrlMatcherService, defaultMatcherFactory: UrlMatcherFactory): UrlMatcherFactory;
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
export declare const PRODUCT_DETAILS_URL_MATCHER: InjectionToken<UrlMatcherFactory>;
