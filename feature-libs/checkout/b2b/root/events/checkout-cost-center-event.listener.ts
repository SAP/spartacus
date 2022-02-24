import { Injectable, OnDestroy } from '@angular/core';
import {
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
      this.eventService
        .get(CostCenterSetEvent)
        .subscribe(({ cartId, userId }) => {
          this.eventService.dispatch(
            { cartId, userId },
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
