import { entityLoaderReducer } from './entity-loader.reducer';
import { initialEntityState } from '../entity/entity.reducer';
import {
  EntityFailAction,
  EntityLoadAction,
  EntitySuccessAction
} from './entity-loader.action';

describe('EntityLoader reducer', () => {
  const TEST_ENTITY_TYPE = 'test';
  const TEST_ENTITY_ID = 'testeId';

  describe('undefined action', () => {
    it('should return the default state', () => {
      const action = {} as any;
      const state = entityLoaderReducer(TEST_ENTITY_TYPE)(undefined, action);

      const expectedState = initialEntityState;

      expect(state).toEqual(expectedState);
    });
  });

  describe('LOAD ACTION', () => {
    it('should set load state', () => {
      const action = new EntityLoadAction(TEST_ENTITY_TYPE, TEST_ENTITY_ID);
      const state = entityLoaderReducer(TEST_ENTITY_TYPE)(undefined, action);
      const expectedState = {
        entities: {
          [TEST_ENTITY_ID]: {
            loading: true,
            error: false,
            value: undefined
          }
        }
      };
      expect(state).toEqual(expectedState);
    });
  });

  describe('FAIL ACTION', () => {
    it('should set load state', () => {
      const action = new EntityFailAction(TEST_ENTITY_TYPE, TEST_ENTITY_ID);
      const state = entityLoaderReducer(TEST_ENTITY_TYPE)(undefined, action);
      const expectedState = {
        entities: {
          [TEST_ENTITY_ID]: {
            loading: false,
            error: true,
            success: false,
            value: undefined
          }
        }
      };
      expect(state).toEqual(expectedState);
    });
  });

  describe('SUCCESS ACTION', () => {
    it('should set load state', () => {
      const data = 'test Data';
      const action = {
        ...new EntitySuccessAction(TEST_ENTITY_TYPE, TEST_ENTITY_ID),
        payload: data
      };

      const state = entityLoaderReducer(TEST_ENTITY_TYPE)(undefined, action);
      const expectedState = {
        entities: {
          [TEST_ENTITY_ID]: {
            loading: false,
            error: false,
            success: true,
            value: data
          }
        }
      };
      expect(state).toEqual(expectedState);
    });
  });
});
