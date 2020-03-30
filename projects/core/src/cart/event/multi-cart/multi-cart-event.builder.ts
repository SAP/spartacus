import { Injectable } from '@angular/core';
import { StateEventService } from '../../../state/event/state-event.service';
import { CartActions } from '../../store';
import { MultiCartAddEntryEvent } from './multi-cart.events';

/**
 * Registers multi-cart events, when being injected
 */
@Injectable({ providedIn: 'root' })
export class MultiCartEventBuilder {
  constructor(protected stateEvent: StateEventService) {
    this.register();
  }

  /**
   * Registers multi-cart events
   */
  protected register() {
    this.stateEvent.register({
      action: CartActions.CART_ADD_ENTRY,
      event: MultiCartAddEntryEvent,
    });
  }
}
