import { Budget } from '../../../model/budget.model';
import { LoaderAction } from '../../../state/utils/loader/loader.action';
import * as BudgetActions from '../actions/budget.action';
import { CostCenterActions } from '../actions';

export const budgetInitialState = {};
export const budgetsInitialState = undefined;

export function budgetsEntitiesReducer(
  state: Budget = budgetInitialState,
  action: LoaderAction
): Budget {
  switch (action.type) {
    case BudgetActions.LOAD_BUDGET_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
    case CostCenterActions.UNASSIGN_BUDGET_SUCCESS:
    case CostCenterActions.ASSIGN_BUDGET_SUCCESS:
      return {
        ...state,
        selected:
          state.code === action.payload.budgetCode
            ? action.payload.selected
            : state.selected,
      };
  }
  return state;
}

export function budgetsListReducer(
  state = budgetsInitialState,
  action: LoaderAction
): any {
  switch (action.type) {
    case BudgetActions.LOAD_BUDGETS_SUCCESS:
      return action.payload.page;
  }
  return state;
}
