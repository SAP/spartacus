import { SearchConfig } from '@spartacus/core';
import { BundleActions } from '../actions';
import { AvailableEntriesEntities } from '../bundle-state';
import * as fromReducers from './available-entries.reducer';

const cartId = 'test-cart';
const userId = 'test-user';
const entryGroupNumber = 1;

describe('Available Entries Reducer', () => {
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
      const searchConfig: SearchConfig = { pageSize: 10 };
      const results: AvailableEntriesEntities = {
        cartId,
        userId,
        entryGroupNumber,
        products: [],
      };
      const { initialState } = fromReducers;
      const loadAction = new BundleActions.GetBundleAllowedProducts({
        cartId,
        userId,
        entryGroupNumber,
        searchConfig,
      });

      const loadingState = fromReducers.availableEntriesReducer(
        initialState,
        loadAction
      );
      const resultAction = new BundleActions.GetBundleAllowedProductsSuccess(
        results
      );
      const state = fromReducers.availableEntriesReducer(
        loadingState,
        resultAction
      );

      expect(state.availableEntriesEntities).toEqual(results);
    });
  });
});
