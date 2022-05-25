import { Injectable, OnDestroy } from '@angular/core';
import {
  EventService,
  GlobalMessageService,
  GlobalMessageType,
  LoadUserPaymentMethodsEvent,
  OCC_USER_ID_ANONYMOUS,
} from '@spartacus/core';
import { Subscription } from 'rxjs';
import {
  CheckoutCreatePaymentDetailsEvent,
  CheckoutResetQueryEvent,
  CheckoutSetPaymentDetailsEvent,
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
    this.onCreatePayment();
    this.onSetPayment();
  }

  protected onCreatePayment(): void {
    this.subscriptions.add(
      this.eventService
        .get(CheckoutCreatePaymentDetailsEvent)
        .subscribe(({ userId }) => {
          if (userId !== OCC_USER_ID_ANONYMOUS) {
            this.eventService.dispatch({ userId }, LoadUserPaymentMethodsEvent);
          }

          // from the created event. no need for transitive event right?
          this.globalMessageService.add(
            { key: 'paymentForm.paymentAddedSuccessfully' },
            GlobalMessageType.MSG_TYPE_CONFIRMATION
          );
          this.eventService.dispatch({}, CheckoutResetQueryEvent);
        })
    );
  }

  protected onSetPayment(): void {
    this.subscriptions.add(
      this.eventService.get(CheckoutSetPaymentDetailsEvent).subscribe(() => {
        this.eventService.dispatch({}, CheckoutResetQueryEvent);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
