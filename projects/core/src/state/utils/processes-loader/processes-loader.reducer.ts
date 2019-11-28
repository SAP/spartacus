import { Action } from '@ngrx/store';
import { initialLoaderState, loaderReducer } from '../loader/loader.reducer';
import { ProcessesLoaderState } from './processes-loader-state';
import { ProcessesLoaderAction } from './processes-loader.action';

export const initialProcessesState: ProcessesLoaderState<any> = {
  processesCount: 0,
};

/**
 * Higher order reducer that adds processes count
 */
export function processesLoaderReducer<T>(
  entityType: string,
  reducer?: (state: T, action: Action) => T
): (
  state: ProcessesLoaderState<T>,
  action: ProcessesLoaderAction
) => ProcessesLoaderState<T> {
  return (
    state: ProcessesLoaderState<T> = {
      ...initialProcessesState,
      ...initialLoaderState,
    },
    action: ProcessesLoaderAction
  ): ProcessesLoaderState<T> => {
    if (action.meta && action.meta.entityType === entityType) {
      const processesCountDiff = action.meta.processesCountDiff;
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
        Object.keys(action.meta.loader).length === 0
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
