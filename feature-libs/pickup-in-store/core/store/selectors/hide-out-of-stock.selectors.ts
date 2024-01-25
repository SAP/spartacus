/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { createSelector, MemoizedSelector } from '@ngrx/store';
import { StateWithStock, StockState } from '../stock-state';
import { getStockState } from './feature.selectors';

export const getHideOutOfStockState: MemoizedSelector<
  StateWithStock,
  StockState['hideOutOfStock']
> = createSelector(getStockState, (stockState) => stockState.hideOutOfStock);
