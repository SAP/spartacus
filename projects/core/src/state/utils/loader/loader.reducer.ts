import { LoaderState } from './loader-state';
import { LoaderAction } from './loader.action';
import { Action } from '@ngrx/store';

export const initialLoaderState: LoaderState<any> = {
  loading: false,
  error: false,
  success: false,
  value: undefined
};

/**
 * Higher order reducer that adds generic loading flag to chunk of the state
 *
 * Utilizes "loader" meta field of actions to set specific flags for specific
 * action (LOAD, SUCCESS, FAIL)
 */
export function loaderReducer<T>(
  loadActionType: string,
  reducer?: (state: T, action: Action) => T
) {
  return (
    state: LoaderState<T> = initialLoaderState,
    action: LoaderAction
  ): LoaderState<T> => {
    if (
      action.meta &&
      action.meta.loader &&
      action.meta.loader.type === loadActionType
    ) {
      const entity = action.meta.loader;

      if (entity.load) {
        return {
          ...state,
          loading: true,
          value: reducer ? reducer(state.value, action) : state.value
        };
      } else if (entity.error) {
        return {
          ...state,
          loading: false,
          error: true,
          success: false,
          value: reducer ? reducer(state.value, action) : undefined
        };
      } else {
        return {
          ...state,
          value: reducer ? reducer(state.value, action) : action.payload,
          loading: false,
          error: false,
          success: true
        };
      }
    }

    if (reducer) {
      const newValue = reducer(state.value, action);
      if (newValue !== state.value) {
        return { ...state, value: newValue };
      }
    }
    return state;
  };
}
