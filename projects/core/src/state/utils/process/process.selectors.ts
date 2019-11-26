import { ProcessState } from './process-state';

export function processesCountSelector<T>(state: ProcessState<T>): number {
  return state.processesCount;
}
