import { Injectable, Type } from '@angular/core';
import { ofType } from '@ngrx/effects';
import { ActionsSubject } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EventService } from '../../event/event.service';
import { createFrom } from '../../util/create-from';
import { ActionToEventMapping } from './action-to-event-mapping';

/**
 * Registers streams of ngrx actions as events source streams
 */
@Injectable({
  providedIn: 'root',
})
export class StateEventService {
  constructor(
    protected actionsSubject: ActionsSubject,
    protected eventService: EventService
  ) {}

  /**
   * Registers an event source stream of specific events
   * mapped from a given action type.
   *
   * @param mapping mapping from action to event
   *
   * @returns a teardown function that unregisters the event source
   */
  register<T>(mapping: ActionToEventMapping<T>): () => void {
    return this.eventService.register(
      mapping.event,
      this.getFromAction(mapping)
    );
  }

  /**
   * Returns a stream of specific events mapped from a specific action.
   * @param mapping mapping from action to event
   */
  protected getFromAction<T>(mapping: ActionToEventMapping<T>): Observable<T> {
    return this.actionsSubject
      .pipe(ofType(...[].concat(mapping.action)))
      .pipe(
        map((action: { type: string; payload: T }) =>
          this.createEvent(action, mapping.event, mapping.factory)
        )
      );
  }

  /**
   * Creates an event instance for given class out from the action object.
   * Unless the `factory` parameter is given, the action's `payload` is used
   * as the argument for the event's constructor.
   *
   * @param action instance of an Action
   * @param mapping mapping from action to event
   * @param factory optional function getting an action instance and returning an event instance
   *
   * @returns instance of an Event
   */
  protected createEvent<T>(
    action: { type: string; payload?: any },
    eventType: Type<T>,
    factory?: (action: any) => T
  ): T {
    return factory
      ? factory(action)
      : createFrom(eventType, action.payload ?? {});
  }
}
