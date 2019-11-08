import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { makeErrorSerializable } from '../../../util/serialization-utils';
import { BudgetConnector } from '../../connectors/budget/budget.connector';
import { BudgetActions } from '../actions/index';
import { Budget } from '../../../model/budget.model';
import { BudgetsList } from '../organization-state';

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
          return new BudgetActions.LoadBudgetSuccess({ budgets: [budget] });
        }),
        catchError(error =>
          of(
            new BudgetActions.LoadBudgetFail(
              budgetCode,
              makeErrorSerializable(error)
            )
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
    switchMap(payload =>
      this.budgetConnector.getList(payload.userId, payload.params).pipe(
        switchMap((budgets: BudgetsList) => [
          new BudgetActions.LoadBudgetSuccess(budgets),
          new BudgetActions.LoadBudgetsSuccess(),
        ]),
        catchError(error =>
          of(new BudgetActions.LoadBudgetsFail(makeErrorSerializable(error)))
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
    switchMap(payload =>
      this.budgetConnector.create(payload.userId, payload.budget).pipe(
        map(data => new BudgetActions.CreateBudgetSuccess(data)),
        catchError(error =>
          of(
            new BudgetActions.CreateBudgetFail(
              payload.budget.code,
              makeErrorSerializable(error)
            )
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
    switchMap(payload =>
      this.budgetConnector.update(payload.userId, payload.budget).pipe(
        map(data => new BudgetActions.UpdateBudgetSuccess(data)),
        catchError(error =>
          of(
            new BudgetActions.UpdateBudgetFail(
              payload.budget.code,
              makeErrorSerializable(error)
            )
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
