import { InjectionToken, Provider } from '@angular/core';
import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { MultiCartState } from '../multi-cart-state';
export declare function clearMultiCartState(reducer: ActionReducer<any>): ActionReducer<any>;
export declare const multiCartMetaReducers: MetaReducer<any>[];
export declare const multiCartReducerToken: InjectionToken<ActionReducerMap<MultiCartState>>;
export declare function getMultiCartReducers(): ActionReducerMap<MultiCartState, any>;
export declare const multiCartReducerProvider: Provider;
