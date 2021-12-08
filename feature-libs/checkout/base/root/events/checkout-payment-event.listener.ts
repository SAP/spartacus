import { Injectable, OnDestroy } from '@angular/core';
import {
  EventService,
  GlobalMessageService,
  GlobalMessageType,
} from '@spartacus/core';
import { Subscription } from 'rxjs';
import { CheckoutConfig } from '../config/checkout-config';
import {
  PaymentDetailsCreatedEvent,
  PaymentDetailsSetEvent,
  ResetCheckoutQueryEvent,
} from './checkout.events';

/**
 * Checkout payment event listener.
 */
@Injectable({
  providedIn: 'root',
})
export class CheckoutPaymentEventListener implements OnDestroy {
  protected subscriptions = new Subscription();

  constructor(
    protected eventService: EventService,
    protected globalMessageService: GlobalMessageService,
    protected checkoutConfig: CheckoutConfig
  ) {
    this.onPaymentChange();
  }

  /**
   * Registers events for the payment change events.
   */
  protected onPaymentChange(): void {
    this.subscriptions.add(
      this.eventService.get(PaymentDetailsCreatedEvent).subscribe(() => {
        this.eventService.dispatch({}, ResetCheckoutQueryEvent);
      })
    );
    this.subscriptions.add(
      this.eventService.get(PaymentDetailsSetEvent).subscribe(() => {
        // we don't want to show this during the express checkout
        if (!this.checkoutConfig.checkout?.express) {
          this.globalMessageService.add(
            { key: 'paymentMethods.paymentMethodSelectedSuccess' },
            GlobalMessageType.MSG_TYPE_CONFIRMATION
          );
        }

        this.eventService.dispatch({}, ResetCheckoutQueryEvent);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
