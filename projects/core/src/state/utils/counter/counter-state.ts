import { LoaderState } from '../loader/loader-state';

export interface CounterState<T> extends LoaderState<T> {
  counter?: number;
}
