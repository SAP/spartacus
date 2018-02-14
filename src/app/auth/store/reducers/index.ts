import {
  ActionReducerMap,
  MemoizedSelector,
  createFeatureSelector,
  ActionReducer,
  MetaReducer
} from '@ngrx/store';
import * as fromUserToken from './user-token.reducer';
import * as fromUserDetailsReducer from './user-details.reducer';

export interface UserState {
  userDetails: fromUserDetailsReducer.UserDetailsState;
  token: fromUserToken.UserTokenState;
}

export const reducers: ActionReducerMap<UserState> = {
  userDetails: fromUserDetailsReducer.reducer,
  token: fromUserToken.reducer
};

export const getUserState: MemoizedSelector<
  any,
  UserState
  > = createFeatureSelector<UserState>('user');
