import { InjectionToken, Provider } from '@angular/core';

import {
  ActionReducer,
  ActionReducerMap,
  MetaReducer,
  Action
} from '@ngrx/store';

import * as fromUserTokenReducer from './user-token.reducer';
import * as fromClientTokenReducer from './client-token.reducer';
import { AuthState } from '../auth-state';
import { LOGOUT } from '../actions/login-logout.action';

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

export function clearAuthState(
  reducer: ActionReducer<AuthState, Action>
): ActionReducer<AuthState, Action> {
  return function(state, action) {
    if (action.type === LOGOUT) {
      state = {
        ...state,
        userToken: undefined
      };
    }
    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<any>[] = [clearAuthState];
