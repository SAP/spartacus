import { OnInit } from '@angular/core';
import { RoutingService } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { distinctUntilChanged, map, pluck, switchMap } from 'rxjs/operators';
import { QUERY_PARAMS } from '../constants';

export abstract class BaseCurrentService<T> implements OnInit {
  abstract paramCode: string;

  constructor(protected routingService: RoutingService) {}

  readonly code$ = this.routingService
    .getParams()
    .pipe(pluck(this._paramCode), distinctUntilChanged());

  readonly parentUnit$ = this.routingService
    .getRouterState()
    .pipe(
      map(
        (routingData) =>
          routingData.state.queryParams?.[QUERY_PARAMS.parentUnit]
      )
    );

  readonly model$: Observable<T> = this.code$.pipe(
    switchMap((code: string) => (code ? this.getModel(code) : of(null)))
  );

  protected get _paramCode() {
    return this.paramCode;
  }

  ngOnInit() {
    // this.code$ =
  }

  /**
   * Emits the current model or null, if there is no model available
   */
  abstract getModel(...params): Observable<T>;

  launch(cxRoute: string, params: any) {
    this.routingService.go({ cxRoute, params });
  }
}
