import { Injectable, OnDestroy } from '@angular/core';
import {
  EventService,
  GlobalMessageService,
  GlobalMessageType,
} from '@spartacus/core';
import { Subscription } from 'rxjs';
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
    protected globalMessageService: GlobalMessageService
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
        this.globalMessageService.add(
          { key: 'paymentMethods.paymentMethodSelectedSuccess' },
          GlobalMessageType.MSG_TYPE_CONFIRMATION
        );

        this.eventService.dispatch({}, ResetCheckoutQueryEvent);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
