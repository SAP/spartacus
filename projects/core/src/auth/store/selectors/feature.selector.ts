import { createFeatureSelector, MemoizedSelector } from '@ngrx/store';
import { AUTH_FEATURE, AuthState } from '../auth-state';

export const getAuthState: MemoizedSelector<
  any,
  AuthState
> = createFeatureSelector<AuthState>(AUTH_FEATURE);
