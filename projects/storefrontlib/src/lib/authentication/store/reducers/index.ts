import {
  ActionReducerMap,
  MemoizedSelector,
  createFeatureSelector
} from '@ngrx/store';

import * as fromTrustedClient from './trusted-client-token.reducer';

export interface AuthenticationState {
  trustedClient: fromTrustedClient.TrustedClientTokenState;
}

export const reducers: ActionReducerMap<AuthenticationState> = {
  trustedClient: fromTrustedClient.reducer
};

export const getApplicationAuthState: MemoizedSelector<
  any,
  AuthenticationState
> = createFeatureSelector<AuthenticationState>('auth');

export * from './trusted-client-token.reducer';
