import {
    ActionReducerMap,
    createFeatureSelector,
    MemoizedSelector
} from '@ngrx/store';

import * as fromReducers from './user.reducer';

export interface UserState {
    users: fromReducers.UserState;
}

export const reducers: ActionReducerMap<UserState> = {
    users: fromReducers.reducer,
};

export const getUsersState: MemoizedSelector<
    any,
    any
    > = createFeatureSelector<UserState>('user');