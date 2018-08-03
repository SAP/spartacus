import {
  ActionReducerMap,
  MemoizedSelector,
  createFeatureSelector
} from '@ngrx/store';
import * as fromUserTokenReducer from './user-token.reducer';

export interface AuthState {
  userToken: fromUserTokenReducer.UserTokenState;
}

export const reducers: ActionReducerMap<AuthState> = {
  userToken: fromUserTokenReducer.reducer
};

export const getAuthState: MemoizedSelector<
  any,
  AuthState
> = createFeatureSelector<AuthState>('auth');
