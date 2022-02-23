import { Injectable, OnDestroy } from '@angular/core';
import {
  CheckoutClearDeliveryAddressEvent,
  CheckoutResetDeliveryModesEvent,
  CheckoutResetQueryEvent,
} from '@spartacus/checkout/base/root';
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
        this.eventService.dispatch({}, CheckoutResetDeliveryModesEvent);
        this.eventService.dispatch(
          { cartId: event.cartId, userId: event.userId },
          CheckoutClearDeliveryAddressEvent
        );

        this.eventService.dispatch({}, CheckoutResetQueryEvent);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
