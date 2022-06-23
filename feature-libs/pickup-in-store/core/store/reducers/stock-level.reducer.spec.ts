import * as fromReducer from './stock-level.reducer';
import { StockLevelState } from '../stock-state';
import { StockEntities } from '../../model/index';
import { StockLevelSuccess, ClearStockData } from '../actions/stock.action';

describe('stockReducer', () => {
  it('should populate the slice of state with payload data', () => {
    const initialState: StockLevelState = fromReducer.initialState;
    const stockEntities: StockEntities = {};
    const action = new StockLevelSuccess(stockEntities);
    const newState = fromReducer.stockReducer(initialState, action);
    expect(newState).toEqual({ findStockLevelByCode: stockEntities });
  });


  it('should clear the slice of state of data', () => {
    const initialState: StockLevelState = fromReducer.initialState;
    const action = new ClearStockData();
    const newState = fromReducer.stockReducer(initialState, action);
    expect(newState).toEqual({ findStockLevelByCode: {} });
  });


});
