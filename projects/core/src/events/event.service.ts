import { Injectable, Type } from '@angular/core';
import { Observable } from 'rxjs';
import { EventEmitter } from './event.emitter';
import { CxEvent } from './event.model';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  constructor(protected eventEmitter: EventEmitter) {}

  on<T>(eventType: Type<T>): Observable<CxEvent<T>> {
    return this.eventEmitter.dispatch(eventType);
  }
}
