import { Injectable } from '@angular/core';
import { ofType } from '@ngrx/effects';
import { ActionsSubject } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, map, withLatestFrom } from 'rxjs/operators';
import { EventService } from '../../event/event.service';
import { ActionToEventMapping } from '../../state/event/action-to-event-mapping';
import { createFrom } from '../../util/create-from';
import { ActiveCartService } from '../facade/active-cart.service';
import { CartActions } from '../store';
import {
  CartAddEntryEvent,
  CartAddEntryFailEvent,
  CartAddEntrySuccessEvent,
} from './cart.events';

/**
 * Registers events for the active cart
 */
@Injectable({ providedIn: 'root' })
export class CartEventBuilder {
  constructor(
    protected actionsSubject: ActionsSubject,
    protected event: EventService,
    protected activeCartService: ActiveCartService
  ) {
    this.register();
  }

  /**
   * Registers events for the active cart
   */
  protected register() {
    this.registerAddEntry();
  }

  /**
   * Register events for adding entry to the active cart
   */
  protected registerAddEntry() {
    this.registerMapped({
      action: CartActions.CART_ADD_ENTRY,
      event: CartAddEntryEvent,
    });
    this.registerMapped({
      action: CartActions.CART_ADD_ENTRY_SUCCESS,
      event: CartAddEntrySuccessEvent,
    });
    this.registerMapped({
      action: CartActions.CART_ADD_ENTRY_FAIL,
      event: CartAddEntryFailEvent,
    });
  }

  /**
   * Registers a stream of target events mapped from the source actions that contain the cart id equal to the active cart id.
   *
   * @param mapping mapping declaration - from `action` string type to `event` class type
   *   (an with optional `factory` function - by default `action.payload` will be assigned to the properties of the event instance).
   */
  protected registerMapped<T>(mapping: ActionToEventMapping<T>): () => void {
    const eventStream$ = this.getAction(mapping.action).pipe(
      withLatestFrom(this.activeCartService.getActiveCartId()),
      filter(
        ([action, activeCartId]) => action.payload['cartId'] === activeCartId // assuming that action's payload contains the cart id
      ),
      map(([action]) => createFrom(mapping.event, action.payload))
    );

    return this.event.register(mapping.event, eventStream$);
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
