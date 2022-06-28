import { createReducer, on } from '@ngrx/store';
import { HideOutOfStockOptionsAction } from '../actions/index';
import { StockState } from '../stock-state';

export const initialState: StockState['hideOutOfStock'] = false;

export const hideOutOfStockReducer = createReducer(
  initialState,
  on(
    HideOutOfStockOptionsAction,
    (state: StockState['hideOutOfStock']): StockState['hideOutOfStock'] =>
      !state
  )
);
