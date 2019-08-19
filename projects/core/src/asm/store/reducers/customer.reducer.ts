import { CustomerActions } from '../actions/index';

export const initialState: any = {};

export function reducer(
  state = initialState,
  action: CustomerActions.CustomerAction
): any {
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
