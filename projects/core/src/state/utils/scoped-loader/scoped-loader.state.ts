import { LoaderState } from '../loader/loader-state';
import { EntityState } from '@spartacus/core';

export interface ScopedLoaderState<T> {
  [scope: string]: LoaderState<T>;
}

export type EntityScopedLoaderState<T> = EntityState<
  ScopedLoaderState<T> | LoaderState<T>
>;
