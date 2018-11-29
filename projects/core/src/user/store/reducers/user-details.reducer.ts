import * as fromUserDetailsAction from '../actions/user-details.action';
import { UserDetailsState } from '../user-state';

export const initialState: UserDetailsState = {
  details: <any>{}
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
  }
  return state;
}

export const getDetails = (state: UserDetailsState) => state.details;
