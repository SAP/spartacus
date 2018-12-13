export interface LoaderState<T> {
  loading: boolean;
  error: boolean;
  value: T;
}
