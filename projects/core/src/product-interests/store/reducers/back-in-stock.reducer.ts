import * as fromBackInStockAction from '../actions/back-in-stock.actions';

export const initialState: boolean = undefined;

export function reducer(
  state = initialState,
  action: fromBackInStockAction.BackInStockAction
): boolean {
  switch (action.type) {
    case fromBackInStockAction.LOAD_BACK_IN_STOCK_SUCCESS: {
      return action.payload;
    }
    case fromBackInStockAction.DELETE_BACK_IN_STOCK_SUCCESS: {
      return !action.payload;
    }
    case fromBackInStockAction.CREATE_BACK_IN_STOCK_SUCCESS: {
      return action.payload;
    }
    case fromBackInStockAction.RESET_BACK_IN_STOCK: {
      return initialState;
    }
  }

  return state;
}
