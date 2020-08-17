import { Injectable } from '@angular/core';
import { Budget, BudgetService, RoutingService } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { distinctUntilChanged, map, pluck, switchMap } from 'rxjs/operators';
import { BUDGET_CODE } from '../constants';

/**
 * Provides appropriate model based on the routing params.
 *
 * It's NOT meant to be provided in the root injector, BUT on the level
 * of the component activated by the route with routing params.
 */
@Injectable({
  providedIn: 'root',
})
export class CurrentBudgetService {
  constructor(
    protected routingService: RoutingService,
    protected budgetService: BudgetService
  ) {}

  /**
   * Exposes the budget code from the full route, including any of the child routes.
   */
  readonly code$: Observable<string> = this.routingService
    .getParams()
    .pipe(pluck(BUDGET_CODE), distinctUntilChanged());

  readonly parentUnit$: Observable<
    string
  > = this.routingService
    .getRouterState()
    .pipe(map((routingData) => routingData.state.queryParams?.['parentUnit']));

  /**
   * Emits the current model or null, if there is no model available
   */
  readonly Budget$: Observable<Budget> = this.code$.pipe(
    switchMap((code: string) =>
      code ? this.budgetService.get(code) : of(null)
    )
  );

  launch(params: any) {
    this.routingService.go({ cxRoute: 'budgetDetails', params });
  }
}
