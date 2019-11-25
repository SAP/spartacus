import { CounterState } from './counter-state';

// export function loaderValueSelector<T>(state: LoaderState<T>): T {
//   return state.value;
// }

// export function loaderLoadingSelector<T>(state: LoaderState<T>): boolean {
//   return state.loading;
// }

// export function loaderErrorSelector<T>(state: LoaderState<T>): boolean {
//   return state.error;
// }

// export function loaderSuccessSelector<T>(state: LoaderState<T>): boolean {
//   return state.success;
// }

export function counterCounterSelector<T>(state: CounterState<T>): number {
  return state.counter;
}
