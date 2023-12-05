import { MemoizedSelector } from '@ngrx/store';
import { StateWithStock, StockState } from '../stock-state';
export declare const getHideOutOfStockState: MemoizedSelector<StateWithStock, StockState['hideOutOfStock']>;
