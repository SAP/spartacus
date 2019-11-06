import * as BudgetActions from '../actions/budget.action';
import { Budget } from '../../../model/budget.model';
import { LoaderAction } from '../../../state/utils/loader/loader.action';

export const budgetsInitialState = undefined;

export function budgetsEntitiesReducer(
  state = budgetsInitialState,
  action: LoaderAction
): Budget {
  switch (action.type) {
    case BudgetActions.LOAD_BUDGET_SUCCESS:
      return action.payload.budgets;
  }
  return state;
}
