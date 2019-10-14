import { initialLoaderState, loaderReducer } from '../loader/loader.reducer';
import { EntityScopedLoaderAction } from '../../../product/store/actions/product.action';
import { LoaderState } from '../loader/loader-state';
import { ScopedLoaderState } from './scoped-loader.state';

export function scopedLoaderReducer<T>(entityType, reducer?) {
  const loader = loaderReducer<T>(entityType, reducer);

  return (
    state: ScopedLoaderState<T> | LoaderState<T> = initialLoaderState,
    action: EntityScopedLoaderAction
  ): ScopedLoaderState<T> | LoaderState<T> => {
    if (
      action &&
      action.meta &&
      action.meta.scope &&
      action.meta.entityId === entityType
    ) {
      return {
        ...state,
        [action.meta.scope]: loader(state[action.meta.scope], action),
      };
    } else {
      return { ...state, ...loader(state, action) };
    }
  };
}
