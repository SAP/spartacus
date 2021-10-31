import { Injectable, OnDestroy } from '@angular/core';
import { ResetCheckoutQueryEvent } from '@spartacus/checkout/base/root';
import { EventService } from '@spartacus/core';
import { Subscription } from 'rxjs';
import { ReplenishmentOrderScheduledEvent } from './checkout-scheduled-replenishment.events';

@Injectable({
  providedIn: 'root',
})
export class CheckoutScheduledReplenishmentEventListener implements OnDestroy {
  protected subscriptions = new Subscription();

  constructor(protected eventService: EventService) {
    this.onReplenishmentOrder();
  }

  protected onReplenishmentOrder() {
    this.subscriptions.add(
      this.eventService
        .get(ReplenishmentOrderScheduledEvent)
        .subscribe(() =>
          this.eventService.dispatch({}, ResetCheckoutQueryEvent)
        )
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
