import * as fromUserDetailsAction from '../actions/user-details.action';
import { User } from '@spartacus/core';

export interface UserDetailsState {
  details: User;
}

export const initialState: UserDetailsState = {
  details: <User>{}
};

export function reducer(
  state = initialState,
  action: fromUserDetailsAction.UserDetailsAction
): UserDetailsState {
  switch (action.type) {
    case fromUserDetailsAction.LOAD_USER_DETAILS_SUCCESS: {
      const details: User = action.payload;

      return {
        ...state,
        details
      };
    }
  }
  return state;
}

export const getDetails = (state: UserDetailsState) => state.details;
