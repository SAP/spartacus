import { Injectable, Type } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CxEvent } from './event.model';
import { EventRegister } from './event.register';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  constructor(protected eventRegiser: EventRegister) {}

  on<T>(eventClass: Type<T>): Observable<CxEvent<T>> {
    return this.eventRegiser
      .getValue(eventClass)
      .pipe(map(value => <CxEvent<T>>{ value }));
  }
}
