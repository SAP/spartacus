import { StoreFinderActions } from '../actions/index';
import * as fromReducers from './view-all-stores.reducer';

describe('View All Stores Reducer', () => {
  describe('Undefined action', () => {
    it('should return the default state', () => {
      const { initialState } = fromReducers;
      const action = {} as any;
      const state = fromReducers.reducer(undefined, action);

      expect(state).toBe(initialState);
    });
  });

  describe('VIEW_ALL_STORES_FAIL action', () => {
    it('should set the flags accordingly', () => {
      const results = {
        loading: false,
        error: true,
        success: false,
      };
      const { initialState } = fromReducers;
      const loadAction = new StoreFinderActions.ViewAllStores();

      const loadingState = fromReducers.reducer(initialState, loadAction);
      const resultAction = new StoreFinderActions.ViewAllStoresFail(true);
      const state = fromReducers.reducer(loadingState, resultAction);

      expect(state).toEqual(results);
    });
  });

  describe('VIEW_ALL_STORES_SUCCESS action', () => {
    it('should set the flags accordingly', () => {
      const results = {
        loading: false,
        error: false,
        success: true,
      };
      const { initialState } = fromReducers;
      const loadAction = new StoreFinderActions.ViewAllStores();

      const loadingState = fromReducers.reducer(initialState, loadAction);
      const resultAction = new StoreFinderActions.ViewAllStoresSuccess({});
      const state = fromReducers.reducer(loadingState, resultAction);

      expect(state).toEqual(results);
    });
  });
});
