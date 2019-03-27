import { MemoizedSelector, createFeatureSelector } from '@ngrx/store';

import {
  StateWithProcess,
  ProcessState,
  PROCESS_FEATURE
} from '../process-state';

export const getProcessState: MemoizedSelector<
  StateWithProcess,
  ProcessState
> = createFeatureSelector<ProcessState>(PROCESS_FEATURE);
