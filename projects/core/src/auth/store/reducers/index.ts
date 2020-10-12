import { InjectionToken, Provider } from '@angular/core';
import { ActionReducerMap, combineReducers } from '@ngrx/store';
import { loaderReducer } from '../../../state/utils/loader/loader.reducer';
import { ClientToken } from '../../models/token-types.model';
import { AuthState, CLIENT_TOKEN_DATA } from '../auth-state';
import * as fromUserTokenReducer from './user-token.reducer';

export function getReducers(): ActionReducerMap<AuthState> {
  return {
    userToken: combineReducers({ token: fromUserTokenReducer.reducer }),
    clientToken: loaderReducer<ClientToken>(CLIENT_TOKEN_DATA),
  };
}

export const reducerToken: InjectionToken<ActionReducerMap<
  AuthState
>> = new InjectionToken<ActionReducerMap<AuthState>>('AuthReducers');

export const reducerProvider: Provider = {
  provide: reducerToken,
  useFactory: getReducers,
};
