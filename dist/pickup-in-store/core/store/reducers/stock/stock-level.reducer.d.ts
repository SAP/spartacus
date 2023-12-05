import { Action } from '@ngrx/store';
import { StockLevelState, StockState } from '../../stock-state';
export declare const initialStockLevelState: StockLevelState;
export declare function stockReducer(state: StockLevelState | undefined, action: Action): StockLevelState;
export declare const initialStockLevelAtStoreState: StockState['stockLevelAtStore'];
export declare const stockAtStoreReducer: import("@ngrx/store").ActionReducer<Record<string, Record<string, import("@spartacus/core").Stock | undefined>>, Action>;
