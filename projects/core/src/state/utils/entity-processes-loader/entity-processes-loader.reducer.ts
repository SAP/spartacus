import { entityReducer } from '../entity/entity.reducer';
import { processesLoaderReducer } from '../processes-loader';
import { ProcessesLoaderAction } from '../processes-loader/processes-loader.action';
import { EntityProcessesLoaderState } from './entity-processes-loader-state';
import { EntityProcessesLoaderAction } from './entity-processes-loader.action';

/**
 * Higher order reducer that wraps ProcessesLoaderReducer and EntityReducer enhancing
 * single state reducer to support multiple entities with generic processesCount flag
 */
export function entityProcessesLoaderReducer<T>(
  entityType: string,
  reducer?: (state: T, action: ProcessesLoaderAction) => T
): (
  state: EntityProcessesLoaderState<T>,
  action: EntityProcessesLoaderAction
) => EntityProcessesLoaderState<T> {
  return entityReducer(entityType, processesLoaderReducer(entityType, reducer));
}
