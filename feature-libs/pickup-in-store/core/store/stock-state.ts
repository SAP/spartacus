import { StateUtils } from '@spartacus/core';
import { StockEntities } from '../model/index';

export const STOCK_FEATURE = 'stock';
export const STOCK_DATA = '[Stock] Stock Data';

export interface StateWithStock {
  [STOCK_FEATURE]: StockState;
}

export interface StockState {
  stock: StateUtils.LoaderState<StockLevelState>;
}

export interface StockLevelState {
  findStockLevelByCode: StockEntities;
}
