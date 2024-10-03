import { STOCK_DATA } from '../stock-state';
import {
  CLEAR_STOCK_DATA,
  ClearStockData,
  STOCK_LEVEL,
  STOCK_LEVEL_FAIL,
  STOCK_LEVEL_ON_HOLD,
  STOCK_LEVEL_SUCCESS,
  StockLevel,
  StockLevelFail,
  StockLevelOnHold,
  StockLevelSuccess,
} from './stock.action';

describe('[Stock] Actions', () => {
  it('StockLevel', () => {
    const RESULT = new StockLevel({ productCode: 'P0001', location: '' });
    const EXPECTED: StockLevel = {
      type: STOCK_LEVEL,
      meta: {
        entityType: '[Stock] Stock Data',
        loader: {
          load: true,
        },
      },
      payload: {
        productCode: 'P0001',
        location: '',
      },
    };

    expect(RESULT.type).toEqual(EXPECTED.type);
    expect(RESULT.meta).toEqual(EXPECTED.meta);
    expect(RESULT.payload).toEqual(EXPECTED.payload);
  });

  it('StockLevelOnHold', () => {
    const RESULT = new StockLevelOnHold();
    const EXPECTED: StockLevelOnHold = {
      type: STOCK_LEVEL_ON_HOLD,
      meta: {
        entityType: STOCK_DATA,
        loader: {
          load: true,
        },
      },
    };
    expect(RESULT.type).toEqual(EXPECTED.type);
    expect(RESULT.meta).toEqual(EXPECTED.meta);
  });

  it('StockLevelFail', () => {
    const RESULT = new StockLevelFail({});
    const EXPECTED: StockLevelFail = {
      type: STOCK_LEVEL_FAIL,
      meta: {
        entityType: STOCK_DATA,
        loader: {
          error: {},
        },
      },
      payload: {},
      error: {},
    };

    expect(RESULT.type).toEqual(EXPECTED.type);
    expect(RESULT.meta).toEqual(EXPECTED.meta);
    expect(RESULT.payload).toEqual(EXPECTED.payload);
    expect(RESULT.error).toEqual(EXPECTED.error);
  });

  it('StockLevelSuccess', () => {
    const RESULT = new StockLevelSuccess({
      productCode: 'P0001',
      stockLevels: {},
    });
    const EXPECTED: StockLevelSuccess = {
      type: STOCK_LEVEL_SUCCESS,
      meta: {
        entityType: STOCK_DATA,
        loader: { success: true },
      },
      payload: { productCode: 'P0001', stockLevels: {} },
    };

    expect(RESULT.type).toEqual(EXPECTED.type);
    expect(RESULT.meta).toEqual(EXPECTED.meta);
    expect(RESULT.payload).toEqual(EXPECTED.payload);
  });

  it('ClearStockData', () => {
    const RESULT = new ClearStockData();
    const EXPECTED: ClearStockData = {
      type: CLEAR_STOCK_DATA,
      meta: {
        entityType: STOCK_DATA,
        loader: {},
      },
    };

    expect(RESULT.type).toEqual(EXPECTED.type);
    expect(RESULT.meta).toEqual(EXPECTED.meta);
  });
});
