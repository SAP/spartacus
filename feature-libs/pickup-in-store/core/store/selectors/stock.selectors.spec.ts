import { PointOfServiceStock } from '@spartacus/core';
import { StateWithStock, StockState } from '../stock-state';
import {
  getSearchHasBeenPerformed,
  getStockEntities,
  getStockError,
  getStockLevelByProductCode,
  getStockLevelState,
  getStockLoading,
  getStockSuccess,
} from './stock.selectors';

describe('StockSelectors', () => {
  const stateFactory = (
    stockLevel?: Partial<StockState['stockLevel']>,
    hideOutOfStock?: StockState['hideOutOfStock']
  ): StateWithStock => ({
    stock: {
      stockLevel: {
        loading: stockLevel?.loading ?? false,
        error: stockLevel?.error ?? false,
        success: stockLevel?.success ?? false,
        value: stockLevel?.value ?? {},
      },
      hideOutOfStock: hideOutOfStock ?? false,
    },
  });

  it('should get the stock level state', () => {
    const result = getStockLevelState(stateFactory());
    const expectedResult = {
      loading: false,
      error: false,
      success: false,
      value: {},
    };
    expect(result).toEqual(expectedResult);
  });

  it('should get the stock entities state', () => {
    const result = getStockEntities(stateFactory());
    expect(result).toEqual({});
  });

  it('should get the stock loading state', () => {
    const result = getStockLoading(stateFactory());
    expect(result).toEqual(false);
  });

  it('should get the stock success state', () => {
    const result = getStockSuccess(stateFactory());
    expect(result).toEqual(false);
  });

  it('should get the stock error state', () => {
    const result = getStockError(stateFactory());
    expect(result).toEqual(false);
  });

  describe('getSearchHasBeenPerformed', () => {
    it('should infer that the search has not been performed', () => {
      const result = getSearchHasBeenPerformed(stateFactory());
      expect(result).toEqual(false);
    });
    it('should infer that the search has been performed while loading', () => {
      const result = getSearchHasBeenPerformed(stateFactory({ loading: true }));
      expect(result).toEqual(true);
    });
    it('should infer that the search has been performed after a success', () => {
      const result = getSearchHasBeenPerformed(stateFactory({ success: true }));
      expect(result).toEqual(true);
    });
    it('should infer that the search has been performed after an error', () => {
      const result = getSearchHasBeenPerformed(stateFactory({ error: true }));
      expect(result).toEqual(true);
    });
  });

  describe('getStockLevelByProductCode', () => {
    const storeWithoutStockInfo: PointOfServiceStock = {
      name: 'store without stock info',
    };
    const storeWithStockInfoAndNoStock: PointOfServiceStock = {
      name: 'store with stock info and no stock',
      stockInfo: { stockLevel: 0 },
    };
    const storeWithStockInfoAndStock: PointOfServiceStock = {
      name: 'store with stock info and stock',
      stockInfo: { stockLevel: 1 },
    };

    const stores: PointOfServiceStock[] = [
      storeWithoutStockInfo,
      storeWithStockInfoAndNoStock,
      storeWithStockInfoAndStock,
    ];

    it('should return an empty list for a product without store data', () => {
      const result = getStockLevelByProductCode('productCode')(stateFactory());
      const expectedResult: PointOfServiceStock[] = [];
      expect(result).toEqual(expectedResult);
    });

    it('should return the store data hiding out of stock', () => {
      const state: StateWithStock = stateFactory(
        { value: { productCode: { stores } } },
        true
      );
      const result = getStockLevelByProductCode('productCode')(state);
      expect(result).toEqual([storeWithStockInfoAndStock]);
    });

    it('should return the store data showing out of stock', () => {
      const state: StateWithStock = stateFactory(
        { value: { productCode: { stores } } },
        false
      );
      const result = getStockLevelByProductCode('productCode')(state);
      expect(result).toEqual(stores);
    });
  });
});
