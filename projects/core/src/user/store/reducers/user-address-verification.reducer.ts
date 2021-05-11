import { UserActions } from '../actions/index';
import { UserAddressVerificationState } from '../user-state';

export const initialState: UserAddressVerificationState = {
  results: {},
};

export function reducer(
  state = initialState,
  action: UserActions.UserAddressVerificationActions
): UserAddressVerificationState {
  switch (action.type) {
    case UserActions.VERIFY_USER_ADDRESS_SUCCESS: {
      const results = action.payload;

      return {
        ...state,
        results,
      };
    }

    case UserActions.VERIFY_USER_ADDRESS_FAIL: {
      return {
        ...state,
        results: 'FAIL',
      };
    }

    case UserActions.CLEAR_USER_ADDRESS_VERIFICATION_RESULTS: {
      return {
        ...state,
        results: {},
      };
    }
  }

  return state;
}

export const getAddressVerificationResults = (
  state: UserAddressVerificationState
) => state.results;
