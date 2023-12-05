import { MemoizedSelector } from '@ngrx/store';
import { ClientAuthState, StateWithClientAuth } from '../client-auth-state';
export declare const getClientAuthState: MemoizedSelector<StateWithClientAuth, ClientAuthState>;
