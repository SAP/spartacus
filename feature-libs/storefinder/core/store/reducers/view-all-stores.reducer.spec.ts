import { StoreFinderActions } from '../actions/index';
import * as fromReducers from './view-all-stores.reducer';

describe('View All Stores Reducer', () => {
  describe('Undefined action', () => {
    it('should return the default state', () => {
      const { initialState } = fromReducers;
      const action = {} as any;
      const state = fromReducers.viewAllStoresReducer(undefined, action);

      expect(state).toBe(initialState);
    });
  });

  describe('VIEW_ALL_STORES_SUCCESS action', () => {
    it('should populate results after loading', () => {
      const results = { pointOfServices: [{ name: 'test' }] };
      const { initialState } = fromReducers;
      const loadAction = new StoreFinderActions.ViewAllStores();

      const loadingState = fromReducers.viewAllStoresReducer(
        initialState,
        loadAction
      );
      const resultAction = new StoreFinderActions.ViewAllStoresSuccess(results);
      const state = fromReducers.viewAllStoresReducer(
        loadingState,
        resultAction
      );

      expect(state.viewAllStoresEntities).toEqual(results);
    });
  });
});
