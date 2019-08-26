import { CustomerSearchPage } from '../../models/asm.models';
import { AsmActions } from '../actions/index';

export const initialState: CustomerSearchPage = <CustomerSearchPage>{};

export function reducer(
  state = initialState,
  action: AsmActions.CustomerAction
): CustomerSearchPage {
  switch (action.type) {
    case AsmActions.CUSTOMER_SEARCH_SUCCESS: {
      return {
        ...state,
        ...action.payload,
      };
    }

    case AsmActions.CUSTOMER_SEARCH_RESET: {
      return {
        ...initialState,
      };
    }
  }
  return state;
}
