import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, queueScheduler } from 'rxjs';
import { filter, map, observeOn, take, tap } from 'rxjs/operators';
import { StateWithProcess } from '../../process/store/process-state';
import { LoaderState } from '../../state/utils/loader/loader-state';
import { AuthService } from '../../auth/facade/auth.service';
import { Budget } from '../../model/budget.model';
import { EntitiesModel } from '../../model/misc.model';
import { StateWithOrganization } from '../store/organization-state';
import { BudgetActions } from '../store/actions/index';
import {
  getBudgetState,
  getBudgetList,
} from '../store/selectors/budget.selector';
import { B2BSearchConfig } from '../model/search-config';

@Injectable()
export class BudgetService {
  constructor(
    protected store: Store<StateWithOrganization | StateWithProcess<void>>,
    protected authService: AuthService
  ) {}

  loadBudget(budgetCode: string) {
    this.withUserId(userId =>
      this.store.dispatch(new BudgetActions.LoadBudget({ userId, budgetCode }))
    );
  }

  loadBudgets(params?: B2BSearchConfig) {
    this.withUserId(userId =>
      this.store.dispatch(new BudgetActions.LoadBudgets({ userId, params }))
    );
  }

  private getBudgetState(budgetCode: string) {
    return this.store.select(getBudgetState(budgetCode));
  }

  private getBudgetList(
    params
  ): Observable<LoaderState<EntitiesModel<Budget>>> {
    return this.store.select(getBudgetList(params));
  }

  get(budgetCode: string): Observable<Budget> {
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

  getList(params: B2BSearchConfig): Observable<EntitiesModel<Budget>> {
    return this.getBudgetList(params).pipe(
      observeOn(queueScheduler),
      tap((process: LoaderState<EntitiesModel<Budget>>) => {
        if (!(process.loading || process.success || process.error)) {
          this.loadBudgets(params);
        }
      }),
      filter(
        (process: LoaderState<EntitiesModel<Budget>>) =>
          process.success || process.error
      ),
      map(result => result.value)
    );
  }

  create(budget: Budget) {
    this.withUserId(userId =>
      this.store.dispatch(new BudgetActions.CreateBudget({ userId, budget }))
    );
  }

  update(budgetCode: string, budget: Budget) {
    this.withUserId(userId =>
      this.store.dispatch(
        new BudgetActions.UpdateBudget({ userId, budgetCode, budget })
      )
    );
  }

  private withUserId(callback: (userId: string) => void): void {
    this.authService
      .getOccUserId()
      .pipe(take(1))
      .subscribe(userId => callback(userId));
  }
}
