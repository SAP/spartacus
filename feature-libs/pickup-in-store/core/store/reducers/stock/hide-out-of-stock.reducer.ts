/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { createReducer, on } from '@ngrx/store';
import { ToggleHideOutOfStockOptionsAction } from '../../actions/index';
import { StockState } from '../../stock-state';

export const initialState: StockState['hideOutOfStock'] = false;

export const hideOutOfStockReducer = createReducer(
  initialState,
  on(
    ToggleHideOutOfStockOptionsAction,
    (state: StockState['hideOutOfStock']): StockState['hideOutOfStock'] =>
      !state
  )
);
