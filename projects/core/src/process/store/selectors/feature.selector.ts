import { MemoizedSelector, createFeatureSelector } from '@ngrx/store';

import {
  StateWithProcess,
  ProcessState,
  PROCESS_FEATURE
} from '../process-state';

export function getProcessState<T>(): MemoizedSelector<
  StateWithProcess<T>,
  ProcessState<T>
> {
  return createFeatureSelector<ProcessState<T>>(PROCESS_FEATURE);
}
