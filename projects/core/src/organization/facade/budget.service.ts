import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  LOAD_BUDGETS_PROCESS_ID,
  StateWithOrganization,
} from '../store/organization-state';
import { BudgetActions } from '../store/actions/index';
import {
  getBudgetsState,
  getBudgetState,
} from '../store/selectors/budget.selector';
import { debounceTime, filter, map, take, tap } from 'rxjs/operators';
import { AuthService } from '../../auth/facade/auth.service';
import {
  getProcessLoadingFactory,
  getProcessSuccessFactory,
} from '../../process/store/selectors/process.selectors';
import { StateWithProcess } from '../../process/store/process-state';
import { combineLatest } from 'rxjs';
import { LoaderState } from '../../state/utils/loader/loader-state';
import { Budget } from '../../model/budget.model';

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

  getBudgets() {
    return this.store.select(getBudgetsState);
  }

  loadAndGetBudgets() {
    return combineLatest([
      this.getBudgetsLoading(),
      this.getBudgetsLoaded(),
      this.getBudgets(),
    ]).pipe(
      debounceTime(0),
      filter(([loading]: [boolean, boolean, LoaderState<Budget>]) => !loading),
      tap(([, loaded]: [boolean, boolean, LoaderState<Budget>]) => {
        if (!loaded) {
          this.loadBudgets();
        }
      }),
      filter(([, loaded]: [boolean, boolean, LoaderState<Budget>]) => loaded),
      map(([, , budgets]: [boolean, boolean, LoaderState<Budget>]) => budgets)
    );
  }
  //
  // getBudgetsProcess() {
  //   return this.store.select(getProcessStateFactory(LOAD_BUDGETS_PROCESS_ID));
  // }

  getBudgetsLoading() {
    return this.store.select(getProcessLoadingFactory(LOAD_BUDGETS_PROCESS_ID));
  }
  getBudgetsLoaded() {
    return this.store.select(getProcessSuccessFactory(LOAD_BUDGETS_PROCESS_ID));
  }

  getBudget(budgetCode: string) {
    return this.store.select(getBudgetState(budgetCode));
  }
}
