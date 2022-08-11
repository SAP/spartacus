import { entityLoaderStateSelector } from '../entity-loader/entity-loader.selectors';
import { initialLoaderState } from '../loader/loader.reducer';
import {
  initialProcessesState,
  ProcessesLoaderState,
} from '../processes-loader';
import {
  hasPendingProcessesSelector,
  isStableSelector,
} from '../processes-loader/processes-loader.selectors';
import { EntityProcessesLoaderState } from './entity-processes-loader-state';

const initialProcessesLoaderState = {
  ...initialLoaderState,
  ...initialProcessesState,
};

export function entityHasPendingProcessesSelector<T>(
  state: EntityProcessesLoaderState<T>,
  id: string
): boolean {
  const entityState = entityLoaderStateSelector(state, id);
  return hasPendingProcessesSelector(entityState);
}

export function entityIsStableSelector<T>(
  state: EntityProcessesLoaderState<T>,
  id: string
): boolean {
  const entityState = entityLoaderStateSelector(state, id);
  return isStableSelector(entityState);
}

export function entityProcessesLoaderStateSelector<T>(
  state: EntityProcessesLoaderState<T>,
  id: string
): ProcessesLoaderState<T> {
  return state.entities[id] || initialProcessesLoaderState;
}
