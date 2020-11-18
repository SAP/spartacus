import { StoreFinderActions } from '../actions/index';
import * as fromReducers from './find-stores.reducer';
import { SearchConfig } from '@spartacus/core';

describe('Find Stores Reducer', () => {
  describe('Undefined action', () => {
    it('should return the default state', () => {
      const { initialState } = fromReducers;
      const action = {} as any;
      const state = fromReducers.reducer(undefined, action);

      expect(state).toBe(initialState);
    });
  });

  describe('FIND_STORES_SUCCESS action', () => {
    it('should populate results after loading', () => {
      const searchConfig: SearchConfig = { pageSize: 10 };
      const results = { pointOfServices: [{ name: 'test' }] };
      const { initialState } = fromReducers;
      const loadAction = new StoreFinderActions.FindStores({
        queryText: 'test',
        searchConfig,
      });

      const loadingState = fromReducers.reducer(initialState, loadAction);
      const resultAction = new StoreFinderActions.FindStoresSuccess(results);
      const state = fromReducers.reducer(loadingState, resultAction);

      expect(state.findStoresEntities).toEqual(results);
    });
  });

  describe('FIND_STORE_BY_ID_SUCCESS action', () => {
    it('should populate results after loading', () => {
      const results = { pointOfServices: [{ name: 'test' }] };
      const { initialState } = fromReducers;
      const loadAction = new StoreFinderActions.FindStoreById({
        storeId: 'testId',
      });

      const loadingState = fromReducers.reducer(initialState, loadAction);
      const resultAction = new StoreFinderActions.FindStoreByIdSuccess(results);
      const state = fromReducers.reducer(loadingState, resultAction);

      expect(state.findStoresEntities).toEqual(results);
    });
  });
});
