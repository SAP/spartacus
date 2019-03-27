import { LoaderState } from '../../state';

export const PROCESS_STATE = 'process';

export interface StateWithProcess {
  [PROCESS_STATE]: ProcessState;
}

export interface ProcessState {
  updateUserDetails: LoaderState<void>;
}
