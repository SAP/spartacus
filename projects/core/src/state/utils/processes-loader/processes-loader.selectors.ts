import { ProcessesLoaderState } from './processes-loader-state';

export function isStableSelector<T>(state: ProcessesLoaderState<T>): boolean {
  return !state.processesCount && !state.loading;
}

export function hasPendingProcessesSelector<T>(
  state: ProcessesLoaderState<T>
): boolean {
  return state.processesCount > 0;
}
