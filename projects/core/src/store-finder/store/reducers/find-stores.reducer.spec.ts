import * as fromReducers from './find-stores.reducer';
import * as fromActions from '../actions/find-stores.action';
import { StoreFinderSearchConfig } from '../../model/search-config';

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
      const searchConfig: StoreFinderSearchConfig = { pageSize: 10 };
      const results = { pointOfServices: [{ name: 'test' }] };
      const { initialState } = fromReducers;
      const loadAction = new fromActions.FindStores({
        queryText: 'test',
        searchConfig
      });

      const loadingState = fromReducers.reducer(initialState, loadAction);
      const resultAction = new fromActions.FindStoresSuccess(results);
      const state = fromReducers.reducer(loadingState, resultAction);

      expect(state.findStoresEntities).toEqual(results);
    });
  });

  describe('FIND_STORE_BY_ID_SUCCESS action', () => {
    it('should populate results after loading', () => {
      const results = { pointOfServices: [{ name: 'test' }] };
      const { initialState } = fromReducers;
      const loadAction = new fromActions.FindStoreById({ storeId: 'testId' });

      const loadingState = fromReducers.reducer(initialState, loadAction);
      const resultAction = new fromActions.FindStoreByIdSuccess(results);
      const state = fromReducers.reducer(loadingState, resultAction);

      expect(state.findStoresEntities).toEqual(results);
    });
  });

  describe('FIND_ALL_STORES_BY_COUNTRY_SUCCESS action', () => {
    it('should populate results after loading', () => {
      const results = { pointOfServices: [{ name: 'test' }] };
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
      const results = { pointOfServices: [{ name: 'test' }] };
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
