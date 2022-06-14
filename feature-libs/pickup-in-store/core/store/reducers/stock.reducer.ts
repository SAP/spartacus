import { Action, createAction, createReducer, on, props } from '@ngrx/store';
import { StockActions } from '../actions/index';
import { StockLevelState } from '../stock-state';

export const initialState: StockLevelState = {
  findStockLevelByCode: {},
};

// export function stockReducer(
//   state = initialState,
//   action: StockActions.StockLevelAction
// ): StockLevelState {
//   switch (action.type) {
//     case StockActions.STOCK_LEVEL_SUCCESS: {
//       return { ...state, findStockLevelByCode: action.payload };
//     }
//   }

//   return state;
// }

const _stockReducer = createReducer(
  initialState,
  on(
    createAction(
      StockActions.STOCK_LEVEL_SUCCESS,
      props<{
        payload: any;
      }>()
    ),
    (state: StockLevelState, action) => ({
      ...state,
      findStockLevelByCode: action.payload,
    })
  )
);

export function stockReducer(
  state: StockLevelState | undefined,
  action: Action
) {
  return _stockReducer(state, action);
}
