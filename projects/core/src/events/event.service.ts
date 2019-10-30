import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseEvent } from './event.model';
import { EventRegister } from './event.register';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  constructor(protected eventRegiser: EventRegister) {}

  /**
   * Returns an observable for the given eventName.
   */
  on(eventClass: new () => BaseEvent): Observable<BaseEvent> {
    return this.eventRegiser.get(eventClass);
  }
}
