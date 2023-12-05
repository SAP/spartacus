import { InjectionToken, Provider } from '@angular/core';
import { ActionReducerMap } from '@ngrx/store';
import { ClientAuthState } from '../client-auth-state';
export declare function getReducers(): ActionReducerMap<ClientAuthState>;
export declare const reducerToken: InjectionToken<ActionReducerMap<ClientAuthState>>;
export declare const reducerProvider: Provider;
