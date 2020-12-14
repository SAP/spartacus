import { Injectable } from '@angular/core';
import { StateEventService } from '../../state/event/state-event.service';
import { CheckoutActions } from '../store/actions/index';
import { OrderPlacedEvent } from './checkout.events';

@Injectable({
  providedIn: 'root',
})
export class CheckoutEventBuilder {
  constructor(protected stateEventService: StateEventService) {
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
    this.stateEventService.register({
      action: CheckoutActions.PLACE_ORDER_SUCCESS,
      event: OrderPlacedEvent,
    });
  }
}
