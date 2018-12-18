import { EntityState } from './entity-state';

export function entitySelector<T>(state: EntityState<T>, id: string): T {
  return state.entities[id] || undefined;
}
