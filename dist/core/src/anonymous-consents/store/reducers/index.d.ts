import { InjectionToken, Provider } from '@angular/core';
import { Action, ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { AnonymousConsentsState } from '../anonymous-consents-state';
export declare function getReducers(): ActionReducerMap<AnonymousConsentsState, any>;
export declare const reducerToken: InjectionToken<ActionReducerMap<AnonymousConsentsState>>;
export declare const reducerProvider: Provider;
export declare function clearAnonymousConsentTemplates(reducer: ActionReducer<AnonymousConsentsState, Action>): ActionReducer<AnonymousConsentsState, Action>;
export declare const metaReducers: MetaReducer<any>[];
