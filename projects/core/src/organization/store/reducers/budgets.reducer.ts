import { BudgetActions } from '../actions/index';
import { BudgetsState } from '../organization-state';

export const initialState: BudgetsState = {
  budgets: {
  },
};

export function reducer(
  state = initialState,
  action: BudgetActions.BudgetAction
): BudgetsState {
  switch (action.type) {
    case BudgetActions.LOAD_BUDGETS_SUCCESS: {
      return {
        ...state,
        budgets: action.payload,
      };
    }
  }
  return state;
}
