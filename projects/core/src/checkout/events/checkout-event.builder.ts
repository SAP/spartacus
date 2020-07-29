import { Injectable } from '@angular/core';
import { ofType } from '@ngrx/effects';
import { ActionsSubject } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EventService } from '../../event/event.service';
import { ActionToEventMapping } from '../../state/event/action-to-event-mapping';
import { createFrom } from '../../util/create-from';
import { CheckoutActions } from '../store/actions/index';
import { OrderPlacedEvent } from './checkout.events';

@Injectable({
  providedIn: 'root',
})
export class CheckoutEventBuilder {
  constructor(
    protected actionsSubject: ActionsSubject,
    protected eventService: EventService
  ) {
    this.register();
  }

  /**
   * Registers checkout events
   */
  protected register(): void {
    this.orderPlacedEvent();
  }

  /**
   * Register an order successfully placed event
   */
  protected orderPlacedEvent(): void {
    this.registerMapped({
      action: CheckoutActions.PLACE_ORDER_SUCCESS,
      event: OrderPlacedEvent,
    });
  }

  /**
   * Registers a stream of target events mapped from the source actions.
   *
   * @param mapping mapping declaration - from `action` string type to `event` class type
   *   (an with optional `factory` function - by default `action.payload` will be assigned to the properties of the event instance).
   */
  protected registerMapped<T>(mapping: ActionToEventMapping<T>): () => void {
    const eventStream$ = this.getAction(mapping.action).pipe(
      map((action) => createFrom(mapping.event, action.payload))
    );

    return this.eventService.register(mapping.event, eventStream$);
  }

  /**
   * Returns a stream of actions only of a given type(s)
   *
   * @param actionType type(s) of actions
   */
  protected getAction(
    actionType: string | string[]
  ): Observable<{ type: string; payload?: any }> {
    return this.actionsSubject.pipe(ofType(...[].concat(actionType)));
  }
}
