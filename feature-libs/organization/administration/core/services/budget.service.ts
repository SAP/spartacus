import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  CostCenter,
  EntitiesModel,
  SearchConfig,
  StateUtils,
  StateWithProcess,
  UserIdService,
} from '@spartacus/core';
import { Observable, queueScheduler, using } from 'rxjs';
import { auditTime, filter, map, observeOn, tap } from 'rxjs/operators';
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
    protected userIdService: UserIdService
  ) {}

  loadBudget(budgetCode: string): void {
    this.userIdService.takeUserId(true).subscribe(
      (userId) =>
        this.store.dispatch(
          new BudgetActions.LoadBudget({ userId, budgetCode })
        ),
      () => {
        // TODO: for future releases, refactor this part to thrown errors
      }
    );
  }

  loadBudgets(params?: SearchConfig): void {
    this.userIdService.takeUserId(true).subscribe(
      (userId) =>
        this.store.dispatch(new BudgetActions.LoadBudgets({ userId, params })),
      () => {
        // TODO: for future releases, refactor this part to thrown errors
      }
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

  getErrorState(budgetCode): Observable<boolean> {
    return this.getBudgetState(budgetCode).pipe(map((state) => state.error));
  }

  create(budget: Budget): void {
    this.userIdService.takeUserId(true).subscribe(
      (userId) =>
        this.store.dispatch(new BudgetActions.CreateBudget({ userId, budget })),
      () => {
        // TODO: for future releases, refactor this part to thrown errors
      }
    );
  }

  update(budgetCode: string, budget: Budget): void {
    this.userIdService.takeUserId(true).subscribe(
      (userId) =>
        this.store.dispatch(
          new BudgetActions.UpdateBudget({ userId, budgetCode, budget })
        ),
      () => {
        // TODO: for future releases, refactor this part to thrown errors
      }
    );
  }

  getLoadingStatus(
    budgetCode: string
  ): Observable<OrganizationItemStatus<Budget>> {
    return getItemStatus(this.getBudgetState(budgetCode));
  }
}
