import { InjectionToken, Provider } from '@angular/core';
import { ActionReducerMap } from '@ngrx/store';
import { loaderReducer } from '../../../state/utils/loader/loader.reducer';
import { ClientToken } from '../../models/token-types.model';
import { AuthState, CLIENT_TOKEN_DATA } from '../auth-state';

export function getReducers(): ActionReducerMap<AuthState> {
  return {
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
