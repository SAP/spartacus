import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { makeErrorSerializable } from '../../../util/serialization-utils';
import { BudgetConnector } from '../../connectors/budget/budget.connector';
import { BudgetActions } from '../actions/index';
import { Budget } from '../../../model/budget.model';

@Injectable()
export class BudgetEffects {
  @Effect()
  $loadBudget: Observable<
    BudgetActions.LoadBudgetSuccess | BudgetActions.LoadBudgetFail
  > = this.actions$.pipe(
    ofType(BudgetActions.LOAD_BUDGET),
    map((action: BudgetActions.LoadBudget) => action.payload),
    switchMap(({uid, code}) => {
      return this.budgetConnector.get(uid,code).pipe(
        map((budget: Budget) => {
          return new BudgetActions.LoadBudgetSuccess(budget);
        }),
        catchError(error =>
          of(new BudgetActions.LoadBudgetFail(makeErrorSerializable(error)))
        )
      );
    })
  );

  @Effect()
  $loadBudgets: Observable<
    BudgetActions.LoadBudgetsSuccess | BudgetActions.LoadBudgetsFail
    > = this.actions$.pipe(
    ofType(BudgetActions.LOAD_BUDGETS),
    map((action: BudgetActions.LoadBudgets) => action.payload),
    switchMap((userId) => {
      return this.budgetConnector.getBudgets(userId).pipe(
        map((budgets: Budget[]) => {
          return new BudgetActions.LoadBudgetsSuccess(budgets);
        }),
        catchError(error =>
          of(new BudgetActions.LoadBudgetsFail(makeErrorSerializable(error)))
        )
      );
    })
  );

  constructor(
    private actions$: Actions,
    private budgetConnector: BudgetConnector
  ) {}
}
