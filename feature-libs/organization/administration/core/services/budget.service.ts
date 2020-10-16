import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  AuthService,
  CostCenter,
  EntitiesModel,
  SearchConfig,
  StateUtils,
  StateWithProcess,
} from '@spartacus/core';
import { Observable, queueScheduler, using } from 'rxjs';
import { auditTime, filter, map, observeOn, take, tap } from 'rxjs/operators';
import { Budget } from '../model/budget.model';
import { OrganizationItemStatus } from '../model/organization-item-status';
import { BudgetActions, StateWithOrganization } from '../store/index';
import {
  getBudget,
  getBudgetList,
  getBudgetValue,
} from '../store/selectors/budget.selector';
import { getItemStatus } from '../utils/get-item-status';

@Injectable({ providedIn: 'root' })
export class BudgetService {
  constructor(
    protected store: Store<StateWithOrganization | StateWithProcess<void>>,
    protected authService: AuthService
  ) {}

  loadBudget(budgetCode: string): void {
    this.withUserId((userId) =>
      this.store.dispatch(new BudgetActions.LoadBudget({ userId, budgetCode }))
    );
  }

  loadBudgets(params?: SearchConfig): void {
    this.withUserId((userId) =>
      this.store.dispatch(new BudgetActions.LoadBudgets({ userId, params }))
    );
  }

  private getBudgetState(
    budgetCode: string
  ): Observable<StateUtils.LoaderState<Budget>> {
    return this.store.select(getBudget(budgetCode));
  }

  private getBudgetValue(budgetCode: string): Observable<Budget> {
    return this.store.select(getBudgetValue(budgetCode)).pipe(filter(Boolean));
  }

  private getBudgetList(
    params
  ): Observable<StateUtils.LoaderState<EntitiesModel<Budget>>> {
    return this.store.select(getBudgetList(params));
  }

  get(budgetCode: string): Observable<Budget> {
    const loading$ = this.getBudgetState(budgetCode).pipe(
      auditTime(0),
      tap((state) => {
        if (!(state.loading || state.success || state.error)) {
          this.loadBudget(budgetCode);
        }
      })
    );

    return using(
      () => loading$.subscribe(),
      () => this.getBudgetValue(budgetCode)
    );
  }

  getList(params: SearchConfig): Observable<EntitiesModel<Budget>> {
    return this.getBudgetList(params).pipe(
      observeOn(queueScheduler),
      tap((process: StateUtils.LoaderState<EntitiesModel<Budget>>) => {
        if (!(process.loading || process.success || process.error)) {
          this.loadBudgets(params);
        }
      }),
      filter(
        (process: StateUtils.LoaderState<EntitiesModel<Budget>>) =>
          process.success || process.error
      ),
      map((result) => result.value)
    );
  }

  getCostCenters(budgetCode: string): Observable<EntitiesModel<CostCenter>> {
    return this.get(budgetCode).pipe(
      map(
        (budget) =>
          ({
            values: budget.costCenters ?? [],
          } as EntitiesModel<CostCenter>)
      )
    );
  }

  create(budget: Budget): void {
    this.withUserId((userId) =>
      this.store.dispatch(new BudgetActions.CreateBudget({ userId, budget }))
    );
  }

  update(budgetCode: string, budget: Budget): void {
    this.withUserId((userId) =>
      this.store.dispatch(
        new BudgetActions.UpdateBudget({ userId, budgetCode, budget })
      )
    );
  }

  getLoadingStatus(
    budgetCode: string
  ): Observable<OrganizationItemStatus<Budget>> {
    return getItemStatus(this.getBudgetState(budgetCode));
  }

  private withUserId(callback: (userId: string) => void): void {
    this.authService
      .getOccUserId()
      .pipe(take(1))
      .subscribe((userId) => callback(userId));
  }
}
