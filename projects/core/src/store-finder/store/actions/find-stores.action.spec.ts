import * as fromActions from './find-stores.action';
import { StoreFinderSearchConfig } from '../../model/search-config';
import { LongitudeLatitude } from '../../model/longitude-latitude';
import {
  loadMeta,
  failMeta,
  successMeta
} from '../../../state/utils/loader/loader.action';
import { STORE_FINDER_DATA } from '../store-finder-state';

describe('Find Stores Actions', () => {
  describe('OnHold', () => {
    it('should create OnHold action', () => {
      const action = new fromActions.OnHold();
      expect({ ...action }).toEqual({
        type: fromActions.ON_HOLD,
        meta: loadMeta(STORE_FINDER_DATA)
      });
    });
  });

  describe('FindStores', () => {
    it('should create FindStores action', () => {
      const searchConfig: StoreFinderSearchConfig = { pageSize: 10 };
      const longitudeLatitude: LongitudeLatitude = {
        longitude: 10.1,
        latitude: 20.2
      };
      const payload = { queryText: 'test', longitudeLatitude, searchConfig };
      const action = new fromActions.FindStores(payload);

      expect({ ...action }).toEqual({
        type: fromActions.FIND_STORES,
        meta: loadMeta(STORE_FINDER_DATA),
        payload
      });
    });
  });

  describe('FindStores with coordinates', () => {
    it('should create FindStores action with only coordinates', () => {
      const longitudeLatitude: LongitudeLatitude = {
        longitude: 10.1,
        latitude: 20.2
      };
      const payload = { queryText: '', longitudeLatitude };
      const action = new fromActions.FindStores(payload);

      expect({ ...action }).toEqual({
        type: fromActions.FIND_STORES,
        payload,
        meta: loadMeta(STORE_FINDER_DATA)
      });
    });
  });

  describe('FindStoresFail', () => {
    it('should create FindStoresFail action', () => {
      const payload = { errorMessage: 'Error' };
      const action = new fromActions.FindStoresFail(payload);

      expect({ ...action }).toEqual({
        type: fromActions.FIND_STORES_FAIL,
        payload,
        meta: failMeta(STORE_FINDER_DATA, payload)
      });
    });
  });

  describe('FindStoresSuccess', () => {
    it('should create FindStoresSuccess action', () => {
      const payload = [{ stores: ['test'] }];
      const action = new fromActions.FindStoresSuccess(payload);

      expect({ ...action }).toEqual({
        type: fromActions.FIND_STORES_SUCCESS,
        payload,
        meta: successMeta(STORE_FINDER_DATA)
      });
    });
  });

  describe('FindStoreById', () => {
    it('should create FindStoreById action', () => {
      const storeId = 'shop_los_angeles_1';
      const payload = { storeId };
      const action = new fromActions.FindStoreById(payload);

      expect({
        ...action
      }).toEqual({
        type: fromActions.FIND_STORE_BY_ID,
        payload,
        meta: loadMeta(STORE_FINDER_DATA)
      });
    });
  });

  describe('FindStoreByIdFail', () => {
    it('should create FindStoreByIdFail action', () => {
      const payload = { errorMessage: 'Error' };
      const action = new fromActions.FindStoreByIdFail(payload);

      expect({
        ...action
      }).toEqual({
        type: fromActions.FIND_STORE_BY_ID_FAIL,
        payload,
        meta: failMeta(STORE_FINDER_DATA, payload)
      });
    });
  });

  describe('FindStoreByIdSuccess', () => {
    it('should create FindStoreByIdSuccess action', () => {
      const payload = { name: 'storeName' };
      const action = new fromActions.FindStoreByIdSuccess(payload);

      expect({
        ...action
      }).toEqual({
        type: fromActions.FIND_STORE_BY_ID_SUCCESS,
        payload,
        meta: successMeta(STORE_FINDER_DATA)
      });
    });
  });
});
