import * as fromActions from '../actions';

export interface UserDetailsState {
  details: any;
}

export const initialState: UserDetailsState = {
  details: <any>{}
};

export function reducer(
  state = initialState,
  action: fromActions.UserDetailsAction
): UserDetailsState {
  switch (action.type) {
    case fromActions.LOAD_USER_DETAILS_SUCCESS || fromActions.LOGIN: {
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
