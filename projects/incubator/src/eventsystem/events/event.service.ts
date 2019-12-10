import { Injectable, Type } from '@angular/core';
import { combineLatest, merge, Observable, of } from 'rxjs';
import { debounceTime, map, withLatestFrom } from 'rxjs/operators';
import { EventEmitter } from './event.emitter';

/**
 * The `EventService` can be used to consume events.
 */
@Injectable({
  providedIn: 'root',
})
export class EventService {
  constructor(protected eventEmitter: EventEmitter) {}

  /**
   * Returns an observable for the given eventType(s). This can be used
   * to observe a single event or multiple events in parallel.
   *
   * If multiple events are observed, the events are merged into a
   * single observable which concurrently emits all values from every
   * given event.
   *
   * @param eventTypes one or multiple event types.
   */
  observe(...eventTypes: Type<any>[]): Observable<any> {
    return merge(
      ...eventTypes.map(eventType => {
        return this.eventEmitter.observe(eventType);
      })
    ).pipe(map(d => Object.assign({}, d)));
  }

  /**
   * Observes the source of the main eventType in combination
   * with one or multiple associated events.
   *
   * @param eventType The main event type.
   * @param associated One or multiple associated event types.
   */
  observeWith<T>(
    eventType: Type<T>,
    ...associated: Type<any>[]
  ): Observable<any> {
    return this.eventEmitter.observe(eventType).pipe(
      debounceTime(0),
      withLatestFrom(this.observeAssociates(...associated)),
      map(([origin, deps]) => Object.assign({}, origin, deps))
    );
  }

  /**
   * Returns a combined observable from the various event types, if any.
   */
  private observeAssociates<T>(...eventTypes: Type<T>[]): Observable<T> {
    if (eventTypes && eventTypes.length > 0) {
      return combineLatest(
        eventTypes.map(eventType => {
          return this.observe(eventType);
        })
      ).pipe(map(d => Object.assign({}, ...d)));
    } else {
      return of({} as T);
    }
  }
}
