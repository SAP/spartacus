import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CostCenter, CostCenterService } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import {
  distinctUntilChanged,
  filter,
  pluck,
  switchMap,
  switchMapTo,
  tap,
} from 'rxjs/operators';

/**
 * Provides appropriate model based on the code taken from the routing params.
 */
@Injectable()
export class CurrentCostCenterService {
  constructor(
    protected service: CostCenterService,
    protected route: ActivatedRoute
  ) {}

  protected readonly code$ = this.route.params.pipe(
    pluck('code') // spike todo: this will work for many pages, not only for costCenterDetails :/
  );

  /**
   * Emits current model or null, if there is no model available (we are on route without `code` param).
   */
  protected readonly model$: Observable<CostCenter> = this.code$.pipe(
    switchMap((code: string) => {
      return code ? this.service.get(code) : of(null);
    }),
    filter((x) => x !== undefined),
    distinctUntilChanged()
  );

  protected readonly reloadingModel$ = this.code$.pipe(
    tap((code) => this.service.load(code)),
    switchMapTo(this.model$)
  );

  get(options?: { forceReload?: boolean }) {
    return options.forceReload ? this.reloadingModel$ : this.model$;
  }
}
