import {
  ActionReducerMap,
  MemoizedSelector,
  createFeatureSelector
} from '@ngrx/store';

import * as fromTrustedClient from './trusted-client-token.reducer';

export interface AuthorizationState {
  trustedClient: fromTrustedClient.TrustedClientTokenState;
}

export const reducers: ActionReducerMap<AuthorizationState> = {
  trustedClient: fromTrustedClient.reducer
};

export const getApplicationAuthState: MemoizedSelector<
  any,
  AuthorizationState
> = createFeatureSelector<AuthorizationState>('auth');

export * from './trusted-client-token.reducer';
