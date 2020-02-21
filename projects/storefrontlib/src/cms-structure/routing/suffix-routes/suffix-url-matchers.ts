import { InjectionToken } from '@angular/core';
import { Route } from '@angular/router';
import { UrlMatcherFactory } from '@spartacus/core';
import { createSuffixUrlMatcher } from './create-suffix-url-matcher';

export const PDP_SUFFIX_URL_MATCHER_FACTORY = new InjectionToken<
  UrlMatcherFactory
>('PDP_SUFFIX_URL_MATCHER_FACTORY', {
  providedIn: 'root',
  factory: () => (_route: Route) =>
    createSuffixUrlMatcher({ marker: 'p', paramName: 'productCode' }),
});

export const PLP_SUFFIX_URL_MATCHER_FACTORY = new InjectionToken<
  UrlMatcherFactory
>('PLP_SUFFIX_URL_MATCHER_FACTORY', {
  providedIn: 'root',
  factory: () => (_route: Route) =>
    createSuffixUrlMatcher({ marker: 'c', paramName: 'categoryCode' }),
});
