import { InjectionToken, Provider } from '@angular/core';
import {
  Action,
  ActionReducer,
  ActionReducerMap,
  MetaReducer,
} from '@ngrx/store';
import { SiteContextActions, StateUtils } from '@spartacus/core';
import { StockActions } from '../actions';
import { StockState, STOCK_DATA } from '../stock-state';
import { stockReducer } from './stock.reducer';

export function getReducers(): ActionReducerMap<StockState> {
  return {
    stock: StateUtils.loaderReducer(STOCK_DATA, stockReducer),
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
    if (action.type === SiteContextActions.LANGUAGE_CHANGE) {
      state = undefined;
    }
    if (action.type === StockActions.CLEAR_STOCK_DATA) {
      state = undefined;
    }
    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<any>[] = [clearStockState];
