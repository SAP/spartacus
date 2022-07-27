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
  stockLevel: StateUtils.LoaderState<StockLevelState>;
  hideOutOfStock: boolean;
  browserLocation: BrowserLocation;
  stockLevelAtStore: Record<string, Record<string, Stock>>;
}

export type StockLevelState = Record<string, StoreFinderStockSearchPage>;
