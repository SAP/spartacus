import { LoaderState } from '../../state/utils/loader/loader-state';

export const PROCESS_FEATURE = 'process';

export interface StateWithProcess {
  [PROCESS_FEATURE]: ProcessState;
}

export interface ProcessState {
  updateUserDetails: LoaderState<void>;
}
