import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { makeErrorSerializable } from '../../../util/serialization-utils';
import { BudgetConnector } from '../../connectors/budget/budget.connector';
import { BudgetActions } from '../actions/index';
import { Budget } from '../../../model/budget.model';
import { LoadBudgetSuccess } from '../actions/budget.action';

@Injectable()
export class BudgetEffects {
  @Effect()
  $loadBudget: Observable<
    BudgetActions.LoadBudgetSuccess | BudgetActions.LoadBudgetFail
  > = this.actions$.pipe(
    ofType(BudgetActions.LOAD_BUDGET),
    map((action: BudgetActions.LoadBudget) => action.payload),
    switchMap(({ uid, budgetCode }) => {
      return this.budgetConnector.get(uid, budgetCode).pipe(
        map((budget: Budget) => {
          return new BudgetActions.LoadBudgetSuccess([budget]);
        }),
        catchError(error =>
          of(new BudgetActions.LoadBudgetFail(makeErrorSerializable(error)))
        )
      );
    })
  );

  @Effect()
  $loadBudgets: Observable<
    | BudgetActions.LoadBudgetsSuccess
    | LoadBudgetSuccess
    | BudgetActions.LoadBudgetsFail
  > = this.actions$.pipe(
    ofType(BudgetActions.LOAD_BUDGETS),
    map((action: BudgetActions.LoadBudgets) => action.payload),
    switchMap(userId =>
      // TODO: support this.budgetConnector.getBudgets(userId, pageSize, currentPage, sort ).pipe(
      this.budgetConnector.getBudgets(userId).pipe(
        mergeMap((budgets: Budget[]) => [
          new BudgetActions.LoadBudgetsSuccess(),
          new BudgetActions.LoadBudgetSuccess(budgets),
        ]),
        catchError(error =>
          of(new BudgetActions.LoadBudgetsFail(makeErrorSerializable(error)))
        )
      )
    )
  );

  @Effect()
  $createBudget: Observable<
    BudgetActions.CreateBudgetSuccess | BudgetActions.CreateBudgetFail
  > = this.actions$.pipe(
    ofType(BudgetActions.CREATE_BUDGET),
    map((action: BudgetActions.CreateBudget) => action.payload),
    switchMap(payload =>
      this.budgetConnector.post(payload.uid, payload.budget).pipe(
        map(data => new BudgetActions.CreateBudgetSuccess(data)),
        catchError(error =>
          of(new BudgetActions.CreateBudgetFail(makeErrorSerializable(error)))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private budgetConnector: BudgetConnector
  ) {}
}
