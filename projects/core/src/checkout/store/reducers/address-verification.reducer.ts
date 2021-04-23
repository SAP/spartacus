import { CheckoutActions } from '../actions/index';
import { AddressVerificationState } from '../checkout-state';

/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
export const initialState: AddressVerificationState = {
  results: {},
};

/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
export function reducer(
  state = initialState,
  action: CheckoutActions.AddressVerificationActions
): AddressVerificationState {
  switch (action.type) {
    case CheckoutActions.VERIFY_ADDRESS_SUCCESS: {
      const results = action.payload;

      return {
        ...state,
        results,
      };
    }

    case CheckoutActions.VERIFY_ADDRESS_FAIL: {
      return {
        ...state,
        results: 'FAIL',
      };
    }

    case CheckoutActions.CLEAR_ADDRESS_VERIFICATION_RESULTS: {
      return {
        ...state,
        results: {},
      };
    }
  }

  return state;
}

/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
export const getAddressVerificationResults = (
  state: AddressVerificationState
) => state.results;
