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

    case fromAction.CLEAR_ADDRESS_VERIFICATION_RESULTS: {
      return {
        ...state,
        results: {}
      };
    }
  }

  return state;
}

export const getAddressVerificationResultsEntities = (
  state: AddressVerificationState
) => state.results;
