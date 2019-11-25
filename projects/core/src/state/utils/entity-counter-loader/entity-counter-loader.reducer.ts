import { CounterLoaderAction } from '../counter2/counter.action';
import { counterReducer } from '../counter2/counter.reducer';
import { entityReducer } from '../entity/entity.reducer';
// import { LoaderAction } from '../loader/loader.action';
import { loaderReducer } from '../loader/loader.reducer';
import { EntityCounterLoaderState } from './entity-counter-loader-state';
import { EntityCounterLoaderAction } from './entity-counter-loader.action';

/**
 * Higher order reducer that wraps LoaderReducer and EntityReducer enhancing
 * single state reducer to support multiple entities with generic loading flags
 */
export function entityLoaderReducer<T>(
  entityType: string,
  reducer?: (state: T, action: CounterLoaderAction) => T
): (
  state: EntityCounterLoaderState<T>,
  action: EntityCounterLoaderAction
) => EntityCounterLoaderState<T> {
  return entityReducer(
    entityType,
    counterReducer(entityType, loaderReducer(entityType, reducer))
  );
}
