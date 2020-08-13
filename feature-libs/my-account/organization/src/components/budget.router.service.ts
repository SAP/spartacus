import { Injectable } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  NavigationEnd,
  Router,
} from '@angular/router';
import { filter, map, shareReplay, startWith } from 'rxjs/operators';

/**
 * Service to expose all parameters for the router, including child routes.
 *
 * TODO: consider moving to RoutingService or core lib.
 */
@Injectable({ providedIn: 'root' })
export class ParamRoutingService {
  protected routerEvent$ = this.router.events.pipe(
    filter((event) => event instanceof NavigationEnd),
    startWith(this.router)
  );

  params$ = this.routerEvent$.pipe(
    map(() => this.findAllParam(this.route.root.snapshot)),
    shareReplay({ refCount: true, bufferSize: 1 })
  );

  protected findAllParam(route: ActivatedRouteSnapshot) {
    let params = {};
    route.children.forEach((c) =>
      c.paramMap.keys.forEach((key) => (params[key] = c.paramMap.get(key)))
    );

    route.children.forEach((c) => {
      params = {
        ...params,
        ...this.findAllParam(c),
      };
    });
    return params;
  }

  constructor(protected route: ActivatedRoute, protected router: Router) {}
}
