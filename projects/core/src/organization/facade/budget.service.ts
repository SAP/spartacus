import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, queueScheduler } from 'rxjs';
import { filter, map, observeOn, switchMap, take, tap } from 'rxjs/operators';

import { getProcessStateFactory } from '../../process/store/selectors/process.selectors';
import { StateWithProcess } from '../../process/store/process-state';
import { LoaderState } from '../../state/utils/loader/loader-state';
import { AuthService } from '../../auth/facade/auth.service';
import { Budget } from '../../model/budget.model';
import {
  BudgetsList,
  LOAD_BUDGETS_PROCESS_ID,
  StateWithOrganization,
} from '../store/organization-state';
import { BudgetActions } from '../store/actions/index';
import {
  getBudgetManagementState,
  // getBudgetsState,
  getBudgetState,
} from '../store/selectors/budget.selector';
import { BudgetSearchConfig } from '../model/search-config';

@Injectable()
export class BudgetService {
  private user$ = this.authService.getOccUserId();

  constructor(
    protected store: Store<StateWithOrganization | StateWithProcess<void>>,
    protected authService: AuthService
  ) {}

  private loadBudget(budgetCode: string) {
    this.user$
      .pipe(take(1))
      .subscribe(userId =>
        this.store.dispatch(
          new BudgetActions.LoadBudget({ userId, budgetCode })
        )
      );
  }

  loadBudgets(params?: BudgetSearchConfig) {
    this.user$
      .pipe(take(1))
      .subscribe(userId =>
        this.store.dispatch(new BudgetActions.LoadBudgets({ userId, params }))
      );
  }

  getBudgetsProcess(): Observable<LoaderState<void>> {
    return this.store.select(getProcessStateFactory(LOAD_BUDGETS_PROCESS_ID));
  }

  private getBudgetState(budgetCode: string) {
    return this.store.select(getBudgetState(budgetCode));
  }

  private getBudgets(): Observable<BudgetsList> {
    return this.store.select(getBudgetManagementState);
  }

  get(budgetCode: string) {
    return this.getBudgetState(budgetCode).pipe(
      observeOn(queueScheduler),
      tap(state => {
        if (!(state.loading || state.success || state.error)) {
          this.loadBudget(budgetCode);
        }
      }),
      filter(state => state.success || state.error),
      map(state => state.value)
    );
  }

  getList(params?: BudgetSearchConfig): Observable<BudgetsList> {
    return this.getBudgetsProcess().pipe(
      observeOn(queueScheduler),
      tap((process: LoaderState<void>) => {
        if (!(process.loading || process.success || process.error)) {
          this.loadBudgets(params);
        }
      }),
      filter((process: LoaderState<void>) => process.success || process.error),
      switchMap(() => this.getBudgets())
    );
  }

  create(budget: Budget) {
    this.user$
      .pipe(take(1))
      .subscribe(userId =>
        this.store.dispatch(new BudgetActions.CreateBudget({ userId, budget }))
      );
  }

  update(budget: Budget) {
    this.user$
      .pipe(take(1))
      .subscribe(userId =>
        this.store.dispatch(new BudgetActions.UpdateBudget({ userId, budget }))
      );
  }
}
