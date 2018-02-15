import { UserDetails } from '../../models/user-details.model';
import * as fromUserDetailsAction from '../actions/user-details.action';

export interface UserDetailsState {
  details: UserDetails;
}

export const initialState: UserDetailsState = {
  details: <UserDetails>{}
};

export function reducer(
  state = initialState,
  action: fromUserDetailsAction.UserDetailsAction
): UserDetailsState {
  switch (action.type) {
    case fromUserDetailsAction.LOAD_USER_DETAILS_SUCCESS: {
      const details = action.payload;

      return {
        ...state,
        details
      };
    }
    case fromUserDetailsAction.LOAD_USER_DETAILS_FAIL: {
      return {
        ...state,
        details: <UserDetails>{}
      };
    }
  }
  return state;
}

export const getUserDetailsEntities = (state: UserDetailsState) =>
  state.details;
