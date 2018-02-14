import * as fromUserDetailsAction from '../actions/user-details.action';

export interface UserDetailsState {
    entities: { userDetails: any };
}

export const initialState: UserDetailsState = {
    entities: { userDetails: {} }
};

export function reducer(
    state = initialState,
    action: fromUserDetailsAction.UserDetailsAction
): UserDetailsState {
    switch (action.type) {
        case fromUserDetailsAction.LOAD_USER_DETAILS_SUCCESS: {
            const userDetails = action.payload;

            const entities = {
                ...state.entities,
                userDetails
            };
            return {
                ...state,
                entities
            };
        }
        case fromUserDetailsAction.LOAD_USER_DETAILS_FAIL: {
            const entities = {
                ...state.entities,
                userDetails: {}
            };

            return {
                ...state,
                entities
            };
        }
    }
    return state;
}

export const getUserDetailsEntities = (state: UserDetailsState) => state.entities;
