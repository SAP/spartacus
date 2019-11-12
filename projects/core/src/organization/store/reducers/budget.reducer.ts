import * as BudgetActions from '../actions/budget.action';
import { Budget } from '../../../model/budget.model';
import { LoaderAction } from '../../../state/utils/loader/loader.action';

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
      return {
        budgets: action.payload.budgets.budgets.map(budget => budget.code),
        pagination: action.payload.budgets.pagination,
        sorts: action.payload.budgets.sorts,
      };
  }
  return state;
}
