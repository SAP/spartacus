/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  EntitiesModel,
  LoggerService,
  StateUtils,
  normalizeHttpError,
} from '@spartacus/core';
import { Observable, from, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { BudgetConnector } from '../../connectors/budget/budget.connector';
import { Budget } from '../../model/budget.model';
import { BudgetActions, OrganizationActions } from '../actions/index';

@Injectable()
export class BudgetEffects {
  protected logger = inject(LoggerService);

  loadBudget$: Observable<
    BudgetActions.LoadBudgetSuccess | BudgetActions.LoadBudgetFail
  > = createEffect(() =>
    this.actions$.pipe(
      ofType(BudgetActions.LOAD_BUDGET),
      map((action: BudgetActions.LoadBudget) => action.payload),
      switchMap(({ userId, budgetCode }) => {
        return this.budgetConnector.get(userId, budgetCode).pipe(
          map((budget: Budget) => {
            return new BudgetActions.LoadBudgetSuccess([budget]);
          }),
          catchError((error: HttpErrorResponse) =>
            of(
              new BudgetActions.LoadBudgetFail({
                budgetCode,
                error: normalizeHttpError(error, this.logger),
              })
            )
          )
        );
      })
    )
  );

  loadBudgets$: Observable<
    | BudgetActions.LoadBudgetsSuccess
    | BudgetActions.LoadBudgetSuccess
    | BudgetActions.LoadBudgetsFail
  > = createEffect(() =>
    this.actions$.pipe(
      ofType(BudgetActions.LOAD_BUDGETS),
      map((action: BudgetActions.LoadBudgets) => action.payload),
      switchMap((payload) =>
        this.budgetConnector.getList(payload.userId, payload.params).pipe(
          switchMap((budgets: EntitiesModel<Budget>) => {
            const { values, page } = StateUtils.normalizeListPage(
              budgets,
              'code'
            );
            return [
              new BudgetActions.LoadBudgetSuccess(values),
              new BudgetActions.LoadBudgetsSuccess({
                page,
                params: payload.params,
              }),
            ];
          }),
          catchError((error: HttpErrorResponse) =>
            of(
              new BudgetActions.LoadBudgetsFail({
                params: payload.params,
                error: normalizeHttpError(error, this.logger),
              })
            )
          )
        )
      )
    )
  );

  createBudget$: Observable<
    | BudgetActions.CreateBudgetSuccess
    | BudgetActions.CreateBudgetFail
    | OrganizationActions.OrganizationClearData
  > = createEffect(() =>
    this.actions$.pipe(
      ofType(BudgetActions.CREATE_BUDGET),
      map((action: BudgetActions.CreateBudget) => action.payload),
      switchMap((payload) =>
        this.budgetConnector.create(payload.userId, payload.budget).pipe(
          switchMap((data) => [
            new BudgetActions.CreateBudgetSuccess(data),
            new OrganizationActions.OrganizationClearData(),
          ]),
          catchError((error: HttpErrorResponse) =>
            from([
              new BudgetActions.CreateBudgetFail({
                budgetCode: payload.budget.code ?? '',
                error: normalizeHttpError(error, this.logger),
              }),
              new OrganizationActions.OrganizationClearData(),
            ])
          )
        )
      )
    )
  );

  updateBudget$: Observable<
    | BudgetActions.UpdateBudgetSuccess
    | BudgetActions.UpdateBudgetFail
    | OrganizationActions.OrganizationClearData
  > = createEffect(() =>
    this.actions$.pipe(
      ofType(BudgetActions.UPDATE_BUDGET),
      map((action: BudgetActions.UpdateBudget) => action.payload),
      switchMap((payload) =>
        this.budgetConnector
          .update(payload.userId, payload.budgetCode, payload.budget)
          .pipe(
            switchMap((data) => [
              new BudgetActions.UpdateBudgetSuccess(data),
              new OrganizationActions.OrganizationClearData(),
            ]),
            catchError((error: HttpErrorResponse) =>
              from([
                new BudgetActions.UpdateBudgetFail({
                  budgetCode: payload.budget.code ?? '',
                  error: normalizeHttpError(error, this.logger),
                }),
                new OrganizationActions.OrganizationClearData(),
              ])
            )
          )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private budgetConnector: BudgetConnector
  ) {}
}
