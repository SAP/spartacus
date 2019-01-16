import * as fromReducers from './view-all-stores.reducer';
import * as fromActions from '../actions/view-all-stores.action';

describe('View All Stores Reducer', () => {
  describe('Undefined action', () => {
    it('should return the default state', () => {
      const { initialState } = fromReducers;
      const action = {} as any;
      const state = fromReducers.reducer(undefined, action);

      expect(state).toBe(initialState);
    });
  });

  describe('VIEW_ALL_STORES action', () => {
    it('should set isLoading flag to true', () => {
      const { initialState } = fromReducers;
      const action = new fromActions.ViewAllStores();
      const state = fromReducers.reducer(initialState, action);
      expect(state.isLoading).toEqual(true);
    });
  });

  describe('VIEW_ALL_STORES_SUCCESS action', () => {
    it('should populate results after loading', () => {
      const results = { stores: [{ name: 'test' }] };
      const { initialState } = fromReducers;
      const loadAction = new fromActions.ViewAllStores();

      const loadingState = fromReducers.reducer(initialState, loadAction);
      const resultAction = new fromActions.ViewAllStoresSuccess(results);
      const state = fromReducers.reducer(loadingState, resultAction);

      expect(state.viewAllStoresEntities).toEqual(results);
      expect(state.isLoading).toEqual(false);
    });
  });
});
