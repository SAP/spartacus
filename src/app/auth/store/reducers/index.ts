import {
  ActionReducerMap,
  MemoizedSelector,
  createFeatureSelector
} from '@ngrx/store';
import * as fromUserToken from './user-token.reducer';

export interface UserState {
  auth: fromUserToken.UserTokenState;
  // TODO user-details here
}

export const reducers: ActionReducerMap<UserState> = {
  auth: fromUserToken.reducer
  // TODO user-details here
};

export const getUserState: MemoizedSelector<
  any,
  UserState
> = createFeatureSelector<UserState>('user');
