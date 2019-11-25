import { CounterState } from '../counter2/counter-state';
import { LoaderState } from '../loader/loader-state';
import { initialLoaderState } from '../loader/loader.reducer';
import { EntityCounterLoaderState } from './entity-counter-loader-state';

export function entityStateSelector<T>(
  state: EntityCounterLoaderState<T>,
  id: string
): CounterState<LoaderState<T>> {
  return state.entities[id] || initialLoaderState;
}

export function entityValueSelector<T>(
  state: EntityCounterLoaderState<T>,
  id: string
): T {
  const entityState = entityStateSelector(state, id);
  return entityState.value;
}

export function entityLoadingSelector<T>(
  state: EntityCounterLoaderState<T>,
  id: string
): boolean {
  const entityState = entityStateSelector(state, id);
  return entityState.loading;
}

export function entityErrorSelector<T>(
  state: EntityCounterLoaderState<T>,
  id: string
): boolean {
  const entityState = entityStateSelector(state, id);
  return entityState.error;
}

export function entitySuccessSelector<T>(
  state: EntityCounterLoaderState<T>,
  id: string
): boolean {
  const entityState = entityStateSelector(state, id);
  return entityState.success;
}
