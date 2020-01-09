import { LoaderState } from '../loader/loader-state';

export interface ProcessesLoaderState<T> extends LoaderState<T> {
  processesCount?: number;
}
