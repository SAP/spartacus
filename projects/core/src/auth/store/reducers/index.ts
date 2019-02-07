import { InjectionToken, Provider } from '@angular/core';

import {
  ActionReducer,
  ActionReducerMap,
  MetaReducer,
  Action
} from '@ngrx/store';

import { CLIENT_TOKEN_DATA } from '../auth-state';
import { AuthState } from '../auth-state';
import { LOGOUT } from '../actions/login-logout.action';
import { ClientToken } from '../../models/token-types.model';
import { loaderReducer } from '../../../state/utils/loader/loader.reducer';

import * as fromUserTokenReducer from './user-token.reducer';

export function getReducers(): ActionReducerMap<AuthState> {
  return {
    userToken: fromUserTokenReducer.reducer,
    clientToken: loaderReducer<ClientToken>(CLIENT_TOKEN_DATA)
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
