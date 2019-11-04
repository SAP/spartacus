import { Injectable, Type } from '@angular/core';
import { Observable } from 'rxjs';
import { CxEvent } from './event.model';
import { EventRegister } from './event.register';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  constructor(protected eventRegiser: EventRegister) {}

  on<T>(eventType: Type<T>): Observable<CxEvent<T>> {
    return this.eventRegiser.getValue(eventType);
  }
}
