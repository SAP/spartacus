import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import { EntitiesModel, normalizeHttpError } from '@spartacus/core';
import { Budget } from '../../model/budget.model';
import { BudgetActions } from '../actions/index';
import { normalizeListPage } from '../../utils/serializer';
import { BudgetConnector } from '../../connectors/budget/budget.connector';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class BudgetEffects {
  @Effect()
  loadBudget$: Observable<
    BudgetActions.LoadBudgetSuccess | BudgetActions.LoadBudgetFail
  > = this.actions$.pipe(
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
              error: normalizeHttpError(error),
            })
          )
        )
      );
    })
  );

  @Effect()
  loadBudgets$: Observable<
    | BudgetActions.LoadBudgetsSuccess
    | BudgetActions.LoadBudgetSuccess
    | BudgetActions.LoadBudgetsFail
  > = this.actions$.pipe(
    ofType(BudgetActions.LOAD_BUDGETS),
    tap((action) => {
      this.previousLoadBudgetsAction = action;
    }),
    map((action: BudgetActions.LoadBudgets) => action.payload),
    switchMap((payload) =>
      this.budgetConnector.getList(payload.userId, payload.params).pipe(
        switchMap((budgets: EntitiesModel<Budget>) => {
          const { values, page } = normalizeListPage(budgets, 'code');
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
              error: normalizeHttpError(error),
            })
          )
        )
      )
    )
  );

  @Effect()
  createBudget$: Observable<
    | BudgetActions.CreateBudgetSuccess
    | BudgetActions.CreateBudgetFail
    | BudgetActions.LoadBudgets
  > = this.actions$.pipe(
    ofType(BudgetActions.CREATE_BUDGET),
    map((action: BudgetActions.CreateBudget) => action.payload),
    switchMap((payload) =>
      this.budgetConnector.create(payload.userId, payload.budget).pipe(
        switchMap((data) => [
          new BudgetActions.CreateBudgetSuccess(data),
          this.previousLoadBudgetsAction,
        ]),
        catchError((error: HttpErrorResponse) =>
          of(
            new BudgetActions.CreateBudgetFail({
              budgetCode: payload.budget.code,
              error: normalizeHttpError(error),
            })
          )
        )
      )
    )
  );

  @Effect()
  updateBudget$: Observable<
    | BudgetActions.UpdateBudgetSuccess
    | BudgetActions.UpdateBudgetFail
    | BudgetActions.LoadBudgets
  > = this.actions$.pipe(
    ofType(BudgetActions.UPDATE_BUDGET),
    map((action: BudgetActions.UpdateBudget) => action.payload),
    switchMap((payload) =>
      this.budgetConnector
        .update(payload.userId, payload.budgetCode, payload.budget)
        .pipe(
          switchMap((data) => [
            new BudgetActions.UpdateBudgetSuccess(data),
            this.previousLoadBudgetsAction,
          ]),
          catchError((error: HttpErrorResponse) =>
            of(
              new BudgetActions.UpdateBudgetFail({
                budgetCode: payload.budget.code,
                error: normalizeHttpError(error),
              })
            )
          )
        )
    )
  );

  previousLoadBudgetsAction: BudgetActions.LoadBudgets;

  constructor(
    private actions$: Actions,
    private budgetConnector: BudgetConnector
  ) {}
}
