import { Injectable } from '@angular/core';
import { merge, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventRegister {
  private events = {};

  /**
   *
   * @param eventName
   * @param source
   */
  register(eventName: any, source: Observable<any>): void {
    if (this.events[eventName]) {
      // we merge sources if multiple are registered
      this.events[eventName] = merge(this.events[eventName], source);
    } else {
      this.events[eventName] = source;
    }
  }

  /**
   * Returns an observable to emit the event
   */
  get(event: string): Observable<any> {
    return this.events[event] ? this.events[event] : of();
  }
}
