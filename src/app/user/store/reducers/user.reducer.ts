import * as fromUserAction from '../actions/user.action';

export interface UserState {
    entities: { user: any };
}

export const initialState: UserState = {
    entities: { user: {} }
};

export function reducer(
    state = initialState,
    action: fromUserAction.UserAction
): UserState {
    switch (action.type) {
        case fromUserAction.LOAD_USER_SUCCESS: {
            const userData = action.payload;

            const entities = {
                ...state.entities,
                user: userData
            };
            return {
                ...state,
                entities
            };
        }
        case fromUserAction.LOAD_USER_FAIL: {
            const user = action.payload;
            const entities = {
                ...state.entities,
                user: {}
            };

            return {
                ...state,
                entities
            };
        }
    }
    return state;
}

export const getUserEntities = (state: UserState) => state.entities;
