/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { StateUtils, Stock, StoreFinderStockSearchPage } from '@spartacus/core';

export const STOCK_FEATURE = 'stock';
export const STOCK_DATA = '[Stock] Stock Data';

export interface StateWithStock {
  [STOCK_FEATURE]: StockState;
}

export interface BrowserLocation {
  latitude: number | null;
  longitude: number | null;
}

export interface StockState {
  browserLocation: BrowserLocation;
  hideOutOfStock: boolean;
  stockLevel: StateUtils.LoaderState<StockLevelState>;
  stockLevelAtStore: Record<string, Record<string, Stock | undefined>>;
}

export type StockLevelState = Record<string, StoreFinderStockSearchPage>;
