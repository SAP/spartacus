import * as fromReducers from './find-stores.reducer';
import * as fromActions from '../actions/find-stores.action';
import { SearchConfig } from '../../models/search-config';

describe('Find Stores Reducer', () => {
  describe('Undefined action', () => {
    it('should return the default state', () => {
      const { initialState } = fromReducers;
      const action = {} as any;
      const state = fromReducers.reducer(undefined, action);

      expect(state).toBe(initialState);
    });
  });

  describe('ON_HOLD action', () => {
    it('should set isLoading flag to true', () => {
      const { initialState } = fromReducers;
      const action = new fromActions.OnHold();
      const state = fromReducers.reducer(initialState, action);
      expect(state.isLoading).toEqual(true);
    });
  });

  describe('FIND_STORES action', () => {
    it('should set isLoading flag to true', () => {
      const { initialState } = fromReducers;
      const action = new fromActions.FindStores({ queryText: '' });
      const state = fromReducers.reducer(initialState, action);
      expect(state.isLoading).toEqual(true);
    });
  });

  describe('FIND_STORES_SUCCESS action', () => {
    it('should populate results after loading', () => {
      const searchConfig: SearchConfig = { pageSize: 10 };
      const results = { stores: [{ name: 'test' }] };
      const { initialState } = fromReducers;
      const loadAction = new fromActions.FindStores({
        queryText: 'test',
        searchConfig
      });

      const loadingState = fromReducers.reducer(initialState, loadAction);
      const resultAction = new fromActions.FindStoresSuccess(results);
      const state = fromReducers.reducer(loadingState, resultAction);

      expect(state.findStoresEntities).toEqual(results);
      expect(state.isLoading).toEqual(false);
    });
  });

  describe('FIND_ALL_STORES_BY_COUNTRY_SUCCESS action', () => {
    it('should populate results after loading', () => {
      const results = { stores: [{ name: 'test' }] };
      const { initialState } = fromReducers;
      const loadAction = new fromActions.FindAllStoresByCountry({
        countryIsoCode: 'CA'
      });

      const loadingState = fromReducers.reducer(initialState, loadAction);
      const resultAction = new fromActions.FindAllStoresByCountrySuccess(
        results
      );
      const state = fromReducers.reducer(loadingState, resultAction);

      expect(state.findStoresEntities).toEqual(results);
    });
  });

  describe('FIND_ALL_STORES_BY_REGION_SUCCESS action', () => {
    it('should populate results after loading', () => {
      const results = { stores: [{ name: 'test' }] };
      const { initialState } = fromReducers;
      const loadAction = new fromActions.FindAllStoresByRegion({
        countryIsoCode: 'CA',
        regionIsoCode: 'CA-QC'
      });

      const loadingState = fromReducers.reducer(initialState, loadAction);
      const resultAction = new fromActions.FindAllStoresByRegionSuccess(
        results
      );
      const state = fromReducers.reducer(loadingState, resultAction);

      expect(state.findStoresEntities).toEqual(results);
    });
  });
});
