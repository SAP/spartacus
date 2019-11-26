import { Action } from '@ngrx/store';
import { initialLoaderState } from '../loader';
import { LoaderLoadAction } from '../loader/loader.action';
import {
  ProcessPopAction,
  ProcessPushAction,
  ProcessResetAction,
} from './process.action';
import { initialProcessState, processReducer } from './process.reducer';

describe('Process reducer', () => {
  const TEST_ENTITY_TYPE = 'test';

  describe('undefined action', () => {
    it('should return the default state', () => {
      const action = {} as Action;
      const state = processReducer(TEST_ENTITY_TYPE)(undefined, action);
      expect(state).toEqual({
        ...initialProcessState,
        ...initialLoaderState,
      });
    });

    it('should return the default state with subReducer', () => {
      const subReducer = (s = 'default', _action: Action) => s;
      const action = {} as Action;
      const state = processReducer(TEST_ENTITY_TYPE, subReducer)(
        undefined,
        action
      );
      expect(state).toEqual({
        ...initialProcessState,
        ...initialLoaderState,
        value: 'default',
      });
    });
  });

  describe('PUSH ACTION', () => {
    it('should increment processCount', () => {
      const action = new ProcessPushAction(TEST_ENTITY_TYPE);
      const state = processReducer(TEST_ENTITY_TYPE)(undefined, action);
      const expectedState = {
        loading: false,
        error: false,
        success: false,
        processesCount: 1,
        value: undefined,
      };
      expect(state).toEqual(expectedState);
    });

    it('should not change loaderState properties', () => {
      const action = new ProcessPushAction(TEST_ENTITY_TYPE);
      const previousState = {
        loading: true,
        error: false,
        success: true,
        processesCount: 1,
        value: 'some_value',
      };
      const state = processReducer(TEST_ENTITY_TYPE)(previousState, action);
      const expectedState = {
        loading: true,
        error: false,
        success: true,
        processesCount: 2,
        value: 'some_value',
      };
      expect(state).toEqual(expectedState);
    });
  });

  describe('POP ACTION', () => {
    it('should decrement processCount', () => {
      const action = new ProcessPopAction(TEST_ENTITY_TYPE);
      const state = processReducer(TEST_ENTITY_TYPE)(undefined, action);
      const expectedState = {
        loading: false,
        error: false,
        success: false,
        processesCount: -1,
        value: undefined,
      };
      expect(state).toEqual(expectedState);
    });

    it('should not change loaderState properties', () => {
      const action = new ProcessPopAction(TEST_ENTITY_TYPE);
      const previousState = {
        loading: true,
        error: false,
        success: true,
        processesCount: 2,
        value: 'some_value',
      };
      const state = processReducer(TEST_ENTITY_TYPE)(previousState, action);
      const expectedState = {
        loading: true,
        error: false,
        success: true,
        processesCount: 1,
        value: 'some_value',
      };
      expect(state).toEqual(expectedState);
    });
  });

  describe('RESET ACTION', () => {
    it('should reset loader state and process state', () => {
      const action = new ProcessResetAction(TEST_ENTITY_TYPE);
      const initialState = {
        loading: false,
        error: false,
        success: true,
        processesCount: 2,
        value: 'sample data',
      };

      const state = processReducer(TEST_ENTITY_TYPE)(initialState, action);
      expect(state).toEqual({
        ...initialProcessState,
        ...initialLoaderState,
      });
    });

    it('should use sub reducer for default state', () => {
      const subReducer = (s = 'default', _action: Action) => s;
      const action = new ProcessResetAction(TEST_ENTITY_TYPE);
      const initialState = {
        loading: false,
        error: false,
        success: true,
        processesCount: 2,
        value: 'sample data',
      };

      const state = processReducer(TEST_ENTITY_TYPE, subReducer)(
        initialState,
        action
      );

      expect(state).toEqual({
        ...initialProcessState,
        ...initialLoaderState,
        value: 'default',
      });
    });
  });

  describe('LOAD ACTION', () => {
    it('should not change process state', () => {
      const action = new LoaderLoadAction(TEST_ENTITY_TYPE);
      const initialState = {
        loading: false,
        error: false,
        success: true,
        processesCount: 2,
        value: 'sample data',
      };

      const state = processReducer(TEST_ENTITY_TYPE)(initialState, action);
      const expectedState = {
        loading: true,
        error: false,
        success: true,
        processesCount: 2,
        value: 'sample data',
      };
      expect(state).toEqual(expectedState);
    });
  });

  describe('NON META ACTION', () => {
    it('should not influence loader or process state', () => {
      const action = {
        type: 'some-type',
        entityType: TEST_ENTITY_TYPE,
      } as Action;
      const initialState = {
        loading: false,
        error: false,
        success: true,
        processesCount: 2,
        value: 'sample data',
      };

      const state = processReducer(TEST_ENTITY_TYPE)(initialState, action);
      const expectedState = {
        loading: false,
        error: false,
        success: true,
        processesCount: 2,
        value: 'sample data',
      };
      expect(state).toEqual(expectedState);
    });
  });
});
