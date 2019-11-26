import { Action } from '@ngrx/store';
import { initialLoaderState, loaderReducer } from '../loader/loader.reducer';
import { ProcessState } from './process-state';
import { ProcessAction } from './process.action';

export const initialProcessState: ProcessState<any> = {
  processesCount: 0,
};

/**
 * Higher order reducer that adds processes count
 */
export function processReducer<T>(
  processActionType: string,
  reducer?: (state: T, action: Action) => T
): (state: ProcessState<T>, action: ProcessAction) => ProcessState<T> {
  return (
    state: ProcessState<T> = {
      ...initialProcessState,
      ...initialLoaderState,
    },
    action: ProcessAction
  ): ProcessState<T> => {
    if (action.meta && action.meta.entityType === processActionType) {
      const processesCount = action.meta.processesCount;
      if (processesCount) {
        return {
          ...state,
          ...loaderReducer(processActionType, reducer)(state, action),
          processesCount: state.processesCount
            ? state.processesCount + processesCount
            : processesCount,
        };
      } else if (
        action.meta.loader &&
        Object.keys(action.meta.loader).length === 0
      ) {
        // ? should I check for all 3 flags being false to be more in sync with loader reducer logic
        // reset loader action should also mean reset action for process reducer
        return {
          ...initialProcessState,
          ...loaderReducer(processActionType, reducer)(state, action),
        };
      }
    }

    return loaderReducer(processActionType, reducer)(state, action);
  };
}
