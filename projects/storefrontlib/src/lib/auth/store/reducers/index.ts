import {
  ActionReducerMap,
  MemoizedSelector,
  createFeatureSelector
} from '@ngrx/store';
import * as fromUserTokenReducer from './user-token.reducer';
import * as fromClientTokenReducer from './client-token.reducer';

export interface AuthState {
  userToken: fromUserTokenReducer.UserTokenState;
  clientToken: fromClientTokenReducer.ClientTokenState;
}

export const reducers: ActionReducerMap<AuthState> = {
  userToken: fromUserTokenReducer.reducer,
  clientToken: fromClientTokenReducer.reducer
};

export const getAuthState: MemoizedSelector<
  any,
  AuthState
> = createFeatureSelector<AuthState>('auth');
