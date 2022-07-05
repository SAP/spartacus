import { Action, createAction, createReducer, on, props } from '@ngrx/store';
import { StoreFinderStockSearchPage } from '@spartacus/core';
import { StockLevelActions } from '../../actions/index';
import { StockLevelState } from '../../stock-state';

export const initialState: StockLevelState = {
  findStockLevelByCode: {},
};

const _stockReducer = createReducer(
  initialState,
  on(
    createAction(
      StockLevelActions.STOCK_LEVEL_SUCCESS,
      props<{
        payload: StoreFinderStockSearchPage;
      }>()
    ),
    (state: StockLevelState, action): StockLevelState => ({
      ...state,
      findStockLevelByCode: action.payload,
    })
  ),
  on(
    createAction(StockLevelActions.CLEAR_STOCK_DATA),
    (state: StockLevelState): StockLevelState => ({
      ...state,
      findStockLevelByCode: {},
    })
  )
);

export function stockReducer(
  state: StockLevelState | undefined,
  action: Action
) {
  return _stockReducer(state, action);
}
