import { Injectable } from '@angular/core';
import { ofType } from '@ngrx/effects';
import { ActionsSubject } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { filter, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { EventService } from '../../event/event.service';
import { ActionToEventMapping } from '../../state/event/action-to-event-mapping';
import { createFrom } from '../../util/create-from';
import { ActiveCartService } from '../facade/active-cart.service';
import { CartActions } from '../store/index';
import {
  CartAddEntryEvent,
  CartAddEntryFailEvent,
  CartAddEntrySuccessEvent,
  CartRemoveEntryFailEvent,
  CartRemoveEntrySuccessEvent,
  CartUpdateEntryFailEvent,
  CartUpdateEntrySuccessEvent,
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
    this.registerRemoveEntry();
    this.registerUpdateEntry();
  }

  /**
   * Register events for adding entry to the active cart
   */
  protected registerAddEntry(): void {
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

  protected registerRemoveEntry(): void {
    this.registerMapped({
      action: CartActions.CART_REMOVE_ENTRY_SUCCESS,
      event: CartRemoveEntrySuccessEvent,
    });
    this.registerMapped({
      action: CartActions.CART_REMOVE_ENTRY_FAIL,
      event: CartRemoveEntryFailEvent,
    });
  }

  protected registerUpdateEntry(): void {
    this.registerMapped({
      action: CartActions.CART_UPDATE_ENTRY_SUCCESS,
      event: CartUpdateEntrySuccessEvent,
    });
    this.registerMapped({
      action: CartActions.CART_UPDATE_ENTRY_FAIL,
      event: CartUpdateEntryFailEvent,
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
      switchMap((action) => {
        // SwitchMap was used instead of withLatestFrom, because we only want to subscribe to cart stream when action is dispatched.
        // Using withLatestFrom would trigger subscription to cart observables on event subscription and that causes side effects,
        // such as loading cart when we don't yet need it.
        return of(action).pipe(
          withLatestFrom(
            this.activeCartService.getActive(),
            this.activeCartService.getActiveCartId()
          )
        );
      }),
      filter(
        ([action, _activeCart, activeCartId]) =>
          action.payload['cartId'] === activeCartId
      ),
      map(([action, activeCart]) =>
        createFrom(mapping.event, {
          ...action.payload,
          cartCode: activeCart.code,
          entry: action.payload.entry
            ? action.payload.entry
            : activeCart.entries[Number(action.payload.entryNumber)],
        })
      )
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
    return this.actionsSubject.pipe(
      ofType(...([] as string[]).concat(actionType))
    );
  }
}
