import * as fromUserDetailsAction from '../actions/user-details.action';
import { UserDetails } from '../../models/user-details.model';

export interface UserDetailsState {
    userDetails: UserDetails;
}

export const initialState: UserDetailsState = {
    userDetails: <UserDetails>{}
};

export function reducer(
    state = initialState,
    action: fromUserDetailsAction.UserDetailsAction
): UserDetailsState {
    switch (action.type) {
        case fromUserDetailsAction.LOAD_USER_DETAILS_SUCCESS: {
            const userDetails = action.payload;

            return {
                ...state,
                userDetails
            };
        }
        case fromUserDetailsAction.LOAD_USER_DETAILS_FAIL: {
            return {
                ...state,
                userDetails: <UserDetails>{}
            };
        }
    }
    return state;
}

export const getUserDetailsEntities = (state: UserDetailsState) => state.userDetails;
