import { STORE_FINDER_DATA } from '../store-finder-state';
import { StoreFinderActions } from './index';
import { StateUtils } from '@spartacus/core';

describe('View All Stores Actions', () => {
  describe('ViewAllStores', () => {
    it('should create ViewAllStores action', () => {
      const action = new StoreFinderActions.ViewAllStores();

      expect({ ...action }).toEqual({
        type: StoreFinderActions.VIEW_ALL_STORES,
        meta: StateUtils.loadMeta(STORE_FINDER_DATA),
      });
    });
  });

  describe('ViewAllStoresFail', () => {
    it('should create ViewAllStoresFail action', () => {
      const payload = { errorMessage: 'Error' };
      const action = new StoreFinderActions.ViewAllStoresFail(payload);

      expect({ ...action }).toEqual({
        type: StoreFinderActions.VIEW_ALL_STORES_FAIL,
        payload,
        meta: StateUtils.failMeta(STORE_FINDER_DATA, payload),
      });
    });
  });

  describe('ViewAllStoresSuccess', () => {
    it('should create ViewAllStoresSuccess action', () => {
      const payload = [{ country: ['Canada'] }];
      const action = new StoreFinderActions.ViewAllStoresSuccess(payload);

      expect({ ...action }).toEqual({
        type: StoreFinderActions.VIEW_ALL_STORES_SUCCESS,
        payload,
        meta: StateUtils.successMeta(STORE_FINDER_DATA),
      });
    });
  });

  describe('Clear Store Finder Data Action', () => {
    it('should creat ClearStoreFinderData action', () => {
      const action = new StoreFinderActions.ClearStoreFinderData();
      expect({ ...action }).toEqual({
        type: StoreFinderActions.CLEAR_STORE_FINDER_DATA,
      });
    });
  });
});
