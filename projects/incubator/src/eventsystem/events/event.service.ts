import { Injectable, Type } from '@angular/core';
import { Observable, pipe } from 'rxjs';
import { debounceTime, map, withLatestFrom } from 'rxjs/operators';
import { EventEmitter } from './event.emitter';

/**
 * The `EventService` can be used to consume all kinds of events.
 */
@Injectable({
  providedIn: 'root',
})
export class EventService {
  constructor(protected eventEmitter: EventEmitter) {}

  get<T>(eventType: Type<T>, ...dependencies: Type<any>[]): Observable<any> {
    return this.eventEmitter
      .dispatch(eventType)
      .pipe(this.withLatest(...dependencies));
  }

  private withLatest<T>(...dependencies: Type<T>[]) {
    return pipe(
      debounceTime(0),
      withLatestFrom(this.eventEmitter.dispatchAll(...dependencies)),
      map(([origin, deps]) => Object.assign({}, origin, deps))
    );
  }
}
