import { BehaviorSubject, Observable } from 'rxjs';

/**
 * CxEvent model allows for a generic base model for
 * all event types. We can use this base type to add
 * meta info to the events going forward.
 */
export class Event {}
export class StateEvent<T> extends Event {
  state: T;
}

/**
 * The cx event source holds an array of sources.
 * There are no more properties in this object for now
 * but that could change over time.
 */
export interface EventSource<T> {
  sources: BehaviorSubject<Observable<T>[]>;
}
