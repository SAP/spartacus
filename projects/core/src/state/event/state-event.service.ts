import { Injectable, Type } from '@angular/core';
import { ofType } from '@ngrx/effects';
import { ActionsSubject } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ActionToEvent } from './action-to-event';

/**
 * Transforms the stream of ngrx actions into events streams
 */
@Injectable({
  providedIn: 'root',
})
export class StateEventService {
  constructor(protected actionsSubject: ActionsSubject) {}

  getFromAction<T>(mapping: ActionToEvent<T>): Observable<T> {
    const result = this.actionsSubject
      .pipe(ofType(mapping.action))
      .pipe(
        map((action: { type: string; payload: T }) =>
          this.createEvent(action, mapping.event, mapping.factory)
        )
      );
    return result;
  }

  /**
   * Creates an event instance for given class out from the action object.
   * Unless the `factory` parameter, the action's `payload` is used the argument for the event's constructor.
   *
   * @param action instance of Action
   * @param mapping mapping object from event ty
   */
  protected createEvent<T>(
    action: { type: string; payload?: any },
    eventType: Type<T>,
    factory?: (action: any) => T
  ): T {
    return factory ? 
      factory(action) : 
      new eventType(action.payload ?? {});
  }
}