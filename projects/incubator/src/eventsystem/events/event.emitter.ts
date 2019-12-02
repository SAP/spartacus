import { Injectable, Type } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { CxEventSource } from './event.model';

/**
 * The EventEmitter provides a service to control events in Spartacus.
 *
 * Events are driven by an Event Type. Event types are global Classes
 * which might not be in the final build, this depends on the modules
 * you use.
 *
 * Event sources can be attach and dispatch with the `EventEmiter`.
 * The various sources are combined into a single emission, so that a subscriber
 * will get the events in a combined observable.
 */
@Injectable({
  providedIn: 'root',
})
export class EventEmitter {
  /**
   * The various event sources are collected in a map, stored by
   * the `EventType` key. The event sources are organized in the
   * `CxEventSource`, so that additional (runtime) data might be
   * stored in the future.
   *
   * This is a private structure, which might evolve over time.
   */
  private events = new Map<Type<any>, CxEventSource<any>>();

  /**
   * Dispatch a value stream for the given event type. The event values
   * are resolved from various sources.
   */
  dispatch<T>(eventType: Type<T>): Observable<T> {
    return this.getEvent(eventType).sources.pipe(
      switchMap(sources => combineLatest(sources)),
      map(data => Object.assign({}, ...data))
    );
  }

  /**
   * Returns a combined observable from the various event types, if any.
   */
  dispatchAll<T>(...eventTypes: Type<T>[]): Observable<T> {
    if (eventTypes && eventTypes.length > 0) {
      return combineLatest(
        eventTypes.map(eventType => {
          return this.dispatch(eventType);
        })
      ).pipe(map(d => Object.assign({}, ...d)));
    } else {
      return of({} as T);
    }
  }

  /**
   * Attach an event source for the given Event Type.
   *
   * @param eventType the (global) event type
   * @param source an observable that represents the source
   */
  attach<T>(eventType: Type<T>, source: Observable<T>): void {
    const event = this.getEvent(eventType);
    const sources: Observable<T>[] = event.sources.value;
    sources.push(source);
    event.sources.next(sources);
  }

  /**
   * Returns the `CxEventSource` with an observable array of event
   * sources for a given event type.
   */
  protected getEvent<T>(eventType: Type<T>): CxEventSource<T> {
    if (!this.events.get(eventType)) {
      this.events.set(eventType, {
        sources: new BehaviorSubject([]),
      });
    }
    return this.events.get(eventType);
  }

  // /**
  //  * We can detach all event sources, but cannot
  //  * throw away the event savely. We might have active subscribers,
  //  * and future source might be (re)attached for those sources as well.
  //  *
  //  * We currently do not have the capability to only detach a single source.
  //  * This is actually risky, as the API caller of this method might be unaware
  //  * of any other source contributors of this event.
  //  *
  //  * @experimental
  //  */
  // detach<T>(eventType: Type<T>): void {
  //   const event = this.getEvent(eventType);
  //   event.sources.next([]);
  // }
}
