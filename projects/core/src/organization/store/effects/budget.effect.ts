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
      this.budgetConnector.getBudgets(userId).pipe(
        mergeMap((budgets: Budget[]) => [
          new BudgetActions.LoadBudgetsSuccess(),
          new BudgetActions.LoadBudgetSuccess(budgets),
          // return new BudgetActions.LoadBudget({uid: "linda.wolf@rustic-hw.com", budgetCode: "Monthly_50K_USD_2"})
        ]),
        catchError(error =>
          of(new BudgetActions.LoadBudgetsFail(makeErrorSerializable(error)))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private budgetConnector: BudgetConnector
  ) {}
}
