import { Injectable } from '@angular/core';
import { StateEventService } from '../../state/event/state-event.service';
import { CartActions } from '../store/actions';
import { CartEvents } from './cart-event.model';

@Injectable({ providedIn: 'root' })
export class CartEventBuilder {
  constructor(protected stateEventService: StateEventService) {
    this.register();
  }

  /**
   * Registers event sources
   */
  protected register() {
    this.stateEventService
      .register({
        action: CartActions.CART_ADD_ENTRY,
        event: CartEvents.AddCartEntry,
      })
      .register({
        action: CartActions.CART_ADD_ENTRY_SUCCESS,
        event: CartEvents.AddCartEntrySuccess,
      })
      .register({
        action: CartActions.CREATE_CART_SUCCESS,
        event: CartEvents.CreateCartSuccess,
        factory: ({ payload }: CartActions.CreateCartSuccess) =>
          new CartEvents.CreateCartSuccess({ cart: payload }),
      });
  }
}
