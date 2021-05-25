import { createFeatureSelector, MemoizedSelector } from '@ngrx/store';
import {
  ClientAuthState,
  CLIENT_AUTH_FEATURE,
  StateWithClientAuth,
} from '../client-auth-state';

export const getClientAuthState: MemoizedSelector<
  StateWithClientAuth,
  ClientAuthState
> = createFeatureSelector<ClientAuthState>(CLIENT_AUTH_FEATURE);
