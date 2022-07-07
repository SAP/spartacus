import * as fromReducer from './hide-out-of-stock.reducer';
import { HideOutOfStockOptionsAction } from '../actions/hide-out-of-stock.action';

describe('hideOutOfStockReducer', () => {
  it('should toggle the hideOutOfStock value', () => {
    const { initialState } = fromReducer;
    expect(initialState).toEqual(false);
    const action = HideOutOfStockOptionsAction;
    let newState = fromReducer.hideOutOfStockReducer(initialState, action);
    expect(newState).toEqual(true);
    newState = fromReducer.hideOutOfStockReducer(newState, action);
    expect(newState).toEqual(false);
  });
});
