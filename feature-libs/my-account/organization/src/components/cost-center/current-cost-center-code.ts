import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CostCenter, CostCenterService } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { distinctUntilChanged, pluck, switchMap } from 'rxjs/operators';

/**
 * Provides appropriate model based on the `code` taken from the routing params.
 *
 * It's meant to be provided on the component level so all the child components
 * can inject the model provided by the parent component. It's useful especially,
 * when child components are activated by nested <router-outlet> (so they can't
 * get the model via `@Input`).
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
