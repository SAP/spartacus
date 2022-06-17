import { InjectionToken, Provider } from '@angular/core';
import {
  Action,
  ActionReducer,
  ActionReducerMap,
  MetaReducer,
} from '@ngrx/store';
import { StateUtils } from '@spartacus/core';

import { StockActions } from '../actions/index';
import { StockLevelState, StockState, STOCK_DATA } from '../stock-state';
import { stockReducer } from './stock.reducer';

export function getReducers(): ActionReducerMap<StockState> {
  return {
    stock: StateUtils.loaderReducer<StockLevelState, any>(
      STOCK_DATA,
      stockReducer
    ),
  };
}

export const reducerToken: InjectionToken<ActionReducerMap<StockState>> =
  new InjectionToken<ActionReducerMap<StockState>>('StockReducers');

export const reducerProvider: Provider = {
  provide: reducerToken,
  useFactory: getReducers,
};

export function clearStockState(
  reducer: ActionReducer<StockState, Action>
): ActionReducer<StockState, Action> {
  return function (state, action) {
    const STATE = new Map([[StockActions.CLEAR_STOCK_DATA, undefined]]);
    return reducer(
      STATE.has(action.type) ? STATE.get(action.type) : state,
      action
    );
  };
}

export const metaReducers: MetaReducer<any>[] = [clearStockState];
