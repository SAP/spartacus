import { PointOfServiceStock } from '@spartacus/core';
import { StateWithStock, StockState } from '../stock-state';
import {
  getStockAtStore,
  getStockEntities,
  getStockError,
  getStockLevelState,
  getStockLoading,
  getStockSuccess,
  getStoresWithStockForProductCode,
  hasSearchStarted,
  hasSearchStartedForProductCode,
} from './stock.selectors';

describe('StockSelectors', () => {
  const stateFactory = (
    stockLevel?: Partial<StockState['stockLevel']>,
    hideOutOfStock?: StockState['hideOutOfStock'],
    browserLocation?: StockState['browserLocation'],
    stockLevelAtStore?: StockState['stockLevelAtStore']
  ): StateWithStock => ({
    stock: {
      stockLevel: {
        loading: stockLevel?.loading ?? false,
        error: stockLevel?.error ?? false,
        success: stockLevel?.success ?? false,
        value: stockLevel?.value ?? {},
      },
      hideOutOfStock: hideOutOfStock ?? false,
      browserLocation: browserLocation ?? { latitude: null, longitude: null },
      stockLevelAtStore: stockLevelAtStore ?? {},
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

  describe('hasSearchStarted', () => {
    it('should infer that the search has not been performed', () => {
      const result = hasSearchStarted(stateFactory());
      expect(result).toEqual(false);
    });
    it('should infer that the search has been performed while loading', () => {
      const result = hasSearchStarted(stateFactory({ loading: true }));
      expect(result).toEqual(true);
    });
    it('should infer that the search has been performed after a success', () => {
      const result = hasSearchStarted(stateFactory({ success: true }));
      expect(result).toEqual(true);
    });
    it('should infer that the search has been performed after an error', () => {
      const result = hasSearchStarted(stateFactory({ error: true }));
      expect(result).toEqual(true);
    });
  });

  describe('hasSearchStartedForProductCode', () => {
    it('should return true if the result is for the product code', () => {
      const result = hasSearchStartedForProductCode('productCode')(
        stateFactory({ success: true, value: { productCode: {} } })
      );
      expect(result).toEqual(true);
    });

    it('should return false if the result is not for the product code', () => {
      const result = hasSearchStartedForProductCode('productCode')(
        stateFactory({ success: true, value: { productCode2: {} } })
      );
      expect(result).toEqual(false);
    });
  });

  describe('getStoresWithStockForProductCode', () => {
    const storeWithoutStockInfo: PointOfServiceStock = {
      name: 'store without stock info',
    };
    const storeWithStockInfoAndNoStock: PointOfServiceStock = {
      name: 'store with stock info and no stock',
      stockInfo: { stockLevelStatus: 'outOfStock' },
    };
    const storeWithStockInfoAndLowStock: PointOfServiceStock = {
      name: 'store with stock info and no stock',
      stockInfo: { stockLevelStatus: 'lowStock' },
    };
    const storeWithStockInfoAndStock: PointOfServiceStock = {
      name: 'store with stock info and stock',
      stockInfo: { stockLevelStatus: 'inStock' },
    };

    const stores: PointOfServiceStock[] = [
      storeWithoutStockInfo,
      storeWithStockInfoAndNoStock,
      storeWithStockInfoAndLowStock,
      storeWithStockInfoAndStock,
    ];

    it('should return an empty list for a product without store data', () => {
      const result = getStoresWithStockForProductCode('productCode')(
        stateFactory()
      );
      const expectedResult: PointOfServiceStock[] = [];
      expect(result).toEqual(expectedResult);
    });

    it('should return the store data hiding out of stock', () => {
      const state: StateWithStock = stateFactory(
        { value: { productCode: { stores } } },
        true
      );
      const result = getStoresWithStockForProductCode('productCode')(state);
      expect(result).toEqual([storeWithStockInfoAndStock]);
    });

    it('should return the store data showing out of stock', () => {
      const state: StateWithStock = stateFactory(
        { value: { productCode: { stores } } },
        false
      );
      const result = getStoresWithStockForProductCode('productCode')(state);
      expect(result).toEqual(stores);
    });

    it('should return stock level for productCode and storeName', () => {
      const state: StateWithStock = stateFactory(
        undefined,
        undefined,
        undefined,
        { productCode: { storeName: { stockLevel: 10 } } }
      );
      const result = getStockAtStore('productCode', 'storeName')(state);
      expect(result).toEqual({ stockLevel: 10 });
    });

    it('should return undefined for missing productCode and storeName', () => {
      const result = getStockAtStore(
        'productCode',
        'storeName'
      )(stateFactory());
      expect(result).toEqual(undefined);
    });
  });
});
