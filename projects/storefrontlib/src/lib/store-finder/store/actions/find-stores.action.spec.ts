import * as fromActions from './find-stores.action';
import { SearchConfig } from '../../models/search-config';

describe('Find Stores Actions', () => {
  describe('FindStores', () => {
    it('should create FindStores action', () => {
      const searchConfig: SearchConfig = { pageSize: 10 };
      const payload = { queryText: 'test', searchConfig };
      const action = new fromActions.FindStores(payload);

      expect({ ...action }).toEqual({
        type: fromActions.FIND_STORES,
        payload
      });
    });
  });

  describe('FindStoresFail', () => {
    it('should create FindStoresFail action', () => {
      const payload = { errorMessage: 'Error' };
      const action = new fromActions.FindStoresFail(payload);

      expect({ ...action }).toEqual({
        type: fromActions.FIND_STORES_FAIL,
        payload
      });
    });
  });

  describe('FindStoresSuccess', () => {
    it('should create FindStoresSuccess action', () => {
      const payload = [{ stores: ['test'] }];
      const action = new fromActions.FindStoresSuccess(payload);

      expect({ ...action }).toEqual({
        type: fromActions.FIND_STORES_SUCCESS,
        payload
      });
    });
  });

  describe('FindAllStores', () => {
    it('should create FindAllStores action', () => {
      const action = new fromActions.FindAllStores();

      expect({ ...action }).toEqual({
        type: fromActions.FIND_ALL_STORES
      });
    });
  });

  describe('FindAllStoresFail', () => {
    it('should create FindAllStoresFail action', () => {
      const payload = { errorMessage: 'Error' };
      const action = new fromActions.FindAllStoresFail(payload);

      expect({ ...action }).toEqual({
        type: fromActions.FIND_ALL_STORES_FAIL,
        payload
      });
    });
  });

  describe('FindAllStoresSuccess', () => {
    it('should create FindAllStoresSuccess action', () => {
      const payload = [{ country: ['Canada'] }];
      const action = new fromActions.FindAllStoresSuccess(payload);

      expect({ ...action }).toEqual({
        type: fromActions.FIND_ALL_STORES_SUCCESS,
        payload
      });
    });
  });
});
