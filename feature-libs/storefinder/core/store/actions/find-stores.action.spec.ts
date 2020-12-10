import { STORE_FINDER_DATA } from '../store-finder-state';
import { StoreFinderActions } from './index';
import { GeoPoint, SearchConfig, StateUtils } from '@spartacus/core';

describe('Find Stores Actions', () => {
  describe('OnHold', () => {
    it('should create OnHold action', () => {
      const action = new StoreFinderActions.FindStoresOnHold();
      expect({ ...action }).toEqual({
        type: StoreFinderActions.FIND_STORES_ON_HOLD,
        meta: StateUtils.loadMeta(STORE_FINDER_DATA),
      });
    });
  });

  describe('FindStores', () => {
    it('should create FindStores action', () => {
      const searchConfig: SearchConfig = { pageSize: 10 };
      const longitudeLatitude: GeoPoint = {
        longitude: 10.1,
        latitude: 20.2,
      };
      const payload = { queryText: 'test', longitudeLatitude, searchConfig };
      const action = new StoreFinderActions.FindStores(payload);

      expect({ ...action }).toEqual({
        type: StoreFinderActions.FIND_STORES,
        meta: StateUtils.loadMeta(STORE_FINDER_DATA),
        payload,
      });
    });
  });

  describe('FindStores with coordinates', () => {
    it('should create FindStores action with only coordinates', () => {
      const longitudeLatitude: GeoPoint = {
        longitude: 10.1,
        latitude: 20.2,
      };
      const payload = { queryText: '', longitudeLatitude };
      const action = new StoreFinderActions.FindStores(payload);

      expect({ ...action }).toEqual({
        type: StoreFinderActions.FIND_STORES,
        payload,
        meta: StateUtils.loadMeta(STORE_FINDER_DATA),
      });
    });
  });

  describe('FindStoresFail', () => {
    it('should create FindStoresFail action', () => {
      const payload = { errorMessage: 'Error' };
      const action = new StoreFinderActions.FindStoresFail(payload);

      expect({ ...action }).toEqual({
        type: StoreFinderActions.FIND_STORES_FAIL,
        payload,
        meta: StateUtils.failMeta(STORE_FINDER_DATA, payload),
      });
    });
  });

  describe('FindStoresSuccess', () => {
    it('should create FindStoresSuccess action', () => {
      const payload = [{ stores: ['test'] }];
      const action = new StoreFinderActions.FindStoresSuccess(payload);

      expect({ ...action }).toEqual({
        type: StoreFinderActions.FIND_STORES_SUCCESS,
        payload,
        meta: StateUtils.successMeta(STORE_FINDER_DATA),
      });
    });
  });

  describe('FindStoreById', () => {
    it('should create FindStoreById action', () => {
      const storeId = 'shop_los_angeles_1';
      const payload = { storeId };
      const action = new StoreFinderActions.FindStoreById(payload);

      expect({
        ...action,
      }).toEqual({
        type: StoreFinderActions.FIND_STORE_BY_ID,
        payload,
        meta: StateUtils.loadMeta(STORE_FINDER_DATA),
      });
    });
  });

  describe('FindStoreByIdFail', () => {
    it('should create FindStoreByIdFail action', () => {
      const payload = { errorMessage: 'Error' };
      const action = new StoreFinderActions.FindStoreByIdFail(payload);

      expect({
        ...action,
      }).toEqual({
        type: StoreFinderActions.FIND_STORE_BY_ID_FAIL,
        payload,
        meta: StateUtils.failMeta(STORE_FINDER_DATA, payload),
      });
    });
  });

  describe('FindStoreByIdSuccess', () => {
    it('should create FindStoreByIdSuccess action', () => {
      const payload = { name: 'storeName' };
      const action = new StoreFinderActions.FindStoreByIdSuccess(payload);

      expect({
        ...action,
      }).toEqual({
        type: StoreFinderActions.FIND_STORE_BY_ID_SUCCESS,
        payload,
        meta: StateUtils.successMeta(STORE_FINDER_DATA),
      });
    });
  });
});
