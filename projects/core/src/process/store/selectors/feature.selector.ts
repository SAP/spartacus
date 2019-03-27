import { MemoizedSelector, createFeatureSelector } from '@ngrx/store';

import {
  StateWithProcess,
  ProcessState,
  PROCESS_STATE
} from '../process-state';

export const getProcessState: MemoizedSelector<
  StateWithProcess,
  ProcessState
> = createFeatureSelector<ProcessState>(PROCESS_STATE);
