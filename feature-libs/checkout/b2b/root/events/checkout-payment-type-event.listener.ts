import { Injectable, OnDestroy } from '@angular/core';
import {
  ResetCheckoutQueryEvent,
  ResetDeliveryModesEvent,
} from '@spartacus/checkout/root';
import { EventService } from '@spartacus/core';
import { Subscription } from 'rxjs';
import { PaymentTypeSetEvent } from './checkout-b2b.events';

@Injectable({
  providedIn: 'root',
})
export class CheckoutPaymentTypeEventListener implements OnDestroy {
  protected subscriptions = new Subscription();

  constructor(protected eventService: EventService) {
    this.onPaymentTypeChange();
  }

  protected onPaymentTypeChange(): void {
    this.subscriptions.add(
      this.eventService.get(PaymentTypeSetEvent).subscribe(() => {
        this.eventService.dispatch({}, ResetDeliveryModesEvent);
        this.eventService.dispatch({}, ResetCheckoutQueryEvent);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
