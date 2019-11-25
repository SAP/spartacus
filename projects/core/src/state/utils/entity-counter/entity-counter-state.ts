import { CounterState } from '../counter/counter-state';
import { EntityState } from '../entity/entity-state';

export type EntityCounterState<T> = EntityState<CounterState<T>>;
