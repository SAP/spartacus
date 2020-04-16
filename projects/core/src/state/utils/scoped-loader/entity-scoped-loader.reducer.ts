import {
  EntityScopedLoaderState,
  ScopedLoaderState,
} from './scoped-loader.state';
import { scopedLoaderReducer } from './scoped-loader.reducer';

import { entityReducer } from '../entity/entity.reducer';
import { LoaderAction } from '../loader/loader.action';
import { EntityScopedLoaderActions } from './entity-scoped-loader.actions';

/**
 * Higher order reducer that wraps scopedLoaderReducer and EntityReducer enhancing
 * single state reducer to support multiple entities with generic loading flags and scopes
 */
export function entityScopedLoaderReducer<T>(
  entityType: string,
  reducer?: (state: T, action: LoaderAction) => T
): (
  state: EntityScopedLoaderState<T>,
  action: EntityScopedLoaderActions.EntityScopedLoaderAction
) => EntityScopedLoaderState<T> {
  return entityReducer<ScopedLoaderState<T>>(
    entityType,
    scopedLoaderReducer<T>(entityType, reducer)
  );
}
