import { Injectable, Injector } from '@angular/core';
import { Route, Router, Routes } from '@angular/router';
import { SuffixRoutesConfig } from './suffix-routes-config';

@Injectable({ providedIn: 'root' })
export class SuffixRoutesService {
  constructor(private injector: Injector, private config: SuffixRoutesConfig) {}

  init() {
    const router = this.injector.get(Router);
    const newRoutes = this.disableRoutesByConfig(router.config);
    router.resetConfig(newRoutes);
  }

  private disableRoutesByConfig(routes: Routes): Routes {
    return (routes || []).map(route => {
      const name = this.getRouteName(route);
      return name && this.shouldDisableRoute(name)
        ? {
            ...route,
            matcher: () => null,
          }
        : route;
    });
  }

  private getRouteName(route: Route): string {
    return route.data && route.data.cxSuffixRoute;
  }

  private shouldDisableRoute(routeName: string): boolean {
    return (
      this.config &&
      this.config.routing &&
      this.config.routing.suffixRoutes &&
      this.config.routing.suffixRoutes[routeName] &&
      this.config.routing.suffixRoutes[routeName].disabled
    );
  }
}
