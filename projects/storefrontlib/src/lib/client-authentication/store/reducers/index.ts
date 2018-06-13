import {
  ActionReducerMap,
  MemoizedSelector,
  createFeatureSelector
} from '@ngrx/store';

import * as fromClientAuthentication from './client-authentication-token.reducer';

export interface ClientAuthenticationState {
  clientTokenState: fromClientAuthentication.ClientAuthenticationTokenState;
}

export const reducers: ActionReducerMap<ClientAuthenticationState> = {
  clientTokenState: fromClientAuthentication.reducer
};

export const getApplicationAuthState: MemoizedSelector<
  any,
  ClientAuthenticationState
> = createFeatureSelector<ClientAuthenticationState>('client-authentication');

export * from './client-authentication-token.reducer';
