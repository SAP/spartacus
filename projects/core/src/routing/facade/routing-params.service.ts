import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ActivatedRoutesService } from '../services/activated-routes.service';

/**
 * Service to expose all parameters for the router, including child routes.
 * This is convenient in case the parent route (component) requires awareness
 * of child routes parameters.
 */
@Injectable({ providedIn: 'root' })
export class RoutingParamsService {
  protected readonly params$: Observable<{
    [key: string]: string;
  }> = this.activatedRoutesService.routes$.pipe(
    map((routes) => this.findAllParam(routes)),
    shareReplay({ refCount: true, bufferSize: 1 })
  );

  protected readonly data$: Observable<{
    [key: string]: string;
  }> = this.activatedRoutesService.routes$.pipe(
    map((routes) => this.findAllParam(routes, 'data')),
    shareReplay({ refCount: true, bufferSize: 1 })
  );

  constructor(
    protected router: Router,
    protected activatedRoutesService: ActivatedRoutesService
  ) {
    // SPIKE TODO REMOVE:
    this.activatedRoutesService.routes$.subscribe((activatedRoutes) =>
      console.log({ activatedRoutes })
    );
  }

  /**
   * Get the list of all parameters of the full route. This includes
   * active child routes.
   */
  getParams(): Observable<{ [key: string]: string }> {
    return this.params$;
  }

  /**
   * Get the list of all parameters of the full route. This includes
   * active child routes.
   */
  getData(): Observable<{ [key: string]: string }> {
    return this.data$;
  }

  protected findAllParam(
    routes: ActivatedRouteSnapshot[],
    key: keyof ActivatedRouteSnapshot = 'params'
  ): {
    [key: string]: string;
  } {
    return Object.assign({}, ...routes.map((route) => route[key]));
  }
}
