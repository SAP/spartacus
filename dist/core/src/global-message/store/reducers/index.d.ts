import { InjectionToken, Provider } from '@angular/core';
import { ActionReducer } from '@ngrx/store';
import { GlobalMessageState } from '../global-message-state';
export declare function getReducers(): ActionReducer<GlobalMessageState, any>;
export declare const reducerToken: InjectionToken<ActionReducer<GlobalMessageState>>;
export declare const reducerProvider: Provider;
