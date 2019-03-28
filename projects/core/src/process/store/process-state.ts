import { EntityLoaderState } from '../../state/utils/entity-loader/entity-loader-state';

export const PROCESS_FEATURE = 'process';

export interface StateWithProcess<T> {
  [PROCESS_FEATURE]: EntityLoaderState<ProcessState<T>>;
}

export interface ProcessState<T> {
  [key: string]: T;
}
