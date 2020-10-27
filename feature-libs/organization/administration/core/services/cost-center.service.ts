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
import { CostCenterActions } from '../store/actions/index';
import { StateWithOrganization } from '../store/organization-state';
import {
  getAssignedBudgets,
  getCostCenter,
  getCostCenterList,
  getCostCenterState,
  getCostCenterValue,
} from '../store/selectors/cost-center.selector';
import { getItemStatus } from '../utils/get-item-status';

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

  loadList(params?: SearchConfig): void {
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

  private getCostCenterValue(costCenterCode: string): Observable<CostCenter> {
    return this.store
      .select(getCostCenterValue(costCenterCode))
      .pipe(filter(Boolean));
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

  get(costCenterCode: string): Observable<Budget> {
    const loading$ = this.getCostCenter(costCenterCode).pipe(
      auditTime(0),
      tap((state) => {
        if (!(state.loading || state.success || state.error)) {
          this.load(costCenterCode);
        }
      })
    );

    return using(
      () => loading$.subscribe(),
      () => this.getCostCenterValue(costCenterCode)
    );
  }

  getList(params: SearchConfig): Observable<EntitiesModel<CostCenter>> {
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

  private getCostCenterState(
    costCenterCode: string
  ): Observable<StateUtils.LoaderState<Budget>> {
    return this.store.select(getCostCenterState(costCenterCode));
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

  getLoadingStatus(
    costCenterCode: string
  ): Observable<OrganizationItemStatus<CostCenter>> {
    return getItemStatus(this.getCostCenter(costCenterCode));
  }

  loadBudgets(costCenterCode: string, params: SearchConfig): void {
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
    params: SearchConfig
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

  getErrorState(costCenterCode): Observable<boolean> {
    return this.getCostCenterState(costCenterCode).pipe(
      map((state) => state.error)
    );
  }
}
