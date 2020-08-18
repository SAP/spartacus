import { RoutingService } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { distinctUntilChanged, map, pluck, switchMap } from 'rxjs/operators';
import { QUERY_PARAMS } from '../constants';

export abstract class BaseCurrentService<T> {
  code$: Observable<string>;

  model$: Observable<T>;

  readonly parentUnit$ = this.routingService
    .getRouterState()
    .pipe(
      map(
        (routingData) =>
          routingData.state.queryParams?.[QUERY_PARAMS.parentUnit]
      )
    );

  constructor(
    protected routingService: RoutingService,
    protected param: string
  ) {
    this.init();
  }

  protected init() {
    this.code$ = this.routingService
      .getParams()
      .pipe(pluck(this.param), distinctUntilChanged());

    this.model$ = this.code$.pipe(
      switchMap((code: string) => (code ? this.getModel(code) : of(null)))
    );
  }

  /**
   * Emits the current model or null, if there is no model available
   */
  protected abstract getModel(...params): Observable<T>;

  launch(cxRoute: string, params: any) {
    this.routingService.go({ cxRoute, params });
  }
}
