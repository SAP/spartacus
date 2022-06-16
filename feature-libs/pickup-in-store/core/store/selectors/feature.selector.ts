import { createFeatureSelector, MemoizedSelector } from '@ngrx/store';
import { StateWithStock, StockState, STOCK_FEATURE } from '../stock-state';

export const getStoreFinderState: MemoizedSelector<StateWithStock, StockState> =
  createFeatureSelector<StockState>(STOCK_FEATURE);
