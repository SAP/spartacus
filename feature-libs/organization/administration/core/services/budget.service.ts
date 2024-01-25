/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
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
    protected store: Store<StateWithOrganization>,
    protected userIdService: UserIdService
  ) {}

  loadBudget(budgetCode: string): void {
    this.userIdService.takeUserId(true).subscribe({
      next: (userId) =>
        this.store.dispatch(
          new BudgetActions.LoadBudget({ userId, budgetCode })
        ),
      error: () => {
        // TODO: for future releases, refactor this part to thrown errors
      },
    });
  }

  loadBudgets(params: SearchConfig): void {
    this.userIdService.takeUserId(true).subscribe({
      next: (userId) =>
        this.store.dispatch(new BudgetActions.LoadBudgets({ userId, params })),
      error: () => {
        // TODO: for future releases, refactor this part to thrown errors
      },
    });
  }

  private getBudgetState(
    budgetCode: string
  ): Observable<StateUtils.LoaderState<Budget>> {
    return this.store.select(getBudget(budgetCode));
  }

  private getBudgetValue(budgetCode: string): Observable<Budget> {
    return this.store
      .select(getBudgetValue(budgetCode))
      .pipe(filter((budget) => Boolean(budget)));
  }

  private getBudgetList(
    params: SearchConfig
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

  getList(params: SearchConfig): Observable<EntitiesModel<Budget> | undefined> {
    return this.getBudgetList(params).pipe(
      observeOn(queueScheduler),
      tap((process: StateUtils.LoaderState<EntitiesModel<Budget>>) => {
        if (!(process.loading || process.success || process.error)) {
          this.loadBudgets(params);
        }
      }),
      filter((process: StateUtils.LoaderState<EntitiesModel<Budget>>) =>
        Boolean(process.success || process.error)
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

  getErrorState(budgetCode: string): Observable<boolean> {
    return this.getBudgetState(budgetCode).pipe(
      map((state) => state.error ?? false)
    );
  }

  create(budget: Budget): void {
    this.userIdService.takeUserId(true).subscribe({
      next: (userId) =>
        this.store.dispatch(new BudgetActions.CreateBudget({ userId, budget })),
      error: () => {
        // TODO: for future releases, refactor this part to thrown errors
      },
    });
  }

  update(budgetCode: string, budget: Budget): void {
    this.userIdService.takeUserId(true).subscribe({
      next: (userId) =>
        this.store.dispatch(
          new BudgetActions.UpdateBudget({ userId, budgetCode, budget })
        ),
      error: () => {
        // TODO: for future releases, refactor this part to thrown errors
      },
    });
  }

  getLoadingStatus(
    budgetCode: string
  ): Observable<OrganizationItemStatus<Budget>> {
    return getItemStatus(this.getBudgetState(budgetCode));
  }
}
