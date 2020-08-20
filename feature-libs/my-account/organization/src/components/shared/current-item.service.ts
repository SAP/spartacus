import { Injectable } from '@angular/core';
import { RoutingService } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { distinctUntilChanged, map, pluck, switchMap } from 'rxjs/operators';
import { QUERY_PARAMS } from '../constants';

/**
 * Abstract Base class for all organization features.
 */
@Injectable()
export abstract class CurrentItemService<T> {
  /**
   * Observes the code parameter from the (child)route. The code parameter
   * must be implemented by the concrete implementation, as we like to use
   * semantic, configurable route parameters, rather than a static "code"
   * route parameter.
   */
  readonly code$: Observable<string> = this.routingService
    .getParams()
    .pipe(pluck(this.getParam()), distinctUntilChanged());

  /**
   * Observes the data for the current code$.
   */
  readonly model$: Observable<T> = this.code$.pipe(
    switchMap((code: string) => (code ? this.getModel(code) : of(null)))
  );

  /**
   * Observes the b2bUnit based on the query parameters.
   */
  readonly parentUnit$ = this.routingService.getRouterState().pipe(
    map(
      (routingData) => routingData.state.queryParams?.[QUERY_PARAMS.parentUnit]
    ),
    distinctUntilChanged()
  );

  constructor(protected routingService: RoutingService) {}

  /**
   * Returns the route parameter key, that is used to bind to the router parameter.
   */
  protected abstract getParam(...params: any[]): string;

  /**
   * Emits the current model or null, if there is no model available
   */
  protected abstract getModel(...params: any[]): Observable<T>;

  /**
   * Navigation to the given cxRoute.
   */
  launch(cxRoute: string, params: any) {
    this.routingService.go({ cxRoute, params });
  }
}
