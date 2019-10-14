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
  getBudgetState,
} from '../store/selectors/budget.selector';

@Injectable()
export class BudgetService {
  private user$ = this.authService.getOccUserId();

  constructor(
    protected store: Store<StateWithOrganization | StateWithProcess<void>>,
    protected authService: AuthService
  ) {}

  loadBudget(budgetCode: string) {
    this.user$
      .pipe(take(1))
      .subscribe(uid =>
        this.store.dispatch(new BudgetActions.LoadBudget({ uid, budgetCode }))
      );
  }

  loadBudgets() {
    this.user$
      .pipe(take(1))
      .subscribe(uid =>
        this.store.dispatch(new BudgetActions.LoadBudgets(uid))
      );
  }

  getBudgetsProcess() {
    return this.store.select(getProcessStateFactory(LOAD_BUDGETS_PROCESS_ID));
  }

  getBudget(budgetCode: string) {
    return this.store.select(getBudgetState(budgetCode));
  }

  getBudgets() {
    return this.store.select(getBudgetsState);
  }

  loadAndGetBudgets() {
    return combineLatest([this.getBudgetsProcess(), this.getBudgets()]).pipe(
      debounceTime(0),
      filter(
        ([process]: [LoaderState<void>, LoaderState<Budget>]) =>
          !process.loading
      ),
      tap(([process]: [LoaderState<void>, LoaderState<Budget>]) => {
        if (!process.success) {
          this.loadBudgets();
        }
      }),
      filter(
        ([process]: [LoaderState<void>, LoaderState<Budget>]) =>
          process.success || process.error
      ),
      map(([, budgets]: [LoaderState<void>, LoaderState<Budget>]) => budgets)
    );
  }
}
