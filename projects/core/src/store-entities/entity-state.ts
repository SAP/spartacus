import { LoaderState } from './loader-state';

export interface EntityState<T> {
  entities: {
    [id: string]: LoaderState<T>;
  };
}
