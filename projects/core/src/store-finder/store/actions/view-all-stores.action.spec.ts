import * as fromActions from './view-all-stores.action';
import {
  loadMeta,
  failMeta,
  successMeta
} from '../../../state/utils/loader/loader.action';
import { STORE_FINDER_DATA } from '../store-finder-state';

describe('View All Stores Actions', () => {
  describe('ViewAllStores', () => {
    it('should create ViewAllStores action', () => {
      const action = new fromActions.ViewAllStores();

      expect({ ...action }).toEqual({
        type: fromActions.VIEW_ALL_STORES,
        meta: loadMeta(STORE_FINDER_DATA)
      });
    });
  });

  describe('ViewAllStoresFail', () => {
    it('should create ViewAllStoresFail action', () => {
      const payload = { errorMessage: 'Error' };
      const action = new fromActions.ViewAllStoresFail(payload);

      expect({ ...action }).toEqual({
        type: fromActions.VIEW_ALL_STORES_FAIL,
        payload,
        meta: failMeta(STORE_FINDER_DATA, payload)
      });
    });
  });

  describe('ViewAllStoresSuccess', () => {
    it('should create ViewAllStoresSuccess action', () => {
      const payload = [{ country: ['Canada'] }];
      const action = new fromActions.ViewAllStoresSuccess(payload);

      expect({ ...action }).toEqual({
        type: fromActions.VIEW_ALL_STORES_SUCCESS,
        payload,
        meta: successMeta(STORE_FINDER_DATA)
      });
    });
  });
});
