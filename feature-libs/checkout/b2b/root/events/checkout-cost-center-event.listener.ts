import { Injectable, OnDestroy } from '@angular/core';
import {
  ClearCheckoutDeliveryAddressEvent,
  ResetCheckoutQueryEvent,
  ResetDeliveryModesEvent,
} from '@spartacus/checkout/root';
import { EventService } from '@spartacus/core';
import { Subscription } from 'rxjs';
import { CostCenterSetEvent } from './checkout-b2b.events';

@Injectable({
  providedIn: 'root',
})
export class CheckoutCostCenterEventListener implements OnDestroy {
  protected subscriptions = new Subscription();

  constructor(protected eventService: EventService) {
    this.onCostCenterChange();
  }

  protected onCostCenterChange(): void {
    this.subscriptions.add(
      this.eventService.get(CostCenterSetEvent).subscribe((event) => {
        this.eventService.dispatch({}, ResetDeliveryModesEvent);
        this.eventService.dispatch(
          { cartId: event.cartId, userId: event.userId },
          ClearCheckoutDeliveryAddressEvent
        );

        this.eventService.dispatch({}, ResetCheckoutQueryEvent);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
