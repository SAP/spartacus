import * as fromAction from '../actions';

export interface AddressVerificationResultsState {
  entities: any;
}

export const initialState: AddressVerificationResultsState = {
  entities: {}
};

export function reducer(
  state = initialState,
  action: fromAction.AddressVerificationActions
): AddressVerificationResultsState {
  switch (action.type) {
    case fromAction.LOAD_ADDRESS_VERIFICATION_RESULTS_SUCCESS: {
      const entities = action.payload;

      return {
        ...state,
        entities
      };
    }

    case fromAction.LOAD_ADDRESS_VERIFICATION_RESULTS_FAIL: {
      const entities = undefined;

      return {
        ...state,
        entities
      };
    }

    case fromAction.CLEAR_ADDRESS_VERIFICATION_RESULTS: {
      return {
        ...state,
        entities: {}
      };
    }
  }

  return state;
}

export const getAddressVerificationResultsEntities = (
  state: AddressVerificationResultsState
) => state.entities;
