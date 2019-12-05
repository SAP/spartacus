import { Injectable, Type } from '@angular/core';
import { Observable } from 'rxjs';
import { debounceTime, map, withLatestFrom } from 'rxjs/operators';
import { EventEmitter } from './event.emitter';

/**
 * The `EventService` can be used to consume all kinds of events.
 */
@Injectable({
  providedIn: 'root',
})
export class EventService {
  constructor(protected eventEmitter: EventEmitter) {}

  /**
   * Returns an observable for the given eventType(s). This can be used
   * to dispatch to a single event source or multiple event sources in
   * parallel. The event sources are merged and will be dispatched separately.
   *
   * @param eventType one or multiple event types.
   */
  get(...eventTypes: Type<any>[]): Observable<any> {
    return this.eventEmitter.dispatchAny(...eventTypes);
  }

  /**
   * Dipatches the source of the main eventType in combination
   * with one or multiple dependend even types.
   *
   * @param eventType The main event type.
   * @param dependencies One or multiple event types.
   */
  getCombined<T>(
    eventType: Type<T>,
    ...dependencies: Type<any>[]
  ): Observable<any> {
    return this.eventEmitter.dispatch(eventType).pipe(
      debounceTime(0),
      withLatestFrom(this.eventEmitter.dispatchAll(...dependencies)),
      map(([origin, deps]) => Object.assign({}, origin, deps))
    );
  }
}
