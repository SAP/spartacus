import { LoaderState } from '../loader/loader-state';

export interface ProcessState<T> extends LoaderState<T> {
  processesCount?: number;
}
