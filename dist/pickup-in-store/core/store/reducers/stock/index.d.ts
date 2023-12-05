import { InjectionToken, Provider } from '@angular/core';
import { Action, ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { StockState } from '../../stock-state';
export declare const stockReducersToken: InjectionToken<ActionReducerMap<StockState>>;
export declare const stockReducersProvider: Provider;
export declare function clearStockState(reducer: ActionReducer<StockState, Action>): ActionReducer<StockState, Action>;
export declare const stockMetaReducers: MetaReducer<any>[];
