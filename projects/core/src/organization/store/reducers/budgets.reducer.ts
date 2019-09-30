import { BudgetActions } from '../actions/index';
import { BudgetsState } from '../organization-state';

export const initialState: BudgetsState = {
  budgets: { entities: { value: {} } },
};

export function reducer(
  state = initialState,
  action: BudgetActions.BudgetAction
): BudgetsState {
  console.log(action);
  // switch (action.type) {
  //   case BudgetActions.LOAD_BUDGETS_SUCCESS: {
  //     return {
  //       ...state,
  //       budgets: {
  //         ...state.budgets,
  //         entities: {value: action.payload},
  //       },
  //     };
  //   }
  //   case BudgetActions.LOAD_BUDGET_SUCCESS: {
  //     return {
  //       ...state,
  //       budgets: {
  //         ...state.budgets,
  //         entities: {
  //           ...state.budgets.entities,
  //           [action.payload.code]: action.payload,
  //         },
  //       },
  //     };
  //   }
  // }
  return state;
}
