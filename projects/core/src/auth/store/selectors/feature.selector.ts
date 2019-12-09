import { createFeatureSelector, MemoizedSelector } from '@ngrx/store';

import { AUTH_FEATURE, AuthState, StateWithAuth } from '../auth-state';

export const getAuthState: MemoizedSelector<
  StateWithAuth,
  AuthState
> = createFeatureSelector<AuthState>(AUTH_FEATURE);
