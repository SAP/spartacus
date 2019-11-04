import { Injectable, Type } from '@angular/core';
import { BehaviorSubject, Observable, of, zip } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { CxEvent } from './event.model';

interface CxEventSource<T> {
  count: BehaviorSubject<number>;

  // Indicates the number of subscribers
  listeners: number;

  value?: Observable<T | any>;
}

/**
 * The EventRegister provides a register for any kind of events.
 */
@Injectable({
  providedIn: 'root',
})
export class EventRegister {
  private events = new Map();

  /**
   * Register an event value observable for a given Event.
   *
   * @param eventType
   * @param source
   */
  registerEmitter<T>(eventType: Type<T>, source: Observable<any>): void {
    const event = this.getEvent(eventType);
    event.listeners++;
    if (event.value) {
      event.value = zip(event.value, source);
    } else {
      event.value = source;
    }

    const count = event.count ? event.count.value : 0;
    event.count.next(count + 1);
  }

  /**
   * Emits values to the event. The emited values will be merged with
   * the event, but only if we have subscribers.
   * @param eventType
   * @param value
   */
  emit<T>(eventType: Type<T>, value: CxEvent<T>): void {
    if (this.hasListeners(eventType)) {
      this.registerEmitter(eventType, of(value));
    }
  }

  getValue<T>(eventType: Type<T>): any {
    const event = this.getEvent(eventType);
    event.listeners++;
    return event.count.pipe(
      switchMap(() => event.value),
      map(data => Object.assign({}, ...data))
    );
  }

  private getEvent<T>(eventType: Type<T>): CxEventSource<T> {
    if (!this.events.get(eventType)) {
      this.events.set(eventType, {
        count: new BehaviorSubject(0),
        listeners: 0,
      });
    }
    return this.events.get(eventType);
  }

  /**
   * Indicates whether there have been any subscribers to the event.
   * @param eventType
   */
  private hasListeners<T>(eventType: Type<T>): boolean {
    return this.getEvent(eventType).listeners > 0;
  }
}
