import { BundleActions } from '../actions/index';
import * as fromReducers from './available-entries.reducer';
import { SearchConfig } from '@spartacus/core';

describe('Bundle Available Entries Reducer', () => {
  const userId = 'anonymous';
  const cartId = 'xxxxx';
  const entryGroupNumber = 5;
  const searchConfig: SearchConfig = { pageSize: 5 };
  const params = {
    userId,
    cartId,
    entryGroupNumber,
    searchConfig,
  };
  const searchResult = {
    [cartId]: { [entryGroupNumber]: { ...params, products: [] } },
  };

  describe('Undefined action', () => {
    it('should return the default state', () => {
      const { initialState } = fromReducers;
      const action = {} as any;
      const state = fromReducers.availableEntriesReducer(undefined, action);

      expect(state).toBe(initialState);
    });
  });

  describe('GET_BUNDLE_ALLOWED_PRODUCTS_SUCCESS action', () => {
    it('should populate results after loading', () => {
      const { initialState } = fromReducers;
      const loadAction = new BundleActions.GetBundleAllowedProducts({
        ...params,
      });

      const loadingState = fromReducers.availableEntriesReducer(
        initialState,
        <any>loadAction
      );
      const resultAction = new BundleActions.GetBundleAllowedProductsSuccess(<
        any
      >{ ...params, products: [] });

      const state = fromReducers.availableEntriesReducer(
        loadingState,
        resultAction
      );

      expect(state.availableEntriesEntities).toEqual(searchResult);
    });
  });
});
