import { EntityState } from '../entity/entity-state';
import { LoaderState } from '../loader/loader-state';

export type EntityLoaderState<T> = EntityState<LoaderState<T>>;
