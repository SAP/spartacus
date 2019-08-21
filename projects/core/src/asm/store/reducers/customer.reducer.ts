import { CustomerActions } from '../actions/index';
import { CustomerSearchPage } from '../models/asm.models';

export const initialState: CustomerSearchPage = <CustomerSearchPage>{};

export function reducer(
  state = initialState,
  action: CustomerActions.CustomerAction
): CustomerSearchPage {
  switch (action.type) {
    case CustomerActions.CUSTOMER_SEARCH: {
      return {
        ...state,
      };
    }

    case CustomerActions.CUSTOMER_SEARCH_SUCCESS: {
      return {
        ...state,
        ...action.payload,
      };
    }

    case CustomerActions.CUSTOMER_SEARCH_FAIL: {
      return {
        ...state,
      };
    }
  }
  return state;
}
