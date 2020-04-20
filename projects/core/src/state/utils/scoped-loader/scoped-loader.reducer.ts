import { loaderReducer } from '../loader/loader.reducer';
import { EntityScopedLoaderAction } from '../../../product/store/actions/product.action';
import { ScopedLoaderState } from './scoped-loader.state';
import { Action } from '@ngrx/store';

export const initialScopedLoaderState: ScopedLoaderState<any> = {};

/**
 * Higher order reducer designed to add scope support for loader reducer
 *
 * @param entityType
 * @param reducer
 */
export function scopedLoaderReducer<T>(
  entityType: string,
  reducer?: (state: T, action: Action) => T
): (
  state: ScopedLoaderState<T>,
  action: EntityScopedLoaderAction
) => ScopedLoaderState<T> {
  const loader = loaderReducer<T>(entityType, reducer);

  return (
    state: ScopedLoaderState<T> = initialScopedLoaderState,
    action: EntityScopedLoaderAction
  ): ScopedLoaderState<T> => {
    if (action && action.meta && action.meta.entityType === entityType) {
      return {
        ...state,
        [action.meta.scope ?? '']: loader(state[action.meta.scope], action),
      };
    }
    return state;
  };
}
