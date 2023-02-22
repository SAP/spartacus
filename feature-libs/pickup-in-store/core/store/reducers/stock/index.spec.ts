import { Action, ActionReducer } from '@ngrx/store';
import { ClearStockData, StockLevel } from '../../actions/stock.action';
import { StockState } from '../../stock-state';
import { clearStockState } from './index';

describe('Stock meta-reducer', () => {
  const state: StockState = {
    stockLevel: {
      loading: true,
      success: false,
      error: undefined,
      value: {},
    },
    hideOutOfStock: false,
    browserLocation: { latitude: null, longitude: null },
    stockLevelAtStore: {},
  };

  it('should clear stock state for ClearStockData action', () => {
    const action = new ClearStockData();

    const reducer: ActionReducer<StockState, Action> =
      jasmine.createSpy('reducer');

    clearStockState(reducer)(state, action);
    expect(reducer).toHaveBeenCalledWith(undefined, action);
  });

  it('should not clear stock state for other actions', () => {
    const action = new StockLevel({ productCode: 'code', location: '' });

    const reducer: ActionReducer<StockState, Action> =
      jasmine.createSpy('reducer');

    clearStockState(reducer)(state, action);
    expect(reducer).toHaveBeenCalledWith(state, action);
  });
});
