import { CounterState } from './counter-state';

export function counterCounterSelector<T>(state: CounterState<T>): number {
  return state.counter;
}
