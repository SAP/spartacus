import { CounterState } from '../counter/counter-state';
import { initialCounterState } from '../counter/counter.reducer';
import { EntityCounterState } from './entity-counter-state';

export function entityStateSelector<T>(
  state: EntityCounterState<T>,
  id: string
): CounterState<T> {
  return state.entities[id] || initialCounterState;
}

export function entityValueSelector<T>(
  state: EntityCounterState<T>,
  id: string
): T {
  const entityState = entityStateSelector(state, id);
  return entityState.value;
}

export function entityLoadingSelector<T>(
  state: EntityCounterState<T>,
  id: string
): boolean {
  const entityState = entityStateSelector(state, id);
  return entityState.loading;
}

export function entityErrorSelector<T>(
  state: EntityCounterState<T>,
  id: string
): boolean {
  const entityState = entityStateSelector(state, id);
  return entityState.error;
}

export function entitySuccessSelector<T>(
  state: EntityCounterState<T>,
  id: string
): boolean {
  const entityState = entityStateSelector(state, id);
  return entityState.success;
}

export function entityCounterSelector<T>(
  state: EntityCounterState<T>,
  id: string
): number {
  const entityState = entityStateSelector(state, id);
  return entityState.counter;
}
