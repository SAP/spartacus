import { EntityProcessesLoaderState } from './entity-processes-loader-state';
import {
  entityHasPendingProcessesSelector,
  entityIsStableSelector,
  entityProcessesLoaderStateSelector,
} from './entity-processes-loader.selectors';

describe('EntityProcessesLoader selectors', () => {
  const testId = 'testId';

  describe('entityIsStableSelector', () => {
    it('should return true when there are no processes and no loading', () => {
      const TestState: EntityProcessesLoaderState<string> = {
        entities: {
          [testId]: {
            processesCount: 0,
            loading: false,
          },
        },
      };
      const value = entityIsStableSelector(TestState, testId);
      expect(value).toBe(true);
    });

    it('should return false when there are pending processes', () => {
      const TestState: EntityProcessesLoaderState<string> = {
        entities: {
          [testId]: {
            processesCount: 1,
          },
        },
      };
      const value = entityIsStableSelector(TestState, testId);
      expect(value).toBe(false);
    });

    it('should return false when there are loading', () => {
      const TestState: EntityProcessesLoaderState<string> = {
        entities: {
          [testId]: {
            loading: true,
          },
        },
      };
      const value = entityIsStableSelector(TestState, testId);
      expect(value).toBe(false);
    });
  });

  describe('entityHasPendingProcessesSelector', () => {
    it('should return true when there are pending processes', () => {
      const TestState: EntityProcessesLoaderState<string> = {
        entities: {
          [testId]: {
            processesCount: 2,
          },
        },
      };
      const value = entityHasPendingProcessesSelector(TestState, testId);
      expect(value).toBe(true);
    });

    it('should return false when there are no pending processes', () => {
      const TestState: EntityProcessesLoaderState<string> = {
        entities: {
          [testId]: {
            processesCount: 0,
          },
        },
      };
      const value = entityHasPendingProcessesSelector(TestState, testId);
      expect(value).toBe(false);
    });
  });

  describe('entityProcessesLoaderStateSelector', () => {
    it('should return entity when it exists', () => {
      const TestState: EntityProcessesLoaderState<string> = {
        entities: {
          [testId]: {
            processesCount: 0,
            loading: false,
            error: false,
            value: 'test-value',
            success: true,
          },
        },
      };
      const value = entityProcessesLoaderStateSelector(TestState, testId);
      expect(value).toBe(TestState.entities[testId]);
    });

    it('should return initialProcessesState with initialLoaderState', () => {
      const TestState: EntityProcessesLoaderState<string> = {
        entities: {},
      };
      const value = entityProcessesLoaderStateSelector(TestState, testId);
      expect(value).toEqual({
        loading: false,
        error: false,
        success: false,
        value: undefined,
        processesCount: 0,
      });
    });
  });
});
