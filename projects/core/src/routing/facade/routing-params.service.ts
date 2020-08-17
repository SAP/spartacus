import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, shareReplay, startWith } from 'rxjs/operators';

/**
 * Service to expose all parameters for the router, including child routes.
 * This is convenient in case the parent route (component) requires awareness
 * of child routes parameters.
 */
@Injectable({ providedIn: 'root' })
export class RoutingParamsService {
  protected navigationEndEvent$ = this.router.events.pipe(
    filter((event) => event instanceof NavigationEnd)
  );

  protected readonly params$: Observable<{
    [key: string]: string;
  }> = this.navigationEndEvent$.pipe(
    // tslint:disable-next-line: deprecation (https://github.com/ReactiveX/rxjs/issues/4772)
    startWith(undefined), // emit value for consumer who subscribed lately after NavigationEnd event
    map(() => this.findAllParam(this.router.routerState.snapshot.root)),
    shareReplay({ refCount: true, bufferSize: 1 })
  );

  constructor(protected router: Router) {}

  /**
   * Get the list of all parameters of the full route. This includes
   * active child routes.
   */
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
