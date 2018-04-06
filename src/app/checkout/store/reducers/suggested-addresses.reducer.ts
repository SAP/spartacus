import * as fromAction from '../actions';

export interface SuggestedAddressesState {
  suggestedAddresses: any[];
}

export const initialState: SuggestedAddressesState = {
  suggestedAddresses: []
};

export function reducer(
  state = initialState,
  action: fromAction.SuggestedAddressesAction
): SuggestedAddressesState {
  switch (action.type) {
    case fromAction.LOAD_SUGGESTED_ADDRESSES_SUCCESS: {
      const suggestedAddresses = action.payload;

      return {
        ...state,
        suggestedAddresses
      };
    }

    case fromAction.CLEAR_SUGGESTED_ADDRESSES: {
      return {
        ...state,
        suggestedAddresses: []
      };
    }
  }

  return state;
}

export const getSuggestedAddressesEntites = (state: SuggestedAddressesState) =>
  state.suggestedAddresses;
