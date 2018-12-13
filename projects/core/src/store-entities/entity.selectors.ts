import { LoaderState } from './loader-state';
import { EntityState } from './entity-state';


export function entityStateSelector<T>(state: EntityState<T>, id: string): LoaderState<T> {
  return state.entities[id] || {};
}

export function entityValueSelector<T>(state: EntityState<T>, id: string): T {
  return state.entities[id].value;
}

export function entityLoadingSelector<T>(state: EntityState<T>, id: string): boolean {
  return state.entities[id].loading;
}

export function entityErrorSelector<T>(state: EntityState<T>, id: string): boolean {
  return state.entities[id].error;
}
