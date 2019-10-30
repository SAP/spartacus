import { Injectable } from '@angular/core';
import { merge, Observable, of } from 'rxjs';
import { BaseEvent } from './event.model';

@Injectable({
  providedIn: 'root',
})
export class EventRegister {
  private events = {};

  /**
   * Register an event source with a typed Event class.
   *
   * @param eventClass
   * @param source an Observable which will be emited when an event handler is registered
   */
  register(eventClass: new () => BaseEvent, source: Observable<any>): void {
    if (!eventClass.name) {
      return;
    }
    if (this.events[eventClass.name]) {
      // we merge sources if multiple are registered
      this.events[eventClass.name] = merge(
        this.events[eventClass.name],
        source
      );
    } else {
      this.events[eventClass.name] = source;
    }
  }

  /**
   * Returns an observable to emit the event
   */
  get(eventClass: new () => BaseEvent): Observable<any> {
    return eventClass.name && this.events[eventClass.name]
      ? this.events[eventClass.name]
      : of();
  }
}
