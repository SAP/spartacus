import { InjectionToken, Provider } from '@angular/core';
import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { UserState } from '../user-state';
export declare function getReducers(): ActionReducerMap<UserState, any>;
export declare const reducerToken: InjectionToken<ActionReducerMap<UserState>>;
export declare const reducerProvider: Provider;
export declare function clearUserState(reducer: ActionReducer<any>): ActionReducer<any>;
export declare const metaReducers: MetaReducer<any>[];
