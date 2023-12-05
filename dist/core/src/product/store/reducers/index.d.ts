import { InjectionToken, Provider } from '@angular/core';
import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { ProductsState } from '../product-state';
export declare function getReducers(): ActionReducerMap<ProductsState, any>;
export declare const reducerToken: InjectionToken<ActionReducerMap<ProductsState>>;
export declare const reducerProvider: Provider;
export declare function clearProductsState(reducer: ActionReducer<any>): ActionReducer<any>;
export declare const metaReducers: MetaReducer<any>[];
