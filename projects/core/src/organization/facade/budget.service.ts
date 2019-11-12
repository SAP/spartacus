import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, queueScheduler } from 'rxjs';
import { filter, map, observeOn, take, tap } from 'rxjs/operators';
import { StateWithProcess } from '../../process/store/process-state';
import { LoaderState } from '../../state/utils/loader/loader-state';
import { AuthService } from '../../auth/facade/auth.service';
import { Budget, BudgetListModel } from '../../model/budget.model';
import {
  StateWithOrganization,
} from '../store/organization-state';
import { BudgetActions } from '../store/actions/index';
import {
  getBudgetState,
  getBudgetList,
} from '../store/selectors/budget.selector';
import { BudgetSearchConfig } from '../model/search-config';
// import { getProcessStateFactory } from '../../process/store/selectors/process.selectors';
// import { LOAD_BUDGETS_PROCESS_ID } from '../../../../../dist/core/src/organization/store/organization-state';

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

 // getBudgetsProcess() {
 //    return this.store.select(getProcessStateFactory(LOAD_BUDGETS_PROCESS_ID));
 //  }

  private getBudgetState(budgetCode: string) {
    return this.store.select(getBudgetState(budgetCode));
  }

  private getBudgetList(params): Observable<LoaderState<BudgetListModel>> {
    return this.store.select(getBudgetList(params));
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

  getList(params: BudgetSearchConfig): Observable<BudgetListModel> {
    return this.getBudgetList(params).pipe(
      observeOn(queueScheduler),
      tap((process: LoaderState<BudgetListModel>) => {
        if (!(process.loading || process.success || process.error)) {
          this.loadBudgets(params);
        }
      }),
      filter((process: LoaderState<BudgetListModel>) => process.success || process.error),
      map(result => result.value)
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
