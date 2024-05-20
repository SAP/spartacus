/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { InjectionToken, Provider } from '@angular/core';
import {
  Action,
  ActionReducer,
  ActionReducerMap,
  MetaReducer,
} from '@ngrx/store';
import { StateUtils } from '@spartacus/core';

import { StockLevelActions } from '../../actions/index';
import { StockLevelState, StockState, STOCK_DATA } from '../../stock-state';
import { browserLocationReducer } from './browser-location.reducer';
import { hideOutOfStockReducer } from './hide-out-of-stock.reducer';
import { stockAtStoreReducer, stockReducer } from './stock-level.reducer';

function getReducers(): ActionReducerMap<StockState> {
  return {
    browserLocation: browserLocationReducer,
    hideOutOfStock: hideOutOfStockReducer,
    stockLevel: StateUtils.loaderReducer<StockLevelState, any>(
      STOCK_DATA,
      stockReducer
    ),
    stockLevelAtStore: stockAtStoreReducer,
  };
}

export const stockReducersToken: InjectionToken<ActionReducerMap<StockState>> =
  new InjectionToken<ActionReducerMap<StockState>>('StockReducers');

export const stockReducersProvider: Provider = {
  provide: stockReducersToken,
  useFactory: getReducers,
};

export function clearStockState(
  reducer: ActionReducer<StockState, Action>
): ActionReducer<StockState, Action> {
  return function (state, action) {
    const STATE = new Map([[StockLevelActions.CLEAR_STOCK_DATA, undefined]]);
    return reducer(
      STATE.has(action.type) ? STATE.get(action.type) : state,
      action
    );
  };
}

export const stockMetaReducers: MetaReducer<any>[] = [clearStockState];
