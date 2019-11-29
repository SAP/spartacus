import { BehaviorSubject, Observable } from 'rxjs';

/**
 * CxEvent model allows for a generic base model for
 * all event types. We can use this base type to add
 * meta info to the events going forward.
 */
export class CxEvent {}
export class CxStateEvent<T> extends CxEvent {
  state: T;
}

export class UiEvent<T> extends CxEvent {
  UiData?: any;
}

export interface CxEventSource<T> {
  sources: BehaviorSubject<Observable<T>[]>;

  merged: EventSource<T>[];
}

export interface EventSource<T> {
  source: Observable<T>;
  compareFn?: (eventData: CxEvent) => boolean;
}
