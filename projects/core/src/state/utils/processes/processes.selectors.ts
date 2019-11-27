import { ProcessesState } from './processes-state';

export function isStableSelector<T>(state: ProcessesState<T>): boolean {
  return state.processesCount === 0 && !state.loading;
}

export function hasPendingProcessesSelector<T>(
  state: ProcessesState<T>
): boolean {
  return state.processesCount > 0;
}
