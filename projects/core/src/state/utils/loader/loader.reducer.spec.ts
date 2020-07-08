import { Action } from '@ngrx/store';
import {
  LoaderFailAction,
  LoaderLoadAction,
  LoaderResetAction,
  LoaderSuccessAction,
} from './loader.action';
import { initialLoaderState, loaderReducer } from './loader.reducer';

describe('Loader reducer', () => {
  const TEST_ENTITY_TYPE = 'test';

  describe('undefined action', () => {
    it('should return the default state', () => {
      const action = {} as Action;
      const state = loaderReducer(TEST_ENTITY_TYPE)(undefined, action);
      expect(state).toEqual(initialLoaderState);
    });

    it('should return the default state with subReducer', () => {
      const subReducer = (s = 'default', _action: Action) => s;
      const action = {} as Action;
      const state = loaderReducer(TEST_ENTITY_TYPE, subReducer)(
        undefined,
        action
      );
      expect(state).toEqual({ ...initialLoaderState, value: 'default' });
    });
  });

  describe('LOAD ACTION', () => {
    it('should set load state', () => {
      const action = new LoaderLoadAction(TEST_ENTITY_TYPE);
      const state = loaderReducer(TEST_ENTITY_TYPE)(undefined, action);
      const expectedState = {
        loading: true,
        error: false,
        success: false,
        value: undefined,
      };
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
        success: false,
        value: undefined,
      };
      expect(state).toEqual(expectedState);
    });
  });

  describe('SUCCESS ACTION', () => {
    it('should set load state', () => {
      const data = 'test Data';
      const action = {
        ...new LoaderSuccessAction(TEST_ENTITY_TYPE),
        payload: data,
      };

      const state = loaderReducer(TEST_ENTITY_TYPE)(undefined, action);
      const expectedState = {
        loading: false,
        error: false,
        success: true,
        value: data,
      };
      expect(state).toEqual(expectedState);
    });
  });

  describe('RESET ACTION', () => {
    it('should reset load state', () => {
      const action = new LoaderResetAction(TEST_ENTITY_TYPE);
      const initialState = {
        loading: false,
        error: false,
        success: true,
        value: 'sample data',
      };

      const state = loaderReducer(TEST_ENTITY_TYPE)(initialState, action);
      expect(state).toEqual(initialLoaderState);
    });

    it('should use sub reducer for default state', () => {
      const subReducer = (s = 'default', _action: Action) => s;
      const action = new LoaderResetAction(TEST_ENTITY_TYPE);
      const initialState = {
        loading: false,
        error: false,
        success: true,
        value: 'sample data',
      };

      const state = loaderReducer(TEST_ENTITY_TYPE, subReducer)(
        initialState,
        action
      );

      expect(state).toEqual({ ...initialLoaderState, value: 'default' });
    });
  });
});
