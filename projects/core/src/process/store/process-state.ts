import { LoaderState } from '../../state/utils/loader/loader-state';

export const PROCESS_STATE = 'process';

export interface StateWithProcess {
  [PROCESS_STATE]: ProcessState;
}

export interface ProcessState {
  updateUserDetails: LoaderState<void>;
}
