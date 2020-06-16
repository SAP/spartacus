import { GigyaAuthActions } from '../actions/index';
import { UserToken } from '@spartacus/core';

export const initialState: UserToken = <UserToken>{};

export function reducer(
  state = initialState,
  action: GigyaAuthActions.GigyaUserTokenAction
): UserToken {
  switch (action.type) {
    case GigyaAuthActions.LOAD_GIGYA_USER_TOKEN: {
      return {
        ...state,
      };
    }

    case GigyaAuthActions.LOAD_USER_TOKEN_SUCCESS: {
      return {
        ...state,
        ...action.payload.token,
      };
    }

    case GigyaAuthActions.LOAD_USER_TOKEN_FAIL: {
      return {
        ...state,
      };
    }
  }
  return state;
}
