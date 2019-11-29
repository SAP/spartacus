import { Injectable, Type } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { EventEmitter } from './event.emitter';
import { CxEvent } from './event.model';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  constructor(protected eventEmitter: EventEmitter) {}

  get<T, Y>(eventType: Type<T>, ...dependencies: Type<Y>[]): Observable<any> {
    return this.getSource(eventType).pipe(
      switchMap(origin =>
        this.combineWithDeps(...dependencies).pipe(
          map(d => Object.assign(origin, d))
        )
      )
    );
  }

  private getSource<T>(...eventType: Type<T>[]): Observable<CxEvent> {
    return combineLatest(
      eventType.map(type => this.eventEmitter.dispatch(type))
    ).pipe(map(d => Object.assign({}, ...d)));
  }

  private combineWithDeps<T>(...dependencies: Type<T>[]): Observable<any> {
    if (dependencies && dependencies.length > 0) {
      return combineLatest(
        dependencies.map(inner => {
          return this.eventEmitter.dispatch(inner);
        })
      ).pipe(
        take(1),
        map(d => Object.assign({}, ...d))
      );
    } else {
      return of({});
    }
  }
}
