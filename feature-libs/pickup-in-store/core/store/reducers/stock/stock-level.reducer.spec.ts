import {
  ClearStockData,
  StockLevelSuccess,
  StockLevelSuccessPayload,
} from '../../actions/stock.action';
import { StockLevelState } from '../../stock-state';
import * as fromReducer from './stock-level.reducer';

describe('stockReducer', () => {
  it('should populate the slice of state with payload data', () => {
    const initialState: StockLevelState = fromReducer.initialStockLevelState;
    const stockEntities: StockLevelSuccessPayload = {
      productCode: 'productCode',
      stockLevels: {},
    };
    const action = new StockLevelSuccess(stockEntities);
    const newState = fromReducer.stockReducer(initialState, action);
    expect(newState).toEqual({ productCode: stockEntities.stockLevels });
  });

  it('should clear the slice of state of data', () => {
    const initialState: StockLevelState = fromReducer.initialStockLevelState;
    const action = new ClearStockData();
    const newState = fromReducer.stockReducer(initialState, action);
    expect(newState).toEqual({});
  });
});
