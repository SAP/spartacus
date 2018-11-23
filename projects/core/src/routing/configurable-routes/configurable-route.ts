import { Route } from '@angular/router';

export interface ConfigurableRoutePath extends Route {
  data: {
    cxPath: string;
    [_: string]: any;
  };
  children?: ConfigurableRoute[];
}

export interface ConfigurableRouteRedirectTo extends Route {
  data: {
    cxRedirectTo: string;
    [_: string]: any;
  };
  children?: ConfigurableRoute[];
}

export type ConfigurableRoute =
  | ConfigurableRouteRedirectTo
  | ConfigurableRoutePath;

export type ConfigurableRoutes = ConfigurableRoute[];
