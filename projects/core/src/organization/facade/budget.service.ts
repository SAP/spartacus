import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { debounceTime, filter, map, take, tap } from 'rxjs/operators';

import { getProcessStateFactory } from '../../process/store/selectors/process.selectors';
import { StateWithProcess } from '../../process/store/process-state';
import { LoaderState } from '../../state/utils/loader/loader-state';
import { AuthService } from '../../auth/facade/auth.service';
import { Budget } from '../../model/budget.model';
import {
  LOAD_BUDGETS_PROCESS_ID,
  StateWithOrganization,
} from '../store/organization-state';
import { BudgetActions } from '../store/actions/index';
import {
  getBudgetsState,
  // getBudgetValueState,
  getBudgetState,
} from '../store/selectors/budget.selector';

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

  private loadBudgets() {
    this.user$
      .pipe(take(1))
      .subscribe(userId =>
        this.store.dispatch(new BudgetActions.LoadBudgets({userId}))
      );
  }

  private getBudgetsProcess() {
    return this.store.select(getProcessStateFactory(LOAD_BUDGETS_PROCESS_ID));
  }

  // private getBudgetValue(budgetCode: string) {
  //   return this.store.select(getBudgetValueState(budgetCode));
  // }

  private getBudgetState(budgetCode: string) {
    return this.store.select(getBudgetState(budgetCode));
  }

  private getBudgets() {
    return this.store.select(getBudgetsState);
  }

  getList() {
    type budgetsLoaders = [LoaderState<void>, LoaderState<Budget>];

    return combineLatest([this.getBudgetsProcess(), this.getBudgets()]).pipe(
      debounceTime(0),
      filter(
        ([process]: budgetsLoaders) =>
          !process.loading
      ),
      tap(([process]: budgetsLoaders) => {
        if (!process.success) {
          this.loadBudgets();
        }
      }),
      filter(
        ([process]: budgetsLoaders) =>
          process.success || process.error
      ),
      map(([, budgets]: budgetsLoaders) => budgets)
      // shareReplay({ bufferSize: 1, refCount: true })
    );
  }

  get(budgetCode: string) {
    return this.getBudgetState(budgetCode).pipe(
      filter(state => state && !state.loading),
      tap(state => {
        if (!state.success) {
          this.loadBudget(budgetCode);
        }
      }),
      filter(state => state.success || state.error),
      map(state => state.value)
      // shareReplay({ bufferSize: 1, refCount: true })
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
