import { Route, UrlMatcher } from '@angular/router';

export type UrlMatcherFactory = (route: Route) => UrlMatcher;
