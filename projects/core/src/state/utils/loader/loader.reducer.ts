import { Action } from '@ngrx/store';

import * as fromState from '../../../cms/store/cms-state';

import { LoaderState } from './loader-state';
import { LoaderAction } from './loader.action';

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
 * action (LOAD, SUCCESS, FAIL, RESET)
 */
export function loaderReducer<T>(
  loadActionType: string,
  reducer?: (state: T, action: Action) => T
): (state: LoaderState<T>, action: LoaderAction) => LoaderState<T> {
  return (
    state: LoaderState<T> = initialLoaderState,
    action: LoaderAction
  ): LoaderState<T> => {
    if (
      action.meta &&
      action.meta.loader &&
      action.meta.entityType === loadActionType
    ) {
      const actions: string[] = [
        '[Cms] Load PageData',
        fromState.PAGE_DATA_ENTITY,
        fromState.CONTENT_PAGES_ENTITY,
        fromState.PRODUCT_PAGES_ENTITY,
        fromState.CATEGORY_PAGES_ENTITY,
        fromState.CATALOG_PAGES_ENTITY
      ];
      if (
        actions.indexOf(action.meta.entityType) !== -1 ||
        actions.indexOf(action.type) !== -1
      ) {
        console.log(`entity reducer action type: `, action.type);
        console.log(
          `entity reducer meta entity type: `,
          action.meta.entityType
        );
      }

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
      } else if (entity.success) {
        return {
          ...state,
          value: reducer ? reducer(state.value, action) : action.payload,
          loading: false,
          error: false,
          success: true
        };
      } else {
        // reset state action
        return {
          ...initialLoaderState,
          value: reducer
            ? reducer(initialLoaderState.value, action)
            : initialLoaderState.value
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
