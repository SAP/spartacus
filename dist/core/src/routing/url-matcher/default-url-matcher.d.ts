import { InjectionToken } from '@angular/core';
import { RoutingConfigService } from '../configurable-routes';
import { UrlMatcherService } from '../services/url-matcher.service';
import { UrlMatcherFactory } from './url-matcher-factory';
export declare function getDefaultUrlMatcherFactory(routingConfigService: RoutingConfigService, urlMatcherService: UrlMatcherService): UrlMatcherFactory;
/**
 * Injection token with url matcher factory for spartacus routes containing property `data.cxRoute`.
 * The provided url matcher matches the configured `paths` from routing config.
 *
 * If this matcher doesn't fit the requirements, it can be replaced with custom matcher
 * or additional matchers can be added for a specific route. See for example PRODUCT_DETAILS_URL_MATCHER.
 *
 * Note: Matchers will "match" a route, but do not contribute to the creation of the route, nor do they guard routes.
 */
export declare const DEFAULT_URL_MATCHER: InjectionToken<UrlMatcherFactory>;
