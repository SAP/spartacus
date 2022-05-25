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
  CheckoutPaymentDetailsCreatedEvent,
  CheckoutPaymentDetailsSetEvent,
  CheckoutResetQueryEvent,
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
    this.onPaymentCreated();
    this.onPaymentSet();
  }

  protected onPaymentCreated(): void {
    this.subscriptions.add(
      this.eventService
        .get(CheckoutPaymentDetailsCreatedEvent)
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

  protected onPaymentSet(): void {
    this.subscriptions.add(
      this.eventService.get(CheckoutPaymentDetailsSetEvent).subscribe(() => {
        this.eventService.dispatch({}, CheckoutResetQueryEvent);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
