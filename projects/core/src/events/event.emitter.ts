import { Injectable, Type } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { CxEventSource } from './event.model';

/**
 * The EventEmitter provides a service to attach and dispatch events.
 * Events are driven by a global EventType, which can have multiple sources.
 */
@Injectable({
  providedIn: 'root',
})
export class EventEmitter {
  // contains all event sources, stored by the EventType key
  private events = new Map<Type<any>, CxEventSource<any>>();

  /**
   * Attach an event source to the given Event Type. The event type can hold
   * multiple sources, which can emit values at different times. If you like
   * to merge an event source to an existing event, you'd rather use the `merge`
   * method.
   */
  attach<T>(eventType: Type<T>, source: Observable<T>): void {
    const event = this.getEvent(eventType);

    // Store the new source in an array of sources, so that we can
    // manage multiple sources.
    const sources: Observable<T>[] = event.sources.value;
    sources.push(source);

    event.sources.next(sources);
  }

  /**
   * Dispatch a value stream for the given event type. The event values are resolved
   * from various sources.
   */
  dispatch<T>(eventType: Type<T>): Observable<T> {
    return this.getEvent(eventType).sources.pipe(
      switchMap(sources => combineLatest(sources)),
      map(data => Object.assign({}, ...data))
    );
  }

  /**
   * Return the event for the given eventType.
   */
  private getEvent<T>(eventType: Type<T>): CxEventSource<T> {
    if (!this.events.get(eventType)) {
      this.events.set(eventType, {
        sources: new BehaviorSubject([]),
        merged: [],
      });
    }
    return this.events.get(eventType);
  }
}
