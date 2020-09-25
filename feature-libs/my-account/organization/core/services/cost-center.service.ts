import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  AuthService,
  CostCenter,
  EntitiesModel,
  StateUtils,
  StateWithProcess,
} from '@spartacus/core';
import { Observable, queueScheduler } from 'rxjs';
import { filter, map, observeOn, take, tap } from 'rxjs/operators';
import { Budget } from '../model/budget.model';
import { B2BSearchConfig } from '../model/search-config';
import { CostCenterActions } from '../store/actions/index';
import { StateWithOrganization } from '../store/organization-state';
import {
  getAssignedBudgets,
  getCostCenter,
  getCostCenterList,
} from '../store/selectors/cost-center.selector';

@Injectable({ providedIn: 'root' })
export class CostCenterService {
  constructor(
    protected store: Store<StateWithOrganization | StateWithProcess<void>>,
    protected authService: AuthService
  ) {}

  load(costCenterCode: string): void {
    this.withUserId((userId) =>
      this.store.dispatch(
        new CostCenterActions.LoadCostCenter({ userId, costCenterCode })
      )
    );
  }

  loadList(params?: B2BSearchConfig): void {
    this.withUserId((userId) =>
      this.store.dispatch(
        new CostCenterActions.LoadCostCenters({ userId, params })
      )
    );
  }

  private getCostCenter(
    costCenterCode: string
  ): Observable<StateUtils.LoaderState<CostCenter>> {
    return this.store.select(getCostCenter(costCenterCode));
  }

  private getCostCenterList(
    params
  ): Observable<StateUtils.LoaderState<EntitiesModel<CostCenter>>> {
    return this.store.select(getCostCenterList(params));
  }
  private getBudgetList(
    costCenterCode,
    params
  ): Observable<StateUtils.LoaderState<EntitiesModel<Budget>>> {
    return this.store.select(getAssignedBudgets(costCenterCode, params));
  }

  get(costCenterCode: string): Observable<CostCenter> {
    return this.getCostCenter(costCenterCode).pipe(
      observeOn(queueScheduler),
      tap((state) => {
        if (!(state.loading || state.success || state.error)) {
          this.load(costCenterCode);
        }
      }),
      filter((state) => state.success || state.error),
      map((state) => state.value)
    );
  }

  getList(params: B2BSearchConfig): Observable<EntitiesModel<CostCenter>> {
    return this.getCostCenterList(params).pipe(
      observeOn(queueScheduler),
      tap((process: StateUtils.LoaderState<EntitiesModel<CostCenter>>) => {
        if (!(process.loading || process.success || process.error)) {
          this.loadList(params);
        }
      }),
      filter(
        (process: StateUtils.LoaderState<EntitiesModel<CostCenter>>) =>
          process.success || process.error
      ),
      map((result) => result.value)
    );
  }

  create(costCenter: CostCenter): void {
    this.withUserId((userId) =>
      this.store.dispatch(
        new CostCenterActions.CreateCostCenter({ userId, costCenter })
      )
    );
  }

  update(costCenterCode: string, costCenter: CostCenter): void {
    this.withUserId((userId) =>
      this.store.dispatch(
        new CostCenterActions.UpdateCostCenter({
          userId,
          costCenterCode,
          costCenter,
        })
      )
    );
  }

  loadBudgets(costCenterCode: string, params: B2BSearchConfig): void {
    this.withUserId((userId) =>
      this.store.dispatch(
        new CostCenterActions.LoadAssignedBudgets({
          userId,
          costCenterCode,
          params,
        })
      )
    );
  }

  getBudgets(
    costCenterCode: string,
    params: B2BSearchConfig
  ): Observable<EntitiesModel<Budget>> {
    return this.getBudgetList(costCenterCode, params).pipe(
      observeOn(queueScheduler),
      tap((process: StateUtils.LoaderState<EntitiesModel<Budget>>) => {
        if (!(process.loading || process.success || process.error)) {
          this.loadBudgets(costCenterCode, params);
        }
      }),
      filter(
        (process: StateUtils.LoaderState<EntitiesModel<Budget>>) =>
          process.success || process.error
      ),
      map((result) => result.value)
    );
  }

  assignBudget(costCenterCode: string, budgetCode: string): void {
    this.withUserId((userId) =>
      this.store.dispatch(
        new CostCenterActions.AssignBudget({
          userId,
          costCenterCode,
          budgetCode,
        })
      )
    );
  }

  unassignBudget(costCenterCode: string, budgetCode: string): void {
    this.withUserId((userId) =>
      this.store.dispatch(
        new CostCenterActions.UnassignBudget({
          userId,
          costCenterCode,
          budgetCode,
        })
      )
    );
  }

  private withUserId(callback: (userId: string) => void): void {
    this.authService
      .getOccUserId()
      .pipe(take(1))
      .subscribe((userId) => callback(userId));
  }
}
