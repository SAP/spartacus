import { initialLoaderState, loaderReducer } from './loader.reducer';
import {
  LoaderFailAction,
  LoaderLoadAction,
  LoaderSuccessAction
} from './loader.action';

const TEST_ENTITY_TYPE = 'test';

describe('Loader reducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const action = {} as any;
      const state = loaderReducer(TEST_ENTITY_TYPE)(undefined, action);
      expect(state).toEqual(initialLoaderState);
      console.log(state);
    });
  });

  describe('LOAD ACTION', () => {
    it('should set load state', () => {
      const action = new LoaderLoadAction(TEST_ENTITY_TYPE);
      const state = loaderReducer(TEST_ENTITY_TYPE)(undefined, action);
      const expectedState = {
        loading: true,
        error: false,
        value: undefined
      };
      console.log(state);
      expect(state).toEqual(expectedState);
    });
  });

  describe('FAIL ACTION', () => {
    it('should set load state', () => {
      const action = new LoaderFailAction(TEST_ENTITY_TYPE);
      const state = loaderReducer(TEST_ENTITY_TYPE)(undefined, action);
      const expectedState = {
        loading: false,
        error: true,
        value: undefined
      };
      expect(state).toEqual(expectedState);
    });
  });

  describe('SUCCESS ACTION', () => {
    it('should set load state', () => {
      const data = 'test Data';
      const action = {
        ...new LoaderSuccessAction(TEST_ENTITY_TYPE),
        payload: data
      };

      const state = loaderReducer(TEST_ENTITY_TYPE)(undefined, action);
      const expectedState = {
        loading: false,
        error: false,
        value: data
      };
      expect(state).toEqual(expectedState);
    });
  });
});
