import { EntityLoaderState } from './entity-loader-state';
import { LoaderState } from '../loader/loader-state';

export function entityStateSelector<T>(
  state: EntityLoaderState<T>,
  id: string
): LoaderState<T> {
  return state.entities[id] || {};
}

export function entityValueSelector<T>(
  state: EntityLoaderState<T>,
  id: string
): T {
  const entityState = entityStateSelector(state, id);
  return entityState.value;
}

export function entityLoadingSelector<T>(
  state: EntityLoaderState<T>,
  id: string
): boolean {
  const entityState = entityStateSelector(state, id);
  return entityState.loading;
}

export function entityErrorSelector<T>(
  state: EntityLoaderState<T>,
  id: string
): boolean {
  const entityState = entityStateSelector(state, id);
  return entityState.error;
}

export function entitySuccessSelector<T>(
  state: EntityLoaderState<T>,
  id: string
): boolean {
  const entityState = entityStateSelector(state, id);
  return entityState.success;
}
