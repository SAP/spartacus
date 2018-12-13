import { LoaderState } from './loader-state';
import { LoaderAction } from './loader.action';

export function loaderReducer<T>(
  loadActionType: string,
  reducer?: (state: T, action: any) => T
) {
  return (
    state: LoaderState<T> = { loading: false, error: false, value: undefined },
    action: LoaderAction
  ): LoaderState<T> => {
    if (
      action.meta &&
      action.meta.entity &&
      action.meta.entity.type === loadActionType
    ) {
      const entity = action.meta.entity;

      if (entity.load) {
        return {
          ...state,
          loading: true,
          error: false,
          value: reducer ? reducer(state.value, action) : state.value
        };
      } else if (entity.error) {
        return {
          ...state,
          loading: false,
          error: true,
          value: reducer ? reducer(undefined, action) : undefined
        };
      } else {
        return {
          ...state,
          value: reducer ? reducer(state.value, action) : action.payload,
          loading: false,
          error: false
        };
      }
    }

    return {
      ...state,
      value: reducer ? reducer(state.value, action) : state.value
    };
  };
}
