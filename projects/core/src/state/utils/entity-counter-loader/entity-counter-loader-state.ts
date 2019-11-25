import { CounterState } from '../counter2/counter-state';
import { EntityState } from '../entity/entity-state';
import { LoaderState } from '../loader/loader-state';

export type EntityCounterLoaderState<T> = EntityState<CounterLoaderState<T>>;

export type CounterLoaderState<T> = CounterState<T> & LoaderState<T>;
