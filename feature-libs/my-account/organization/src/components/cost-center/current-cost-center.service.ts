import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CostCenter } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { distinctUntilChanged, pluck, switchMap } from 'rxjs/operators';
import { CostCenterService } from '../../core/services/cost-center.service';

/**
 * Provides appropriate model based on the routing params.
 *
 * It's NOT meant to be provided in the root injector, BUT on the level
 * of the component activated by the route with routing params.
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

  readonly parentUnit$ = this.route.queryParams.pipe(
    pluck('parentUnit'),
    distinctUntilChanged()
  );

  /**
   * Emits the current model or null, if there is no model available
   */
  readonly costCenter$: Observable<CostCenter> = this.code$.pipe(
    switchMap((code: string) => (code ? this.service.get(code) : of(null)))
  );
}
