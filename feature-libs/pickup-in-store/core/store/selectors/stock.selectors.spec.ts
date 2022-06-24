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

  it('getStores', () => {
    const result = getStores(state);
    const expectedResult: PointOfServiceStock[] = [];
    expect(result).toEqual(expectedResult);
  });

  it('getStores', () => {
    const result = getStores({
      ...state,
      stock: { ...state.stock, hideOutOfStock: true },
    });
    const expectedResult: PointOfServiceStock[] = [];
    expect(result).toEqual(expectedResult);
  });
});
