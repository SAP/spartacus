import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { distinctUntilChanged, pluck, switchMap } from 'rxjs/operators';
import { BudgetService } from '../../core/services/budget.service';
import { Budget } from '../../core/model/budget.model';

/**
 * Provides appropriate model based on the routing params.
 *
 * It's NOT meant to be provided in the root injector, BUT on the level
 * of the component activated by the route with routing params.
 */
@Injectable()
export class CurrentBudgetService {
  constructor(
    protected service: BudgetService,
    protected route: ActivatedRoute
  ) {}

  readonly code$ = this.route.params.pipe(
    pluck('code'),
    distinctUntilChanged()
  );

  /**
   * Emits the current model or null, if there is no model available
   */
  readonly Budget$: Observable<Budget> = this.code$.pipe(
    switchMap((code: string) => (code ? this.service.get(code) : of(null)))
  );
}
