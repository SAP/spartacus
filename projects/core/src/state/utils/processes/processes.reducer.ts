import { Action } from '@ngrx/store';
import { initialLoaderState, loaderReducer } from '../loader/loader.reducer';
import { ProcessesState } from './processes-state';
import { ProcessesAction } from './processes.action';

export const initialProcessesState: ProcessesState<any> = {
  processesCount: 0,
};

/**
 * Higher order reducer that adds processes count
 */
export function processesReducer<T>(
  entityType: string,
  reducer?: (state: T, action: Action) => T
): (state: ProcessesState<T>, action: ProcessesAction) => ProcessesState<T> {
  return (
    state: ProcessesState<T> = {
      ...initialProcessesState,
      ...initialLoaderState,
    },
    action: ProcessesAction
  ): ProcessesState<T> => {
    if (action.meta && action.meta.entityType === entityType) {
      const processesCountDiff = action.meta.processesCount;
      if (processesCountDiff) {
        return {
          ...state,
          ...loaderReducer(entityType, reducer)(state, action),
          processesCount: state.processesCount
            ? state.processesCount + processesCountDiff
            : processesCountDiff,
        };
      } else if (
        action.meta.loader &&
        !action.meta.loader.error &&
        !action.meta.loader.success &&
        !action.meta.loader.load
      ) {
        // reset loader action should also be a reset action for process reducer
        return {
          ...initialProcessesState,
          ...loaderReducer(entityType, reducer)(state, action),
        };
      }
    }

    return loaderReducer(entityType, reducer)(state, action);
  };
}
