import { ScopedLoaderState } from './scoped-loader.state';
import { scopedLoaderReducer } from './scoped-loader.reducer';

import { entityReducer } from '../entity/entity.reducer';
import { LoaderAction } from '../loader/loader.action';
import { EntityLoaderState } from '../entity-loader/entity-loader-state';
import { EntityLoaderAction } from '../entity-loader/entity-loader.action';
import { LoaderState } from '../loader/loader-state';

/**
 * Higher order reducer that wraps scopedLoaderReducer and EntityReducer enhancing
 * single state reducer to support multiple entities with generic loading flags and scopes
 */
export function entityScopedLoaderReducer<T>(
  entityType: string,
  reducer?: (state: T, action: LoaderAction) => T
): (
  state: EntityLoaderState<T>,
  action: EntityLoaderAction
) => EntityLoaderState<T> {
  return entityReducer<ScopedLoaderState<T> | LoaderState<T>>(
    entityType,
    scopedLoaderReducer<T>(entityType, reducer)
  );
}
