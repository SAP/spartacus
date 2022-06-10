import { StockActions } from '../actions/index';
import { StockLevelState } from '../stock-state';

export const initialState: StockLevelState = {
  findStockLevelByCode: {},
};

export function stockReducer(
  state = initialState,
  action: StockActions.StockLevelAction
): StockLevelState {
  switch (action.type) {
    case StockActions.STOCK_LEVEL_SUCCESS: {
      return { ...state, findStockLevelByCode: action.payload };
    }
  }

  return state;
}
