import { CustomerSearchPage } from '../../models/asm.models';
import { CustomerActions } from '../actions/index';

export const initialState: CustomerSearchPage = <CustomerSearchPage>{};

export function reducer(
  state = initialState,
  action: CustomerActions.CustomerAction
): CustomerSearchPage {
  switch (action.type) {
    case CustomerActions.CUSTOMER_SEARCH_SUCCESS: {
      return {
        ...state,
        ...action.payload,
      };
    }

    case CustomerActions.CUSTOMER_SEARCH_RESET: {
      return {
        ...initialState,
      };
    }
  }
  return state;
}
