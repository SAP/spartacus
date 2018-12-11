import * as fromAction from '../actions';

export interface AddressVerificationState {
  results: any;
}

export const initialState: AddressVerificationState = {
  results: {}
};

export function reducer(
  state = initialState,
  action: fromAction.AddressVerificationActions
): AddressVerificationState {
  switch (action.type) {
    case fromAction.VERIFY_ADDRESS_SUCCESS: {
      const results = action.payload;

      return {
        ...state,
        results
      };
    }

    case fromAction.VERIFY_ADDRESS_FAIL: {
      return {
        ...state,
        results: 'FAIL'
      };
    }

    case fromAction.CLEAR_ADDRESS_VERIFICATION_RESULTS: {
      return {
        ...state,
        results: {}
      };
    }
  }

  return state;
}

export const getAddressVerificationResults = (
  state: AddressVerificationState
) => state.results;
