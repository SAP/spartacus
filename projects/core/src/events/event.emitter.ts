import { Injectable, Type } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable, of } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { CxEvent, CxEventSource } from './event.model';

/**
 * The EventEmitter provides a service to attach and dispatch events.
 * Events are driven by a global EventType, which can have multiple sources.
 * Some of the sources are attached once in the application, and emit values
 * based for any context, where other event sources are related to a specific
 * context and emit values only once.
 *
 * A good example of an event type which has event sources for both a specific
 * context and any context would be an `ADDTOCART` event. The ADDTOCART event could
 * have two sources:
 * -
 */
@Injectable({
  providedIn: 'root',
})
export class EventEmitter {
  // contains all event sources, stored by the EventType
  private events = new Map<Type<any>, CxEventSource<any>>();

  /**
   * Attach an event source to the given Event Type. The event type can hold
   * multiple sources, which can emit values at different times. If you like
   * to merge an event source to an existing event, you'd rather use the `merge`
   * method.
   */
  attach<T>(eventType: Type<T>, source: Observable<T>): void {
    const event = this.getEvent(eventType);

    // store the new source in an array of sources
    const sources: Observable<T>[] = event.sources.value;
    sources.push(source);

    event.sources.next(sources);
  }

  /**
   *
   */
  merge<T>(
    eventType: Type<T>,
    source: Observable<T>,
    compareFn?: (eventData: CxEvent<T>) => boolean
  ) {
    this.getEvent(eventType).merged.push({
      source,
      compareFn,
    });
  }

  /**
   * Dispatch a value stream for the given event type. The event values are resolved
   * from various sources.
   */
  dispatch<T>(eventType: Type<T>): any {
    return this.getEvent(eventType).sources.pipe(
      switchMap(sources => combineLatest(sources)),
      map(data => Object.assign({}, ...data)),
      switchMap(data =>
        this.dispatchedMergedSources(eventType, data).pipe(
          map(merged => Object.assign(data, ...merged))
        )
      )
    );
  }

  private dispatchedMergedSources<T>(
    eventType: Type<T>,
    data: T
  ): Observable<any> {
    const event = this.getEvent(eventType);
    const relevantSources = event.merged.filter(m =>
      m.compareFn ? m.compareFn(data) : true
    );
    return (relevantSources.length > 0
      ? combineLatest(relevantSources.map(m => m.source))
      : of([])
    ).pipe(
      take(1),
      tap(() => {
        // cleanup
        const leftOver = relevantSources.filter(
          s => relevantSources.indexOf(s) === -1
        );
        event.merged = leftOver;
      })
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
