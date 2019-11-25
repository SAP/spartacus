import { CounterAction } from '../counter/counter.action';
import { counterReducer } from '../counter/counter.reducer';
import { entityReducer } from '../entity/entity.reducer';
import { EntityCounterState } from './entity-counter-state';
import { EntityCounterAction } from './entity-counter.action';

/**
 * Higher order reducer that wraps LoaderReducer and EntityReducer enhancing
 * single state reducer to support multiple entities with generic loading flags
 */
export function entityCounterReducer<T>(
  entityType: string,
  reducer?: (state: T, action: CounterAction) => T
): (
  state: EntityCounterState<T>,
  action: EntityCounterAction
) => EntityCounterState<T> {
  return entityReducer(entityType, counterReducer(entityType, reducer));
}
