import { ProcessesLoaderState } from './processes-loader-state';
import {
  hasPendingProcessesSelector,
  isStableSelector,
} from './processes-loader.selectors';

describe('Processes loader selectors', () => {
  describe('isStableSelector', () => {
    it('should return true when there are no processes and no loading', () => {
      const TestState: ProcessesLoaderState<string> = {
        processesCount: 0,
        loading: false,
      };
      const value = isStableSelector(TestState);
      expect(value).toBe(true);
    });

    it('should return false when there are pending processes', () => {
      const TestState: ProcessesLoaderState<string> = {
        processesCount: 1,
      };
      const value = isStableSelector(TestState);
      expect(value).toBe(false);
    });

    it('should return false when there are loading', () => {
      const TestState: ProcessesLoaderState<string> = {
        loading: true,
      };
      const value = isStableSelector(TestState);
      expect(value).toBe(false);
    });
  });

  describe('hasPendingProcessesSelector', () => {
    it('should return true when there are pending processes', () => {
      const TestState: ProcessesLoaderState<string> = {
        processesCount: 2,
      };
      const value = hasPendingProcessesSelector(TestState);
      expect(value).toBe(true);
    });

    it('should return false when there are no pending processes', () => {
      const TestState: ProcessesLoaderState<string> = {
        processesCount: 0,
      };
      const value = hasPendingProcessesSelector(TestState);
      expect(value).toBe(false);
    });
  });
});
