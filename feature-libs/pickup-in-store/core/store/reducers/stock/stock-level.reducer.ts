import { Action, createAction, createReducer, on, props } from '@ngrx/store';
import { StockLevelActions } from '../../actions/index';
import { StockLevelSuccessPayload } from '../../actions/stock.action';
import { StockLevelState } from '../../stock-state';

export const initialState: StockLevelState = {};

const _stockReducer = createReducer(
  initialState,
  on(
    createAction(
      StockLevelActions.STOCK_LEVEL_SUCCESS,
      props<{ payload: StockLevelSuccessPayload }>()
    ),
    (
      state: StockLevelState,
      { payload: { productCode, stockLevels } }
    ): StockLevelState => ({
      ...state,
      [productCode]: stockLevels,
    })
  ),
  on(
    createAction(StockLevelActions.CLEAR_STOCK_DATA),
    (_state: StockLevelState): StockLevelState => ({})
  )
);

export function stockReducer(
  state: StockLevelState | undefined,
  action: Action
) {
  return _stockReducer(state, action);
}
