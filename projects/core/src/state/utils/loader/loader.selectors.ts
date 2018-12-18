import { LoaderState } from './loader-state';

export function loaderValueSelector<T>(state: LoaderState<T>): T {
  return state.value;
}

export function loaderLoadingSelector<T>(state: LoaderState<T>): boolean {
  return state.loading;
}

export function loaderErrorSelector<T>(state: LoaderState<T>): boolean {
  return state.error;
}

export function loaderSuccessSelector<T>(state: LoaderState<T>): boolean {
  return state.success;
}
