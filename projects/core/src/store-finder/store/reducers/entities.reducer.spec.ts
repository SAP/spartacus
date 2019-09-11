import { StoreFinderActions } from '../actions/index';
import * as fromEntitiesReducer from './entities.reducer';

describe('Entities Reducer', () => {
  describe('Undefined action', () => {
    it('should return the default state', () => {
      const { initialState } = fromEntitiesReducer;
      const action = {} as any;
      const state = fromEntitiesReducer.reducer(undefined, action);

      expect(state).toBe(initialState);
    });
  });

  describe('STORE_ENTITIES action', () => {
    it('should populate entities', () => {
      const payload = { pointOfServices: [{ name: 'test' }] };

      const { initialState } = fromEntitiesReducer;

      const storeEntitiesAction = new StoreFinderActions.StoreEntities(payload);
      const state = fromEntitiesReducer.reducer(
        initialState,
        storeEntitiesAction
      );

      expect(state).toEqual(payload);
    });
  });
});
