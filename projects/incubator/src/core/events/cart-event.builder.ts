import { Injectable } from '@angular/core';
import { ActionsSubject } from '@ngrx/store';
import {
  ActiveCartService,
  CartActions,
  CartEventBuilder,
  EventService,
} from '@spartacus/core';
import {
  CartRemoveEntryEvent,
  CartRemoveEntryFailEvent,
  CartRemoveEntrySuccessEvent,
  CartUpdateEvent,
  CartUpdateFailEvent,
  CartUpdateSuccessEvent,
} from './cart.events';

@Injectable({ providedIn: 'root' })
export class CdsCartEventBuilder extends CartEventBuilder {
  constructor(
    protected actionsSubject: ActionsSubject,
    protected eventService: EventService,
    protected activeCartService: ActiveCartService
  ) {
    super(actionsSubject, eventService, activeCartService);
  }
  /**
   * Registers events for the active cart
   */
  protected register(): void {
    super.register();
    this.registerRemoveEntry();
    this.registerUpdate();
  }

  /**
   * Register events for removing entry from the active cart
   */
  protected registerRemoveEntry(): void {
    this.registerMapped({
      action: CartActions.CART_REMOVE_ENTRY,
      event: CartRemoveEntryEvent,
    });
    this.registerMapped({
      action: CartActions.CART_REMOVE_ENTRY_SUCCESS,
      event: CartRemoveEntrySuccessEvent,
    });
    this.registerMapped({
      action: CartActions.CART_REMOVE_ENTRY_FAIL,
      event: CartRemoveEntryFailEvent,
    });
  }

  /**
   * Register events for updating the active cart
   */
  protected registerUpdate(): void {
    this.registerMapped({
      action: CartActions.CART_UPDATE_ENTRY,
      event: CartUpdateEvent,
    });
    this.registerMapped({
      action: CartActions.CART_UPDATE_ENTRY_SUCCESS,
      event: CartUpdateSuccessEvent,
    });
    this.registerMapped({
      action: CartActions.CART_UPDATE_ENTRY_FAIL,
      event: CartUpdateFailEvent,
    });
  }
}
