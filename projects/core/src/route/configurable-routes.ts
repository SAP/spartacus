import { Route } from '@angular/router';

export interface ConfigurableRoutePath extends Route {
  data: {
    cxPath: string;
    [_: string]: any;
  };
}

export interface ConfigurableRouteRedirectTo extends Route {
  data: {
    cxRedirectTo: string;
    [_: string]: any;
  };
}

export type ConfigurableRoute =
  | ConfigurableRouteRedirectTo
  | ConfigurableRoutePath;

export type ConfigurableRoutes = ConfigurableRoute[];
