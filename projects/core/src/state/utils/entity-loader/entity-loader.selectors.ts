import { LoaderState } from '../loader/loader-state';
import { initialLoaderState } from '../loader/loader.reducer';
import { EntityLoaderState } from './entity-loader-state';
import {
  loaderValueSelector,
  loaderLoadingSelector,
  loaderErrorSelector,
  loaderSuccessSelector,
} from '../loader';

export function entityLoaderStateSelector<T>(
  state: EntityLoaderState<T>,
  id: string
): LoaderState<T> {
  return state.entities[id] || initialLoaderState;
}

export function entityValueSelector<T>(
  state: EntityLoaderState<T>,
  id: string
): T {
  const entityState = entityLoaderStateSelector(state, id);
  return loaderValueSelector(entityState);
}

export function entityLoadingSelector<T>(
  state: EntityLoaderState<T>,
  id: string
): boolean {
  const entityState = entityLoaderStateSelector(state, id);
  return loaderLoadingSelector(entityState);
}

export function entityErrorSelector<T>(
  state: EntityLoaderState<T>,
  id: string
): boolean {
  const entityState = entityLoaderStateSelector(state, id);
  return loaderErrorSelector(entityState);
}

export function entitySuccessSelector<T>(
  state: EntityLoaderState<T>,
  id: string
): boolean {
  const entityState = entityLoaderStateSelector(state, id);
  return loaderSuccessSelector(entityState);
}
