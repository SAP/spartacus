import { initialLoaderState, loaderReducer } from '../loader/loader.reducer';
import { EntityScopedLoaderAction } from '../../../product/store/actions/product.action';
import { LoaderState } from '../loader/loader-state';
import { ScopedLoaderState } from './scoped-loader.state';
import { Action } from '@ngrx/store';

/**
 * Higher order reducer designed to add scope support for loader reducer
 *
 * For backward compatibility, we accommodate scopes alongside current
 * loading/error/success/value flags, thus those names can't be used as scope
 * names.
 *
 * TODO: Improve, issue #5445
 *
 * @param entityType
 * @param reducer
 */
export function scopedLoaderReducer<T>(
  entityType: string,
  reducer?: (state: T, action: Action) => T
): (
  state: ScopedLoaderState<T> | LoaderState<T>,
  action: EntityScopedLoaderAction
) => ScopedLoaderState<T> | LoaderState<T> {
  const loader = loaderReducer<T>(entityType, reducer);

  return (
    state: ScopedLoaderState<T> | LoaderState<T> = initialLoaderState,
    action: EntityScopedLoaderAction
  ): ScopedLoaderState<T> | LoaderState<T> => {
    if (
      action &&
      action.meta &&
      action.meta.entityType === entityType &&
      action.meta.scope
    ) {
      return {
        ...state,
        [action.meta.scope]: loader(state[action.meta.scope], action),
      };
    } else {
      return loader(state, action);
    }
  };
}
