import { LoaderState } from './loader-state';
import { LoaderAction } from './loader.action';

export function loaderReducer<T>(
  reducer: (state: T, action: any) => T,
  loadActionType: string
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
          value: reducer(state ? state.value : undefined, action)
        };
      } else if (entity.error) {
        return {
          ...state,
          loading: false,
          error: true,
          value: reducer(undefined, action)
        };
      } else {
        return {
          ...state,
          value: reducer(action.payload, action),
          loading: false,
          error: false
        };
      }
    }

    return {
      ...state,
      value: reducer(state.value, action)
    };
  };
}
