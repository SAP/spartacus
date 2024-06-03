/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Action, createAction, createReducer, on, props } from '@ngrx/store';
import { StockLevelActions } from '../../actions/index';
import { StockLevelSuccessPayload } from '../../actions/stock.action';
import { StockLevelState, StockState } from '../../stock-state';

export const initialStockLevelState: StockLevelState = {};

const _stockReducer = createReducer(
  initialStockLevelState,
  on(
    createAction(
      StockLevelActions.STOCK_LEVEL_SUCCESS,
      props<{ payload: StockLevelSuccessPayload }>()
    ),
    (
      state: StockLevelState,
      { payload: { productCode, stockLevels } }
    ): StockLevelState => ({
      ...state,
      [productCode]: stockLevels,
    })
  ),
  on(
    createAction(StockLevelActions.CLEAR_STOCK_DATA),
    (_state: StockLevelState): StockLevelState => ({})
  )
);

export function stockReducer(
  state: StockLevelState | undefined,
  action: Action
) {
  return _stockReducer(state, action);
}

export const initialStockLevelAtStoreState: StockState['stockLevelAtStore'] =
  {};

export const stockAtStoreReducer = createReducer(
  initialStockLevelAtStoreState,
  on(StockLevelActions.StockLevelAtStoreSuccess, (state, { payload }) => ({
    ...state,
    [payload.productCode]: { [payload.storeName]: payload.stockLevel },
  }))
);
