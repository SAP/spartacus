import { StateUtils, StoreFinderStockSearchPage } from '@spartacus/core';

export const STOCK_FEATURE = 'stock';
export const STOCK_DATA = '[Stock] Stock Data';

export interface StateWithStock {
  [STOCK_FEATURE]: StockState;
}

export interface StockState {
  stockLevel: StateUtils.LoaderState<StockLevelState>;
  hideOutOfStock: boolean;
}

export type StockLevelState = Record<string, StoreFinderStockSearchPage>;
