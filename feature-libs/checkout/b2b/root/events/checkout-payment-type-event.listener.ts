import { Injectable, OnDestroy } from '@angular/core';
import {
  CheckoutResetDeliveryModesEvent,
  CheckoutResetQueryEvent,
} from '@spartacus/checkout/base/root';
import { EventService } from '@spartacus/core';
import { Subscription } from 'rxjs';
import { CheckoutPaymentTypeSetEvent } from './checkout-b2b.events';

@Injectable({
  providedIn: 'root',
})
export class CheckoutPaymentTypeEventListener implements OnDestroy {
  protected subscriptions = new Subscription();

  constructor(protected eventService: EventService) {
    this.onSetPaymentType();
  }

  protected onSetPaymentType(): void {
    this.subscriptions.add(
      this.eventService
        .get(CheckoutPaymentTypeSetEvent)
        .subscribe(({ userId, cartId }) => {
          this.eventService.dispatch(
            { userId, cartId },
            CheckoutResetDeliveryModesEvent
          );
          this.eventService.dispatch({}, CheckoutResetQueryEvent);
        })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
