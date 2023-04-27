/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  CostCenter,
  EntitiesModel,
  SearchConfig,
  StateUtils,
  UserIdService,
} from '@spartacus/core';
import { Observable, queueScheduler, using } from 'rxjs';
import { auditTime, filter, map, observeOn, tap } from 'rxjs/operators';
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
    protected store: Store<StateWithOrganization>,
    protected userIdService: UserIdService
  ) {}

  load(costCenterCode: string): void {
    this.userIdService.takeUserId(true).subscribe({
      next: (userId) =>
        this.store.dispatch(
          new CostCenterActions.LoadCostCenter({ userId, costCenterCode })
        ),
      error: () => {
        // TODO: for future releases, refactor this part to thrown errors
      },
    });
  }

  loadList(params: SearchConfig): void {
    this.userIdService.takeUserId(true).subscribe({
      next: (userId) =>
        this.store.dispatch(
          new CostCenterActions.LoadCostCenters({ userId, params })
        ),
      error: () => {
        // TODO: for future releases, refactor this part to thrown errors
      },
    });
  }

  private getCostCenter(
    costCenterCode: string
  ): Observable<StateUtils.LoaderState<CostCenter>> {
    return this.store.select(getCostCenter(costCenterCode));
  }

  private getCostCenterValue(costCenterCode: string): Observable<CostCenter> {
    return this.store
      .select(getCostCenterValue(costCenterCode))
      .pipe(filter((costCenter) => Boolean(costCenter)));
  }

  private getCostCenterList(
    params: SearchConfig
  ): Observable<StateUtils.LoaderState<EntitiesModel<CostCenter>>> {
    return this.store.select(getCostCenterList(params));
  }

  private getBudgetList(
    costCenterCode: string,
    params: SearchConfig
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

  getList(
    params: SearchConfig
  ): Observable<EntitiesModel<CostCenter> | undefined> {
    return this.getCostCenterList(params).pipe(
      observeOn(queueScheduler),
      tap((process: StateUtils.LoaderState<EntitiesModel<CostCenter>>) => {
        if (!(process.loading || process.success || process.error)) {
          this.loadList(params);
        }
      }),
      filter((process: StateUtils.LoaderState<EntitiesModel<CostCenter>>) =>
        Boolean(process.success || process.error)
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
    this.userIdService.takeUserId(true).subscribe({
      next: (userId) =>
        this.store.dispatch(
          new CostCenterActions.CreateCostCenter({ userId, costCenter })
        ),
      error: () => {
        // TODO: for future releases, refactor this part to thrown errors
      },
    });
  }

  update(costCenterCode: string, costCenter: CostCenter): void {
    this.userIdService.takeUserId(true).subscribe({
      next: (userId) =>
        this.store.dispatch(
          new CostCenterActions.UpdateCostCenter({
            userId,
            costCenterCode,
            costCenter,
          })
        ),
      error: () => {
        // TODO: for future releases, refactor this part to thrown errors
      },
    });
  }

  getLoadingStatus(
    costCenterCode: string
  ): Observable<OrganizationItemStatus<CostCenter>> {
    return getItemStatus(this.getCostCenter(costCenterCode));
  }

  loadBudgets(costCenterCode: string, params: SearchConfig): void {
    this.userIdService.takeUserId(true).subscribe({
      next: (userId) =>
        this.store.dispatch(
          new CostCenterActions.LoadAssignedBudgets({
            userId,
            costCenterCode,
            params,
          })
        ),
      error: () => {
        // TODO: for future releases, refactor this part to thrown errors
      },
    });
  }

  getBudgets(
    costCenterCode: string,
    params: SearchConfig
  ): Observable<EntitiesModel<Budget> | undefined> {
    return this.getBudgetList(costCenterCode, params).pipe(
      observeOn(queueScheduler),
      tap((process: StateUtils.LoaderState<EntitiesModel<Budget>>) => {
        if (!(process.loading || process.success || process.error)) {
          this.loadBudgets(costCenterCode, params);
        }
      }),
      filter((process: StateUtils.LoaderState<EntitiesModel<Budget>>) =>
        Boolean(process.success || process.error)
      ),
      map((result) => result.value)
    );
  }

  assignBudget(costCenterCode: string, budgetCode: string): void {
    this.userIdService.takeUserId(true).subscribe({
      next: (userId) =>
        this.store.dispatch(
          new CostCenterActions.AssignBudget({
            userId,
            costCenterCode,
            budgetCode,
          })
        ),
      error: () => {
        // TODO: for future releases, refactor this part to thrown errors
      },
    });
  }

  unassignBudget(costCenterCode: string, budgetCode: string): void {
    this.userIdService.takeUserId(true).subscribe({
      next: (userId) =>
        this.store.dispatch(
          new CostCenterActions.UnassignBudget({
            userId,
            costCenterCode,
            budgetCode,
          })
        ),
      error: () => {
        // TODO: for future releases, refactor this part to thrown errors
      },
    });
  }

  getErrorState(costCenterCode: string): Observable<boolean> {
    return this.getCostCenterState(costCenterCode).pipe(
      map((state) => state.error ?? false)
    );
  }
}
