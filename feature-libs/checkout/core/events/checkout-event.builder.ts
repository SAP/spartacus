import { Injectable } from '@angular/core';
import {
  ClearCheckoutDataEvent,
  ClearCheckoutMiscDataEvent,
  OrderPlacedEvent,
} from '@spartacus/checkout/root';
import { StateEventService } from '@spartacus/core';
import { CheckoutActions } from '../store/actions/index';

@Injectable()
export class CheckoutEventBuilder {
  constructor(protected stateEventService: StateEventService) {
    this.register();
  }

  /**
   * Registers checkout events
   */
  protected register(): void {
    this.orderPlacedEvent();
    this.clearCheckoutDataEvent();
    this.clearCheckoutMiscDataEvent();
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

  protected clearCheckoutDataEvent(): void {
    this.stateEventService.register({
      action: CheckoutActions.CLEAR_CHECKOUT_DATA,
      event: ClearCheckoutDataEvent,
    });
  }

  protected clearCheckoutMiscDataEvent(): void {
    this.stateEventService.register({
      action: CheckoutActions.CHECKOUT_CLEAR_MISCS_DATA,
      event: ClearCheckoutMiscDataEvent,
    });
  }
}
