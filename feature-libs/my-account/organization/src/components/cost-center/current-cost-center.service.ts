import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CostCenter, CostCenterService } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { distinctUntilChanged, pluck, switchMap } from 'rxjs/operators';

/**
 * Provides appropriate model based on the routing params.
 *
 * It's meant not to be provided in the root injector, but on the level
 * of the component activated byt the route with routing params.
 */
@Injectable()
export class CurrentCostCenterService {
  constructor(
    protected service: CostCenterService,
    protected route: ActivatedRoute
  ) {}

  readonly code$ = this.route.params.pipe(
    pluck('code'),
    distinctUntilChanged()
  );

  /**
   * Emits the current model or null, if there is no model available
   */
  readonly model$: Observable<CostCenter> = this.code$.pipe(
    switchMap((code: string) => (code ? this.service.get(code) : of(null)))
  );
}
