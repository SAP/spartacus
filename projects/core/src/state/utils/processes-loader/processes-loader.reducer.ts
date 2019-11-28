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
    const loaderState = loaderReducer(entityType, reducer)(state, action);
    if (action.meta && action.meta.entityType === entityType) {
      const processesCountDiff = action.meta.processesCountDiff;
      if (processesCountDiff) {
        return {
          ...loaderState,
          processesCount: state.processesCount
            ? state.processesCount + processesCountDiff
            : processesCountDiff,
        };
      } else if (processesCountDiff === null) {
        // reset action
        return {
          ...loaderState,
          ...initialProcessesState,
        };
      }
    }

    return loaderState;
  };
}
