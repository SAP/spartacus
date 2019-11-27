import { LoaderState } from '../loader/loader-state';

export interface ProcessesState<T> extends LoaderState<T> {
  processesCount?: number;
}
