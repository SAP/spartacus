import { Budget } from '../../../model/budget.model';
import { LoaderAction } from '../../../state/utils/loader/loader.action';
import * as BudgetActions from '../actions/budget.action';

export const budgetsInitialState = undefined;

export function budgetsEntitiesReducer(
  state = budgetsInitialState,
  action: LoaderAction
): Budget {
  switch (action.type) {
  }
  return state;
}

export function budgetsListReducer(
  state = budgetsInitialState,
  action: LoaderAction
): any {
  switch (action.type) {
    case BudgetActions.LOAD_BUDGETS_SUCCESS:
      return action.payload.budgetPage;
  }
  return state;
}
