import { PointOfServiceStock } from '@spartacus/core';
import { StateWithStock } from '../stock-state';
import {
  getSearchHasBeenPerformed,
  getStockEntities,
  getStockError,
  getStockLevelState,
  getStockLoading,
  getStockSuccess,
  getStores,
} from './stock.selectors';

describe('stock-selector', () => {
  const state: StateWithStock = {
    stock: {
      stockLevel: {
        loading: false,
        error: false,
        success: false,
        value: {
          findStockLevelByCode: {},
        },
      },
      hideOutOfStock: false,
    },
  };

  it('getStockLevelState', () => {
    const result = getStockLevelState(state);
    const exptectedResult = {
      loading: false,
      error: false,
      success: false,
      value: { findStockLevelByCode: {} },
    };
    expect(result).toEqual(exptectedResult);
  });

  it('getStockEntities', () => {
    const result = getStockEntities(state);
    const expectedResult = { findStockLevelByCode: {} };
    expect(result).toEqual(expectedResult);
  });

  it('getStockLoading', () => {
    const result = getStockLoading(state);
    const expectedResult = false;
    expect(result).toEqual(expectedResult);
  });

  it('getStockSuccess', () => {
    const result = getStockSuccess(state);
    const expectedResult = false;
    expect(result).toEqual(expectedResult);
  });

  it('getStockError', () => {
    const result = getStockError(state);
    const expectedResult = false;
    expect(result).toEqual(expectedResult);
  });

  it('getSearchHasBeenPerformed', () => {
    const result = getSearchHasBeenPerformed(state);
    const expectedResult = false;
    expect(result).toEqual(expectedResult);
  });

  describe('getStores', () => {
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
    const stateWithStores: StateWithStock = {
      ...state,
      stock: {
        ...state.stock,
        hideOutOfStock: true,
        stockLevel: {
          loading: false,
          error: false,
          success: false,
          value: { findStockLevelByCode: { stores } },
        },
      },
    };

    it('getStores without store data', () => {
      const result = getStores(state);
      const expectedResult: PointOfServiceStock[] = [];
      expect(result).toEqual(expectedResult);
    });

    it('getStores with store data hiding out of stock', () => {
      const result = getStores({
        ...stateWithStores,
        stock: {
          ...stateWithStores.stock,
          hideOutOfStock: true,
        },
      });
      const expectedResult: PointOfServiceStock[] = [
        storeWithStockInfoAndStock,
      ];
      expect(result).toEqual(expectedResult);
    });

    it('getStores with store data showing out of stock', () => {
      const result = getStores({
        ...stateWithStores,
        stock: {
          ...stateWithStores.stock,
          hideOutOfStock: false,
        },
      });
      const expectedResult: PointOfServiceStock[] = stores;
      expect(result).toEqual(expectedResult);
    });
  });
});
