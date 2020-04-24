import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Budget } from '../../../model/budget.model';
import { EntitiesModel } from '../../../model/misc.model';
import { makeErrorSerializable } from '../../../util/serialization-utils';
import { BudgetConnector } from '../../connectors/budget/budget.connector';
import { BudgetActions } from '../actions/index';
import { normalizeListPage } from '../../utils/serializer';

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
        catchError((error) =>
          of(
            new BudgetActions.LoadBudgetFail({
              budgetCode,
              error: makeErrorSerializable(error),
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
        catchError((error) =>
          of(
            new BudgetActions.LoadBudgetsFail({
              params: payload.params,
              error: makeErrorSerializable(error),
            })
          )
        )
      )
    )
  );

  @Effect()
  createBudget$: Observable<
    BudgetActions.CreateBudgetSuccess | BudgetActions.CreateBudgetFail
  > = this.actions$.pipe(
    ofType(BudgetActions.CREATE_BUDGET),
    map((action: BudgetActions.CreateBudget) => action.payload),
    switchMap((payload) =>
      this.budgetConnector.create(payload.userId, payload.budget).pipe(
        map((data) => new BudgetActions.CreateBudgetSuccess(data)),
        catchError((error) =>
          of(
            new BudgetActions.CreateBudgetFail({
              budgetCode: payload.budget.code,
              error: makeErrorSerializable(error),
            })
          )
        )
      )
    )
  );

  @Effect()
  updateBudget$: Observable<
    BudgetActions.UpdateBudgetSuccess | BudgetActions.UpdateBudgetFail
  > = this.actions$.pipe(
    ofType(BudgetActions.UPDATE_BUDGET),
    map((action: BudgetActions.UpdateBudget) => action.payload),
    switchMap((payload) =>
      this.budgetConnector
        .update(payload.userId, payload.budgetCode, payload.budget)
        .pipe(
          map((data) => new BudgetActions.UpdateBudgetSuccess(data)),
          catchError((error) =>
            of(
              new BudgetActions.UpdateBudgetFail({
                budgetCode: payload.budget.code,
                error: makeErrorSerializable(error),
              })
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
