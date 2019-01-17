import * as fromActions from './view-all-stores.action';

describe('View All Stores Actions', () => {
  describe('ViewAllStores', () => {
    it('should create ViewAllStores action', () => {
      const action = new fromActions.ViewAllStores();

      expect({ ...action }).toEqual({
        type: fromActions.VIEW_ALL_STORES
      });
    });
  });

  describe('ViewAllStoresFail', () => {
    it('should create ViewAllStoresFail action', () => {
      const payload = { errorMessage: 'Error' };
      const action = new fromActions.ViewAllStoresFail(payload);

      expect({ ...action }).toEqual({
        type: fromActions.VIEW_ALL_STORES_FAIL,
        payload
      });
    });
  });

  describe('ViewAllStoresSuccess', () => {
    it('should create ViewAllStoresSuccess action', () => {
      const payload = [{ country: ['Canada'] }];
      const action = new fromActions.ViewAllStoresSuccess(payload);

      expect({ ...action }).toEqual({
        type: fromActions.VIEW_ALL_STORES_SUCCESS,
        payload
      });
    });
  });
});
