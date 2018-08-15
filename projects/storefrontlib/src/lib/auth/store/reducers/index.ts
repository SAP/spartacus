import {
  ActionReducerMap,
  MemoizedSelector,
  createFeatureSelector
} from '@ngrx/store';
import * as fromUserTokenReducer from './user-token.reducer';
import * as fromClientTokenReducer from './client-token.reducer';
import { InjectionToken, Provider } from '@angular/core';

export interface AuthState {
  userToken: fromUserTokenReducer.UserTokenState;
  clientToken: fromClientTokenReducer.ClientTokenState;
}

export function getReducers(): ActionReducerMap<AuthState> {
  return {
    userToken: fromUserTokenReducer.reducer,
    clientToken: fromClientTokenReducer.reducer
  };
}

export const reducerToken: InjectionToken<
  ActionReducerMap<AuthState>
> = new InjectionToken<ActionReducerMap<AuthState>>('AuthReducers');

export const reducerProvider: Provider = {
  provide: reducerToken,
  useFactory: getReducers
};

export const getAuthState: MemoizedSelector<
  any,
  AuthState
> = createFeatureSelector<AuthState>('auth');
