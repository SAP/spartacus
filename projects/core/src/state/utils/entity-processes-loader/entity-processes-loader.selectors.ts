import { entityStateSelector } from '../entity-loader/entity-loader.selectors';
import {
  hasPendingProcessesSelector,
  isStableSelector,
} from '../processes-loader/processes-loader.selectors';
import { EntityProcessesLoaderState } from './entity-processes-loader-state';

export function entityHasPendingProcessesSelector<T>(
  state: EntityProcessesLoaderState<T>,
  id: string
): boolean {
  const entityState = entityStateSelector(state, id);
  return hasPendingProcessesSelector(entityState);
}

export function entityIsStableSelector<T>(
  state: EntityProcessesLoaderState<T>,
  id: string
): boolean {
  const entityState = entityStateSelector(state, id);
  return isStableSelector(entityState);
}
