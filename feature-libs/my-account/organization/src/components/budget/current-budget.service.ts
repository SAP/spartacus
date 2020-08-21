import { Injectable } from '@angular/core';
import { Budget, BudgetService, RoutingService } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { distinctUntilChanged, pluck, switchMap } from 'rxjs/operators';

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
    protected service: BudgetService
  ) {}

  /**
   * Emits the current `budgetKey` param from the route.
   */
  readonly key$ = this.routingService
    .getParams()
    .pipe(pluck('budgetKey'), distinctUntilChanged());

  /**
   * Emits the current model or null, if there is no model available
   */
  readonly Budget$: Observable<Budget> = this.key$.pipe(
    switchMap((code: string) => (code ? this.service.get(code) : of(null)))
  );

  launch(params) {
    this.routingService.go({
      cxRoute: 'budgetDetails',
      params,
    });
  }
}
