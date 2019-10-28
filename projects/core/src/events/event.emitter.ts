import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EventRegister } from './event.register';

@Injectable({
  providedIn: 'root',
})
export class EventEmitter {
  constructor(protected eventRegiser: EventRegister) {}

  /**
   * Returns an observable for the given eventName.
   */
  get(eventName: string): Observable<any> {
    return this.eventRegiser.get(eventName);
  }
}
