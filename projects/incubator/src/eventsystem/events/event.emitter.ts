import { Injectable, Type } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { EventSource } from './event.model';

/**
 * The EventEmitter provides a service to attach and observe event
 * sources. Events are driven by EventTypes, which are class signatures
 * for the given event.
 *
 * It is possible to attach multipe sources to a single event, even without
 * knowing as multiple decoupled features can attach sources to the same
 * event type.
 *
 * If there are multiple sources attached to same event, the sources are
 * combined in a single emission.
 */
@Injectable({
  providedIn: 'root',
})
export class EventEmitter {
  /**
   * The various event sources are collected in a map, stored by
   * the `EventType` class.
   */
  private events = new Map<Type<any>, EventSource<any>>();

  /**
   * Attach an event source for the given Event Type.
   *
   * @param eventType the event type
   * @param source an observable that represents the source
   */
  attach<T>(eventType: Type<T>, source: Observable<T>): void {
    const event = this.getEvent(eventType);
    const sources: Observable<T>[] = event.sources.value;
    sources.push(source);
    event.sources.next(sources);
  }

  /**
   * Observes all sources for the given event type. The event
   * sources are combined in a single observable.
   */
  observe<T>(eventType: Type<T>): Observable<T> {
    return this.getEvent(eventType).sources.pipe(
      switchMap(sources => combineLatest(sources)),
      map(data => Object.assign({}, ...data))
    );
  }

  /**
   * Helper method to get the `EventSource` for the given event type.
   *
   * @param eventType the event type
   */
  private getEvent<T>(eventType: Type<T>): EventSource<T> {
    if (!this.events.get(eventType)) {
      this.events.set(eventType, {
        sources: new BehaviorSubject([]),
      });
    }
    return this.events.get(eventType);
  }
}
