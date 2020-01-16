import { Action } from '@ngrx/store';
import { initialLoaderState } from '../loader';
import { LoaderLoadAction } from '../loader/loader.action';
import {
  ProcessesDecrementAction,
  ProcessesIncrementAction,
  ProcessesLoaderResetAction,
} from './processes-loader.action';
import {
  initialProcessesState,
  processesLoaderReducer,
} from './processes-loader.reducer';

describe('Processes loader reducer', () => {
  const TEST_ENTITY_TYPE = 'test';

  describe('undefined action', () => {
    it('should return the default state', () => {
      const action = {} as Action;
      const state = processesLoaderReducer(TEST_ENTITY_TYPE)(undefined, action);
      expect(state).toEqual({
        ...initialProcessesState,
        ...initialLoaderState,
      });
    });

    it('should return the default state with subReducer', () => {
      const subReducer = (s = 'default', _action: Action) => s;
      const action = {} as Action;
      const state = processesLoaderReducer(TEST_ENTITY_TYPE, subReducer)(
        undefined,
        action
      );
      expect(state).toEqual({
        ...initialProcessesState,
        ...initialLoaderState,
        value: 'default',
      });
    });
  });

  describe('PUSH ACTION', () => {
    it('should increment processesCount', () => {
      const action = new ProcessesIncrementAction(TEST_ENTITY_TYPE);
      const state = processesLoaderReducer(TEST_ENTITY_TYPE)(undefined, action);
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
      const action = new ProcessesIncrementAction(TEST_ENTITY_TYPE);
      const previousState = {
        loading: true,
        error: false,
        success: true,
        processesCount: 1,
        value: 'some_value',
      };
      const state = processesLoaderReducer(TEST_ENTITY_TYPE)(
        previousState,
        action
      );
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
    it('should decrement processesCount', () => {
      const action = new ProcessesDecrementAction(TEST_ENTITY_TYPE);
      const initialState = {
        loading: false,
        error: false,
        success: false,
        processesCount: 3,
        value: undefined,
      };
      const state = processesLoaderReducer(TEST_ENTITY_TYPE)(
        initialState,
        action
      );
      const expectedState = {
        loading: false,
        error: false,
        success: false,
        processesCount: 2,
        value: undefined,
      };
      expect(state).toEqual(expectedState);
    });

    it('should not change loaderState properties', () => {
      const action = new ProcessesDecrementAction(TEST_ENTITY_TYPE);
      const previousState = {
        loading: true,
        error: false,
        success: true,
        processesCount: 2,
        value: 'some_value',
      };
      const state = processesLoaderReducer(TEST_ENTITY_TYPE)(
        previousState,
        action
      );
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
    it('should reset loader state and processes state', () => {
      const action = new ProcessesLoaderResetAction(TEST_ENTITY_TYPE);
      const initialState = {
        loading: false,
        error: false,
        success: true,
        processesCount: 2,
        value: 'sample data',
      };

      const state = processesLoaderReducer(TEST_ENTITY_TYPE)(
        initialState,
        action
      );
      expect(state).toEqual({
        ...initialProcessesState,
        ...initialLoaderState,
      });
    });

    it('should use sub reducer for default state', () => {
      const subReducer = (s = 'default', _action: Action) => s;
      const action = new ProcessesLoaderResetAction(TEST_ENTITY_TYPE);
      const initialState = {
        loading: false,
        error: false,
        success: true,
        processesCount: 2,
        value: 'sample data',
      };

      const state = processesLoaderReducer(TEST_ENTITY_TYPE, subReducer)(
        initialState,
        action
      );

      expect(state).toEqual({
        ...initialProcessesState,
        ...initialLoaderState,
        value: 'default',
      });
    });
  });

  describe('LOAD ACTION', () => {
    it('should not change processes state', () => {
      const action = new LoaderLoadAction(TEST_ENTITY_TYPE);
      const initialState = {
        loading: false,
        error: false,
        success: true,
        processesCount: 2,
        value: 'sample data',
      };

      const state = processesLoaderReducer(TEST_ENTITY_TYPE)(
        initialState,
        action
      );
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
    it('should not influence loader or processes state', () => {
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

      const state = processesLoaderReducer(TEST_ENTITY_TYPE)(
        initialState,
        action
      );
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
