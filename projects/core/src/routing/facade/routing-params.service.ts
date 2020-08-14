import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, shareReplay, startWith } from 'rxjs/operators';

/**
 * Service to expose all parameters for the router, including child routes.
 *
 */
@Injectable({ providedIn: 'root' })
export class RoutingParamsService {
  protected routerEvent$ = this.router.events.pipe(
    filter((event) => event instanceof NavigationEnd),
    startWith(this.router)
  );

  protected readonly params$: Observable<{
    [key: string]: string;
  }> = this.routerEvent$.pipe(
    map(() => this.findAllParam(this.router.routerState.snapshot.root)),
    shareReplay({ refCount: true, bufferSize: 1 })
  );

  constructor(protected router: Router) {}

  getParams(): Observable<{ [key: string]: string }> {
    return this.params$;
  }

  protected findAllParam(
    route: ActivatedRouteSnapshot
  ): { [key: string]: string } {
    let params = {};
    route.children.forEach((c) =>
      c.paramMap.keys.forEach((key) => (params[key] = c.paramMap.get(key)))
    );
    route.children.forEach(
      (c) => (params = { ...params, ...this.findAllParam(c) })
    );
    return params;
  }
}
