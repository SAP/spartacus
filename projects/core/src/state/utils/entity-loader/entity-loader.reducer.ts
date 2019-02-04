import { entityReducer } from '../entity/entity.reducer';
import { loaderReducer } from '../loader/loader.reducer';
import { LoaderAction } from '../loader/loader.action';
import { EntityLoaderState } from './entity-loader-state';
import { EntityLoaderAction } from './entity-loader.action';

/**
 * Higher order reducer that wraps LoaderReducer and EntityReducer enhancing
 * single state reducer to support multiple entities with generic loading flags
 */
export function entityLoaderReducer<T>(
  entityType: string,
  reducer?: (state: T, action: LoaderAction) => T
): (
  state: EntityLoaderState<T>,
  action: EntityLoaderAction
) => EntityLoaderState<T> {
  return entityReducer(entityType, loaderReducer(entityType, reducer));
}
