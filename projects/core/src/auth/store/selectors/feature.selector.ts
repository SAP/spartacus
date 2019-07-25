import { createFeatureSelector, MemoizedSelector } from '@ngrx/store';
import { AuthState, AUTH_FEATURE, StateWithAuth } from '../auth-state';

export const getAuthState: MemoizedSelector<
  StateWithAuth,
  AuthState
> = createFeatureSelector<AuthState>(AUTH_FEATURE);
