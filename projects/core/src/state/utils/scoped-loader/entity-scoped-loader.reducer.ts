import { EntityLoaderState } from '../entity-loader/entity-loader-state';
import { EntityLoaderAction } from '../entity-loader/entity-loader.action';
import { entityReducer } from '../entity/entity.reducer';
import { LoaderState } from '../loader/loader-state';
import { LoaderAction } from '../loader/loader.action';
import { scopedLoaderReducer } from './scoped-loader.reducer';
import { ScopedLoaderState } from './scoped-loader.state';

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
