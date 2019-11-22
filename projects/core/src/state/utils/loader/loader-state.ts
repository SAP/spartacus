export interface LoaderState<T> {
  loading?: boolean;
  error?: boolean;
  success?: boolean;
  counter?: number;
  value?: T;
}
