import { ProcessesState } from './processes-state';

export function processesCountSelector<T>(state: ProcessesState<T>): number {
  return state.processesCount;
}
